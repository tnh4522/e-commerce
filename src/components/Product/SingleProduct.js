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
import axios from "axios";
import Modal from "../Modal/Modal";
import style from './style.module.css';
function SingleProduct() {
    let productID = useParams().id;
    const [getProduct, setProduct] = useState('');
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [getCategories, setCategories] = useState([]);
    const [getBrands, setBrands] = useState([]);
    const [getQuantity, setQuantity] = useState(1);
    const navigater = useNavigate();
    function handleChange(event) {
        let value = parseInt(event.target.value);
        if (isNaN(value) || value < 1) {
            value = 1;
        }
        setQuantity(value);
    };
    function handleBuyNowClick() {
        const productID = getProduct.id;
        var cartData = {
            id: productID,
            quantity: parseInt(getQuantity)
        }
        var cart = {};
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        if (!cart[productID]) {
            cart[productID] = cartData;
        } else {
            cart[productID].quantity += parseInt(getQuantity);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotalItem();
        setModalMessage('Add to cart successfully!');
        setShowModal(true);

        navigater('/cart');
    }
    useEffect(() => {
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/product/detail/' + productID)
            .then(res => {
                setProduct(res.data);
            })
            .catch(error => console.log(error));
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/category')
            .then(res => {
                setCategories(res.data);
            })
            .catch(error => { console.log(error) });
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/brand')
            .then(res => {
                setBrands(res.data);
            })
            .catch(error => { console.log(error) })
    }, [productID]);
    function renderProduct() {
        if (getProduct) {
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
                                    loop = {true}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className={style.mySwiper2}
                                >
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[0])} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[1])} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[2])} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[3])} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[4])} alt="" />
                                    </SwiperSlide>
                                </Swiper>
                                <Swiper
                                    // onSwiper={setThumbsSwiper}
                                    loop = {true}
                                    watchSlidesProgress={true}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className={style.mySwiper}
                                >
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[0])} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[1])} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[2])} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[3])} alt="" />
                                    </SwiperSlide>
                                    <SwiperSlide className={style.swiperSlide}>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[4])} alt="" />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="product-info">
                            <div className="element-header">
                                <h2 itemProp="name" className="display-6">{getProduct.name}</h2>
                                {/* <div className="rating-container d-flex gap-0 align-items-center">
                                    <div className="rating" data-rating={1}>
                                        <svg width={32} height={32} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                    </div>
                                    <div className="rating" data-rating={2}>
                                        <svg width={32} height={32} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                    </div>
                                    <div className="rating" data-rating={3}>
                                        <svg width={32} height={32} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                    </div>
                                    <div className="rating" data-rating={4}>
                                        <svg width={32} height={32} className="text-secondary"><use xlinkHref="#star-solid" /></svg>
                                    </div>
                                    <div className="rating" data-rating={5}>
                                        <svg width={32} height={32} className="text-secondary"><use xlinkHref="#star-solid" /></svg>
                                    </div>
                                    <span className="rating-count">(4.5)</span>
                                </div> */}
                            </div>
                            <div className="product-price pt-3 pb-3">
                                <strong className="text-primary display-6 fw-bold">${getProduct.price}</strong>
                                {/* <del className="ms-2">$940.00</del> */}
                            </div>
                            <p>{getProduct.detail}</p>
                            <div className="cart-wrap py-5">
                                <div className="product-quantity pt-3">
                                    {/* <div className="stock-number text-dark"><em>{getProduct.status === 1 ? 'In stock' : 'Sale'}</em></div> */}
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
    }
    function extractFilenames(inputString) {
        try {
            const inputArray = JSON.parse(inputString);
            const resultArray = [];
            for (let i = 0; i < inputArray.length; i++) {
                const filename = inputArray[i];
                const startIndex = filename.indexOf("_") + 1;
                const newFilename = filename.slice(startIndex);
                resultArray.push(newFilename);
            }
            return resultArray;
        } catch (error) {
            console.error("Invalid input JSON string.");
            return [];
        }
    }
    function addToCart(e) {
        const productID = e.target.value;
        var cartData = {
            id: productID,
            quantity: parseInt(getQuantity)
        }
        var cart = {};
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        if (!cart[productID]) {
            cart[productID] = cartData;
        } else {
            cart[productID].quantity += parseInt(getQuantity);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotalItem();
        setModalMessage('Add to cart successfully!');
        setShowModal(true);
    }
    function upQuantityInput() {
        let value = parseInt(getQuantity);
        if (isNaN(value)) {
            value = 1;
        }
        value++;
        setQuantity(value);
    }
    function downQuantityInput() {
        let value = parseInt(getQuantity);
        if (isNaN(value)) {
            value = 1;
        }
        value--;
        if (value < 1) {
            value = 1;
        }
        setQuantity(value);
    }
    function updateCartTotalItem() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let total = 0;
        if (cart) {
            Object.keys(cart).forEach(function (key) {
                total += cart[key].quantity;
            });
        }
        localStorage.setItem('cartTotalItem', total);
        document.querySelector('.badge').innerHTML = total;
        document.querySelector('.cart-total-item').innerHTML = total;
        updatePriceTotalAll();
    }
    function updatePriceTotalAll() {
        let priceTotal = document.querySelectorAll('.price-total-item-header');
        let priceTotalAll = 0;
        priceTotal.forEach((item, index) => {
            priceTotalAll += parseInt(item.innerHTML);
        })
        if (priceTotalAll > 0) {
            localStorage.setItem('priceTotalAll', priceTotalAll);
        }
    }
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
                        <Link className="breadcrumb-item" to="">Home</Link>
                        <Link className="breadcrumb-item" to="">Pages</Link>
                        <span className="breadcrumb-item active" aria-current="page">Single Product</span>
                    </nav>
                    {renderProduct()}
                </div>
            </section>
            <ProductInfo />
            <RelatedProduct />
        </div>
    )
}
export default SingleProduct;