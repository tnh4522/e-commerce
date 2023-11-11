import { Link } from "react-router-dom";
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
function NewlyBrands() {
    return (
        <section className="py-5 overflow-hidden">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header d-flex flex-wrap flex-wrap justify-content-between mb-5">
                            <h2 className="section-title">Newly Arrived Brands</h2>
                            <div className="d-flex align-items-center">
                                <Link to="#" className="btn-link text-decoration-none">View All Categories →</Link>
                                <div className="swiper-buttons">
                                    <button className="swiper-prev brand-carousel-prev btn btn-yellow">❮</button>
                                    <button className="swiper-next brand-carousel-next btn btn-yellow">❯</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="brand-carousel swiper">
                            <div className="swiper-wrapper">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={30}
                                    breakpoints={{ 1208: { slidesPerView: 4 }, 915: {slidesPerView: 3}, 576: { slidesPerView: 2 } }}
                                    navigation={{
                                        nextEl: '.brand-carousel-next',
                                        prevEl: '.brand-carousel-prev'
                                    }}
                                    className="swiper-wrapper"
                                >
                                    <SwiperSlide>
                                        <div className="swiper-slide">
                                            <div className="card mb-3 p-3 rounded-4 shadow border-0">
                                                <div className="row g-0">
                                                    <div className="col-md-4">
                                                        <img src={require('../../images/product-thumb-11.jpg')} className="img-fluid rounded" alt="Card title" />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body py-0">
                                                            <p className="text-muted mb-0">Amber Jar</p>
                                                            <h5 className="card-title">Honey best nectar you wish to get</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="swiper-slide">
                                            <div className="card mb-3 p-3 rounded-4 shadow border-0">
                                                <div className="row g-0">
                                                    <div className="col-md-4">
                                                        <img src={require('../../images/product-thumb-12.jpg')} className="img-fluid rounded" alt="Card title" />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body py-0">
                                                            <p className="text-muted mb-0">Amber Jar</p>
                                                            <h5 className="card-title">Honey best nectar you wish to get</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="swiper-slide">
                                            <div className="card mb-3 p-3 rounded-4 shadow border-0">
                                                <div className="row g-0">
                                                    <div className="col-md-4">
                                                        <img src={require('../../images/product-thumb-13.jpg')} className="img-fluid rounded" alt="Card title" />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body py-0">
                                                            <p className="text-muted mb-0">Amber Jar</p>
                                                            <h5 className="card-title">Honey best nectar you wish to get</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="swiper-slide">
                                            <div className="card mb-3 p-3 rounded-4 shadow border-0">
                                                <div className="row g-0">
                                                    <div className="col-md-4">
                                                        <img src={require('../../images/product-thumb-14.jpg')} className="img-fluid rounded" alt="Card title" />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body py-0">
                                                            <p className="text-muted mb-0">Amber Jar</p>
                                                            <h5 className="card-title">Honey best nectar you wish to get</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="swiper-slide">
                                            <div className="card mb-3 p-3 rounded-4 shadow border-0">
                                                <div className="row g-0">
                                                    <div className="col-md-4">
                                                        <img src={require('../../images/product-thumb-11.jpg')} className="img-fluid rounded" alt="Card title" />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body py-0">
                                                            <p className="text-muted mb-0">Amber Jar</p>
                                                            <h5 className="card-title">Honey best nectar you wish to get</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="swiper-slide">
                                            <div className="card mb-3 p-3 rounded-4 shadow border-0">
                                                <div className="row g-0">
                                                    <div className="col-md-4">
                                                        <img src={require('../../images/product-thumb-12.jpg')} className="img-fluid rounded" alt="Card title" />
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div className="card-body py-0">
                                                            <p className="text-muted mb-0">Amber Jar</p>
                                                            <h5 className="card-title">Honey best nectar you wish to get</h5>
                                                        </div>
                                                    </div>
                                                </div>
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
export default NewlyBrands;