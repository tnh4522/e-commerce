/**
 * Shared utility functions for cart and product operations.
 * Extracted to avoid code duplication across components.
 */

/**
 * Parse image filenames from JSON string stored in DB.
 * The DB stores filenames like ["timestamp_filename.jpg", ...],
 * this function strips the timestamp prefix.
 * @param {string} inputString - JSON string of image filenames
 * @returns {string[]} Array of cleaned filenames
 */
export function extractFilenames(inputString) {
    try {
        const inputArray = JSON.parse(inputString);
        const resultArray = [];
        for (let i = 0; i < inputArray.length; i++) {
            const filename = inputArray[i];
            const startIndex = filename.indexOf("_") + 1;
            const newFilename = startIndex > 0 ? filename.slice(startIndex) : filename;
            resultArray.push(newFilename);
        }
        return resultArray;
    } catch (error) {
        console.error("Invalid input JSON string for image filenames.");
        return [];
    }
}

/**
 * Get total number of items in cart from localStorage.
 * @returns {number}
 */
export function getCartTotalItems() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) return 0;
        let total = 0;
        Object.keys(cart).forEach(function (key) {
            total += parseInt(cart[key].quantity) || 0;
        });
        return total;
    } catch {
        return 0;
    }
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
    let cart = {};
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || {};
    } catch {
        cart = {};
    }
    if (!cart[id]) {
        cart[id] = { id: productId, quantity: parseInt(quantity) };
    } else {
        cart[id].quantity += parseInt(quantity);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTotalItem();
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
