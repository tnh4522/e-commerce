import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import { useState, useEffect } from 'react';
import { calculateCartTotal, formatCurrency, getStoredCart, removeCartItem, sanitizeQuantity, updateCartItemQuantity } from '../utils/cartUtils';
import { getProductImageSrc, getProductName, getProductPrice } from '../utils/productUtils';
import dataService from '../../services/dataService';

function Cart() {
    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [priceTotalAll, setPriceTotalAll] = useState(0);

    useEffect(() => {
        const cart = getStoredCart();
        const cartData = Object.keys(cart).reduce((data, key) => {
            data[cart[key].id] = cart[key].quantity;
            return data;
        }, {});

        if (Object.keys(cartData).length === 0) {
            setData([]);
            setLoading(false);
            return;
        }

        dataService.getCartProducts(cartData)
            .then(products => {
                const normalizedProducts = products.map((item) => ({
                    ...item,
                    quantity: sanitizeQuantity(cart[String(item.id)]?.quantity ?? item.quantity),
                }));
                setData(normalizedProducts);
                setError('');
            })
            .catch(() => {
                setError('Không thể tải giỏ hàng lúc này. Vui lòng thử lại sau.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const total = calculateCartTotal(getData);
        setPriceTotalAll(total);
        localStorage.setItem('priceTotalAll', total);
    }, [getData]);

    function renderData() {
        return getData.map((item) => {
            return (
                <tr key={item.id} id={item.id}>
                    <td className="py-4">
                        <div className="cart-info d-flex flex-wrap align-items-center mb-4">
                            <div className="col-lg-3">
                                <div className="card-image">
                                    <img src={getProductImageSrc(item)} alt={getProductName(item)} className="img-fluid" loading="lazy" />
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="card-detail ps-3">
                                    <h5 className="card-title">
                                        <Link to={'/product/detail/' + item.id} className="text-decoration-none">{getProductName(item)}</Link>
                                    </h5>
                                    <div className="card-price">
                                        <span className="price-product text-dark">{formatCurrency(getProductPrice(item))}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="py-4">
                        <div className="input-group product-qty w-50">
                            <button type="button" className="input-group-btn quantity-left-minus btn btn-light btn-number" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Giảm số lượng cho ${getProductName(item)}`}>
                                -
                            </button>
                            <input type="number" name="quantity" className="cart-quantity-input form-control text-center" value={item.quantity} min={1} onChange={(event) => updateQuantity(item.id, event.target.value)} aria-label={`Số lượng cho ${getProductName(item)}`} />
                            <button type="button" className="input-group-btn quantity-right-plus btn btn-light btn-number" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Tăng số lượng cho ${getProductName(item)}`}>
                                +
                            </button>
                        </div>
                    </td>
                    <td className="py-4">
                        <div className="total-price">
                            <span className="total-price-product text-dark">{formatCurrency(getProductPrice(item) * sanitizeQuantity(item.quantity))}</span>
                        </div>
                    </td>
                    <td className="py-4">
                        <div className="cart-remove">
                            <button type="button" className="btn btn-link p-0" onClick={() => deleteItem(item.id)} aria-label={`Xóa ${getProductName(item)} khỏi giỏ hàng`}>
                                <svg width={24} height={24}>
                                    <use xlinkHref="#trash" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })
    };

    function updateQuantity(id, quantity) {
        const nextQuantity = parseInt(quantity, 10);
        if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
            deleteItem(id);
            return;
        }
        updateCartItemQuantity(id, nextQuantity);
        setData((items) => items.map((item) => (
            String(item.id) === String(id) ? { ...item, quantity: nextQuantity } : item
        )));
    }

    function deleteItem(id) {
        removeCartItem(id);
        setData((items) => items.filter((item) => String(item.id) !== String(id)));
    }

    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Giỏ hàng</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/shop">Trang</Link>
                            <span className="breadcrumb-item active" aria-current="page">Giỏ hàng</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row g-5">
                        <div className="col-md-8">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Đang tải...</span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger" role="alert">{error}</div>
                            ) : getData.length === 0 ? (
                                <div className="text-center py-5">
                                    <h3>Giỏ hàng của bạn đang trống</h3>
                                    <p className="text-muted">Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
                                    <Link to="/shop" className="btn btn-primary mt-3">Tiếp tục mua sắm</Link>
                                </div>
                            ) : (
                            <div className="table-responsive cart">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="card-title text-uppercase text-muted">Sản phẩm</th>
                                            <th scope="col" className="card-title text-uppercase text-muted">Số lượng</th>
                                            <th scope="col" className="card-title text-uppercase text-muted">Thành tiền</th>
                                            <th scope="col" className="card-title text-uppercase text-muted" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderData()}
                                    </tbody>
                                </table>
                            </div>
                            )}
                        </div>
                        <div className="col-md-4">
                            <div className="cart-totals bg-grey py-5">
                                <h4 className="text-dark pb-4">Tổng giỏ hàng</h4>
                                <div className="total-price pb-5">
                                    <table cellSpacing={0} className="table text-uppercase">
                                        <tbody>
                                            <tr className="subtotal pt-2 pb-2 border-top border-bottom">
                                                <th>Tạm tính</th>
                                                <td data-title="Subtotal">
                                                    <span className="price-amount amount text-dark ps-5">
                                                        <bdi>
                                                            <span className="price-currency-symbol">{formatCurrency(priceTotalAll)}</span>
                                                        </bdi>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr className="order-total pt-2 pb-2 border-bottom">
                                                <th>Tổng cộng</th>
                                                <td data-title="Total">
                                                    <span className="price-amount amount text-dark ps-5">
                                                        <bdi>
                                                            <span className="price-currency-symbol">{formatCurrency(priceTotalAll)}</span>
                                                        </bdi>
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="button-wrap row g-2">
                                    <div className="col-md-6"><button type="button" className="btn btn-dark py-3 px-4 text-uppercase btn-rounded-none w-100" disabled>Giỏ hàng đã cập nhật</button></div>
                                    <Link to="/shop" className="col-md-6"><button type="button" className="btn btn-dark py-3 px-4 text-uppercase btn-rounded-none w-100">Tiếp tục mua hàng</button></Link>
                                    <Link to={getData.length === 0 ? "/cart" : "/checkout"} className="col-md-12"><button type="button" className="btn btn-primary py-3 px-4 text-uppercase btn-rounded-none w-100" disabled={getData.length === 0}>Tiến hành thanh toán</button></Link>
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
