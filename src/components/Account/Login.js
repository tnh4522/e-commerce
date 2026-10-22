import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import { useState } from "react";
import FormError from "../Error/FormError";
import { useNavigate } from "react-router-dom";
import API from '../API/API';

function Login() {
    const [getInput, setInput] = useState({
        email: '',
        password: ''
    });
    const [getError, setError] = useState("");
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput((state) => ({
            ...state,
            [nameInput]: valueInput
        }));
    }
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (getInput.email === '') {
            errorSubmit.email = 'Vui lòng nhập địa chỉ email!';
            flag = false;
        }
        if (getInput.password === '') {
            errorSubmit.password = 'Vui lòng nhập mật khẩu!';
            flag = false;
        }
        if (flag === false) {
            setError(errorSubmit);
        } else {
            setError('');
            API.post('user/login', getInput)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    navigate('/');
                })
                .catch(err => {
                    errorSubmit.email = 'Email hoặc mật khẩu không chính xác!';
                    setError(errorSubmit);
                })
        }
    }
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Đăng nhập</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/shop">Trang</Link>
                            <span className="breadcrumb-item active" aria-current="page">Đăng nhập</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section id="login-form" className="py-5">
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 p-5 border shadow-sm rounded-3 bg-white">
                            <h5 className="text-uppercase mb-4 fw-bold">Đăng nhập tài khoản</h5>
                            <form id="form" className="form-group flex-wrap" onSubmit={handleSubmit} method="post">
                                <div className="col-12 pb-3">
                                    <label className="form-label">Địa chỉ email *</label>
                                    <input className="form-control" type="email" placeholder="Nhập địa chỉ email của bạn" name="email" value={getInput.email} onChange={handleInput} required autoComplete="email" autoFocus />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Mật khẩu *</label>
                                    <input className="form-control" type="password" placeholder="Nhập mật khẩu" name="password" value={getInput.password} onChange={handleInput} required />
                                </div>
                                <FormError error={getError} />
                                <div className="col-12 pb-3">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input me-2" />
                                        <span>Ghi nhớ đăng nhập</span>
                                    </label>
                                </div>
                                <div className="col-12">
                                    <button type="submit" name="submit" className="btn btn-primary text-uppercase w-100 py-2">Đăng nhập</button>
                                    <p className="mt-3 mb-0 text-center">Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Login;