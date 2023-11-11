import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from '../API/API'
import backgroundPattern from '../../images/background-pattern.jpg';
function Wishlist() {
    const [getData, setData] = useState([]);
    useEffect(() => {
        API.get('product/wishlist')
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function renderWishlist() {
        let wishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (getData && wishlist) {
            var productWishList = getData.filter((item) => {
                return wishlist.includes(item.id);
            });
            return productWishList.map((item, index) => {
                return (
                    <div className="col" key={index}>
                        <div className="product-item" id={item.id}>
                            <Link to="#" className="btn-wishlist"><svg width={24} height={24}><use xlinkHref="#heart" /></svg></Link>
                            <figure>
                                <Link to={'/product/detail/' + item.id} title="Product Title">
                                    <img alt='' src={require('../../img/' + extractFilenames(item.image)[0])} className="tab-image" />
                                </Link>
                            </figure>
                            <Link to={'/product/detail/' + item.id} className="text-decoration-none"><h3>{item.name}</h3></Link>
                            <span className="qty">Đánh giá</span><span className="rating"><svg width={24} height={24} className="text-primary"><use xlinkHref="#star-solid" /></svg> 4.5</span>
                            <span className="price">${item.price}</span>
                            <div className="d-flex align-items-center justify-content-between">
                                <Link to="#" className="btn btn-outline-primary btn-sm" onClick={deleteWishList}>Delete</Link>
                                <Link to="#" className="nav-link" onClick={addToCart}>Add to Cart <svg width={24} height={24}><use xlinkHref="#cart" /></svg></Link>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div className="col-sm-12">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo">
                                <h2 className="text-warning-emphasis">Wish list is empty</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )
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
    function deleteWishList(e) {
        let product_id = e.target.parentNode.parentNode.parentNode.parentNode.id;
        console.log(product_id);
        let wishlist = JSON.parse(localStorage.getItem('wishlist'));
        let index = wishlist.indexOf(parseInt(product_id));
        if (index > -1) {
            wishlist.splice(index, 1);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
    }
    return (
        <div className="col-sm-12 padding-right">
            <div className="features_items">
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Wishlist</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" href="#">Home</Link>
                            <Link className="breadcrumb-item nav-link" href="#">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">About Us</span>
                        </nav>
                    </div>
                </div>
            </section>
                <div className="product-grid row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                    {renderWishlist()}
                </div>
            </div>
        </div>
    )
}
export default Wishlist;