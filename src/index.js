import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import About from './components/Page/About';
import Shop from './components/shop/Shop';
import SingleProduct from './components/Product/SingleProduct';
import Cart from './components/Cart/Cart';
import CheckOut from './components/Order/Checkout';
import Blog from './components/Blog/Blog';
import SingleBlog from './components/Blog/SingleBlog';
import Contact from './components/Page/Contact';
import ThankYou from './components/Page/ThankYou';
import Login from './components/Account/Login';
import BlogDetail from './components/Blog/BlogDetail';
import Register from './components/Member/Register';
import MyAccount from './components/Account/MyAccount';
import Wishlist from './components/Page/WishList';
import AdminUserPage from './components/Admin/AdminPage';
import UpdateUser from './components/Admin/UpdateUser';
import SellerPage from './components/seller/SellerPage';
import AddProduct from './components/seller/AddProduct';
import UpdateProduct from './components/seller/UpdateProduct';
import AddBlog from './components/Admin/AddBlog';
import ManageBlogs from './components/Admin/ManageBlogs';
import UpdateBlog from './components/Admin/UpdateBlog';
import ShopCategory from './components/Category/ShopCategory';
import ManageOrders from './components/seller/ManageOrder';
import Payment from './components/Order/Payment';
const checkAuthAdmin = () => {
  if (localStorage.getItem('user')) {
    const levelUser = JSON.parse(localStorage.getItem('user')).level;
    if (levelUser === 1) {
      return true;
    }
    return false;
  }
}
const checkAuthSeller = () => {
  if (localStorage.getItem('user')) {
    const levelUser = JSON.parse(localStorage.getItem('user')).level;
    if (levelUser === 2) {
      return true;
    }
    return false;
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/single-product" element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/blog/page/:id' element={<Blog />} />
          <Route path='/blog/detail/:id' element={<BlogDetail />} />
          <Route path='/single-blog' element={<SingleBlog />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/thank-you' element={<ThankYou />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/account' element={<MyAccount />} />
          <Route path='product/detail/:id' element={<SingleProduct />} />
          <Route path='/wish-list' element={<Wishlist />} />
          <Route path='shop-category/:id' element={<ShopCategory  />} />
          <Route path='payment' element={<Payment />} />
          {/* Admin */}
          {checkAuthAdmin() && <Route path='/admin' element={<AdminUserPage />} />}
          {checkAuthAdmin() && <Route path='/admin/update/:id' element={<UpdateUser />} />}
          {checkAuthAdmin() && <Route path='/admin/add-blog' element={<AddBlog />} />}
          {checkAuthAdmin() && <Route path='/admin/manage-blog' element={<ManageBlogs />} />}
          {checkAuthAdmin() && <Route path='/admin/update-blog/:id' element={<UpdateBlog />} />}
          {/* Seller */}
          {checkAuthSeller() && <Route path='/seller/update/:id' element={<UpdateProduct />} />}
          {checkAuthSeller() && <Route path='/seller/add-product' element={<AddProduct />} />}
          {checkAuthSeller() && <Route path='/seller' element={<SellerPage />} />}
          {checkAuthSeller() && <Route path='/seller/manage-order' element={<ManageOrders />} />}
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
