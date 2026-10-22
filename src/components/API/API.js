/**
 * API.js
 *
 * Axios instance integrated with the Frontend API Resilience Layer.
 * Features:
 *   - Circuit Breaker integration (CLOSED / OPEN / HALF_OPEN)
 *   - Automatic timeout enforcement (3500ms)
 *   - Fast-fail short-circuiting when backend is down
 *   - Transparent fallback to client-side offline mock handlers
 *   - Dual registration on custom instance AND global axios
 */

import axios from "axios";
import circuitBreaker, { CircuitState } from "../../services/resilience/circuitBreaker";
import { handleMockRequest } from "../../services/resilience/mockApiHandlers";

const DEFAULT_TIMEOUT = 3500;

// Create configured API instance
const API = axios.create({
    baseURL: "http://localhost:8080/api/",
    timeout: DEFAULT_TIMEOUT
});

// Configure default global axios timeout as well
axios.defaults.timeout = DEFAULT_TIMEOUT;

/**
 * Custom error used to short-circuit requests when breaker is OPEN
 */
class ResilienceBypassError extends Error {
    constructor(config) {
        super('Request bypassed by Circuit Breaker (Resilience Mode Active)');
        this.name = 'ResilienceBypassError';
        this.__isResilienceBypass = true;
        this.config = config;
    }
}

/**
 * Attach request and response interceptors to an axios instance
 */
function attachResilienceInterceptors(instance, name = 'API') {
    // 1. Request Interceptor: fast-fail if circuit breaker is OPEN
    instance.interceptors.request.use(
        (config) => {
            // Enforce timeout
            if (!config.timeout || config.timeout > DEFAULT_TIMEOUT) {
                config.timeout = DEFAULT_TIMEOUT;
            }

            // Probe requests bypass circuit breaker check to test recovery
            if (config.__isProbe) {
                return config;
            }

            // If breaker is OPEN, do not attempt network; short-circuit to fallback immediately
            if (circuitBreaker.isOpen()) {
                console.info(`[${name}] Breaker is OPEN. Fast-failing to offline store for:`, config.url);
                throw new ResilienceBypassError(config);
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // 2. Response Interceptor: handle backend failures and resolve with resilient mock data
    instance.interceptors.response.use(
        (response) => {
            // Real backend request succeeded!
            if (!response.config?.__isProbe) {
                circuitBreaker.recordSuccess();
            }
            return response;
        },
        async (error) => {
            const config = error.config || (error instanceof ResilienceBypassError ? error.config : null);

            // If this was a fast-fail short-circuit
            if (error.__isResilienceBypass || error.name === 'ResilienceBypassError') {
                circuitBreaker.recordFallback();
                try {
                    const fallback = handleMockRequest(config);
                    return Promise.resolve(fallback);
                } catch (mockErr) {
                    return Promise.reject(mockErr);
                }
            }

            // If it was an explicit probe attempt, let probe caller handle error
            if (config?.__isProbe) {
                return Promise.reject(error);
            }

            // Check if this error is an infrastructure / network / outage failure
            const isNetworkError = !error.response || error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK';
            const isServerError = error.response && error.response.status >= 500;
            const isCloudDowntime = error.response && (error.response.status === 502 || error.response.status === 503 || error.response.status === 504);

            if (isNetworkError || isServerError || isCloudDowntime) {
                circuitBreaker.recordFailure(error);
                circuitBreaker.recordFallback();

                if (config) {
                    console.warn(`[${name} Resilience Layer] Intercepted failed request to ${config.url}. Serving offline fallback.`);
                    try {
                        const fallbackResponse = handleMockRequest(config);
                        return Promise.resolve(fallbackResponse);
                    } catch (mockErr) {
                        return Promise.reject(mockErr);
                    }
                }
            }

            // If mockApiHandler generated a 401 or 400 validation error (e.g. wrong password during offline login)
            return Promise.reject(error);
        }
    );
}

// Attach to both the custom API instance and the global axios instance
attachResilienceInterceptors(API, 'API');
attachResilienceInterceptors(axios, 'GlobalAxios');

/**
 * Probe function to check if the real backend server has recovered
 */
export async function probeBackend() {
    circuitBreaker.forceState(CircuitState.HALF_OPEN);
    try {
        const res = await axios.get('http://localhost:8080/api/category', {
            timeout: 2500,
            __isProbe: true
        });
        if (res && (res.status === 200 || res.status === 304)) {
            circuitBreaker.recordSuccess();
            return { online: true };
        }
    } catch (e) {
        circuitBreaker.recordFailure(e);
        return { online: false, error: e.message };
    }
    return { online: false };
}

export default API;
