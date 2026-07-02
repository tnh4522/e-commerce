/**
 * dataService.js
 *
 * Centralized data fetching layer with automatic fallback to mock data.
 *
 * Behavior:
 *  1. Attempts real API call with a configurable timeout.
 *  2. Validates the response (non-null, correct shape).
 *  3. On failure (network error, timeout, invalid data), fetches the
 *     corresponding JSON file from /frontend/data/*.json.
 *  4. Returns data that is always in the correct schema so components
 *     never need to handle null/undefined themselves.
 *
 * Usage:
 *   import dataService from '../services/dataService';
 *   const products = await dataService.getProducts();
 */

import API from '../components/API/API';

// ─── Configuration ────────────────────────────────────────────────────────────

const API_TIMEOUT_MS = 5000;

/** Base path for static fallback JSON files (served from /public) */
const FALLBACK_BASE = '/frontend/data';

// Simple in-memory cache so we don't re-fetch fallback JSON on every call
const _cache = {};

// ─── Internal Helpers ─────────────────────────────────────────────────────────

/**
 * Wraps an axios call with a timeout. Rejects after `ms` milliseconds if
 * the API hasn't responded.
 */
function withTimeout(promise, ms = API_TIMEOUT_MS) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API request timed out')), ms)
    );
    return Promise.race([promise, timeout]);
}

/**
 * Fetches a static JSON fallback file. Results are cached in memory.
 * @param {string} filename - e.g. 'products.json'
 * @returns {Promise<any>}
 */
async function fetchFallback(filename) {
    if (_cache[filename] !== undefined) {
        return _cache[filename];
    }
    const url = `${FALLBACK_BASE}/${filename}`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Fallback fetch failed: ${res.status}`);
        const data = await res.json();
        _cache[filename] = data;
        return data;
    } catch (err) {
        console.warn(`[dataService] Could not load fallback ${url}:`, err.message);
        _cache[filename] = null;
        return null;
    }
}

/**
 * Core wrapper: try the API, validate, fall back to static JSON if needed.
 *
 * @param {Function} apiCall - () => Promise from axios (e.g. () => API.get('product/list'))
 * @param {string}   fallbackFile - filename inside /frontend/data/
 * @param {Function} [validator]  - (data) => boolean; return true if data is usable
 * @param {any}      [emptyValue] - what to return when everything fails (default: [])
 */
async function getWithFallback(apiCall, fallbackFile, validator, emptyValue = []) {
    const isValid = validator || (data => data !== null && data !== undefined);

    // 1. Try real API
    try {
        const res = await withTimeout(apiCall());
        if (res && res.data !== undefined && isValid(res.data)) {
            return res.data;
        }
        // Response came back but data is invalid shape — fall through to fallback
        console.warn(`[dataService] Invalid API response for ${fallbackFile}, using fallback.`);
    } catch (err) {
        console.warn(`[dataService] API error for ${fallbackFile}: ${err.message}`);
    }

    // 2. Fetch static fallback JSON
    const fallbackData = await fetchFallback(fallbackFile);
    if (fallbackData !== null && isValid(fallbackData)) {
        return fallbackData;
    }

    // 3. Nothing worked — return safe empty value
    console.error(`[dataService] Both API and fallback failed for ${fallbackFile}.`);
    return emptyValue;
}

// ─── Public API ───────────────────────────────────────────────────────────────

const dataService = {
    /**
     * Get full product list.
     * @returns {Promise<Array>}
     */
    getProducts() {
        return getWithFallback(
            () => API.get('product/list'),
            'products.json',
            data => Array.isArray(data)
        );
    },

    /**
     * Get detail for a single product by ID.
     * Falls back to finding the product in products.json by id.
     * @param {string|number} id
     * @returns {Promise<object|null>}
     */
    async getProductDetail(id) {
        const numId = parseInt(id, 10);
        try {
            const res = await withTimeout(API.get('product/detail/' + id));
            if (res && res.data && res.data.id) {
                return res.data;
            }
        } catch (err) {
            console.warn(`[dataService] API error for product detail ${id}: ${err.message}`);
        }

        // Fallback: find in products list
        const products = await fetchFallback('products.json');
        if (Array.isArray(products)) {
            const found = products.find(p => p.id === numId || String(p.id) === String(id));
            return found || null;
        }
        return null;
    },

    /**
     * Get all categories.
     * @returns {Promise<Array>}
     */
    getCategories() {
        return getWithFallback(
            () => API.get('category'),
            'categories.json',
            data => Array.isArray(data)
        );
    },

    /**
     * Get all brands.
     * @returns {Promise<Array>}
     */
    getBrands() {
        return getWithFallback(
            () => API.get('brand'),
            'brands.json',
            data => Array.isArray(data)
        );
    },

    /**
     * Get blog list.
     * @returns {Promise<Array>}
     */
    getBlogs() {
        return getWithFallback(
            () => API.get('blog/list'),
            'blogs.json',
            data => Array.isArray(data)
        );
    },

    /**
     * Get cart products by posting cart data to API.
     * Falls back to fetching product details for each cart item from products.json.
     * @param {object} cartData - { [productId]: quantity }
     * @returns {Promise<Array>}
     */
    async getCartProducts(cartData) {
        const cartIds = Object.keys(cartData);
        if (cartIds.length === 0) return [];

        try {
            const res = await withTimeout(API.post('product/cart', cartData));
            if (res && Array.isArray(res.data) && res.data.length > 0) {
                return res.data;
            }
        } catch (err) {
            console.warn(`[dataService] API error for cart products: ${err.message}`);
        }

        // Fallback: construct cart products from products.json
        const allProducts = await fetchFallback('products.json');
        if (!Array.isArray(allProducts)) return [];

        return cartIds
            .map(id => {
                const product = allProducts.find(p => String(p.id) === String(id));
                if (!product) return null;
                return { ...product, quantity: cartData[id] };
            })
            .filter(Boolean);
    },

    /**
     * Clears the in-memory cache (useful for testing or forced refresh).
     */
    clearCache() {
        Object.keys(_cache).forEach(key => delete _cache[key]);
    },
};

export default dataService;
