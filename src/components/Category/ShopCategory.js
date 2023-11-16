import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import backgroundPattern from '../../images/background-pattern.jpg';
import SideBar from "./SideBar";
import ShopPagination from "../shop/ShopPagination";
import Modal from "../Modal/Modal";
function ShopCategory() {
    let idCategory = useParams().id;
    const [products, setProducts] = useState([]);
    const [records, setRecords] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const navigater = useNavigate();
    useEffect(() => {
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/product/list')
            .then(res => {
                setProducts(res.data.filter(val => val.idCategory == idCategory));
                setRecords(res.data.filter(val => val.idCategory == idCategory));
            })
            .catch(error => { console.log(error) });
        const localStorageWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (localStorageWishlist) {
            setWishlist(localStorageWishlist);
        }
    }, [idCategory]);
    const searchFilter = (e) => {
        setRecords(products.filter(val => val.name.toLowerCase().includes(e.target.value)));
    }
    function renderProducts() {
        return records.map((item, index) => {
            const isWishlistItem = wishlist.includes(item.id);
            return (
                <div className="col" key={index}>
                    <div className="product-item" id={item.id}>
                        <Link to='' onClick={addToWishlist} className={`btn-wishlist ${isWishlistItem ? 'red-heart' : ''}`}><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                        <figure>
                            <Link to={'/product/detail/' + item.id} title="Product Title">
                                <img alt='' src={require('../../images/' + extractFilenames(item.image)[0])} className="tab-image" />
                            </Link>
                        </figure>
                        <Link to={'/product/detail/' + item.id} className="text-decoration-none"><h3>{item.name}</h3></Link>
                        <span className="qty">Đánh giá</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                        <span className="price">${item.price}</span>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="input-group product-qty">
                                <span className="input-group-btn">
                                    <button type="button" className="quantity-left-minus btn btn-danger btn-number" data-type="minus" data-field>
                                        <svg width={16} height={16}><use xlinkHref="#minus" /></svg>
                                    </button>
                                </span>
                                <input type="text" id="quantity" name="quantity" className="form-control input-number" defaultValue={1} min={1} max={100} />
                                <span className="input-group-btn">
                                    <button type="button" className="quantity-right-plus btn btn-success btn-number" data-type="plus" data-field>
                                        <svg width={16} height={16}><use xlinkHref="#plus" /></svg>
                                    </button>
                                </span>
                            </div>
                            <Link to="#" className="nav-link" onClick={addToCart}>Add to Cart <svg width={24} height={24}><use xlinkHref="#cart" /></svg></Link>
                        </div>
                    </div>
                </div>
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
    function addToCart(e) {
        let productId = e.target.closest('.product-item').id;
        productId = parseInt(productId);
        var cartData = {
            id: productId,
            quantity: 1
        }
        var cart = {};
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        if (!cart[productId]) {
            cart[productId] = cartData;
        } else {
            cart[productId].quantity += 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotalItem();
        setModalMessage('Add to cart successfully!');
        setShowModal(true);
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
    }

    function addToWishlist(e) {
        const getUser = localStorage.getItem('user');
        if (getUser) {
            let productId = e.target.closest('.product-item').id;
            productId = parseInt(productId);
    
            const isWishlistItem = wishlist.includes(productId);
    
            let updatedWishlist = [];
            if (isWishlistItem) {
                updatedWishlist = wishlist.filter(id => id !== productId);
            } else {

                updatedWishlist = [...wishlist, productId];
            }
    
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            setWishlist(updatedWishlist);
    
            setModalMessage(isWishlistItem ? 'Removed from wishlist!' : 'Added to wishlist!');
            setShowModal(true);
        } else {
            alert('Please login to use this feature!');
            navigater('/login');
        }
    };
    
    const [order, setOrder] = useState('name_a_z');
    const handleChanges = (e) => {
        setOrder(e.target.value);
        sorting(order);
    }
    const sorting = (sort) => {
        if (order === 'name_a_z') {
            sort = products.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
        } else if (order === 'name_z_a') {
            sort = products.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        } else if (order === 'price_low_high') {
            sort = products.sort((a, b) => a.price - b.price);
        } else if (order === 'price_high_low') {
            sort = products.sort((a, b) => b.price - a.price);
        } else {
            sort = products;
        }
        setRecords(sort);
    }
    useEffect(() => {
        if (showModal) {
            const timer = setTimeout(() => {
                setShowModal(false);
            }, 1200);

            return () => clearTimeout(timer);
        }
    }, [showModal]);
    return (
        <div>
            {showModal && <div className="modal-backdrop fade show"></div>}
            <Modal show={showModal} message={modalMessage} />
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Shop</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" href="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" href="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Shop</span>
                        </nav>
                    </div>
                </div>
            </section>
            <div className="shopify-grid">
                <div className="container-fluid">
                    <div className="row g-5">
                        <aside className="col-md-2">
                            <SideBar searchFilter={searchFilter} />
                        </aside>
                        <main className="col-md-10">
                            <div className="filter-shop d-flex justify-content-between">
                                <div className="showing-product">
                                    <p>Showing <span className="text-primary">{products.length}</span> results</p>
                                </div>
                                <div className="sort-by">
                                    <select id="input-sort" name="sort" className="form-control" data-filter-sort data-filter-order onChange={handleChanges}>
                                        <option value>Default sorting</option>
                                        <option value="name_a_z">Name (A - Z)</option>
                                        <option value="name_z_a">Name (Z - A)</option>
                                        <option value="price_low_high">Price (Low-High)</option>
                                        <option value="price_high_low">Price (High-Low)</option>
                                    </select>
                                </div>
                            </div>
                            {/* / product-grid */}
                            <ShopPagination products={records} renderProducts={renderProducts} />
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShopCategory;