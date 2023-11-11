import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
function SideBar(props) {
    let { searchFilter } = props;
    const [categories, setCategories] = React.useState([]);
    const [brands, setBrands] = React.useState([]);
    React.useEffect(() => {
        axios.get('http://localhost:8080/api/category')
            .then(res => { setCategories(res.data) })
            .catch(error => { console.log(error) })
    }, []);
    function renderCategory() {
        return categories.map((item, index) => {
            return (
                <li className="cat-item" key={index}>
                    <Link to={'/shop-category/' + item.id} className="nav-link">{item.category}</Link>
                </li>
            )
        })
    }
    React.useEffect(() => {
        axios.get('http://localhost:8080/api/brand')
            .then(res => { setBrands(res.data) })
            .catch(error => { console.log(error) })
    }, []);
    function renderBrand() {
        return brands.map((item, index) => {
            return (
                <li className="cat-item" key={index}>
                    <Link to={'/shop-brand/' + item.id} className="nav-link">{item.brand}</Link>
                </li>
            )
        })
    }
    return (
        <div className="sidebar">
            <div className="widget-menu">
                <div className="widget-search-bar">
                    <form role="search" method="get" className="d-flex position-relative">
                        <input className="form-control form-control-lg rounded-2 bg-light" type="email" placeholder="Search here" aria-label="Search here" onChange={searchFilter} />
                        <button className="btn bg-transparent position-absolute end-0" type="submit"><svg width={24} height={24} viewBox="0 0 24 24"><use xlinkHref="#search" /></svg></button>
                    </form>
                </div>
            </div>
            <div className="widget-product-categories pt-5">
                <h5 className="widget-title">Categories</h5>
                <ul className="product-categories sidebar-list list-unstyled">
                    {renderCategory()}
                </ul>
            </div>
            {/* <div className="widget-product-tags pt-3">
                <h5 className="widget-title">Tags</h5>
                <ul className="product-tags sidebar-list list-unstyled">
                    <li className="tags-item">
                        <Link to="#" className="nav-link">White</Link>
                    </li>
                    <li className="tags-item">
                        <Link to="#" className="nav-link">Cheap</Link>
                    </li>
                    <li className="tags-item">
                        <Link to="#" className="nav-link">Mobile</Link>
                    </li>
                    <li className="tags-item">
                        <Link to="#" className="nav-link">Modern</Link>
                    </li>
                </ul>
            </div> */}
            <div className="widget-product-brands pt-3">
                <h5 className="widget-title">Brands</h5>
                <ul className="product-tags sidebar-list list-unstyled">
                    {renderBrand()}
                </ul>
            </div>
            {/* <div className="widget-price-filter pt-3">
                <h5 className="widget-titlewidget-title">Filter By Price</h5>
                <ul className="product-tags sidebar-list list-unstyled">
                    <li className="tags-item">
                        <Link to="#" className="nav-link">Less than $10</Link>
                    </li>
                    <li className="tags-item">
                        <Link to="#" className="nav-link">$10- $20</Link>
                    </li>
                    <li className="tags-item">
                        <Link to="#" className="nav-link">$20- $30</Link>
                    </li>
                    <li className="tags-item">
                        <Link to="#" className="nav-link">$30- $40</Link>
                    </li>
                    <li className="tags-item">
                        <Link to="#" className="nav-link">$40- $50</Link>
                    </li>
                </ul>
            </div> */}
        </div>
    )
}
export default SideBar;