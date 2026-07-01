import { Link, useNavigate } from "react-router-dom";
import backgroundPattern from '../../images/background-pattern.jpg';
import { useEffect, useRef, useState } from "react";
import CryptoJS from 'crypto-js'
import axios from "axios";
import dayjs from "dayjs";
import emailjs from '@emailjs/browser';
import API from "../API/API";
import { calculateCartTotal, formatCurrency, getStoredCart, safeParseJSON, sanitizeQuantity } from "../utils/cartUtils";
import { getProductImageSrc, getProductName, getProductPrice } from "../utils/productUtils";
function CheckOut() {
    const form = useRef();
    let navigater = useNavigate();
    const [cart] = useState(() => getStoredCart());
    const user = safeParseJSON(localStorage.getItem('user'));
    const [formErrors, setFormErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [orderItems, setOrderItems] = useState([]);
    function getRandomNumber() {
        return Math.floor(Math.random() * 100000) + 1;
    };
    const randomNumber = getRandomNumber();
    const [data, setData] = useState({
        idOrder: randomNumber,
        name: user ? user.name : '',
        address: user ? user.address : '',
        phone: user ? user.phone : '',
        email: user ? user.email : '',
        description: user ? 'VNQR'.concat(user.phone) : ''
    });
    const priceTotalAll = calculateCartTotal(orderItems) || parseInt(localStorage.getItem('priceTotalAll'), 10) || 0;

    useEffect(() => {
        const cartData = Object.keys(cart).reduce((data, key) => {
            data[cart[key].id] = cart[key].quantity;
            return data;
        }, {});

        if (Object.keys(cartData).length === 0) return;

        API.post('product/cart', cartData)
            .then((res) => {
                const products = Array.isArray(res.data) ? res.data : [];
                setOrderItems(products.map((item) => ({
                    ...item,
                    quantity: sanitizeQuantity(cart[String(item.id)]?.quantity ?? item.quantity),
                })));
            })
            .catch(() => {
                setOrderItems([]);
            });
    }, [cart]);

    if (!cart || Object.keys(cart).length === 0) {
        return (
            <div className="container-fluid py-5 text-center">
                <h3>Your cart is empty</h3>
                <p>Please add some products before checking out.</p>
                <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
            </div>
        );
    }
    function handleChange(e) {
        const newData = { ...data }
        newData[e.target.name] = e.target.value;
        if (e.target.name === 'phone') {
            newData.description = 'VNQR'.concat(e.target.value || '');
        }
        setData(newData);
        setFormErrors((errors) => ({ ...errors, [e.target.name]: '' }));
    };

    function validateForm() {
        const errors = {};
        if (!data.name.trim()) errors.name = 'Full name is required.';
        if (!data.address.trim()) errors.address = 'Address is required.';
        if (!/^[0-9+\-\s()]{8,15}$/.test(data.phone.trim())) errors.phone = 'Enter a valid phone number.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Enter a valid email address.';
        if (priceTotalAll <= 0) errors.cart = 'Your cart total is invalid. Please review your cart.';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitError('');
        if (!validateForm()) return;
        setSubmitting(true);
        let config = {
            headers: {
                'x-client-id': 'e6a2fc4b-67d4-41fa-9064-e4e85f96f755',
                'x-api-key': '78141ec8-9ed2-4c5e-8c5c-609ed389bf94',
                'Content-Type': 'application/json'
            }
        }
        const amount = parseInt(priceTotalAll, 10);
        const cancelUrl = 'http://localhost:3000/cart'
        const description = data.description;
        const orderCode = parseInt(data.idOrder);
        const returnUrl = 'http://localhost:3000/thank-you';
        const name = data.name;
        const email = data.email;
        const phone = data.phone;
        const address = data.address;
        const sortedData = `amount=${amount}&cancelUrl=${cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${returnUrl}`;
        const secretKey = 'f0509838332245e2d4a79db36909ef4efdfd7de34725206d40b4dfb01c750c0b';
        const signature = CryptoJS.HmacSHA256(sortedData, secretKey).toString(CryptoJS.enc.Hex);



        const formData = {
            'orderCode': orderCode,
            'amount': amount,
            'description': description,
            'buyerName': name,
            'buyerEmail': email,
            'buyerPhone': phone,
            'buyerAddress': address,
            'cancelUrl': cancelUrl,
            'returnUrl': returnUrl,
            'signature': signature
        };

        const orderData = {
            'userId': user ? user.id : '',
            'name': name,
            'email': email,
            'phone': phone,
            'address': address,
            'description': description,
            'total': amount,
            'date': new Date().toISOString(),
            'status': 'payment',
            'paymentMethod': 'QR VNPay',
            'orderDetails': Object.keys(cart).map((key) => {
                return {
                    'productId': parseInt(cart[key].id, 10),
                    'quantity': sanitizeQuantity(cart[key].quantity),
                }
            })
        };

        axios.post('https://api-merchant.payos.vn/v2/payment-requests', formData, config)
            .then(res => {
                localStorage.setItem('data', JSON.stringify(res.data.data));
                localStorage.setItem('orderData', JSON.stringify(orderData));
                navigater('/payment');
            }).catch(err => {
                setSubmitError('Checkout failed. Please review your information and try again.');
            }).finally(() => {
                setSubmitting(false);
            });

        emailjs.sendForm('service_4bzeg5e', 'template_ulcz6dg', form.current, '2QVLowuJSd6aP7lpj')
            .catch(() => {});
    };
    
    let date = dayjs().format('DD/MM/YYYY');
    let estimate_date = dayjs().add(3, 'day').format('DD/MM/YYYY');

    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Checkout</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="/shop">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Checkout</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="shopify-cart checkout-wrap py-5">
                <div className="container-fluid">
                    <form className="form-group was-validated" method="post" ref={form} onSubmit={handleSubmit} noValidate>
                        <div className="row d-flex flex-wrap">
                            <div className="col-lg-6">
                                <h4 className="text-dark pb-4">Billing Details</h4>
                                <div className="billing-details">
                                    <input type="hidden" name="idOrder" value={data.idOrder} />
                                    {user ? '' : <input type="hidden" name="userId" value={user ? user.id : ''} />}
                                    <label htmlFor="fname">Full Name*</label>
                                    <input type="text" id="fname" name="name" className={`form-control mt-2 ps-3 ${formErrors.name ? 'is-invalid' : ''}`} value={data.name} onChange={handleChange} required />
                                    {formErrors.name && <div className="invalid-feedback d-block mb-3">{formErrors.name}</div>}
                                    <label htmlFor="address">Address*</label>
                                    <input type="text" id="address" name="address" className={`form-control mt-3 ps-3 ${formErrors.address ? 'is-invalid' : ''}`} value={data.address} onChange={handleChange} required />
                                    {formErrors.address && <div className="invalid-feedback d-block mb-3">{formErrors.address}</div>}
                                    <label htmlFor="phone">Phone*</label>
                                    <input type="tel" id="phone" name="phone" className={`form-control mt-2 ps-3 ${formErrors.phone ? 'is-invalid' : ''}`} value={data.phone} onChange={handleChange} required />
                                    {formErrors.phone && <div className="invalid-feedback d-block mb-3">{formErrors.phone}</div>}
                                    <label htmlFor="email">Email*</label>
                                    <input type="email" id="email" name="email" className={`form-control mt-2 ps-3 ${formErrors.email ? 'is-invalid' : ''}`} value={data.email} onChange={handleChange} required />
                                    {formErrors.email && <div className="invalid-feedback d-block mb-3">{formErrors.email}</div>}
                                    <label htmlFor="order-notes">Order notes (optional)</label>
                                    <input type="hidden" name="description" value={data.description} />
                                    <textarea id="order-notes" className="form-control pt-3 pb-3 ps-3 mt-2" aria-label="Order notes"></textarea>
                                    <input type="hidden" name="total" value={priceTotalAll} />
                                    <input type="hidden" name="date" value={date} />
                                    <input type="hidden" name="estimate_date" value={estimate_date} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="your-order mt-5">
                                    <h4 className="display-7 text-dark pb-4">Cart Totals</h4>
                                    <div className="total-price">
                                        {submitError && <div className="alert alert-danger" role="alert">{submitError}</div>}
                                        {formErrors.cart && <div className="alert alert-danger" role="alert">{formErrors.cart}</div>}
                                        <div className="checkout-items mb-4">
                                            {orderItems.length > 0 ? orderItems.map((item) => (
                                                <div className="checkout-item d-flex align-items-center gap-3 py-2 border-bottom" key={item.id}>
                                                    <img src={getProductImageSrc(item)} alt={getProductName(item)} width={56} height={56} className="object-fit-cover rounded" />
                                                    <div className="flex-grow-1">
                                                        <strong>{getProductName(item)}</strong>
                                                        <div className="text-muted small">Qty: {sanitizeQuantity(item.quantity)} x {formatCurrency(getProductPrice(item))}</div>
                                                    </div>
                                                    <span>{formatCurrency(getProductPrice(item) * sanitizeQuantity(item.quantity))}</span>
                                                </div>
                                            )) : (
                                                <p className="text-muted">Product details are loading. Your order total is still shown below.</p>
                                            )}
                                        </div>
                                        <table cellSpacing={0} className="table">
                                            <tbody>
                                                <tr className="order-total border-bottom pt-2 pb-2 text-uppercase">
                                                    <th>Total</th>
                                                    <td data-title="Total">
                                                        <span className="price-amount amount ps-5">
                                                            <bdi>
                                                                <span className="price-currency-symbol">{formatCurrency(priceTotalAll)}</span></bdi>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="list-group mt-5 mb-3">
                                            <label className="list-group-item d-flex gap-2 border-0">
                                                <input className="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios1" defaultValue defaultChecked />
                                                <span>
                                                    <strong className="text-uppercase">Direct bank transfer</strong>
                                                    <small className="d-block text-body-secondary">Make your payment directly into our bank account. Please use your Order ID. Your order will shipped after funds have cleared in our account.</small>
                                                </span>
                                            </label>
                                            <label className="list-group-item d-flex gap-2 border-0">
                                                <input className="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios2" defaultValue />
                                                <span>
                                                    <strong className="text-uppercase">Check payments</strong>
                                                    <small className="d-block text-body-secondary">Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</small>
                                                </span>
                                            </label>
                                            <label className="list-group-item d-flex gap-2 border-0">
                                                <input className="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios3" defaultValue />
                                                <span>
                                                    <strong className="text-uppercase">Cash on delivery</strong>
                                                    <small className="d-block text-body-secondary">Pay with cash upon delivery.</small>
                                                </span>
                                            </label>
                                            <label className="list-group-item d-flex gap-2 border-0">
                                                <input className="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios4" defaultValue />
                                                <span>
                                                    <strong className="text-uppercase">Paypal</strong>
                                                    <small className="d-block text-body-secondary">Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</small>
                                                </span>
                                            </label>
                                        </div>
                                        <button type="submit" name="submit" className="btn btn-dark btn-lg text-uppercase btn-rounded-none w-100" disabled={submitting}>
                                            {submitting ? 'Processing...' : 'Place an order'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
export default CheckOut;
