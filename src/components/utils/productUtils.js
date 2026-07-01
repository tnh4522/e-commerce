import fallbackImage from '../../images/basket.png';
import { extractFilenames, formatCurrency, sanitizePrice } from './cartUtils';

const imageContext = process.env.NODE_ENV === 'test'
    ? null
    : require.context('../../images', false, /\.(png|jpe?g|gif|webp|svg)$/);

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
    return product?.name || 'Unnamed product';
}

export function getProductPrice(product) {
    return sanitizePrice(product?.price);
}

export function getProductPriceLabel(product) {
    return formatCurrency(getProductPrice(product));
}

export function getProductDescription(product) {
    return product?.detail || product?.description || 'No product description available yet.';
}
