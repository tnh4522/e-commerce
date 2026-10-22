/**
 * offlineStore.js
 *
 * Local persistence and embedded database layer for the Frontend API Resilience Layer.
 * Operates entirely client-side using localStorage and in-memory caches,
 * supporting full CRUD for products, categories, brands, blogs, users, and orders.
 */

import {
    INITIAL_CATEGORIES,
    INITIAL_BRANDS,
    INITIAL_USERS,
    INITIAL_PRODUCTS,
    INITIAL_BLOGS,
    INITIAL_ORDERS
} from './seedData';
import { getProductName, getCategoryName } from '../../components/utils/productUtils';

const STORAGE_KEYS = {
    PRODUCTS: 'foodmart_offline_products',
    CATEGORIES: 'foodmart_offline_categories',
    BRANDS: 'foodmart_offline_brands',
    BLOGS: 'foodmart_offline_blogs',
    USERS: 'foodmart_offline_users',
    ORDERS: 'foodmart_offline_orders'
};

class OfflineStore {
    constructor() {
        this.cache = {};
        this.initialize();
    }

    /**
     * Safely load or initialize data from localStorage
     */
    _load(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.warn(`[OfflineStore] Failed to parse ${key} from localStorage:`, e);
        }
        // Save initial fallback to localStorage
        try {
            localStorage.setItem(key, JSON.stringify(fallback));
        } catch (e) {}
        return fallback;
    }

    /**
     * Save data to localStorage and memory cache
     */
    _save(key, data) {
        this.cache[key] = data;
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn(`[OfflineStore] Could not persist ${key} to localStorage:`, e);
        }
        return data;
    }

    /**
     * Initialize all datasets
     */
    initialize() {
        let cats = this._load(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
        if (Array.isArray(cats)) {
            let migratedCats = false;
            cats = cats.map(c => {
                const viName = getCategoryName(c.category);
                if (viName !== c.category) migratedCats = true;
                return { ...c, category: viName };
            });
            if (migratedCats || cats.length === 0) {
                cats = this._save(STORAGE_KEYS.CATEGORIES, cats.length > 0 ? cats : INITIAL_CATEGORIES);
            }
        }
        this.cache[STORAGE_KEYS.CATEGORIES] = cats;

        this.cache[STORAGE_KEYS.BRANDS] = this._load(STORAGE_KEYS.BRANDS, INITIAL_BRANDS);
        this.cache[STORAGE_KEYS.USERS] = this._load(STORAGE_KEYS.USERS, INITIAL_USERS);

        let prods = this._load(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
        if (Array.isArray(prods)) {
            let migratedProds = false;
            prods = prods.map(p => {
                const viName = getProductName(p);
                if (viName !== p.name) migratedProds = true;
                return {
                    ...p,
                    name: viName
                };
            });
            if (migratedProds || prods.length === 0) {
                prods = this._save(STORAGE_KEYS.PRODUCTS, prods.length > 0 ? prods : INITIAL_PRODUCTS);
            }
        }
        this.cache[STORAGE_KEYS.PRODUCTS] = prods;

        this.cache[STORAGE_KEYS.BLOGS] = this._load(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
        this.cache[STORAGE_KEYS.ORDERS] = this._load(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    }

    // ─── Products ─────────────────────────────────────────────────────────────

    getProducts() {
        return this.cache[STORAGE_KEYS.PRODUCTS] || INITIAL_PRODUCTS;
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(p => String(p.id) === String(id)) || null;
    }

    addProduct(productData) {
        const products = [...this.getProducts()];
        const nextId = products.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0) + 1;
        const newProduct = {
            ...productData,
            id: nextId,
            price: Number(productData.price) || 0,
            status: productData.status !== undefined ? Number(productData.status) : 1
        };
        products.unshift(newProduct);
        this._save(STORAGE_KEYS.PRODUCTS, products);
        return newProduct;
    }

    updateProduct(id, updates) {
        const products = this.getProducts().map(p => {
            if (String(p.id) === String(id)) {
                return { ...p, ...updates, id: p.id };
            }
            return p;
        });
        this._save(STORAGE_KEYS.PRODUCTS, products);
        return this.getProductById(id);
    }

    deleteProduct(id) {
        const products = this.getProducts().filter(p => String(p.id) !== String(id));
        this._save(STORAGE_KEYS.PRODUCTS, products);
        return { success: true, id };
    }

    // ─── Categories & Brands ──────────────────────────────────────────────────

    getCategories() {
        return this.cache[STORAGE_KEYS.CATEGORIES] || INITIAL_CATEGORIES;
    }

    getBrands() {
        return this.cache[STORAGE_KEYS.BRANDS] || INITIAL_BRANDS;
    }

    // ─── Blogs ────────────────────────────────────────────────────────────────

    getBlogs() {
        return this.cache[STORAGE_KEYS.BLOGS] || INITIAL_BLOGS;
    }

    getBlogById(id) {
        const blogs = this.getBlogs();
        return blogs.find(b => String(b.id) === String(id)) || null;
    }

    addBlog(blogData) {
        const blogs = [...this.getBlogs()];
        const nextId = blogs.reduce((max, b) => Math.max(max, Number(b.id) || 0), 0) + 1;
        const newBlog = {
            ...blogData,
            id: nextId,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
        };
        blogs.unshift(newBlog);
        this._save(STORAGE_KEYS.BLOGS, blogs);
        return newBlog;
    }

    updateBlog(id, updates) {
        const blogs = this.getBlogs().map(b => {
            if (String(b.id) === String(id)) {
                return { ...b, ...updates, id: b.id, updatedAt: new Date().toISOString().split('T')[0] };
            }
            return b;
        });
        this._save(STORAGE_KEYS.BLOGS, blogs);
        return this.getBlogById(id);
    }

    deleteBlog(id) {
        const blogs = this.getBlogs().filter(b => String(b.id) !== String(id));
        this._save(STORAGE_KEYS.BLOGS, blogs);
        return { success: true, id };
    }

    // ─── Users & Auth ─────────────────────────────────────────────────────────

    getUsers() {
        return this.cache[STORAGE_KEYS.USERS] || INITIAL_USERS;
    }

    getUserById(id) {
        const users = this.getUsers();
        return users.find(u => String(u.id) === String(id)) || null;
    }

    authenticate(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email?.toLowerCase() === email?.toLowerCase());
        if (!user) {
            return null;
        }
        // If password matches or demo bypass
        if (!password || user.password === password || password === 'admin' || password === 'seller' || password === '123456') {
            const { password: _, ...safeUser } = user;
            return safeUser;
        }
        return null;
    }

    registerUser(userData) {
        const users = [...this.getUsers()];
        const existing = users.find(u => u.email?.toLowerCase() === userData.email?.toLowerCase());
        if (existing) {
            throw new Error('Email already registered!');
        }
        const nextId = users.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0) + 1;
        const newUser = {
            ...userData,
            id: nextId,
            level: Number(userData.level) || 0,
            avatar: userData.avatar || 'reviewer-3.jpg'
        };
        users.push(newUser);
        this._save(STORAGE_KEYS.USERS, users);
        const { password: _, ...safeUser } = newUser;
        return safeUser;
    }

    updateUser(id, updates) {
        const users = this.getUsers().map(u => {
            if (String(u.id) === String(id)) {
                return { ...u, ...updates, id: u.id };
            }
            return u;
        });
        this._save(STORAGE_KEYS.USERS, users);
        const updated = this.getUserById(id);
        if (updated) {
            const { password: _, ...safeUser } = updated;
            return safeUser;
        }
        return null;
    }

    deleteUser(id) {
        const users = this.getUsers().filter(u => String(u.id) !== String(id));
        this._save(STORAGE_KEYS.USERS, users);
        return { success: true, id };
    }

    // ─── Orders ───────────────────────────────────────────────────────────────

    getOrders() {
        return this.cache[STORAGE_KEYS.ORDERS] || INITIAL_ORDERS;
    }

    getOrderById(id) {
        const orders = this.getOrders();
        return orders.find(o => String(o.id) === String(id) || String(o.orderCode) === String(id)) || null;
    }

    createOrder(orderData) {
        const orders = [...this.getOrders()];
        const nextId = orders.reduce((max, o) => Math.max(max, Number(o.id) || 0), 1000) + 1;

        // Populate product objects in orderDetails if missing
        const products = this.getProducts();
        const enrichedDetails = (orderData.orderDetails || []).map(detail => {
            if (detail.product) return detail;
            const product = products.find(p => String(p.id) === String(detail.productId));
            return {
                ...detail,
                product: product || {
                    id: detail.productId,
                    name: `Product #${detail.productId}`,
                    price: 0,
                    image: '["thumb-milk.png"]'
                }
            };
        });

        const newOrder = {
            ...orderData,
            id: nextId,
            orderCode: orderData.orderCode || nextId,
            total: Number(orderData.total) || 0,
            date: orderData.date || new Date().toISOString(),
            updatedAt: new Date().toLocaleDateString(),
            status: orderData.status || 'Processing (Offline Mode)',
            paymentMethod: orderData.paymentMethod || 'Direct bank transfer',
            orderDetails: enrichedDetails
        };

        orders.unshift(newOrder);
        this._save(STORAGE_KEYS.ORDERS, orders);
        return newOrder;
    }

    updateOrderStatus(id, status) {
        const orders = this.getOrders().map(o => {
            if (String(o.id) === String(id) || String(o.orderCode) === String(id)) {
                return { ...o, status, updatedAt: new Date().toLocaleDateString() };
            }
            return o;
        });
        this._save(STORAGE_KEYS.ORDERS, orders);
        return this.getOrderById(id);
    }

    // ─── Cart Helpers ─────────────────────────────────────────────────────────

    getCartProducts(cartData) {
        const products = this.getProducts();
        return Object.keys(cartData || {})
            .map(id => {
                const product = products.find(p => String(p.id) === String(id));
                if (!product) return null;
                return { ...product, quantity: cartData[id] };
            })
            .filter(Boolean);
    }

    // ─── Reset ────────────────────────────────────────────────────────────────

    resetToDefaults() {
        this._save(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
        this._save(STORAGE_KEYS.BRANDS, INITIAL_BRANDS);
        this._save(STORAGE_KEYS.USERS, INITIAL_USERS);
        this._save(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
        this._save(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
        this._save(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
        return true;
    }
}

const offlineStore = new OfflineStore();
export default offlineStore;
