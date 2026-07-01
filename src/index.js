import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import GeminiModal from './components/gemini/gemini_modal';
import OrderList from './components/Order/OrderList';
import OrderDetail from './components/Order/OrderDetail';

// Protected route component that checks auth level on every render
function ProtectedRoute({ level, children }) {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.level === level) {
            return children;
        }
    } catch (e) {
        // Invalid user data
    }
    return <Navigate to="/login" replace />;
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
          <Route path='shop-category/:id' element={<ShopCategory />} />
          <Route path='payment' element={<Payment />} />
          <Route path='gemini-modal' element={<GeminiModal />} />
          <Route path='order' element={<OrderList />} />
          <Route path='/order/detail' element={<OrderDetail />} />
          {/* Admin routes */}
          <Route path='/admin' element={<ProtectedRoute level={1}><AdminUserPage /></ProtectedRoute>} />
          <Route path='/admin/update/:id' element={<ProtectedRoute level={1}><UpdateUser /></ProtectedRoute>} />
          <Route path='/admin/add-blog' element={<ProtectedRoute level={1}><AddBlog /></ProtectedRoute>} />
          <Route path='/admin/manage-blog' element={<ProtectedRoute level={1}><ManageBlogs /></ProtectedRoute>} />
          <Route path='/admin/update-blog/:id' element={<ProtectedRoute level={1}><UpdateBlog /></ProtectedRoute>} />
          {/* Seller routes */}
          <Route path='/seller' element={<ProtectedRoute level={2}><SellerPage /></ProtectedRoute>} />
          <Route path='/seller/update/:id' element={<ProtectedRoute level={2}><UpdateProduct /></ProtectedRoute>} />
          <Route path='/seller/add-product' element={<ProtectedRoute level={2}><AddProduct /></ProtectedRoute>} />
          <Route path='/seller/manage-order' element={<ProtectedRoute level={2}><ManageOrders /></ProtectedRoute>} />
          {/* Catch-all route - must be LAST */}
          <Route path='*' element={<Home />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
