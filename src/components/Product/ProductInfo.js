function ProductInfo() {
    return (
        <section className="product-info-tabs py-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="d-flex flex-column flex-md-row align-items-start gap-5">
                        <div className="nav flex-row flex-wrap flex-md-column nav-pills me-3 col-lg-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button className="nav-link text-start active" id="v-pills-description-tab" data-bs-toggle="pill" data-bs-target="#v-pills-description" type="button" role="tab" aria-controls="v-pills-description" aria-selected="true">Description</button>
                            <button className="nav-link text-start" id="v-pills-additional-tab" data-bs-toggle="pill" data-bs-target="#v-pills-additional" type="button" role="tab" aria-controls="v-pills-additional" aria-selected="false">Additional Information</button>
                            <button className="nav-link text-start" id="v-pills-reviews-tab" data-bs-toggle="pill" data-bs-target="#v-pills-reviews" type="button" role="tab" aria-controls="v-pills-reviews" aria-selected="false">Customer Reviews</button>
                        </div>
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade show active" id="v-pills-description" role="tabpanel" aria-labelledby="v-pills-description-tab" tabIndex={0}>
                                <h5>Product Description</h5>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.</p>
                                <ul style={{ listStyleType: 'disc' }} className="list-unstyled ps-4">
                                    <li>Donec nec justo eget felis facilisis fermentum.</li>
                                    <li>Suspendisse urna viverra non, semper suscipit pede.</li>
                                    <li>Aliquam porttitor mauris sit amet orci.</li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. </p>
                            </div>
                            <div className="tab-pane fade" id="v-pills-additional" role="tabpanel" aria-labelledby="v-pills-additional-tab" tabIndex={0}>
                                <p>It is Comfortable and Best</p>
                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            <div className="tab-pane fade" id="v-pills-reviews" role="tabpanel" aria-labelledby="v-pills-reviews-tab" tabIndex={0}>
                                <div className="review-box d-flex flex-wrap">
                                    <div className="col-lg-6 d-flex flex-wrap gap-3">
                                        <div className="col-md-2">
                                            <div className="image-holder">
                                                <img src="images/reviewer-1.jpg" alt="review" className="img-fluid rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="review-content">
                                                <div className="rating-container d-flex align-items-center">
                                                    <div className="rating" data-rating={1}>
                                                        <svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={2}>
                                                        <svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={3}>
                                                        <svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={4}>
                                                        <svg width={24} height={24} className="text-secondary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={5}>
                                                        <svg width={24} height={24} className="text-secondary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <span className="rating-count">(3.5)</span>
                                                </div>
                                                <div className="review-header">
                                                    <span className="author-name">Tina Johnson</span>
                                                    <span className="review-date">– 03/07/2023</span>
                                                </div>
                                                <p>Vitae tortor condimentum lacinia quis vel eros donec ac. Nam at lectus urna duis convallis convallis</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex flex-wrap gap-3">
                                        <div className="col-md-2">
                                            <div className="image-holder">
                                                <img src="images/reviewer-2.jpg" alt="review" className="img-fluid rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="review-content">
                                                <div className="rating-container d-flex align-items-center">
                                                    <div className="rating" data-rating={1}>
                                                        <svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={2}>
                                                        <svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={3}>
                                                        <svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={4}>
                                                        <svg width={24} height={24} className="text-secondary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={5}>
                                                        <svg width={24} height={24} className="text-secondary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <span className="rating-count">(3.5)</span>
                                                </div>
                                                <div className="review-header">
                                                    <span className="author-name">Jenny Willis</span>
                                                    <span className="review-date">– 03/06/2022</span>
                                                </div>
                                                <p>Vitae tortor condimentum lacinia quis vel eros donec ac. Nam at lectus urna duis convallis convallis</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="add-review mt-5">
                                    <h3>Add a review</h3>
                                    <p>Your email address will not be published. Required fields are marked *</p>
                                    <form id="form" className="form-group">
                                        <div className="pb-3">
                                            <div className="review-rating">
                                                <span>Your rating *</span>
                                                <div className="rating-container d-flex align-items-center">
                                                    <div className="rating" data-rating={1}>
                                                        <svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={2}>
                                                        <svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={3}>
                                                        <svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={4}>
                                                        <svg width={24} height={24} className="text-secondary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <div className="rating" data-rating={5}>
                                                        <svg width={24} height={24} className="text-secondary"><use xlinkHref="#star-solid" /></svg>
                                                    </div>
                                                    <span className="rating-count">(3.5)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pb-3">
                                            <input type="file" className="form-control" data-text="Choose your file" />
                                        </div>
                                        <div className="pb-3">
                                            <label>Your Review *</label>
                                            <textarea className="form-control" placeholder="Write your review here" defaultValue={""} />
                                        </div>
                                        <div className="pb-3">
                                            <label>Your Name *</label>
                                            <input type="text" name="name" placeholder="Write your name here" className="form-control" />
                                        </div>
                                        <div className="pb-3">
                                            <label>Your Email *</label>
                                            <input type="text" name="email" placeholder="Write your email here" className="form-control" />
                                        </div>
                                        <div className="pb-3">
                                            <label>
                                                <input type="checkbox" required />
                                                <span className="label-body">Save my name, email, and website in this browser for the next
                                                    time.</span>
                                            </label>
                                        </div>
                                        <button type="submit" name="submit" className="btn btn-dark btn-large text-uppercase w-100">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ProductInfo;