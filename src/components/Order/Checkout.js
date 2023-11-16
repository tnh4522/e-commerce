import { Link, useNavigate } from "react-router-dom";
import backgroundPattern from '../../images/background-pattern.jpg';
import { useRef, useState } from "react";
import CryptoJS from 'crypto-js'
import axios from "axios";
import dayjs from "dayjs";
import emailjs from '@emailjs/browser';
function CheckOut() {
    const form = useRef();
    let navigater = useNavigate();
    if (localStorage.getItem('user')) {
        var user = JSON.parse(localStorage.getItem('user'));
    };
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
    const priceTotalAll = localStorage.getItem('priceTotalAll');
    function handleChange(e) {
        const newData = { ...data }
        newData[e.target.name] = e.target.value;
        setData(newData);
    };

    function handleSubmit(e) {
        e.preventDefault();
        let config = {
            headers: {
                'x-client-id': 'e6a2fc4b-67d4-41fa-9064-e4e85f96f755',
                'x-api-key': '78141ec8-9ed2-4c5e-8c5c-609ed389bf94',
                'Content-Type': 'application/json'
            }
        }
        const amount = parseInt(priceTotalAll);
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

        const cart = JSON.parse(localStorage.getItem('cart'));

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
            'orderDetails': Object.keys(cart).map((key) => {
                return {
                    'productId': parseInt(cart[key].id),
                    'quantity': parseInt(cart[key].quantity),
                }
            })
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));

        axios.post('https://api-merchant.payos.vn/v2/payment-requests', formData, config)
            .then(res => {
                localStorage.setItem('data', JSON.stringify(res.data.data));
                navigater('/payment');
            }).catch(err => {
                console.log(err);
                const html = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>Checkout failed!</strong> Please complete the information.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
                document.querySelector('.total-price').insertAdjacentHTML('afterbegin', html);
            });

        emailjs.sendForm('service_4bzeg5e', 'template_ulcz6dg', form.current, '2QVLowuJSd6aP7lpj')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
    let date = dayjs().format('DD/MM/YYYY');
    let estimate_date = dayjs().add(3, 'day').format('DD/MM/YYYY');
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Checkout</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" href="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" href="#">Pages</Link>
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
                                    <input type="text" id="fname" name="name" className="form-control mt-2 mb-4 ps-3" value={data.name} onChange={handleChange} required />
                                    <label htmlFor="address">Address*</label>
                                    <input type="text" id="adr" name="address" className="form-control mt-3 ps-3 mb-3" value={data.address} onChange={handleChange} required />
                                    <label htmlFor="email">Phone*</label>
                                    <input type="text" id="phone" name="phone" className="form-control mt-2 mb-4 ps-3" value={data.phone} onChange={handleChange} required />
                                    <label htmlFor="email">Email*</label>
                                    <input type="text" id="email" name="email" className="form-control mt-2 mb-4 ps-3" value={data.email} onChange={handleChange} required />
                                    <label htmlFor="fname">Order notes (optional)</label>
                                    <input type="hidden" name="description" value={data.description} />
                                    <textarea className="form-control pt-3 pb-3 ps-3 mt-2"></textarea>
                                    <input type="hidden" name="total" value={priceTotalAll} />
                                    <input type="hidden" name="date" value={date} />
                                    <input type="hidden" name="estimate_date" value={estimate_date} />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="your-order mt-5">
                                    <h4 className="display-7 text-dark pb-4">Cart Totals</h4>
                                    <div className="total-price">
                                        <table cellSpacing={0} className="table">
                                            <tbody>
                                                <tr className="order-total border-bottom pt-2 pb-2 text-uppercase">
                                                    <th>Total</th>
                                                    <td data-title="Total">
                                                        <span className="price-amount amount ps-5">
                                                            <bdi>
                                                                <span className="price-currency-symbol">$</span>{priceTotalAll}</bdi>
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
                                                <input className="form-check-input flex-shrink-0" type="radio" name="listGroupRadios" id="listGroupRadios3" defaultValue />
                                                <span>
                                                    <strong className="text-uppercase">Paypal</strong>
                                                    <small className="d-block text-body-secondary">Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</small>
                                                </span>
                                            </label>
                                        </div>
                                        <button type="submit" name="submit" className="btn btn-dark btn-lg text-uppercase btn-rounded-none w-100">Place an order</button>
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