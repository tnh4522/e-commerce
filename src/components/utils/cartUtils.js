/**
 * Shared utility functions for cart and product operations.
 * Keep localStorage parsing defensive because users can edit stored data.
 */

export function safeParseJSON(value, fallback = null) {
    if (!value) return fallback;
    try {
        const parsed = JSON.parse(value);
        return parsed === null ? fallback : parsed;
    } catch {
        return fallback;
    }
}

export function sanitizeQuantity(quantity, fallback = 1) {
    const value = parseInt(quantity, 10);
    return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function sanitizePrice(price) {
    const value = Number(price);
    return Number.isFinite(value) && value >= 0 ? value : 0;
}

/**
 * Parse image filenames from JSON string stored in DB.
 * The DB stores filenames like ["timestamp_filename.jpg", ...],
 * this function strips the timestamp prefix.
 * @param {string} inputString - JSON string of image filenames
 * @returns {string[]} Array of cleaned filenames
 */
export function extractFilenames(inputString) {
    const inputArray = Array.isArray(inputString) ? inputString : safeParseJSON(inputString, []);
    if (!Array.isArray(inputArray)) {
        return [];
    }
    return inputArray
        .filter(Boolean)
        .map((filename) => {
            const value = String(filename);
            const startIndex = value.indexOf("_") + 1;
            return startIndex > 0 ? value.slice(startIndex) : value;
        });
}

export function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(sanitizePrice(value));
}

export function getStoredCart() {
    const rawCart = safeParseJSON(localStorage.getItem('cart'), {});
    if (!rawCart || typeof rawCart !== 'object' || Array.isArray(rawCart)) {
        return {};
    }

    return Object.keys(rawCart).reduce((cart, key) => {
        const item = rawCart[key];
        if (!item || typeof item !== 'object') return cart;
        const id = item.id ?? key;
        if (id === undefined || id === null || id === '') return cart;
        cart[String(id)] = {
            id,
            quantity: sanitizeQuantity(item.quantity),
        };
        return cart;
    }, {});
}

export function saveCart(cart) {
    const nextCart = cart && typeof cart === 'object' ? cart : {};
    localStorage.setItem('cart', JSON.stringify(nextCart));
    updateCartTotalItem();
    return nextCart;
}

/**
 * Get total number of items in cart from localStorage.
 * @returns {number}
 */
export function getCartTotalItems() {
    return Object.values(getStoredCart()).reduce((total, item) => {
        return total + sanitizeQuantity(item.quantity);
    }, 0);
}

/**
 * Save cart total items count to localStorage and dispatch custom event
 * so Header component can reactively update the badge.
 */
export function updateCartTotalItem() {
    const total = getCartTotalItems();
    localStorage.setItem('cartTotalItem', total);
    // Dispatch custom event so Header can listen and update badge
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { totalItems: total } }));
}

/**
 * Add a product to cart in localStorage.
 * @param {number|string} productId
 * @param {number} quantity
 */
export function addProductToCart(productId, quantity = 1) {
    const id = typeof productId === 'string' ? productId : String(productId);
    if (!id || id === 'undefined' || id === 'null') return false;
    const cart = getStoredCart();
    const safeQuantity = sanitizeQuantity(quantity);
    if (!cart[id]) {
        cart[id] = { id: productId, quantity: safeQuantity };
    } else {
        cart[id].quantity = sanitizeQuantity(cart[id].quantity) + safeQuantity;
    }
    saveCart(cart);
    return true;
}

export function updateCartItemQuantity(productId, quantity) {
    const id = String(productId);
    const cart = getStoredCart();
    if (!cart[id]) return cart;

    const safeQuantity = parseInt(quantity, 10);
    if (!Number.isFinite(safeQuantity) || safeQuantity < 1) {
        delete cart[id];
    } else {
        cart[id].quantity = safeQuantity;
    }

    return saveCart(cart);
}

export function removeCartItem(productId) {
    const cart = getStoredCart();
    delete cart[String(productId)];
    return saveCart(cart);
}

export function calculateCartTotal(products = []) {
    return products.reduce((total, item) => {
        return total + sanitizePrice(item.price) * sanitizeQuantity(item.quantity);
    }, 0);
}

/**
 * Get the total price from localStorage.
 * @returns {number}
 */
export function getCartTotalPrice() {
    try {
        return parseInt(localStorage.getItem('priceTotalAll')) || 0;
    } catch {
        return 0;
    }
}
