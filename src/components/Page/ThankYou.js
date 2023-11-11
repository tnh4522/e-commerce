import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
function ThankYou() {
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Thank you</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Thank you</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section id="thank-you" className="py-5 bg-light-grey">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="contact-information">
                                <div className="section-header">
                                    <h2 className="section-title"><span className="text-primary">Get in</span> Touch</h2>
                                    <p>We will get back to you as soon as possible.</p>
                                </div>
                                <div className="row">
                                    <div className="d-flex flex-wrap">
                                        <div className="col-md-6">
                                            <div className="detail">
                                                <h3>Phones</h3>
                                                <ul className="list-unstyled">
                                                    <li>
                                                        <i className="icon icon-phone" />+1650-243-00023
                                                    </li>
                                                    <li>
                                                        <i className="icon icon-phone" />+1650-243-00021
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 border-bottom">
                                            <div className="detail">
                                                <h3>Emails</h3>
                                                <ul className="list-unstyled">
                                                    <li>
                                                        <i className="icon icon-envelope" />
                                                        <Link to="mailto:info@yourcompany.com">info@yourcompany.com</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 border-right">
                                            <div className="address detail">
                                                <h3>Address</h3>
                                                <ul className="list-unstyled">
                                                    <li>
                                                        <i className="icon icon-location" />
                                                        <span>North Melbourne VIC 3051, Australia</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="detail">
                                                <h3>Social Links</h3>
                                                <ul className="social-links list-unstyled d-flex">
                                                    <li><Link to="#" className="icon icon-facebook" /></li>
                                                    <li><Link to="#" className="icon icon-twitter" /></li>
                                                    <li><Link to="#" className="icon icon-youtube" /></li>
                                                    <li><Link to="#" className="icon icon-linkedin-square" /></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default ThankYou;