import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import React from "react";
import { useState } from "react";
import FormError from "../Error/FormError";
import { useNavigate } from "react-router-dom";
import API from '../API/API';

function Register() {
    const [getInput, setInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
        level: 0
    });
    const navigate = useNavigate();
    const [getError, setError] = useState("");
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput((state) => ({
            ...state,
            [nameInput]: valueInput
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (getInput.name === '') {
            errorSubmit.name = 'Vui lòng nhập họ và tên!';
            flag = false;
        }
        if (getInput.email === '') {
            errorSubmit.email = 'Vui lòng nhập địa chỉ email!';
            flag = false;
        }
        if (getInput.password === '') {
            errorSubmit.password = 'Vui lòng nhập mật khẩu!';
            flag = false;
        }
        if (getInput.phone === '') {
            errorSubmit.phone = 'Vui lòng nhập số điện thoại!';
            flag = false;
        }
        if (getInput.address === '') {
            errorSubmit.address = 'Vui lòng nhập địa chỉ!';
            flag = false;
        }
        if (getInput.avatar === '') {
            errorSubmit.avatar = 'Vui lòng chọn ảnh đại diện!';
            flag = false;
        } else if (getInput.file) {
            const typeFile = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
            if (typeFile.indexOf(getInput.file.type) === -1) {
                errorSubmit.avatar = 'Định dạng ảnh không hợp lệ (hỗ trợ PNG, JPG, JPEG, SVG)!';
                flag = false;
            }
            else if (getInput.file.size > 1024 * 1024) {
                errorSubmit.avatar = 'Dung lượng ảnh quá lớn (tối đa 1MB)!';
                flag = false;
            }
        }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            setError("");
            const formData = {
                name: getInput.name,
                email: getInput.email,
                password: getInput.password,
                phone: getInput.phone,
                address: getInput.address,
                avatar: getInput.file ? getInput.file.name : '',
                level: getInput.level
            }
            API.post('user/register', formData)
                .then(res => {
                    alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập.');
                    navigate('/login');
                })
                .catch(err => {
                    errorSubmit.email = err.response?.data?.message || 'Đăng ký không thành công. Vui lòng thử lại!';
                    setError(errorSubmit);
                });
        }
    };

    function handleInputFile(e) {
        const fileInput = e.target.files;
        if (!fileInput || fileInput.length === 0) return;
        let reader = new FileReader();
        reader.onload = function (e) {
            setInput((state) => {
                return {
                    ...state,
                    avatar: e.target.result,
                    file: fileInput[0]
                }
            });
        };
        reader.readAsDataURL(fileInput[0]);
    }
    
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Đăng ký</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/shop">Trang</Link>
                            <span className="breadcrumb-item active" aria-current="page">Đăng ký</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section id="login-form" className="py-5">
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 p-5 border shadow-sm rounded-3 bg-white">
                            <h5 className="text-uppercase mb-4 fw-bold">Tạo tài khoản mới</h5>
                            <form id="form" className="form-group flex-wrap" method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Họ và tên *</label>
                                    <input type="text" name="name" placeholder="Nhập họ và tên..." className="form-control" onChange={handleInput} required autoFocus />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Địa chỉ email *</label>
                                    <input type="email" name="email" placeholder="Nhập email..." className="form-control" aria-describedby="emailHelp" onChange={handleInput} required />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Mật khẩu *</label>
                                    <input type="password" name="password" placeholder="Nhập mật khẩu..." className="form-control" onChange={handleInput} required />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Địa chỉ giao hàng *</label>
                                    <input type="text" name="address" placeholder="Nhập địa chỉ nhận hàng..." className="form-control" onChange={handleInput} required />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Số điện thoại *</label>
                                    <input type="tel" name="phone" placeholder="Nhập số điện thoại..." className="form-control" onChange={handleInput} required />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Ảnh đại diện *</label>
                                    <input type="file" name="avatar" className="form-control" onChange={handleInputFile} required />
                                </div>
                                <input type="hidden" name="level" onChange={handleInput} />
                                <div className="col-12">
                                    <button type="submit" name="submit" className="btn btn-primary text-uppercase w-100 py-2">Đăng ký tài khoản</button>
                                    <p className="mt-3 mb-0 text-center">Đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link></p>
                                </div>
                            </form>
                            <FormError error={getError} />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Register;