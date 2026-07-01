import { Link } from 'react-router-dom';
import API from '../API/API';
import { useEffect, useState, useRef } from 'react';
import { safeParseJSON } from '../utils/cartUtils';

function ThankYou() {
    const [orderCode, setOrderCode] = useState('');
    const hasSubmitted = useRef(false);

    useEffect(() => {
        if (hasSubmitted.current) return;
        
        const orderData = safeParseJSON(localStorage.getItem('orderData'));
        if (orderData) {
            hasSubmitted.current = true;
            setOrderCode(orderData.description || '');
            
            API.post('order/add', orderData)
                .then(() => {
                    localStorage.removeItem('orderData');
                    localStorage.removeItem('data');
                    localStorage.removeItem('cart');
                    localStorage.removeItem('cartTotalItem');
                    localStorage.removeItem('priceTotalAll');
                    // Dispatch cart update event so header badge resets
                    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { totalItems: 0 } }));
                })
                .catch(err => {
                    console.error('Failed to submit order:', err);
                });
        }
    }, []);

    return (
        <div>
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="thank-you-content text-center">
                                <i className="fa-solid fa-circle-check" style={{ fontSize: '100px', color: '#00bdaa', marginBottom: '20px' }}></i>
                                <h2 className="mb-4">Thank you for your order!</h2>
                                <p className="mb-3">Your order has been placed and will be processed as soon as possible.</p>
                                {orderCode && <p className="mb-3">Make sure you make note of your order number, which is <strong>#{orderCode}</strong></p>}
                                <p className="mb-3">You will be receiving an <a href="https://mail.google.com/mail/u/0/#inbox" target='_blank' rel='noreferrer'><strong>email</strong></a> shortly with confirmation of your order. <br /> <strong>Estimated delivery time is 4-5 working days.</strong></p>
                                <p className="mb-3">If you have any questions, please feel free to contact us at <Link to="/contact">Customer Support</Link></p>
                                <Link to="/" className="btn btn-primary">Back to Home</Link>
                            </div>
                        </div>
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
                                                    <li><i className="icon icon-phone" />+1650-243-00023</li>
                                                    <li><i className="icon icon-phone" />+1650-243-00021</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 border-bottom">
                                            <div className="detail">
                                                <h3>Emails</h3>
                                                <ul className="list-unstyled">
                                                    <li><i className="icon icon-envelope" /><Link to="mailto:info@yourcompany.com">info@yourcompany.com</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 border-right">
                                            <div className="address detail">
                                                <h3>Address</h3>
                                                <ul className="list-unstyled">
                                                    <li><i className="icon icon-location" /><span>North Melbourne VIC 3051, Australia</span></li>
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
