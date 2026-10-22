import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductImageSrc, getProductName, getProductPriceLabel, fallbackImage } from '../utils/productUtils';
import { sanitizeQuantity } from '../utils/cartUtils';

function ProductItem({ item, isWishlist, onWishlistToggle, onAddToCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleMinus = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const handlePlus = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setQuantity(prev => Math.min(99, prev + 1));
    };

    const handleQuantityChange = (e) => {
        const val = e.target.value;
        if (val === '') {
            setQuantity('');
            return;
        }
        setQuantity(sanitizeQuantity(val, 1));
    };

    const handleBlur = () => {
        if (!quantity || quantity < 1) {
            setQuantity(1);
        }
    };

    const handleAddToCartClick = (e) => {
        e.preventDefault();
        const safeQty = sanitizeQuantity(quantity, 1);
        if (onAddToCart) {
            onAddToCart(item.id, safeQty);
        }
    };

    return (
        <div className="product-item" id={item.id}>
            <button
                type="button"
                onClick={(e) => onWishlistToggle && onWishlistToggle(e, item.id)}
                className={`btn-wishlist border-0 bg-transparent ${isWishlist ? 'red-heart' : ''}`}
                aria-label={isWishlist ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích'}
            >
                <svg width={24} height={24}><use xlinkHref="#heart" /></svg>
            </button>
            <figure>
                <Link to={'/product/detail/' + item.id} title={getProductName(item)}>
                    <img
                        alt={getProductName(item)}
                        src={getProductImageSrc(item)}
                        className="tab-image"
                        loading="lazy"
                        onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                    />
                </Link>
            </figure>
            <Link to={'/product/detail/' + item.id} className="text-decoration-none">
                <h3>{getProductName(item)}</h3>
            </Link>
            <span className="qty">Đánh giá</span>
            <span className="rating ms-1">
                <svg width={20} height={20} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5
            </span>
            <span className="price d-block mt-1">{getProductPriceLabel(item)}</span>
            
            <div className="d-flex align-items-center justify-content-between mt-3 gap-2">
                <div className="input-group product-qty" style={{ maxWidth: '105px' }}>
                    <span className="input-group-btn">
                        <button
                            type="button"
                            className="quantity-left-minus btn btn-danger btn-number d-flex align-items-center justify-content-center"
                            onClick={handleMinus}
                            aria-label="Giảm số lượng"
                            style={{ width: '30px', height: '36px', padding: 0 }}
                        >
                            <svg width={14} height={14}><use xlinkHref="#minus" /></svg>
                        </button>
                    </span>
                    <input
                        type="text"
                        name="quantity"
                        className="form-control input-number quantity text-center px-1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        onBlur={handleBlur}
                        aria-label="Số lượng"
                        style={{ height: '36px', fontWeight: 'bold' }}
                    />
                    <span className="input-group-btn">
                        <button
                            type="button"
                            className="quantity-right-plus btn btn-success btn-number d-flex align-items-center justify-content-center"
                            onClick={handlePlus}
                            aria-label="Tăng số lượng"
                            style={{ width: '30px', height: '36px', padding: 0 }}
                        >
                            <svg width={14} height={14}><use xlinkHref="#plus" /></svg>
                        </button>
                    </span>
                </div>

                <button
                    type="button"
                    className="nav-link border-0 bg-transparent d-flex align-items-center gap-1 p-0 text-nowrap"
                    onClick={handleAddToCartClick}
                    title="Thêm vào giỏ hàng"
                >
                    <span className="small">Thêm vào giỏ</span>
                    <svg width={18} height={18}><use xlinkHref="#cart" /></svg>
                </button>
            </div>
        </div>
    );
}

export default ProductItem;
