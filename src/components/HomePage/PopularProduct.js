import { Link } from "react-router-dom";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
function PopularProduct() {
    return (
        <section className="py-5 overflow-hidden">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex justify-content-between">
                            <h2 className="section-title">Most popular products</h2>
                            <div className="d-flex align-items-center">
                                <Link to="#" className="btn-link text-decoration-none">View All Categories →</Link>
                                <div className="swiper-buttons">
                                    <button className="swiper-prev popular-products-carousel-prev btn btn-primary">❮</button>
                                    <button className="swiper-next popular-products-carousel-next btn btn-primary">❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="products-carousel swiper">
                            <div className="swiper-wrapper">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={10}
                                    breakpoints={{ 1402: { slidesPerView: 5 }, 1342: { slidesPerView: 4 }, 1080: { slidesPerView: 3 }, 780: { slidesPerView: 2 }, 576: { slidesPerView: 1 }, 0: { slidesPerView: 1 } }}
                                    navigation={{
                                        nextEl: '.popular-products-carousel-next',
                                        prevEl: '.popular-products-carousel-prev',
                                    }}
                                    loop={true}
                                    className="swiper-wrapper"
                                >
                                    <SwiperSlide>
                                        <div className="product-item swiper-slide">
                                            <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                            <figure>
                                                <Link to="single-product.html" title="Product Title">
                                                    <img src={require('../../images/thumb-tomatoes.png')} alt="Product Thumbnail" className="tab-image" />
                                                </Link>
                                            </figure>
                                            <h3>Sunstar Fresh Melon Juice</h3>
                                            <span className="qty">1 Unit</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                                            <span className="price">$18.00</span>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="input-group product-qty">
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                                            <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                                        </button>
                                                    </span>
                                                    <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                                            <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                                        </button>
                                                    </span>
                                                </div>
                                                <Link to="#" className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="product-item swiper-slide">
                                            <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                            <figure>
                                                <Link to="single-product.html" title="Product Title">
                                                    <img src={require('../../images/thumb-tomatoketchup.png')} alt="Product Thumbnail" className="tab-image" />
                                                </Link>
                                            </figure>
                                            <h3>Sunstar Fresh Melon Juice</h3>
                                            <span className="qty">1 Unit</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                                            <span className="price">$18.00</span>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="input-group product-qty">
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                                            <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                                        </button>
                                                    </span>
                                                    <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                                            <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                                        </button>
                                                    </span>
                                                </div>
                                                <Link to="#" className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="product-item swiper-slide">
                                            <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                            <figure>
                                                <Link to="single-product.html" title="Product Title">
                                                    <img src={require('../../images/thumb-bananas.png')} alt="Product Thumbnail" className="tab-image" />
                                                </Link>
                                            </figure>
                                            <h3>Sunstar Fresh Melon Juice</h3>
                                            <span className="qty">1 Unit</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                                            <span className="price">$18.00</span>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="input-group product-qty">
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                                            <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                                        </button>
                                                    </span>
                                                    <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                                            <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                                        </button>
                                                    </span>
                                                </div>
                                                <Link to="#" className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="product-item swiper-slide">
                                            <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                            <figure>
                                                <Link to="single-product.html" title="Product Title">
                                                    <img src={require('../../images/thumb-bananas.png')} alt="Product Thumbnail" className="tab-image" />
                                                </Link>
                                            </figure>
                                            <h3>Sunstar Fresh Melon Juice</h3>
                                            <span className="qty">1 Unit</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                                            <span className="price">$18.00</span>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="input-group product-qty">
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                                            <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                                        </button>
                                                    </span>
                                                    <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                                            <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                                        </button>
                                                    </span>
                                                </div>
                                                <Link to="#" className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="product-item swiper-slide">
                                            <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                            <figure>
                                                <Link to="single-product.html" title="Product Title">
                                                    <img src={require('../../images/thumb-tomatoes.png')} alt="Product Thumbnail" className="tab-image" />
                                                </Link>
                                            </figure>
                                            <h3>Sunstar Fresh Melon Juice</h3>
                                            <span className="qty">1 Unit</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                                            <span className="price">$18.00</span>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="input-group product-qty">
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                                            <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                                        </button>
                                                    </span>
                                                    <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                                            <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                                        </button>
                                                    </span>
                                                </div>
                                                <Link to="#" className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="product-item swiper-slide">
                                            <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                            <figure>
                                                <Link to="single-product.html" title="Product Title">
                                                    <img src={require('../../images/thumb-tomatoketchup.png')} alt="Product Thumbnail" className="tab-image" />
                                                </Link>
                                            </figure>
                                            <h3>Sunstar Fresh Melon Juice</h3>
                                            <span className="qty">1 Unit</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                                            <span className="price">$18.00</span>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="input-group product-qty">
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                                            <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                                        </button>
                                                    </span>
                                                    <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                                            <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                                        </button>
                                                    </span>
                                                </div>
                                                <Link to="#" className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="product-item swiper-slide">
                                            <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                            <figure>
                                                <Link to="single-product.html" title="Product Title">
                                                    <img src={require('../../images/thumb-bananas.png')} alt="Product Thumbnail" className="tab-image" />
                                                </Link>
                                            </figure>
                                            <h3>Sunstar Fresh Melon Juice</h3>
                                            <span className="qty">1 Unit</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                                            <span className="price">$18.00</span>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="input-group product-qty">
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                                            <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                                        </button>
                                                    </span>
                                                    <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                                            <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                                        </button>
                                                    </span>
                                                </div>
                                                <Link to="#" className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="product-item swiper-slide">
                                            <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                            <figure>
                                                <Link to="single-product.html" title="Product Title">
                                                    <img src={require('../../images/thumb-bananas.png')} alt="Product Thumbnail" className="tab-image" />
                                                </Link>
                                            </figure>
                                            <h3>Sunstar Fresh Melon Juice</h3>
                                            <span className="qty">1 Unit</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                                            <span className="price">$18.00</span>
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="input-group product-qty">
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus">
                                                            <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                                        </button>
                                                    </span>
                                                    <input type="text" name="quantity" className="form-control input-number quantity" defaultValue={1} />
                                                    <span className="input-group-btn">
                                                        <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus">
                                                            <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                                        </button>
                                                    </span>
                                                </div>
                                                <Link to="#" className="nav-link">Add to Cart <svg width={18} height={18}><use xlinkHref="#cart" /></svg></Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default PopularProduct;