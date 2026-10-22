import circuitBreaker, { CircuitState } from './circuitBreaker';
import offlineStore from './offlineStore';
import { handleMockRequest } from './mockApiHandlers';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ErrorBoundary from '../../components/Resilience/ErrorBoundary';

describe('API Resilience Layer', () => {

    beforeEach(() => {
        circuitBreaker.reset();
        localStorage.clear();
        offlineStore.initialize();
    });

    describe('Circuit Breaker', () => {
        test('initializes in CLOSED state', () => {
            expect(circuitBreaker.getState()).toBe(CircuitState.CLOSED);
            expect(circuitBreaker.isOpen()).toBe(false);
        });

        test('transitions to OPEN after reaching failure threshold', () => {
            circuitBreaker.recordFailure(new Error('Network error 1'));
            expect(circuitBreaker.getState()).toBe(CircuitState.CLOSED);

            circuitBreaker.recordFailure(new Error('Network error 2'));
            expect(circuitBreaker.getState()).toBe(CircuitState.OPEN);
            expect(circuitBreaker.isOpen()).toBe(true);
        });

        test('recovers to CLOSED on recorded success', () => {
            circuitBreaker.forceState(CircuitState.OPEN);
            expect(circuitBreaker.isOpen()).toBe(true);

            circuitBreaker.recordSuccess();
            expect(circuitBreaker.getState()).toBe(CircuitState.CLOSED);
            expect(circuitBreaker.isOpen()).toBe(false);
        });

        test('notifies subscribers on state change', () => {
            const listener = jest.fn();
            const unsubscribe = circuitBreaker.subscribe(listener);

            circuitBreaker.recordFailure(new Error('err 1'));
            circuitBreaker.recordFailure(new Error('err 2'));

            expect(listener).toHaveBeenCalledWith(CircuitState.OPEN, CircuitState.CLOSED);
            unsubscribe();
        });
    });

    describe('Offline Store', () => {
        test('loads products, categories, and brands successfully', () => {
            const products = offlineStore.getProducts();
            expect(Array.isArray(products)).toBe(true);
            expect(products.length).toBeGreaterThan(0);

            const categories = offlineStore.getCategories();
            expect(categories.length).toBe(7);

            const brands = offlineStore.getBrands();
            expect(brands.length).toBe(7);
        });

        test('supports full Product CRUD offline', () => {
            const newProduct = offlineStore.addProduct({
                name: 'Organic Blueberries',
                price: 5.99,
                idCategory: 7,
                idBrand: 1,
                detail: 'Fresh sweet blueberries',
                image: '["thumb-raspberry.png"]'
            });

            expect(newProduct.id).toBeDefined();
            expect(offlineStore.getProductById(newProduct.id).name).toBe('Organic Blueberries');

            offlineStore.updateProduct(newProduct.id, { price: 6.49 });
            expect(offlineStore.getProductById(newProduct.id).price).toBe(6.49);

            offlineStore.deleteProduct(newProduct.id);
            expect(offlineStore.getProductById(newProduct.id)).toBeNull();
        });

        test('supports user authentication with seed credentials', () => {
            const admin = offlineStore.authenticate('admin@foodmart.com', 'admin');
            expect(admin).not.toBeNull();
            expect(admin.level).toBe(1);

            const seller = offlineStore.authenticate('seller@foodmart.com', 'seller');
            expect(seller).not.toBeNull();
            expect(seller.level).toBe(2);

            const wrong = offlineStore.authenticate('admin@foodmart.com', 'wrongpassword');
            expect(wrong).toBeNull();
        });

        test('supports creating orders with calculated totals and details', () => {
            const order = offlineStore.createOrder({
                name: 'Test Buyer',
                email: 'test@example.com',
                phone: '0912345678',
                address: '123 Test St',
                total: 25.5,
                orderDetails: [
                    { productId: 1, quantity: 2 }
                ]
            });

            expect(order.id).toBeDefined();
            expect(order.orderDetails[0].product.name).toBe('Cà chua chùm tươi hữu cơ');
            expect(offlineStore.getOrderById(order.id)).not.toBeNull();
        });
    });

    describe('Mock API Handlers', () => {
        test('handles GET product/list and returns 200 response', () => {
            const res = handleMockRequest({ url: 'product/list', method: 'get' });
            expect(res.status).toBe(200);
            expect(Array.isArray(res.data)).toBe(true);
            expect(res.headers['x-served-by']).toBe('foodmart-api-resilience-layer');
        });

        test('handles POST product/cart correctly', () => {
            const res = handleMockRequest({
                url: 'product/cart',
                method: 'post',
                data: { '1': 3 }
            });
            expect(res.status).toBe(200);
            expect(res.data.length).toBe(1);
            expect(res.data[0].id).toBe(1);
            expect(res.data[0].quantity).toBe(3);
        });

        test('handles PayOS payment request fallback', () => {
            const res = handleMockRequest({
                url: 'https://api-merchant.payos.vn/v2/payment-requests',
                method: 'post',
                data: { orderCode: 9999 }
            });
            expect(res.status).toBe(200);
            expect(res.data.data.checkoutUrl).toBe('/thank-you?status=PAID');
        });
    });

    describe('Error Boundary', () => {
        test('catches child render error and renders protective UI instead of crashing', () => {
            const ProblemChild = () => {
                throw new Error('Test render crash');
            };

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            render(
                <ErrorBoundary>
                    <ProblemChild />
                </ErrorBoundary>
            );

            expect(screen.getByText(/Chế độ Ổn định Ngoại tuyến/i)).toBeInTheDocument();
            expect(screen.getByText(/Tải lại trang/i)).toBeInTheDocument();

            consoleSpy.mockRestore();
        });
    });
});
