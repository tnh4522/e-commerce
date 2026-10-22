/**
 * dataService.js
 *
 * Centralized data fetching layer with Multi-Tier Resilience & Circuit Breaker.
 *
 * Tier 1: Real Backend API Server (when Circuit Breaker is CLOSED)
 * Tier 2: LocalStorage Persistent Resilience Store (offlineStore)
 * Tier 3: Static seed data & cached JSON fallbacks
 *
 * Fast-fails in <1ms when the Circuit Breaker is OPEN to maintain an instant,
 * responsive user experience during outages.
 */

import API from '../components/API/API';
import circuitBreaker from './resilience/circuitBreaker';
import offlineStore from './resilience/offlineStore';

const API_TIMEOUT_MS = 3500;
const FALLBACK_BASE = '/frontend/data';
const _cache = {};

/**
 * Wraps an axios call with a timeout.
 */
function withTimeout(promise, ms = API_TIMEOUT_MS) {
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('API request timed out')), ms)
    );
    return Promise.race([promise, timeout]);
}

/**
 * Fetches a static JSON fallback file with cache and offlineStore backup.
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
        console.warn(`[dataService] Could not load fallback ${url}, reading from offlineStore:`, err.message);
        // Fallback to offlineStore based on filename
        if (filename.includes('product')) return offlineStore.getProducts();
        if (filename.includes('categor')) return offlineStore.getCategories();
        if (filename.includes('brand')) return offlineStore.getBrands();
        if (filename.includes('blog')) return offlineStore.getBlogs();
        return null;
    }
}

/**
 * Core wrapper: try API, fallback to offlineStore or static JSON if needed.
 */
async function getWithFallback(apiCall, fallbackFile, getFromOfflineStore, validator, emptyValue = []) {
    const isValid = validator || (data => data !== null && data !== undefined);

    // Fast-path: If circuit breaker is OPEN, read directly from offline store without network latency
    if (circuitBreaker.isOpen()) {
        const offlineData = getFromOfflineStore();
        if (isValid(offlineData)) {
            return offlineData;
        }
    }

    // 1. Try real API
    try {
        const res = await withTimeout(apiCall());
        if (res && res.data !== undefined && isValid(res.data)) {
            return res.data;
        }
    } catch (err) {
        console.warn(`[dataService] API error for ${fallbackFile}: ${err.message}`);
    }

    // 2. Try offlineStore
    try {
        const localData = getFromOfflineStore();
        if (isValid(localData) && (!Array.isArray(localData) || localData.length > 0)) {
            return localData;
        }
    } catch (e) {}

    // 3. Fetch static fallback JSON
    const fallbackData = await fetchFallback(fallbackFile);
    if (fallbackData !== null && isValid(fallbackData)) {
        return fallbackData;
    }

    return emptyValue;
}

const dataService = {
    /**
     * Get full product list.
     */
    getProducts() {
        return getWithFallback(
            () => API.get('product/list'),
            'products.json',
            () => offlineStore.getProducts(),
            data => Array.isArray(data)
        );
    },

    /**
     * Get detail for a single product by ID with full mockup attributes.
     */
    async getProductDetail(id) {
        let product = null;

        if (id) {
            const numId = parseInt(id, 10);

            if (circuitBreaker.isOpen()) {
                product = offlineStore.getProductById(id);
            }

            if (!product) {
                try {
                    const res = await withTimeout(API.get('product/detail/' + id));
                    if (res && res.data && res.data.id) {
                        product = res.data;
                    }
                } catch (err) {
                    console.warn(`[dataService] API error for product detail ${id}: ${err.message}`);
                }
            }

            if (!product) {
                product = offlineStore.getProductById(id);
            }

            if (!product) {
                const products = await fetchFallback('products.json');
                if (Array.isArray(products) && products.length > 0) {
                    product = products.find(p => p.id === numId || String(p.id) === String(id));
                }
            }
        }

        // If still not found or no ID provided, fallback to the first product in catalog
        if (!product) {
            const allProducts = offlineStore.getProducts();
            product = Array.isArray(allProducts) && allProducts.length > 0 ? allProducts[0] : null;
        }

        if (!product) {
            // Absolute fallback default mock product
            product = {
                id: 1,
                name: "Cà chua chùm tươi hữu cơ Đà Lạt",
                price: 45000,
                image: '["thumb-tomatoes.png","product-thumb-2.png"]',
                idCategory: 1,
                idBrand: 5,
                detail: "Cà chua đỏ hữu cơ mọng nước, giàu lycopene và vitamin C. Được thu hoạch tươi từ nông trại xanh mỗi ngày, thích hợp cho món salad và nấu sốt.",
                status: 1
            };
        }

        // Enrich with detailed mockup attributes for product detail page
        return {
            ...product,
            origin: product.origin || 'Nông trại sinh thái Đà Lạt, Lâm Đồng (Việt Nam)',
            weight: product.weight || 'Hộp 500g tiêu chuẩn',
            standard: product.standard || 'Chứng nhận VietGAP / Nông sản Hữu cơ Organic',
            expiry: product.expiry || '3 - 5 ngày (Bảo quản mát 4°C - 8°C)',
            storage: product.storage || 'Bảo quản trong ngăn mát tủ lạnh, rửa sạch trước khi dùng',
            rating: product.rating || 4.9,
            reviewsCount: product.reviewsCount || 128,
            soldCount: product.soldCount || 342,
            stock: product.stock || (35 + (Number(product.id || 1) * 7) % 60),
            nutrition: product.nutrition || {
                calories: '32 kcal / 100g',
                vitaminC: '28 mg',
                fiber: '2.4 g',
                organic: '100%'
            }
        };
    },

    /**
     * Get all categories.
     */
    getCategories() {
        return getWithFallback(
            () => API.get('category'),
            'categories.json',
            () => offlineStore.getCategories(),
            data => Array.isArray(data)
        );
    },

    /**
     * Get all brands.
     */
    getBrands() {
        return getWithFallback(
            () => API.get('brand'),
            'brands.json',
            () => offlineStore.getBrands(),
            data => Array.isArray(data)
        );
    },

    /**
     * Get blog list.
     */
    getBlogs() {
        return getWithFallback(
            () => API.get('blog/list'),
            'blogs.json',
            () => offlineStore.getBlogs(),
            data => Array.isArray(data)
        );
    },

    /**
     * Get detail for a single blog by ID.
     */
    async getBlogDetail(id) {
        const numId = parseInt(id, 10);

        if (circuitBreaker.isOpen()) {
            return offlineStore.getBlogById(id);
        }

        try {
            const res = await withTimeout(API.get('blog/detail/' + id));
            if (res && res.data && (res.data.id || res.data.title)) {
                return res.data;
            }
        } catch (err) {
            console.warn(`[dataService] API error for blog detail ${id}: ${err.message}`);
        }

        const local = offlineStore.getBlogById(id);
        if (local) return local;

        const blogs = await fetchFallback('blogs.json');
        if (Array.isArray(blogs)) {
            const found = blogs.find(b => b.id === numId || String(b.id) === String(id));
            return found || null;
        }
        return null;
    },

    /**
     * Get cart products by posting cart data to API or resolving from offline store.
     */
    async getCartProducts(cartData) {
        const cartIds = Object.keys(cartData || {});
        if (cartIds.length === 0) return [];

        if (circuitBreaker.isOpen()) {
            return offlineStore.getCartProducts(cartData);
        }

        try {
            const res = await withTimeout(API.post('product/cart', cartData));
            if (res && Array.isArray(res.data) && res.data.length > 0) {
                return res.data;
            }
        } catch (err) {
            console.warn(`[dataService] API error for cart products: ${err.message}`);
        }

        // Offline store resolver
        const items = offlineStore.getCartProducts(cartData);
        if (items && items.length > 0) return items;

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
     * Clears in-memory cache.
     */
    clearCache() {
        Object.keys(_cache).forEach(key => delete _cache[key]);
    },
};

export default dataService;
