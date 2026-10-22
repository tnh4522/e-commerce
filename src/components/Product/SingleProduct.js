import { Link, useNavigate, useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import ProductInfo from "./ProductInfo";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Modal from "../Modal/Modal";
import style from './style.module.css';
import { addProductToCart, formatCurrency, sanitizeQuantity } from '../utils/cartUtils';
import { getProductDescription, getProductImageList, getProductName, getProductPrice, getProductPriceLabel, getProductImageSrc, getCategoryName } from '../utils/productUtils';
import dataService from '../../services/dataService';

function SingleProduct() {
    const params = useParams();
    const productID = params.id;
    const [getProduct, setProduct] = useState(null);
    const [mainSwiper, setMainSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [getCategories, setCategories] = useState([]);
    const [getBrands, setBrands] = useState([]);
    const [getQuantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    function handleChange(event) {
        setQuantity(sanitizeQuantity(event.target.value));
    }

    function handleBuyNowClick() {
        if (!getProduct?.id) return;
        addProductToCart(getProduct.id, getQuantity);
        setModalMessage('Đã thêm sản phẩm vào giỏ hàng thành công!');
        setShowModal(true);
        navigate('/cart');
    }

    function addToCart(e) {
        const idToAdd = e?.currentTarget?.value || getProduct?.id;
        if (!idToAdd) return;
        addProductToCart(idToAdd, getQuantity);
        setModalMessage('Đã thêm sản phẩm vào giỏ hàng thành công!');
        setShowModal(true);
    }

    function upQuantityInput() {
        setQuantity(sanitizeQuantity(getQuantity) + 1);
    }

    function downQuantityInput() {
        setQuantity(Math.max(1, sanitizeQuantity(getQuantity) - 1));
    }

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        dataService.getProductDetail(productID)
            .then(data => {
                if (!isMounted) return;
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('[SingleProduct] Error fetching product:', err);
                if (!isMounted) return;
                setLoading(false);
            });

        dataService.getCategories()
            .then(data => {
                if (isMounted) setCategories(Array.isArray(data) ? data : []);
            })
            .catch(() => {
                if (isMounted) setCategories([]);
            });

        dataService.getBrands()
            .then(data => {
                if (isMounted) setBrands(Array.isArray(data) ? data : []);
            })
            .catch(() => {
                if (isMounted) setBrands([]);
            });

        return () => { isMounted = false; };
    }, [productID]);

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [showModal]);

    // Build gallery images: ensure at least 3-4 images for rich interactive view
    function getGalleryImages() {
        if (!getProduct) return [];
        const raw = getProductImageList(getProduct);
        if (raw.length >= 2) return raw;

        // Provide complimentary mock detail angles
        return [
            raw[0],
            getProductImageSrc('product-large-1.jpg'),
            getProductImageSrc('product-large-2.jpg'),
            getProductImageSrc('product-thumb-2.png')
        ];
    }

    function renderProduct() {
        if (!getProduct) return null;

        const galleryImages = getGalleryImages();
        const categoryName = getCategoryName(getCategories.find(c => String(c.id) === String(getProduct.idCategory))?.category || 'Rau củ hữu cơ');
        const brandName = getBrands.find(b => String(b.id) === String(getProduct.idBrand))?.brand || 'FoodMart Organic';

        return (
            <div className="row g-5">
                {/* Product Images Gallery */}
                <div className="col-lg-6">
                    <div className="product-gallery position-sticky" style={{ top: '100px' }}>
                        <div className="border rounded-4 p-3 bg-white shadow-sm mb-3">
                            <Swiper
                                onSwiper={setMainSwiper}
                                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                spaceBetween={10}
                                navigation={true}
                                modules={[Navigation]}
                                className={style.mySwiper2}
                            >
                                {galleryImages.map((imageSrc, index) => (
                                    <SwiperSlide className={style.swiperSlide} key={index}>
                                        <div className="d-flex align-items-center justify-content-center p-3" style={{ height: '400px', width: '100%' }}>
                                            <img
                                                src={imageSrc}
                                                alt={getProductName(getProduct)}
                                                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Thumbnail Bar */}
                        {galleryImages.length > 1 && (
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                                {galleryImages.map((imageSrc, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => {
                                            setActiveIndex(index);
                                            if (mainSwiper) mainSwiper.slideTo(index);
                                        }}
                                        className={`btn p-1 border rounded-3 bg-white ${
                                            activeIndex === index 
                                                ? 'border-warning border-3 shadow-sm' 
                                                : 'border-light-subtle opacity-75'
                                        }`}
                                        style={{ width: '75px', height: '75px' }}
                                        title={`Xem ảnh ${index + 1}`}
                                    >
                                        <img
                                            src={imageSrc}
                                            alt={`thumb-${index}`}
                                            className="w-100 h-100 object-fit-cover rounded-2"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info & Actions */}
                <div className="col-lg-6">
                    <div className="product-info ps-lg-3">
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                            <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">
                                <i className="fa-solid fa-circle-check me-1"></i>
                                Còn {getProduct.stock || 45} sản phẩm
                            </span>
                            <span className="badge bg-light text-dark border px-2 py-1">
                                Mã SP: #{getProduct.id || '101'}
                            </span>
                            <span className="badge bg-warning bg-opacity-25 text-dark border border-warning px-2 py-1">
                                Chuẩn VietGAP / Organic
                            </span>
                        </div>

                        <h1 className="fw-bold text-dark display-6 mb-2">
                            {getProductName(getProduct)}
                        </h1>

                        {/* Rating & Sold count */}
                        <div className="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom">
                            <div className="d-flex align-items-center text-warning">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star-half-stroke"></i>
                                <span className="ms-2 fw-bold text-dark">{getProduct.rating || 4.9}</span>
                            </div>
                            <span className="text-muted small">|</span>
                            <span className="text-muted small">
                                <strong>{getProduct.reviewsCount || 128}</strong> đánh giá
                            </span>
                            <span className="text-muted small">|</span>
                            <span className="text-muted small">
                                <strong>{getProduct.soldCount || 342}</strong> đã bán
                            </span>
                        </div>

                        {/* Price Display */}
                        <div className="product-price bg-light p-3 rounded-3 mb-3 d-flex align-items-baseline gap-3">
                            <span className="text-danger display-6 fw-bold">
                                {getProductPriceLabel(getProduct)}
                            </span>
                            <span className="text-muted text-decoration-line-through fs-5">
                                {formatCurrency(getProductPrice(getProduct) * 1.25)}
                            </span>
                            <span className="badge bg-danger text-white ms-auto">-20%</span>
                        </div>

                        {/* Short Description */}
                        <p className="text-secondary mb-4 line-height-lg">
                            {getProductDescription(getProduct)}
                        </p>

                        {/* Attributes Table */}
                        <div className="card border-0 bg-light rounded-3 p-3 mb-4">
                            <div className="row g-2 small">
                                <div className="col-6">
                                    <span className="text-muted">Quy cách đóng gói:</span>
                                    <div className="fw-semibold text-dark">{getProduct.weight || 'Hộp 500g'}</div>
                                </div>
                                <div className="col-6">
                                    <span className="text-muted">Nguồn gốc xuất xứ:</span>
                                    <div className="fw-semibold text-dark">{getProduct.origin || 'Đà Lạt, Lâm Đồng'}</div>
                                </div>
                                <div className="col-6 mt-2">
                                    <span className="text-muted">Hạn sử dụng:</span>
                                    <div className="fw-semibold text-dark">{getProduct.expiry || '3 - 5 ngày (Mát 4-8°C)'}</div>
                                </div>
                                <div className="col-6 mt-2">
                                    <span className="text-muted">Danh mục:</span>
                                    <div>
                                        <Link to={`/shop-category/${getProduct.idCategory}`} className="fw-semibold text-primary text-decoration-none">
                                            {categoryName}
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-6 mt-2">
                                    <span className="text-muted">Thương hiệu:</span>
                                    <div className="fw-semibold text-dark">
                                        {brandName}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quantity & Buy Now Buttons */}
                        <div className="cart-wrap mb-4">
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <label className="fw-semibold text-dark mb-0">Số lượng:</label>
                                <div className="input-group" style={{ width: '130px' }}>
                                    <button
                                        type="button"
                                        onClick={downQuantityInput}
                                        className="btn btn-outline-secondary btn-sm"
                                        aria-label="Giảm"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm text-center fw-bold"
                                        value={getQuantity}
                                        onChange={handleChange}
                                        min={1}
                                        max={100}
                                    />
                                    <button
                                        type="button"
                                        onClick={upQuantityInput}
                                        className="btn btn-outline-secondary btn-sm"
                                        aria-label="Tăng"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-muted small">
                                    (Tối đa 100 sản phẩm / đơn)
                                </span>
                            </div>

                            <div className="d-flex flex-wrap gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={handleBuyNowClick}
                                    className="btn btn-danger btn-lg px-4 py-3 fw-bold flex-grow-1"
                                >
                                    <i className="fa-solid fa-bolt me-2"></i>
                                    Mua ngay
                                </button>
                                <button
                                    type="button"
                                    onClick={addToCart}
                                    className="btn btn-primary btn-lg px-4 py-3 fw-bold flex-grow-1"
                                >
                                    <i className="fa-solid fa-cart-shopping me-2"></i>
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>

                        {/* Service Guarantees Card */}
                        <div className="border rounded-3 p-3 bg-white shadow-sm">
                            <h6 className="fw-bold text-dark mb-2">
                                <i className="fa-solid fa-shield-halved text-success me-2"></i>
                                Cam Kết Chất Lượng Từ FoodMart
                            </h6>
                            <ul className="list-unstyled mb-0 small text-secondary">
                                <li className="py-1 d-flex align-items-center">
                                    <i className="fa-solid fa-truck-fast text-primary me-2"></i>
                                    <span>Giao hàng hỏa tốc trong 2 giờ tại khu vực nội thành.</span>
                                </li>
                                <li className="py-1 d-flex align-items-center">
                                    <i className="fa-solid fa-leaf text-success me-2"></i>
                                    <span>100% Nông sản tươi sạch hái trong ngày, không tồn dư hóa chất.</span>
                                </li>
                                <li className="py-1 d-flex align-items-center">
                                    <i className="fa-solid fa-rotate-left text-warning me-2"></i>
                                    <span>Đổi trả miễn phí 1 - 1 ngay khi nhận nếu sản phẩm dập úng.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {showModal && <div className="modal-backdrop fade show"></div>}
            <Modal show={showModal} message={modalMessage} />
            <section id="selling-product" className="single-product py-4 py-md-5">
                <div className="container-fluid px-4">
                    <nav className="breadcrumb mb-4">
                        <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                        <Link className="breadcrumb-item nav-link" to="/shop">Cửa hàng</Link>
                        <span className="breadcrumb-item active" aria-current="page">
                            {getProduct ? getProductName(getProduct) : 'Chi tiết sản phẩm'}
                        </span>
                    </nav>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Đang tải thông tin sản phẩm...</span>
                            </div>
                            <p className="text-muted mt-2 small">Đang chuẩn bị dữ liệu sản phẩm...</p>
                        </div>
                    ) : renderProduct()}
                </div>
            </section>

            {getProduct && <ProductInfo product={getProduct} />}
            {getProduct && <RelatedProduct currentId={getProduct.id} categoryId={getProduct.idCategory} />}
        </div>
    );
}

export default SingleProduct;
