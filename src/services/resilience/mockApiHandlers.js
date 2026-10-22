/**
 * mockApiHandlers.js
 *
 * Request router and synthetic response generator for the Frontend API Resilience Layer.
 * Maps Axios requests to offlineStore operations and produces compliant Axios response shapes.
 */

import offlineStore from './offlineStore';

/**
 * Safely parse JSON or form data payload
 */
function parsePayload(data) {
    if (!data) return {};
    if (typeof data === 'object') return data;
    try {
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

/**
 * Clean and normalize URL path
 */
function normalizePath(url = '') {
    // Remove protocol and host if absolute URL
    let path = url.replace(/^https?:\/\/[^/]+/i, '');
    // Strip leading /api or /
    path = path.replace(/^\/?api\/?/i, '');
    // Remove query params
    path = path.split('?')[0];
    // Strip trailing slash
    return path.replace(/\/+$/, '');
}

/**
 * Build a mock Axios response object
 */
function createResponse(data, status = 200, config = {}) {
    return {
        data,
        status,
        statusText: status === 200 ? 'OK' : 'Error',
        headers: {
            'x-served-by': 'foodmart-api-resilience-layer',
            'content-type': 'application/json'
        },
        config
    };
}

/**
 * Build a mock Axios error response object
 */
function createErrorResponse(message, status = 400, config = {}) {
    const error = new Error(message);
    error.isAxiosError = true;
    error.response = {
        data: { message, error: true },
        status,
        statusText: 'Bad Request',
        headers: { 'x-served-by': 'foodmart-api-resilience-layer' },
        config
    };
    return error;
}

/**
 * Main dispatcher: maps any Axios request to a resilient mock response
 */
export function handleMockRequest(config) {
    const rawUrl = config.url || '';
    const method = (config.method || 'get').toLowerCase();
    const path = normalizePath(rawUrl);
    const body = parsePayload(config.data);

    console.info(`[Resilience Mock API] Intercepting ${method.toUpperCase()} /${path}`);

    // ─── External Services (PayOS) ────────────────────────────────────────────
    if (rawUrl.includes('payos.vn') || rawUrl.includes('payment-requests')) {
        return createResponse({
            code: '00',
            desc: 'Success (Resilience Simulated Payment)',
            data: {
                checkoutUrl: '/thank-you?status=PAID',
                orderCode: body.orderCode || Date.now(),
                amount: body.amount || 0
            }
        }, 200, config);
    }

    // ─── Product Routes ───────────────────────────────────────────────────────
    if (path === 'product/list' && method === 'get') {
        return createResponse(offlineStore.getProducts(), 200, config);
    }

    if (path.startsWith('product/detail/') && method === 'get') {
        const id = path.replace('product/detail/', '');
        const product = offlineStore.getProductById(id) || offlineStore.getProducts()[0];
        return product ? createResponse(product, 200, config) : createErrorResponse('Product not found', 404, config);
    }

    if (path === 'product/cart' && method === 'post') {
        const items = offlineStore.getCartProducts(body);
        return createResponse(items, 200, config);
    }

    if (path === 'product/add' && method === 'post') {
        const newProduct = offlineStore.addProduct(body);
        return createResponse(newProduct, 200, config);
    }

    if (path.startsWith('product/update/') && method === 'post') {
        const id = path.replace('product/update/', '');
        const updated = offlineStore.updateProduct(id, body);
        return createResponse(updated, 200, config);
    }

    if ((path.startsWith('product/delete/') && method === 'get') || (path.startsWith('product/') && method === 'delete')) {
        const id = path.replace(/product\/(delete\/)?/, '');
        const res = offlineStore.deleteProduct(id);
        return createResponse(res, 200, config);
    }

    // ─── Categories & Brands ──────────────────────────────────────────────────
    if (path === 'category' && method === 'get') {
        return createResponse(offlineStore.getCategories(), 200, config);
    }

    if (path === 'brand' && method === 'get') {
        return createResponse(offlineStore.getBrands(), 200, config);
    }

    // ─── Blog Routes ──────────────────────────────────────────────────────────
    if (path === 'blog/list' && method === 'get') {
        return createResponse(offlineStore.getBlogs(), 200, config);
    }

    if (path.startsWith('blog/detail/') && method === 'get') {
        const id = path.replace('blog/detail/', '');
        const blog = offlineStore.getBlogById(id);
        return blog ? createResponse(blog, 200, config) : createErrorResponse('Blog not found', 404, config);
    }

    if (path === 'blog/add' && method === 'post') {
        const newBlog = offlineStore.addBlog(body);
        return createResponse(newBlog, 200, config);
    }

    if (path.startsWith('blog/update/') && method === 'post') {
        const id = path.replace('blog/update/', '');
        const updated = offlineStore.updateBlog(id, body);
        return createResponse(updated, 200, config);
    }

    if ((path.startsWith('blog/delete/') && method === 'get') || (path.startsWith('blog/') && method === 'delete')) {
        const id = path.replace(/blog\/(delete\/)?/, '');
        const res = offlineStore.deleteBlog(id);
        return createResponse(res, 200, config);
    }

    // ─── Users & Auth ─────────────────────────────────────────────────────────
    if (path === 'user/login' && method === 'post') {
        const user = offlineStore.authenticate(body.email, body.password);
        if (user) {
            return createResponse(user, 200, config);
        }
        throw createErrorResponse('Email or password is not correct!', 401, config);
    }

    if (path === 'user/register' && method === 'post') {
        try {
            const user = offlineStore.registerUser(body);
            return createResponse(user, 200, config);
        } catch (err) {
            throw createErrorResponse(err.message, 400, config);
        }
    }

    if (path === 'user/list' && method === 'get') {
        return createResponse(offlineStore.getUsers(), 200, config);
    }

    if (path.startsWith('user/detail/') && method === 'get') {
        const id = path.replace('user/detail/', '');
        const user = offlineStore.getUserById(id);
        return user ? createResponse(user, 200, config) : createErrorResponse('User not found', 404, config);
    }

    if (path.startsWith('user/update/') && method === 'post') {
        const id = path.replace('user/update/', '');
        const updated = offlineStore.updateUser(id, body);
        return createResponse(updated, 200, config);
    }

    if (path.startsWith('user/') && method === 'delete') {
        const id = path.replace('user/', '');
        const res = offlineStore.deleteUser(id);
        return createResponse(res, 200, config);
    }

    // ─── Orders ───────────────────────────────────────────────────────────────
    if (path === 'order/list' && method === 'get') {
        return createResponse(offlineStore.getOrders(), 200, config);
    }

    if ((path === 'order/add' || path === 'order/create' || path === 'order') && method === 'post') {
        const newOrder = offlineStore.createOrder(body);
        return createResponse(newOrder, 200, config);
    }

    if (path.startsWith('order/detail/') && method === 'get') {
        const id = path.replace('order/detail/', '');
        const order = offlineStore.getOrderById(id);
        return order ? createResponse(order, 200, config) : createErrorResponse('Order not found', 404, config);
    }

    if (path.startsWith('order/status') && method === 'post') {
        const updated = offlineStore.updateOrderStatus(body.id || body.orderId, body.status);
        return createResponse(updated, 200, config);
    }

    // ─── Default Generic Resilience Fallback ──────────────────────────────────
    console.warn(`[Resilience Mock API] Route /${path} [${method}] has no specific mock; returning generic 200 fallback.`);
    return createResponse({
        success: true,
        offlineMode: true,
        message: `Action processed successfully in Offline Resilience Mode (/${path})`,
        data: body || {}
    }, 200, config);
}
