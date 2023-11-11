
import { Link } from 'react-router-dom';
function TrendingProduct() {
    return (
        <section className="py-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bootstrap-tabs product-tabs">
                            <div className="tabs-header d-flex justify-content-between border-bottom my-5">
                                <h3>Trending Products</h3>
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <Link to="#" className="nav-link text-uppercase fs-6 active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all">All</Link>
                                        <Link to="#" className="nav-link text-uppercase fs-6" id="nav-fruits-tab" data-bs-toggle="tab" data-bs-target="#nav-fruits">Fruits &amp; Veges</Link>
                                        <Link to="#" className="nav-link text-uppercase fs-6" id="nav-juices-tab" data-bs-toggle="tab" data-bs-target="#nav-juices">Juices</Link>
                                    </div>
                                </nav>
                            </div>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                                    <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                                        <div className="col">
                                            <div className="product-item">
                                                <span className="badge bg-success position-absolute m-3">-30%</span>
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <span className="badge bg-success position-absolute m-3">-30%</span>
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-biscuits.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-cucumber.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-milk.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-biscuits.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-cucumber.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-milk.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-biscuits.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                    </div>
                                    {/* / product-grid */}
                                </div>
                                <div className="tab-pane fade" id="nav-fruits" role="tabpanel" aria-labelledby="nav-fruits-tab">
                                    <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                                        <div className="col">
                                            <div className="product-item">
                                                <span className="badge bg-success position-absolute m-3">-30%</span>
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-cucumber.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <span className="badge bg-success position-absolute m-3">-30%</span>
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-milk.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <span className="badge bg-success position-absolute m-3">-30%</span>
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-orange-juice.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-raspberries.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
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
                                        </div>
                                    </div>
                                    {/* / product-grid */}
                                </div>
                                <div className="tab-pane fade" id="nav-juices" role="tabpanel" aria-labelledby="nav-juices-tab">
                                    <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                                        <div className="col">
                                            <div className="product-item">
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-cucumber.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
                                                <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                                                <figure>
                                                    <Link to="single-product.html" title="Product Title">
                                                        <img src={require('../../images/thumb-milk.png')} alt="Product Thumbnail" className="tab-image" />
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
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
                                        </div>
                                        <div className="col">
                                            <div className="product-item">
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
                                        </div>
                                    </div>
                                    {/* / product-grid */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default TrendingProduct;