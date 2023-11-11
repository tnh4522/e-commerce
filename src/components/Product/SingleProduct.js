import { Link, useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import ProductInfo from "./ProductInfo";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import API from "../API/API";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import axios from "axios";
function SingleProduct() {
    let productID = useParams().id;
    const [getProduct, setProduct] = useState({});
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [getQuantity, setQuantity] = useState(1);
    function handleChange(event) {
        let value = parseInt(event.target.value);
        if(isNaN(value) || value < 1) {
            value = 1;
        }
        setQuantity(value);
    }
    useEffect(() => {
        axios.get('http://localhost:8080/api/product/detail/' + productID)
            .then(res => {
                setProduct(res.data);
            })
            .catch(error => console.log(error));
    }, [productID]);
    function renderProduct() {
        if (Object.keys(getProduct).length > 0) {
            return (
                <div className="row g-5">
                    <div className="col-lg-7">
                        <div className="row flex-column-reverse flex-lg-row">
                            <div className="col-md-12 col-lg-10">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#fff',
                                        '--swiper-pagination-color': '#fff',
                                    }}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[Thumbs, FreeMode, Navigation]}
                                    className="product-large-slider"
                                >
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[0])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[1])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[2])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[3])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[4])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                </Swiper>
                                <Swiper
                                    onSwiper={thumbsSwiper && setThumbsSwiper}
                                    watchSlidesProgress={true}
                                    spaceBetween={10}
                                    slidesPerView={5}
                                    freeMode={true}
                                    modules={[Thumbs, FreeMode, Navigation]}
                                    className="product-thumbnail-slider"
                                >
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[0])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[1])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[2])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[3])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={require('../../images/' + extractFilenames(getProduct.image)[4])} alt="" className="thumb-image img-fluid" />
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="product-info">
                            <div className="element-header">
                                <h2 itemProp="name" className="display-6">{getProduct.name}</h2>
                                <div className="rating-container d-flex gap-0 align-items-center">
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
                                    <span className="rating-count">(3.5)</span>
                                </div>
                            </div>
                            <div className="product-price pt-3 pb-3">
                                <strong className="text-primary display-6 fw-bold">${getProduct.price}</strong><del className="ms-2">$940.00</del>
                            </div>
                            <p>{getProduct.detail}</p>
                            <div className="cart-wrap py-5">
                                <div className="color-options product-select">
                                    <div className="color-toggle" data-option-index={0}>
                                        <h6 className="item-title text-uppercase text-dark">Color:</h6>
                                        <ul className="select-list list-unstyled d-flex">
                                            <li className="select-item pe-3" data-val="Green" title="Green">
                                                <Link to="#" className="btn btn-light active">Green</Link>
                                            </li>
                                            <li className="select-item pe-3" data-val="Orange" title="Orange">
                                                <Link to="#" className="btn btn-light">Orange</Link>
                                            </li>
                                            <li className="select-item pe-3" data-val="Red" title="Red">
                                                <Link to="#" className="btn btn-light">Red</Link>
                                            </li>
                                            <li className="select-item" data-val="Black" title="Black">
                                                <Link to="#" className="btn btn-light disabled">Black</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="swatch product-select" data-option-index={1}>
                                    <h6 className="item-title text-uppercase text-dark">Size:</h6>
                                    <ul className="select-list list-unstyled d-flex">
                                        <li data-value="S" className="select-item pe-3">
                                            <Link to="#" className="btn btn-light">XL</Link>
                                        </li>
                                        <li data-value="M" className="select-item pe-3">
                                            <Link to="#" className="btn btn-light">L</Link>
                                        </li>
                                        <li data-value="L" className="select-item pe-3">
                                            <Link to="#" className="btn btn-light">M</Link>
                                        </li>
                                        <li data-value="L" className="select-item">
                                            <Link to="#" className="btn btn-light">S</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="product-quantity pt-3">
                                    <div className="stock-number text-dark"><em>2 in stock</em></div>
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
                                            <button type="submit" className="btn btn-primary py-3 px-4 text-uppercase me-3 mt-3">Buy now</button>
                                            <button type="submit" name="add-to-cart" value={getProduct.id} className="btn btn-dark py-3 px-4 text-uppercase mt-3" onClick={addToCart}>Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="meta-product py-2">
                                <div className="meta-item d-flex align-items-baseline">
                                    <h6 className="item-title no-margin pe-2">SKU:</h6>
                                    <ul className="select-list list-unstyled d-flex">
                                        <li data-value="S" className="select-item">1223</li>
                                    </ul>
                                </div>
                                <div className="meta-item d-flex align-items-baseline">
                                    <h6 className="item-title no-margin pe-2">Category:</h6>
                                    <ul className="select-list list-unstyled d-flex">
                                        <li data-value="S" className="select-item">
                                            <Link to="#">Watch</Link>,
                                        </li>
                                        <li data-value="S" className="select-item">
                                            <Link to="#"> Screen touch</Link>,
                                        </li>
                                    </ul>
                                </div>
                                <div className="meta-item d-flex align-items-baseline">
                                    <h6 className="item-title no-margin pe-2">Tags:</h6>
                                    <ul className="select-list list-unstyled d-flex">
                                        <li data-value="S" className="select-item">
                                            <Link to="#">Classic</Link>,
                                        </li>
                                        <li data-value="S" className="select-item">
                                            <Link to="#"> Modern</Link>
                                        </li>
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
        window.location.reload();
    }
    function upQuantityInput() {
        let value = parseInt(getQuantity);
        if(isNaN(value)) {
            value = 1;
        }
        value++;
        setQuantity(value);
    }
    function downQuantityInput() {
        let value = parseInt(getQuantity);
        if(isNaN(value)) {
            value = 1;
        }
        value--;
        if(value < 1) {
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
        if(priceTotalAll > 0) {
            localStorage.setItem('priceTotalAll', priceTotalAll);
        }
        document.querySelector('.price-total-cart-offcanvas').innerHTML = '$' + priceTotalAll;
        document.querySelector('.cart-total').innerHTML = '$' + priceTotalAll;
    }
    return (
        <div>
            <section id="selling-product" className="single-product mt-0 mt-md-5">
                <div className="container-fluid">
                    <nav className="breadcrumb">
                        <Link className="breadcrumb-item" to="#">Home</Link>
                        <Link className="breadcrumb-item" to="#">Pages</Link>
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