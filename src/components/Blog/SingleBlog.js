import { Link } from "react-router-dom";
import RecentBlog from "../HomePage/RecentBlog";
function SingleBlog() {
    return (
        <div>
            <section className="py-5">
                <div className="container">
                    <div className="mt-5">
                        <div className="post-meta">
                            <span className="post-category">Fashion</span> / <span className="meta-date">Jul 11, 2022</span>
                        </div>
                        <h1 className="page-title">Feel cool while walking in streets</h1>
                    </div>
                </div>
            </section>
            <div>
                <div className="container">
                    <div className="row">
                        <main className="post-grid">
                            <div className="row">
                                <article className="post-item">
                                    <div className="post-content">
                                        <div className="post-thumbnail mb-5">
                                            <img src={require('../../images/banner-image-1.jpg')} alt="single-post" className="img-fluid" />
                                        </div>
                                        <div className="post-description py-4">
                                            <p>
                                                <strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur facilisis vivamus massa magna. Blandit mauris libero condimentum commodo morbi consectetur sociis convallis sit. Magna diam amet justo sed vel dolor et volutpat integer. Iaculis sit sapien hac odio elementum egestas neque. Adipiscing purus euismod orci sem amet, et. Turpis erat ornare nisi laoreet est euismod.</strong>
                                            </p>
                                            <p>Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum, amet dolor curabitur non aliquet orci urna volutpat. Id aliquam neque, ut vivamus sit imperdiet enim, lacus, vel. Morbi arcu amet, nulla fermentum vitae mattis arcu mi convallis. Urna in sollicitudin in vestibulum erat. Turpis faucibus augue ipsum, at aliquam. Cras sagittis tellus nunc integer vitae neque bibendum eget. Tempus malesuada et pellentesque maecenas. Sociis porttitor elit tincidunt tellus sit ornare. Purus ut quis sed venenatis eget ut ipsum, enim lacus. Praesent imperdiet vitae eu, eu tincidunt nunc integer sit.</p>
                                            <blockquote>“Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum, amet dolor curabitur non aliquet orci urna volutpat. Id aliquam neque, ut vivamus sit imperdiet enim, lacus, vel.</blockquote>
                                            <p>
                                                <strong>Consectetur Facilisis Vivamus</strong>
                                            </p>
                                            <ul style={{ listStyleType: 'disc' }} className="inner-list">
                                                <li>Blandit mauris libero condimentum commodo sociis convallis sit.</li>
                                                <li>Magna diam amet justo sed vel dolor et volutpat integer.</li>
                                                <li>Laculis sit sapien hac odio elementum egestas neque.</li>
                                            </ul>
                                            <p>Morbi arcu amet, nulla fermentum vitae mattis arcu mi convallis. Urna in sollicitudin in vestibulum erat. Turpis faucibus augue ipsum, at aliquam. Cras sagittis tellus nunc integer vitae neque bibendum eget. Tempus malesuada et pellentesque maecenas. Sociis porttitor elit tincidunt tellus sit ornare. Purus ut ipsum, enim lacus. Praesent imperdiet vitae eu, eu tincidunt nunc integer sit.</p>
                                            <p>Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus. Nunc tempus feugiat massa laoreet ultrices diam magna quam. Congue auctor auctor luctus neque. Enim lorem ultrices diam donec. Sed id placerat consectetur faucibus.</p>
                                            <img src={require('../../images/banner-image-2.jpg')} className="img-fluid" alt="post-image" />
                                            <p>
                                                <strong>Velit, praesent pharetra malesuada</strong>
                                            </p>
                                            <p>Id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus. Aliquam pellentesque molestie felis fames sed eget non euismod eget. Et eget ullamcorper urna, elit ac diam tellus viverra lacus.</p>
                                            <p>Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus.</p>
                                            <p>Velit, praesent pharetra malesuada id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus. Aliquam pellentesque molestie felis fames sed eget non euismod eget. Et eget ullamcorper urna, elit ac diam tellus viverra lacus.</p>
                                            <p>Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus.</p>
                                            <p>Praesent pharetra malesuada id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus. Aliquam pellentesque molestie felis fames sed eget non euismod eget. Et eget ullamcorper urna, elit ac diam tellus viverra lacus.</p>
                                            <p>Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus.</p>
                                            <div className="post-tags mt-5">
                                                <div className="block-tag col-md-12">
                                                    <ul className="list-unstyled d-flex">
                                                        <li className="pe-3">
                                                            <Link href="#" className="btn btn-warning btn-small text-uppercase btn-rounded">Tips</Link>
                                                        </li>
                                                        <li className="pe-3">
                                                            <Link href="#" className="btn btn-warning btn-small text-uppercase btn-rounded">Plant Hacks</Link>
                                                        </li>
                                                        <li className="pe-3">
                                                            <Link href="#" className="btn btn-warning btn-small text-uppercase btn-rounded">indoor</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="single-post-navigation" className="my-5">
                                            <div className="post-navigation d-flex flex-wrap align-items-center justify-content-between">
                                                <Link itemProp="url" className="post-prev d-flex flex-column text-decoration-none" href="#" title="Previous Post">
                                                    <span className="text-muted">Previous</span>
                                                    <h3 className="page-nav-title">Get some cool plants for 2023</h3>
                                                </Link>
                                                <Link itemProp="url" className="post-next d-flex flex-column text-decoration-none" href="#" title="Next Post">
                                                    <span className="text-muted">Next</span>
                                                    <h3 className="page-nav-title">Check out these 10 Cute little Plants</h3>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                                <section id="post-comment">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="comments-wrap">
                                                    <h2 className="display-6 fw-normal text-dark my-5">
                                                        <span className="count">3</span> Comments
                                                    </h2>
                                                    <div className="comment-list padding-small">
                                                        <article className="comment-item d-flex flex-wrap mb-3">
                                                            <div className="col-lg-1 col-sm-3 me-4 mb-3">
                                                                <img src={require('../../images/reviewer-1.jpg')} alt="default" className="img-fluid rounded-circle" />
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 author-wrap">
                                                                <div className="author-post">
                                                                    <div className="comment-meta d-flex">
                                                                        <h4 className="author-name text-dark pe-1">Sam Smith</h4>
                                                                        <span className="meta-date text-muted">Jul 10</span>
                                                                    </div>
                                                                    <p className="no-margin">Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus. Tortor diam dignissim amet, in interdum aliquet. Nascetur libero elementum adipiscing mauris maecenas et magna.</p>
                                                                    <div className="comments-reply">
                                                                        <Link href="#" className="text-decoration-underline text-dark">Reply Now</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </article>
                                                        <article className="comment-item d-flex child-comments flex-wrap ps-5 mb-3">
                                                            <div className="col-lg-1 col-sm-3 me-4 mb-3">
                                                                <img src={require('../../images/reviewer-2.jpg')} alt="default" className="img-fluid rounded-circle" />
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 author-wrap">
                                                                <div className="author-post">
                                                                    <div className="comment-meta d-flex">
                                                                        <h4 className="author-name text-dark pe-1">Santie Mary</h4>
                                                                        <span className="meta-date text-muted">Jul 10</span>
                                                                    </div>
                                                                    <p className="no-margin">Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert.Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert.</p>
                                                                    <div className="comments-reply">
                                                                        <Link href="#" className="text-decoration-underline text-dark">Reply Now</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </article>
                                                        <article className="comment-item d-flex flex-wrap">
                                                            <div className="col-lg-1 col-sm-3 me-4 mb-3">
                                                                <img src={require('../../images/reviewer-3.jpg')} alt="default" className="img-fluid rounded-circle" />
                                                            </div>
                                                            <div className="col-lg-10 col-sm-9 author-wrap">
                                                                <div className="author-post">
                                                                    <div className="comment-meta d-flex">
                                                                        <h4 className="author-name text-dark pe-1">Analisa Nora</h4>
                                                                        <span className="meta-date text-muted">Jul 10</span>
                                                                    </div>
                                                                    <p className="no-margin">Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert.Tristique tempis condimentum diam done ullancomroer sit element henddg sit he consequert.</p>
                                                                    <div className="comments-reply">
                                                                        <Link href="#" className="text-decoration-underline text-dark">Reply Now</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </article>
                                                    </div>
                                                </div>
                                                <div className="comment-respond mt-3 rounded-5 bg-light p-5 mt-5">
                                                    <h2 className="display-6 fw-normal text-dark my-5">Leave a Comment</h2>
                                                    <form method="post" className="form-group padding-small">
                                                        <p>Your email address will not be published. Required fields are marked *</p>
                                                        <div className="row">
                                                            <div className="col-lg-12 mb-3">
                                                                <textarea className="form-control ps-3 pt-3" id="comment" name="comment" placeholder="Write your comment here *" defaultValue={""} />
                                                            </div>
                                                            <div className="col-lg-6 mb-3">
                                                                <input className="form-control ps-3" type="text" name="author" id="author" placeholder="Write your full name here *" />
                                                            </div>
                                                            <div className="col-lg-6">
                                                                <input className="form-control ps-3" type="email" name="email" id="email" placeholder="Write your e-mail address *" />
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <label className="d-flex align-items-center">
                                                                    <input type="checkbox" className="checked-box me-2" />
                                                                    <span className="label-body">Save my name, email, and website in this browser for the next time.</span>
                                                                </label>
                                                            </div>
                                                            <div className="col-lg-12 mt-3">
                                                                <button className="btn btn-lg btn-primary text-uppercase btn-rounded-none w-100" type="submit">Post Comment</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <RecentBlog />
        </div>
    )
}
export default SingleBlog;