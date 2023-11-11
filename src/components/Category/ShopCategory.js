import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import backgroundPattern from '../../images/background-pattern.jpg';
import SideBar from "./SideBar";
function ShopCategory() {
    let idCategory = useParams().id;
    const [products, setProducts] = useState([]);
    const [records, setRecords] = useState([]);
    const navigater = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/api/product/list')
            .then(res => {
                setProducts(res.data.filter(val => val.idCategory == idCategory));
                setRecords(res.data.filter(val => val.idCategory == idCategory));
            })
            .catch(error => { console.log(error) })
    }, [idCategory]);
    const searchFilter = (e) => {
        setRecords(products.filter(val => val.name.toLowerCase().includes(e.target.value)));
    }
    function renderProducts() {
        return records.map((item, index) => {
            return (
                <div className="col" key={index}>
                    <div className="product-item" id={item.id}>
                        <Link to='' onClick={addToWishlist} className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                        <figure>
                            <Link to={'/product/detail/' + item.id} title="Product Title">
                                <img alt='' src={require('../../img/' + extractFilenames(item.image)[0])} className="tab-image" />
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
            let wishlist = [];
            if (localStorage.getItem('wishlist')) {
                wishlist = JSON.parse(localStorage.getItem('wishlist'));
            }
            if (!wishlist.includes(productId)) {
                wishlist.push(productId);
            }
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } else {
            alert('Please login to use this feature!');
            navigater('/login');
        }
    }
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
    return (
        <div>
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
                                    <p>Showing 1–9 of 55 results</p>
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
                            <div className="product-grid row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                                {renderProducts()}
                            </div>
                            {/* / product-grid */}
                            <nav className="navigation paging-navigation text-center py-4" role="navigation">
                                <div className="pagination loop-pagination d-flex justify-content-center align-items-center">
                                    <Link to="#">
                                        <svg className="chevron-left pe-3">
                                            <use xlinkHref="#chevron-left" />
                                        </svg>
                                    </Link>
                                    <span aria-current="page" className="page-numbers current pe-3">1</span>
                                    <Link className="page-numbers pe-3" href="#">2</Link>
                                    <Link className="page-numbers pe-3" href="#">3</Link>
                                    <Link className="page-numbers pe-3" href="#">4</Link>
                                    <Link className="page-numbers" href="#">5</Link>
                                    <Link to="#">
                                        <svg className="chevron-right ps-3">
                                            <use xlinkHref="#chevron-right" />
                                        </svg>
                                    </Link>
                                </div>
                            </nav>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ShopCategory;