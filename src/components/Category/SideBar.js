import React from 'react';
import { Link } from 'react-router-dom';
import dataService from '../../services/dataService';
import { getCategoryName } from '../utils/productUtils';

function SideBar(props) {
    let { searchFilter } = props;
    const [categories, setCategories] = React.useState([]);
    const [brands, setBrands] = React.useState([]);

    React.useEffect(() => {
        dataService.getCategories()
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(() => setCategories([]));
    }, []);

    React.useEffect(() => {
        dataService.getBrands()
            .then(data => setBrands(Array.isArray(data) ? data : []))
            .catch(() => setBrands([]));
    }, []);

    function renderCategory() {
        return categories.map((item, index) => {
            return (
                <li className="cat-item" key={index}>
                    <Link to={'/shop-category/' + item.id} className="nav-link">{getCategoryName(item.category)}</Link>
                </li>
            )
        })
    }

    function renderBrand() {
        return brands.map((item, index) => {
            return (
                <li className="cat-item" key={index}>
                    <Link to="/shop" className="nav-link">{item.brand}</Link>
                </li>
            )
        })
    }

    return (
        <div className="sidebar">
            <div className="widget-menu">
                <div className="widget-search-bar">
                    <form role="search" className="d-flex position-relative" onSubmit={(event) => event.preventDefault()}>
                        <input className="form-control form-control-lg rounded-2 bg-light" type="text" placeholder="Tìm kiếm..." aria-label="Tìm kiếm sản phẩm" onChange={searchFilter} />
                        <button className="btn bg-transparent position-absolute end-0" type="submit" aria-label="Tìm kiếm"><svg width={24} height={24} viewBox="0 0 24 24"><use xlinkHref="#search" /></svg></button>
                    </form>
                </div>
            </div>
            <div className="widget-product-categories pt-5">
                <h5 className="widget-title">Danh mục sản phẩm</h5>
                <ul className="product-categories sidebar-list list-unstyled">
                    {renderCategory()}
                </ul>
            </div>
            <div className="widget-product-brands pt-3">
                <h5 className="widget-title">Thương hiệu</h5>
                <ul className="product-tags sidebar-list list-unstyled">
                    {renderBrand()}
                </ul>
            </div>
        </div>
    )
}
export default SideBar;
