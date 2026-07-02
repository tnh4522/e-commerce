import fallbackImage from '../../images/basket.png';

const imageContext = process.env.NODE_ENV === 'test'
    ? null
    : require.context('../../images', false, /\.(png|jpe?g|gif|webp|svg)$/);

export function getImageSrc(imageName, fallback = fallbackImage) {
    if (!imageName) return fallback;

    const filename = String(imageName).split(/[\\/]/).pop();
    if (!filename) return fallback;

    try {
        if (imageContext) return imageContext(`./${filename}`);
    } catch {
        // Broken image names from API/fallback data should not break rendering.
    }

    return fallback;
}

export { fallbackImage };
