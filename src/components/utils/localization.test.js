import { formatCurrency, sanitizePrice } from './cartUtils';
import { getProductName, getCategoryName, getProductPrice } from './productUtils';
import offlineStore from '../../services/resilience/offlineStore';

describe('Localization & Vietnamese Data Tests', () => {
    describe('formatCurrency', () => {
        test('formats VND currency with correct symbol and grouping', () => {
            const formatted = formatCurrency(50000);
            expect(formatted).toContain('50.000');
            expect(formatted).toContain('₫');
        });

        test('auto-scales legacy USD seed numbers (< 1000) to VND', () => {
            // $5.20 seed price should scale to 52,000 VND
            const formatted = formatCurrency(5.2);
            expect(formatted).toContain('52.000');
            expect(formatted).toContain('₫');
        });

        test('handles 0 and invalid numbers gracefully', () => {
            const formattedZero = formatCurrency(0);
            expect(formattedZero).toContain('0');
            expect(formattedZero).toContain('₫');

            const formattedNull = formatCurrency(null);
            expect(formattedNull).toContain('0');
        });
    });

    describe('getProductName translation', () => {
        test('translates legacy English product names to Vietnamese', () => {
            expect(getProductName({ name: 'Sunstar 100% Fresh Orange Juice' }))
                .toBe('Nước cam tươi nguyên chất 100% Sunstar');
            expect(getProductName({ name: 'Fresh Melon Juice' }))
                .toBe('Nước ép dưa lưới tươi mát');
            expect(getProductName({ name: 'Fresh Tomatoes' }))
                .toBe('Cà chua chùm tươi hữu cơ Đà Lạt');
            expect(getProductName({ name: 'Fresh Cucumber' }))
                .toBe('Dưa leo baby hữu cơ giòn ngọt');
            expect(getProductName({ name: 'Love Corn Sea Salt' }))
                .toBe('Bắp nướng muối biển Love Corn');
            expect(getProductName({ name: 'Heinz Tomato Ketchup' }))
                .toBe('Sốt tương cà Heinz Classic');
        });

        test('preserves already Vietnamese product names', () => {
            const viName = 'Cà chua chùm tươi hữu cơ';
            expect(getProductName({ name: viName })).toBe(viName);
        });

        test('falls back gracefully on empty or missing name', () => {
            expect(getProductName(null)).toBe('Sản phẩm tươi sạch');
            expect(getProductName({})).toBe('Sản phẩm tươi sạch');
        });
    });

    describe('getCategoryName translation', () => {
        test('translates legacy English category names to Vietnamese', () => {
            expect(getCategoryName('Fruits & Vegetables')).toBe('Rau củ & Trái cây tươi');
            expect(getCategoryName('Vegetables')).toBe('Rau củ hữu cơ');
            expect(getCategoryName('Beverages')).toBe('Nước ép & Đồ uống');
            expect(getCategoryName('Bakery')).toBe('Bánh mì & Ngũ cốc tươi');
            expect(getCategoryName('Meat & Seafood')).toBe('Thịt & Hải sản tươi sống');
            expect(getCategoryName('Canned Food')).toBe('Đồ hộp & Gia vị hữu cơ');
            expect(getCategoryName('Sweets & Snacks')).toBe('Đồ ngọt & Mật ong tự nhiên');
        });

        test('accepts category objects', () => {
            expect(getCategoryName({ category: 'Fruits & Vegetables' })).toBe('Rau củ & Trái cây tươi');
        });

        test('falls back gracefully on empty category', () => {
            expect(getCategoryName('')).toBe('Rau củ hữu cơ');
            expect(getCategoryName(null)).toBe('Rau củ hữu cơ');
        });
    });

    describe('OfflineStore auto-migration', () => {
        test('initializes and returns products with Vietnamese names', () => {
            const products = offlineStore.getProducts();
            expect(products.length).toBeGreaterThan(0);
            products.forEach(p => {
                expect(p.name).not.toContain('Orange Juice');
                expect(p.name).not.toContain('Fresh Melon');
            });
        });

        test('initializes and returns categories with Vietnamese names', () => {
            const categories = offlineStore.getCategories();
            expect(categories.length).toBeGreaterThan(0);
            categories.forEach(c => {
                expect(c.category).not.toBe('Vegetables');
                expect(c.category).not.toBe('Fruits & Vegetables');
            });
        });
    });
});
