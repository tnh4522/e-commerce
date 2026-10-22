import fallbackImage from '../../images/basket.png';
import { extractFilenames, formatCurrency, sanitizePrice } from './cartUtils';

const imageContext = process.env.NODE_ENV === 'test'
    ? null
    : require.context('../../images', false, /\.(png|jpe?g|gif|webp|svg)$/);

const PRODUCT_TRANSLATIONS = {
    'sunstar 100% fresh orange juice': 'Nước cam tươi nguyên chất 100% Sunstar',
    'sunstar fresh orange juice': 'Nước cam tươi ép Sunstar',
    'fresh orange juice': 'Nước cam tươi ép nguyên chất 100%',
    'sunstar fresh melon juice': 'Nước ép dưa lưới tươi Sunstar',
    'fresh melon juice': 'Nước ép dưa lưới tươi mát',
    'fresh tomatoes': 'Cà chua chùm tươi hữu cơ Đà Lạt',
    'organic tomatoes': 'Cà chua đỏ hữu cơ mọng nước',
    'fresh cucumber': 'Dưa leo baby hữu cơ giòn ngọt',
    'organic cucumber': 'Dưa leo baby hữu cơ',
    'fresh herb': 'Hương thảo & Thảo mộc tươi sạch',
    'heinz tomato ketchup': 'Sốt tương cà Heinz Classic',
    'heinz ketchup': 'Sốt tương cà Heinz trứ danh',
    'biscuits': 'Bánh quy bơ giòn xốp nướng vàng',
    'crunchy biscuits': 'Bánh quy bơ giòn xốp thơm lừng',
    'love corn sea salt': 'Bắp nướng muối biển Love Corn',
    'love corn smoked bbq': 'Bắp sấy giòn vị BBQ Love Corn',
    'love corn bbq': 'Bắp sấy giòn vị BBQ Love Corn',
    'crunchy cereals': 'Bánh ngũ cốc nướng giòn lúa mạch',
    'tropical smoothie': 'Sinh tố trái cây nhiệt đới mùa hè',
    'fresh milk': 'Sữa tươi tiệt trùng nguyên kem 100%',
    'whole milk': 'Sữa tươi tiệt trùng nguyên kem 100%',
    'almond milk': 'Sữa hạt hạnh nhân hữu cơ',
    'canned tuna': 'Cá ngừ đại dương ngâm dầu ô liu',
    'tuna in olive oil': 'Cá ngừ đại dương ngâm dầu ô liu',
    'white tuna fillet': 'Phi lê cá ngừ trắng cao cấp',
    'pure honey': 'Mật ong hoa rừng nguyên chất',
    'amber jar pure honey': 'Mật ong hoa tự nhiên Amber Jar',
    'amber jar wild honey': 'Mật ong hoa dại cao cấp Amber Jar',
    'amber jar honeycomb': 'Bánh tổ ong nguyên sáp Amber Jar',
    'potato chips': 'Khoai tây sấy giòn lát mỏng',
    'fresh bananas': 'Chuối già Nam Mỹ chín tự nhiên',
    'fresh raspberries': 'Mâm xôi đỏ tươi Đà Lạt',
    'fresh avocado': 'Bơ sáp Hass hữu cơ Đà Lạt',
    'green grapes': 'Nho xanh không hạt hữu cơ',
    'red apples': 'Táo đỏ Envy nhập khẩu tươi giòn'
};

const CATEGORY_TRANSLATIONS = {
    'fruits & vegetables': 'Rau củ & Trái cây tươi',
    'fruits and vegetables': 'Rau củ & Trái cây tươi',
    'vegetables': 'Rau củ hữu cơ',
    'fruits': 'Trái cây tươi',
    'beverages': 'Nước ép & Đồ uống',
    'juices': 'Nước ép trái cây',
    'dairy & eggs': 'Bơ sữa & Trứng gà',
    'dairy': 'Đồ uống & Sữa tươi',
    'bakery': 'Bánh mì & Ngũ cốc tươi',
    'bread': 'Bánh mì tươi',
    'meat & seafood': 'Thịt & Hải sản tươi sống',
    'canned food': 'Đồ hộp & Gia vị hữu cơ',
    'sweets & snacks': 'Đồ ngọt & Mật ong tự nhiên',
    'sweets': 'Đồ ngọt & Mật ong',
    'snacks': 'Đồ ăn vặt dinh dưỡng',
    'breakfast': 'Thực phẩm ăn sáng dinh dưỡng',
    'organic': 'Nông sản hữu cơ'
};

export function getProductImageSrc(productOrImage) {
    const imageValue = typeof productOrImage === 'string' ? productOrImage : productOrImage?.image;
    const filenames = extractFilenames(imageValue);

    for (const filename of filenames) {
        try {
            if (imageContext) return imageContext(`./${filename}`);
        } catch {
            // Try the next filename before falling back.
        }
    }

    return fallbackImage;
}

export function getProductImageList(productOrImage) {
    const imageValue = typeof productOrImage === 'string' ? productOrImage : productOrImage?.image;
    const filenames = extractFilenames(imageValue);
    const images = filenames.reduce((list, filename) => {
        try {
            if (imageContext) list.push(imageContext(`./${filename}`));
        } catch {
            // Ignore broken image names from API data.
        }
        return list;
    }, []);

    return images.length > 0 ? images : [fallbackImage];
}

export function getProductName(product) {
    if (!product) return 'Sản phẩm tươi sạch';
    const rawName = String(product.name || '').trim();
    if (!rawName) return 'Sản phẩm tươi sạch';

    const lower = rawName.toLowerCase();
    
    // Exact mapping check
    if (PRODUCT_TRANSLATIONS[lower]) {
        return PRODUCT_TRANSLATIONS[lower];
    }

    // Substring dictionary match
    for (const [enKey, viVal] of Object.entries(PRODUCT_TRANSLATIONS)) {
        if (lower.includes(enKey) || enKey.includes(lower)) {
            return viVal;
        }
    }

    // Heuristic fallbacks for common food keywords in case of external English data
    if (lower.includes('orange juice')) return 'Nước cam tươi nguyên chất 100% Sunstar';
    if (lower.includes('melon juice')) return 'Nước ép dưa lưới tươi Sunstar';
    if (lower.includes('tomato')) return 'Cà chua chùm tươi hữu cơ';
    if (lower.includes('cucumber')) return 'Dưa leo baby hữu cơ';
    if (lower.includes('herb')) return 'Hương thảo & Thảo mộc tươi';
    if (lower.includes('ketchup')) return 'Sốt tương cà Heinz Classic';
    if (lower.includes('corn')) return 'Bắp nướng muối biển Love Corn';
    if (lower.includes('biscuit') || lower.includes('cookie')) return 'Bánh quy bơ giòn xốp';
    if (lower.includes('cereal')) return 'Bánh ngũ cốc nướng giòn';
    if (lower.includes('smoothie')) return 'Sinh tố trái cây nhiệt đới';
    if (lower.includes('milk')) return 'Sữa tươi tiệt trùng nguyên kem 100%';
    if (lower.includes('tuna')) return 'Cá ngừ đại dương ngâm dầu ô liu';
    if (lower.includes('honey')) return 'Mật ong hoa rừng nguyên chất';
    if (lower.includes('chip') || lower.includes('potato')) return 'Khoai tây sấy giòn lát mỏng';
    if (lower.includes('banana')) return 'Chuối già Nam Mỹ chín tự nhiên';
    if (lower.includes('raspberry') || lower.includes('raspberries')) return 'Mâm xôi đỏ tươi Đà Lạt';
    if (lower.includes('avocado')) return 'Bơ sáp Hass hữu cơ Đà Lạt';

    return rawName;
}

export function getCategoryName(categoryOrName) {
    if (!categoryOrName) return 'Rau củ hữu cơ';
    const raw = typeof categoryOrName === 'string' ? categoryOrName : categoryOrName?.category || '';
    if (!raw) return 'Rau củ hữu cơ';

    const lower = raw.toLowerCase().trim();
    if (CATEGORY_TRANSLATIONS[lower]) {
        return CATEGORY_TRANSLATIONS[lower];
    }

    for (const [enKey, viVal] of Object.entries(CATEGORY_TRANSLATIONS)) {
        if (lower.includes(enKey) || enKey.includes(lower)) {
            return viVal;
        }
    }

    return raw;
}

export function getProductPrice(product) {
    return sanitizePrice(product?.price);
}

export function getProductPriceLabel(product) {
    return formatCurrency(getProductPrice(product));
}

export function getProductDescription(product) {
    return product?.detail || product?.description || 'Nông sản và thực phẩm tươi sạch đạt tiêu chuẩn an toàn, được thu hoạch và bảo quản cẩn thận để giữ trọn vẹn hương vị tự nhiên.';
}

export { fallbackImage };
