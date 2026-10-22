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
                                <h2 className="mb-4">Cảm ơn bạn đã đặt hàng tại FoodMart!</h2>
                                <p className="mb-3">Đơn hàng của bạn đã được ghi nhận thành công và đang được chuẩn bị để giao tới bạn trong thời gian sớm nhất.</p>
                                {orderCode && <p className="mb-3">Mã đơn hàng của bạn là: <strong>#{orderCode}</strong></p>}
                                <p className="mb-3">Thông tin chi tiết đơn hàng đã được gửi tới hòm thư <a href="https://mail.google.com" target='_blank' rel='noreferrer'><strong>Email</strong></a> của bạn. <br /> <strong>Thời gian giao hàng dự kiến: trong vòng 24 - 48 giờ.</strong></p>
                                <p className="mb-3">Nếu cần hỗ trợ thêm thông tin, xin vui lòng liên hệ <Link to="/contact">Bộ phận Chăm sóc khách hàng</Link></p>
                                <Link to="/" className="btn btn-primary px-4 py-2">Quay lại trang chủ</Link>
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
                                    <h2 className="section-title"><span className="text-primary">Liên hệ</span> hỗ trợ</h2>
                                    <p>Đội ngũ tư vấn viên của FoodMart luôn sẵn sàng phục vụ bạn 24/7.</p>
                                </div>
                                <div className="row">
                                    <div className="d-flex flex-wrap">
                                        <div className="col-md-6">
                                            <div className="detail">
                                                <h3>Hotline CSKH</h3>
                                                <ul className="list-unstyled">
                                                    <li><i className="icon icon-phone" />1900 6868</li>
                                                    <li><i className="icon icon-phone" />0901 234 567</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 border-bottom">
                                            <div className="detail">
                                                <h3>Hộp thư điện tử</h3>
                                                <ul className="list-unstyled">
                                                    <li><i className="icon icon-envelope" /><Link to="mailto:support@foodmart.vn">support@foodmart.vn</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6 border-right">
                                            <div className="address detail">
                                                <h3>Địa chỉ cửa hàng chính</h3>
                                                <ul className="list-unstyled">
                                                    <li><i className="icon icon-location" /><span>123 Hai Bà Trưng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="detail">
                                                <h3>Kênh truyền thông</h3>
                                                <ul className="social-links list-unstyled d-flex">
                                                    <li><Link to="#" className="icon icon-facebook" aria-label="Facebook" /></li>
                                                    <li><Link to="#" className="icon icon-twitter" aria-label="Twitter" /></li>
                                                    <li><Link to="#" className="icon icon-youtube" aria-label="Youtube" /></li>
                                                    <li><Link to="#" className="icon icon-linkedin-square" aria-label="Linkedin" /></li>
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
