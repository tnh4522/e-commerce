import { Link } from "react-router-dom";
function RecentBlog() {
    return (
        <section id="latest-blog" className="py-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="section-header d-flex align-items-center justify-content-between my-5">
                        <h2 className="section-title">Our Recent Blog</h2>
                        <div className="btn-wrap align-right">
                            <Link to="#" className="d-flex align-items-center nav-link">Read All Articles <svg width={24} height={24}><use xlinkHref="#arrow-right" /></svg></Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <article className="post-item card border-0 shadow-sm p-3">
                            <div className="image-holder zoom-effect">
                                <Link to="#">
                                    <img src={require('../../images/post-thumb-1.jpg')} alt="post" className="card-img-top" />
                                </Link>
                            </div>
                            <div className="card-body">
                                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                                    <div className="meta-date"><svg width={16} height={16}><use xlinkHref="#calendar" /></svg>22 Aug 2021</div>
                                    <div className="meta-categories"><svg width={16} height={16}><use xlinkHref="#category" /></svg>tips &amp; tricks</div>
                                </div>
                                <div className="post-header">
                                    <h3 className="post-title">
                                        <Link to="#" className="text-decoration-none">Top 10 casual look ideas to dress up your kids</Link>
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...</p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-md-4">
                        <article className="post-item card border-0 shadow-sm p-3">
                            <div className="image-holder zoom-effect">
                                <Link to="#">
                                    <img src={require('../../images/post-thumb-2.jpg')} alt="post" className="card-img-top" />
                                </Link>
                            </div>
                            <div className="card-body">
                                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                                    <div className="meta-date"><svg width={16} height={16}><use xlinkHref="#calendar" /></svg>25 Aug 2021</div>
                                    <div className="meta-categories"><svg width={16} height={16}><use xlinkHref="#category" /></svg>trending</div>
                                </div>
                                <div className="post-header">
                                    <h3 className="post-title">
                                        <Link to="#" className="text-decoration-none">Latest trends of wearing street wears supremely</Link>
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...</p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="col-md-4">
                        <article className="post-item card border-0 shadow-sm p-3">
                            <div className="image-holder zoom-effect">
                                <Link to="#">
                                    <img src={require('../../images/post-thumb-3.jpg')} alt="post" className="card-img-top" />
                                </Link>
                            </div>
                            <div className="card-body">
                                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                                    <div className="meta-date"><svg width={16} height={16}><use xlinkHref="#calendar" /></svg>28 Aug 2021</div>
                                    <div className="meta-categories"><svg width={16} height={16}><use xlinkHref="#category" /></svg>inspiration</div>
                                </div>
                                <div className="post-header">
                                    <h3 className="post-title">
                                        <Link to="#" className="text-decoration-none">10 Different Types of comfortable clothes ideas</Link>
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipi elit. Aliquet eleifend viverra enim tincidunt donec quam. A in arcu, hendrerit neque dolor morbi...</p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default RecentBlog;