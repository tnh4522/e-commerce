import { Link, useNavigate, useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import ProductInfo from "./ProductInfo";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Modal from "../Modal/Modal";
import style from './style.module.css';
import { addProductToCart, sanitizeQuantity } from '../utils/cartUtils';
import { getProductDescription, getProductImageList, getProductName, getProductPriceLabel } from '../utils/productUtils';
import dataService from '../../services/dataService';

function SingleProduct() {
    let productID = useParams().id;
    const [getProduct, setProduct] = useState('');
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [getCategories, setCategories] = useState([]);
    const [getBrands, setBrands] = useState([]);
    const [getQuantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigater = useNavigate();

    function handleChange(event) {
        setQuantity(sanitizeQuantity(event.target.value));
    };

    function handleBuyNowClick() {
        if (!getProduct?.id) return;
        addProductToCart(getProduct.id, getQuantity);
        setModalMessage('Add to cart successfully!');
        setShowModal(true);

        navigater('/cart');
    };

    useEffect(() => {
        if (!productID) {
            setLoading(false);
            setError('Product not found.');
            return;
        }
        setLoading(true);
        dataService.getProductDetail(productID)
            .then(data => {
                if (data && data.id) {
                    setProduct(data);
                    setError('');
                } else {
                    setProduct('');
                    setError('Product not found.');
                }
            })
            .catch(() => {
                setProduct('');
                setError('Product not found.');
            })
            .finally(() => setLoading(false));
        dataService.getCategories()
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(() => setCategories([]));
        dataService.getBrands()
            .then(data => setBrands(Array.isArray(data) ? data : []))
            .catch(() => setBrands([]));
    }, [productID]);

    function renderProduct() {
        if (getProduct) {
            const productImages = getProductImageList(getProduct);
            return (
                <div className="row g-5">
                    <div className="col-lg-7">
                        <div className="row flex-column-reverse flex-lg-row">
                            <div className="col-md-12 col-lg-10">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#f7a422',
                                        '--swiper-pagination-color': '#f7a422',
                                    }}
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className={style.mySwiper2}
                                >
                                    {productImages.map((imageSrc, index) => (
                                        <SwiperSlide className={style.swiperSlide} key={index}>
                                            <img src={imageSrc} alt={getProductName(getProduct)} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    watchSlidesProgress={true}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className={style.mySwiper}
                                >
                                    {productImages.map((imageSrc, index) => (
                                        <SwiperSlide className={style.swiperSlide} key={index}>
                                            <img src={imageSrc} alt={getProductName(getProduct)} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="product-info">
                            <div className="element-header">
                                <h2 itemProp="name" className="display-6">{getProductName(getProduct)}</h2>
                            </div>
                            <div className="product-price pt-3 pb-3">
                                <strong className="text-primary display-6 fw-bold">{getProductPriceLabel(getProduct)}</strong>
                            </div>
                            <p>{getProductDescription(getProduct)}</p>
                            <div className="cart-wrap py-5">
                                <div className="product-quantity pt-3">
                                    <div className="stock-button-wrap">
                                        <div className="input-group product-qty" style={{ maxWidth: '150px' }}>
                                            <span className="input-group-btn">
                                                <button type="button" onClick={downQuantityInput} className="quantity-left-minus btn btn-light btn-number" data-type="minus" data-field>
                                                    <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                                </button>
                                            </span>
                                            <input type="text" id="quantity" name="quantity" className="form-control input-number text-center" value={getQuantity} onChange={handleChange} min={1} max={100} />
                                            <span className="input-group-btn">
                                                <button type="button" onClick={upQuantityInput} className="quantity-right-plus btn btn-light btn-number" data-type="plus" data-field>
                                                    <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                                </button>
                                            </span>
                                        </div>
                                        <div className="qty-button d-flex flex-wrap pt-3">
                                            <button type="submit" onClick={handleBuyNowClick} className="btn btn-primary py-3 px-4 text-uppercase me-3 mt-3">Buy now</button>
                                            <button type="submit" name="add-to-cart" value={getProduct.id} className="btn btn-dark py-3 px-4 text-uppercase mt-3" onClick={addToCart}>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="meta-product py-2">
                                <div className="meta-item d-flex align-items-baseline">
                                    <h6 className="item-title no-margin pe-2">ID:</h6>
                                    <ul className="select-list list-unstyled d-flex">
                                        <li data-value="S" className="select-item">{getProduct.id}</li>
                                    </ul>
                                </div>
                                <div className="meta-item d-flex align-items-baseline">
                                    <h6 className="item-title no-margin pe-2">Category:</h6>
                                    <ul className="select-list list-unstyled d-flex">
                                        {getCategories.map((item, index) => {
                                            if (item.id === getProduct.idCategory) {
                                                return <li data-value="S" className="select-item" key={index}><Link to={"/shop-category/" + item.id}>{item.category}</Link></li>
                                            }
                                            return '';
                                        })}
                                    </ul>
                                </div>
                                <div className="meta-item d-flex align-items-baseline">
                                    <h6 className="item-title no-margin pe-2">Brand:</h6>
                                    <ul className="select-list list-unstyled d-flex">
                                        {getBrands.map((item, index) => {
                                            if (item.id === getProduct.idBrand) {
                                                return <li data-value="S" className="select-item" key={index}><Link to=''>{item.brand}</Link></li>
                                            }
                                            return '';
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    };

    function addToCart(e) {
        const productID = e.currentTarget.value;
        if (!productID) return;
        addProductToCart(productID, getQuantity);
        setModalMessage('Add to cart successfully!');
        setShowModal(true);
    };

    function upQuantityInput() {
        setQuantity(sanitizeQuantity(getQuantity) + 1);
    };

    function downQuantityInput() {
        setQuantity(Math.max(1, sanitizeQuantity(getQuantity) - 1));
    };

    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 1200);

            return () => clearTimeout(timer);
        }
    }, [showModal]);

    return (
        <div>
            {showModal && <div className="modal-backdrop fade show"></div>}
            <Modal show={showModal} message={modalMessage} />
            <section id="selling-product" className="single-product mt-0 mt-md-5">
                <div className="container-fluid">
                    <nav className="breadcrumb">
                        <Link className="breadcrumb-item" to="/">Home</Link>
                        <Link className="breadcrumb-item" to="/shop">Shop</Link>
                        <span className="breadcrumb-item active" aria-current="page">Single Product</span>
                    </nav>
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading product...</span>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="empty-state text-center py-5">
                            <h3>{error}</h3>
                            <p className="text-muted">The product may have been removed or the link is incorrect.</p>
                            <Link to="/shop" className="btn btn-primary">Back to shop</Link>
                        </div>
                    ) : renderProduct()}
                </div>
            </section>
            {!error && <ProductInfo />}
            {!error && <RelatedProduct />}
        </div>
    )
}
export default SingleProduct;
