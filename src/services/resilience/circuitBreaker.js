/**
 * circuitBreaker.js
 *
 * Implements the Circuit Breaker pattern for Frontend API Resilience.
 *
 * States:
 *   - CLOSED: Normal operation. Requests pass through to the real API.
 *   - OPEN: Backend API is down/failing. Requests fast-fail to offline mock handlers in <10ms.
 *   - HALF_OPEN: Cooldown period elapsed. Allows trial probe requests to test backend recovery.
 */

export const CircuitState = {
    CLOSED: 'CLOSED',
    OPEN: 'OPEN',
    HALF_OPEN: 'HALF_OPEN'
};

class CircuitBreaker {
    constructor(options = {}) {
        this.failureThreshold = options.failureThreshold || 2; // Trip after 2 consecutive failures
        this.cooldownPeriod = options.cooldownPeriod || 15000;  // 15 seconds cooldown before HALF_OPEN
        this.requestTimeout = options.requestTimeout || 3500;   // 3.5s per request before timeout

        this.state = CircuitState.CLOSED;
        this.failureCount = 0;
        this.successCount = 0;
        this.lastFailureTime = null;
        this.lastSuccessTime = null;
        this.nextAttempt = Date.now();
        this.totalFailures = 0;
        this.totalFallbacks = 0;

        this.listeners = new Set();
        this.timer = null;

        // Restore persisted outage state if page was refreshed during an outage
        try {
            const savedState = localStorage.getItem('foodmart_circuit_state');
            if (savedState === CircuitState.OPEN || savedState === CircuitState.HALF_OPEN) {
                this.state = CircuitState.OPEN;
                this.nextAttempt = Date.now() + 5000;
            }
        } catch (e) {
            // Ignore localStorage errors
        }
    }

    /**
     * Get current circuit state
     */
    getState() {
        if (this.state === CircuitState.OPEN && Date.now() >= this.nextAttempt) {
            this.transitionTo(CircuitState.HALF_OPEN);
        }
        return this.state;
    }

    /**
     * Check if circuit breaker is open (bypassing network calls)
     */
    isOpen() {
        const current = this.getState();
        return current === CircuitState.OPEN;
    }

    /**
     * Check if currently in probing state
     */
    isHalfOpen() {
        return this.getState() === CircuitState.HALF_OPEN;
    }

    /**
     * Record a successful network response from backend
     */
    recordSuccess() {
        this.lastSuccessTime = Date.now();
        this.failureCount = 0;
        if (this.state !== CircuitState.CLOSED) {
            console.info('[CircuitBreaker] Backend recovered! Transitioning to CLOSED.');
            this.transitionTo(CircuitState.CLOSED);
        }
    }

    /**
     * Record a failed network request or timeout
     */
    recordFailure(error) {
        this.failureCount++;
        this.totalFailures++;
        this.lastFailureTime = Date.now();

        console.warn(`[CircuitBreaker] Recorded failure (${this.failureCount}/${this.failureThreshold}):`, error?.message || error);

        if (this.state === CircuitState.HALF_OPEN || this.failureCount >= this.failureThreshold) {
            this.transitionTo(CircuitState.OPEN);
        }
    }

    /**
     * Record an offline mock fallback served
     */
    recordFallback() {
        this.totalFallbacks++;
    }

    /**
     * Transition to a new state and notify all subscribers
     */
    transitionTo(newState) {
        if (this.state === newState) return;

        const oldState = this.state;
        this.state = newState;

        if (newState === CircuitState.OPEN) {
            this.nextAttempt = Date.now() + this.cooldownPeriod;
            try {
                localStorage.setItem('foodmart_circuit_state', CircuitState.OPEN);
            } catch (e) {}

            // Schedule timer to move to HALF_OPEN after cooldown
            if (this.timer) clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.getState(); // triggers HALF_OPEN check and notification
            }, this.cooldownPeriod);
            if (this.timer && typeof this.timer.unref === 'function') {
                this.timer.unref();
            }
        } else if (newState === CircuitState.CLOSED) {
            this.failureCount = 0;
            try {
                localStorage.removeItem('foodmart_circuit_state');
            } catch (e) {}
            if (this.timer) clearTimeout(this.timer);
        }

        console.info(`[CircuitBreaker] State changed: ${oldState} -> ${newState}`);
        this.notify(newState, oldState);
    }

    /**
     * Force transition (used for UI manual retry or developer debugging)
     */
    forceState(newState) {
        this.transitionTo(newState);
    }

    /**
     * Reset breaker to CLOSED state
     */
    reset() {
        this.failureCount = 0;
        this.transitionTo(CircuitState.CLOSED);
    }

    /**
     * Subscribe to state change events
     */
    subscribe(callback) {
        this.listeners.add(callback);
        // Call immediately with current state
        try {
            callback(this.state);
        } catch (e) {
            console.error('[CircuitBreaker] Error in subscriber:', e);
        }
        return () => this.listeners.delete(callback);
    }

    /**
     * Notify subscribers of state changes
     */
    notify(newState, oldState) {
        this.listeners.forEach(cb => {
            try {
                cb(newState, oldState);
            } catch (e) {
                console.error('[CircuitBreaker] Subscriber error:', e);
            }
        });
    }

    /**
     * Get diagnostic status summary
     */
    getDiagnostics() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            failureThreshold: this.failureThreshold,
            lastFailureTime: this.lastFailureTime,
            lastSuccessTime: this.lastSuccessTime,
            nextAttempt: this.nextAttempt,
            totalFailures: this.totalFailures,
            totalFallbacks: this.totalFallbacks
        };
    }
}

// Singleton instance used across frontend
const circuitBreaker = new CircuitBreaker();

export default circuitBreaker;
