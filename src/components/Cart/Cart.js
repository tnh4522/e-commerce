import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import { useState, useEffect } from 'react';
import axios from 'axios';
function Cart() {
    const [getData, setData] = useState([]);
    const getCart = JSON.parse(localStorage.getItem('cart'));
    let cartData = {};
    if (getCart) {
        Object.keys(getCart).forEach(function (key) {
            cartData[getCart[key].id] = getCart[key].quantity;
        });
    };
    useEffect(() => {
        axios.post('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/product/cart', cartData)
            .then(res => {
                setData(res.data);
                if(window.location.pathname === '/cart') {
                    updateCartTotalItem();
                }
            })
            .catch(error => {
                console.log(error);
            });
        updatePriceTotalAll();
    }, []);
    useEffect(() => {
        // This function runs whenever the cart data changes
        const handleCartChange = () => {
            updatePriceTotalAll();
        };
    
        // Add event listener for changes in localStorage
        window.addEventListener('storage', handleCartChange);
    
        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('storage', handleCartChange);
        };
    }, []);
    let priceTotalAll = localStorage.getItem('priceTotalAll');
    function renderData() {
        return getData.map((item, index) => {
            return (
                <tr key={index} id={item.id}>
                    <td className="py-4">
                        <div className="cart-info d-flex flex-wrap align-items-center mb-4">
                            <div className="col-lg-3">
                                <div className="card-image">
                                    <img src={require('../../img/' + extractFilenames(item.image)[0])} alt="cloth" className="img-fluid" />
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="card-detail ps-3">
                                    <h5 className="card-title">
                                        <Link to={'/product/detail/' + item.id} className="text-decoration-none">{item.name}</Link>
                                    </h5>
                                    <div className="card-price">
                                        $<span className="price-product text-dark">{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="py-4">
                        <div className="input-group product-qty w-50">
                            <Link className="input-group-btn quantity-left-minus btn btn-light btn-number" onClick={downQuantityInput} >
                                -
                            </Link>
                            <input type="text" name="quantity" className="cart-quantity-input form-control text-center" value={item.quantity} readOnly />
                            <Link className="input-group-btn quantity-right-plus btn btn-light btn-number" onClick={upQuantityInput}>
                                +
                            </Link>
                        </div>
                    </td>
                    <td className="py-4">
                        <div className="total-price">
                            $<span className="total-price-product text-dark">{item.price * item.quantity}</span>
                        </div>
                    </td>
                    <td className="py-4">
                        <div className="cart-remove" >
                            <Link onClick={deleteItem} >
                                <svg width={24} height={24}>
                                    <use xlinkHref="#trash" />
                                </svg>
                            </Link>
                        </div>
                    </td>
                </tr>
            )
        })
    }
    function extractFilenames(inputString) {
        try {
            const inputArray = JSON.parse(inputString);
            const resultArray = [];
            for (let i = 0; i < inputArray.length; i++) {
                const filename = inputArray[i];
                const startIndex = filename.indexOf("_") + 1;
                const newFilename = filename.slice(startIndex);
                resultArray.push(newFilename);
            }
            return resultArray;
        } catch (error) {
            console.error("Invalid input JSON string.");
            return [];
        }
    }
    function downQuantityInput(e) {
        let id = e.target.parentNode.parentNode.parentNode.id;
        let quantity = e.target.parentNode.parentNode.querySelector('.cart-quantity-input').value;
        quantity--;
        e.target.parentNode.parentNode.querySelector('.cart-quantity-input').value = quantity;
        if (quantity < 1) {
            let cart = JSON.parse(localStorage.getItem('cart'));
            if (cart[id]) {
                delete cart[id];
                localStorage.setItem('cart', JSON.stringify(cart));
                e.target.parentNode.parentNode.parentNode.remove();
            }
        }
        updateQuantityInLocal(id, quantity);
        let price = e.target.parentNode.parentNode.parentNode.querySelector('.price-product').innerHTML;
        updatePriceTotal(price, quantity, e);
        updatePriceTotalAll();
        updateCartTotalItem();
    }
    function upQuantityInput(e) {
        let id = e.target.parentNode.parentNode.parentNode.id;
        let quantity = e.target.parentNode.parentNode.querySelector('.cart-quantity-input').value;
        quantity++;
        e.target.parentNode.parentNode.querySelector('.cart-quantity-input').value = quantity;
        updateQuantityInLocal(id, quantity);
        let price = e.target.parentNode.parentNode.parentNode.querySelector('.price-product').innerHTML;
        updatePriceTotal(price, quantity, e);
        updatePriceTotalAll();
        updateCartTotalItem();
    }
    function updateQuantityInLocal(id, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart[id]) {
            cart[id].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    function deleteItem(e) {
        e.preventDefault();
        let id = e.target.parentNode.parentNode.parentNode.parentNode.id;
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart[id]) {
            delete cart[id];
            localStorage.setItem('cart', JSON.stringify(cart));
            e.target.parentNode.parentNode.parentNode.parentNode.remove();
        }
        updatePriceTotalAll();
        updateCartTotalItem();
    }
    function updatePriceTotal(price, quantity, e) {
        let total = price * quantity;
        let priceTotal = e.target.parentNode.parentNode.parentNode.querySelector('.total-price-product');
        priceTotal.innerHTML = total;
    }
    function updatePriceTotalAll() {
        let priceTotal = document.querySelectorAll('.total-price-product');
        let total = 0;
        priceTotal.forEach((item) => {
            total += parseInt(item.innerHTML);
        });
        localStorage.setItem('priceTotalAll', total);
        console.log(total);
        priceTotalAll = total;
        document.querySelectorAll('.price-currency-symbol').forEach((item) => {
            item.innerHTML = total;
        });
    }
    function updateCartTotalItem() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let total = 0;
        if (cart) {
            Object.keys(cart).forEach(function (key) {
                total += cart[key].quantity;
            });
        }
        localStorage.setItem('cartTotalItem', total);
        document.querySelector('.badge').innerHTML = total;
        updatePriceTotalAll();
    }
    function updateCart() {
        window.location.reload();
    }
    
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Cart</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" href="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" href="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Cart</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row g-5">
                        <div className="col-md-8">
                            <div className="table-responsive cart">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="card-title text-uppercase text-muted">Product</th>
                                            <th scope="col" className="card-title text-uppercase text-muted">Quantity</th>
                                            <th scope="col" className="card-title text-uppercase text-muted">Subtotal</th>
                                            <th scope="col" className="card-title text-uppercase text-muted" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderData()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="cart-totals bg-grey py-5">
                                <h4 className="text-dark pb-4">Cart Total</h4>
                                <div className="total-price pb-5">
                                    <table cellSpacing={0} className="table text-uppercase">
                                        <tbody>
                                            <tr className="subtotal pt-2 pb-2 border-top border-bottom">
                                                <th>Subtotal</th>
                                                <td data-title="Subtotal">
                                                    <span className="price-amount amount text-dark ps-5">
                                                        <bdi>
                                                            $<span className="price-currency-symbol">{priceTotalAll}</span>
                                                        </bdi>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="order-total pt-2 pb-2 border-bottom">
                                                <th>Total</th>
                                                <td data-title="Total">
                                                    <span className="price-amount amount text-dark ps-5">
                                                        <bdi>
                                                            $<span className="price-currency-symbol">{priceTotalAll}</span>
                                                        </bdi>
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="button-wrap row g-2">
                                    <div className="col-md-6"><button onClick={updateCart} className="btn btn-dark py-3 px-4 text-uppercase btn-rounded-none w-100">Update Cart</button></div>
                                    <Link to="/shop" className="col-md-6"><button className="btn btn-dark py-3 px-4 text-uppercase btn-rounded-none w-100">Continue Shopping</button></Link>
                                    <Link to="/checkout" className="col-md-12"><button className="btn btn-primary py-3 px-4 text-uppercase btn-rounded-none w-100">Proceed to checkout</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Cart;