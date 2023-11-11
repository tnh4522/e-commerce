
import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import backgroundImageAd1 from '../../images/ad-image-1.png';
import backgroundImageAd2 from '../../images/ad-image-2.png';
import { Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
function Banner() {
    return (
        <section className="py-3" style={{ backgroundImage: `url(${backgroundPattern})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="banner-blocks">
                            <div className="banner-ad large bg-info block-1">
                                <div className="swiper main-swiper">
                                    <Swiper
                                        modules={[Pagination, Autoplay, Mousewheel]}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        loop={true}
                                        mousewheel={true}
                                        centeredSlides={true}
                                        autoplay={{
                                          delay: 2000,
                                          disableOnInteraction: false,
                                        }}
                                        pagination={{ clickable: true }}
                                        className="swiper-wrapper"
                                    >
                                        <SwiperSlide>
                                            <div className="swiper-slide">
                                                <div className="row banner-content p-5">
                                                    <div className="content-wrapper col-md-7">
                                                        <div className="categories my-3">100% natural</div>
                                                        <h3 className="display-4">Fresh Smoothie &amp; Summer Juice</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.</p>
                                                        <Link to="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1 px-4 py-3 mt-3">Shop Now</Link>
                                                    </div>
                                                    <div className="img-wrapper col-md-5">
                                                        <img src={require('../../images/product-thumb-1.png')} alt="Product Thumbnail" className="img-fluid" />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="swiper-slide">
                                                <div className="row banner-content p-5">
                                                    <div className="content-wrapper col-md-7">
                                                        <div className="categories mb-3 pb-3">100% natural</div>
                                                        <h3 className="banner-title">Fresh Smoothie &amp; Summer Juice</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.</p>
                                                        <Link to="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">Shop Collection</Link>
                                                    </div>
                                                    <div className="img-wrapper col-md-5">
                                                        <img src={require('../../images/product-thumb-1.png')} alt="Product Thumbnail" className="img-fluid" />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="swiper-slide">
                                                <div className="row banner-content p-5">
                                                    <div className="content-wrapper col-md-7">
                                                        <div className="categories mb-3 pb-3">100% natural</div>
                                                        <h3 className="banner-title">Heinz Tomato Ketchup</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim massa diam elementum.</p>
                                                        <Link to="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1">Shop Collection</Link>
                                                    </div>
                                                    <div className="img-wrapper col-md-5">
                                                        <img src={require('../../images/product-thumb-2.png')} alt="Product Thumbnail" className="img-fluid" />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                    <div className="swiper-pagination" />
                                </div>
                            </div>
                            <div className="banner-ad bg-success-subtle block-2" style={{ background: `url(${backgroundImageAd1}) no-repeat`, backgroundPosition: 'right bottom' }}>
                                <div className="row banner-content p-5">
                                    <div className="content-wrapper col-md-7">
                                        <div className="categories sale mb-3 pb-3">20% off</div>
                                        <h3 className="banner-title">Fruits &amp; Vegetables</h3>
                                        <Link to="#" className="d-flex align-items-center nav-link">Shop Collection <svg width={24} height={24}><use xlinkHref="#arrow-right" /></svg></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="banner-ad bg-danger block-3" style={{ background: `url(${backgroundImageAd2}) no-repeat`, backgroundPosition: 'right bottom' }}>
                                <div className="row banner-content p-5">
                                    <div className="content-wrapper col-md-7">
                                        <div className="categories sale mb-3 pb-3">15% off</div>
                                        <h3 className="item-title">Baked Products</h3>
                                        <Link to="#" className="d-flex align-items-center nav-link">Shop Collection <svg width={24} height={24}><use xlinkHref="#arrow-right" /></svg></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Banner;