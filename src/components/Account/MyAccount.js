import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import React, { useEffect, useRef } from "react";
import { notification, Card } from 'antd';
import { useState } from "react";
import FormError from "../Error/FormError";
import API from "../API/API";
import { fallbackImage, getImageSrc } from '../utils/imageUtils';

function MyAccount() {
    const [getInput, setInput] = useState({
        id: 0,
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        country: '',
        avatar: ''
    });

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: type === 'success' ? 'Thành công' : 'Thất bại',
            description: type === 'success' ? 'Cập nhật thông tin thành công!' : 'Cập nhật thất bại! Vui lòng thử lại.',
        });
    };

    const inputFileRef = useRef(null);
    const handlePhotoChangeClick = (event) => {
        event.preventDefault();
        inputFileRef.current.click();
    };

    useEffect(() => {
        let getUserData = JSON.parse(localStorage.getItem('user'));
        if (getUserData) {
            setInput((state) => {
                return {
                    ...state,
                    id: getUserData.id,
                    name: getUserData.name,
                    email: getUserData.email,
                    phone: getUserData.phone,
                    address: getUserData.address,
                    country: getUserData.country,
                    avatar: getUserData.avatar
                }
            });
        }
    }, []);

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
        if (getInput.phone === '') {
            errorSubmit.phone = 'Vui lòng nhập số điện thoại!';
            flag = false;
        }
        if (getInput.address === '') {
            errorSubmit.address = 'Vui lòng nhập địa chỉ!';
            flag = false;
        }
        if (getInput.country === '') {
            errorSubmit.country = 'Vui lòng nhập quốc gia!';
            flag = false;
        }
        const typeFile = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
        if (getInput.file && typeFile.indexOf(getInput.file.type) === -1) {
            errorSubmit.avatar = 'Định dạng ảnh không hợp lệ!';
            flag = false;
        }
        if (!flag) {
            setError(errorSubmit);
        }
        else {
            setError("");
            const formData = {
                name: getInput.name,
                email: getInput.email,
                password: getInput.password === '' ? null : getInput.password,
                phone: getInput.phone,
                address: getInput.address,
                country: getInput.country,
                avatar: getInput.file ? getInput.file.name : null
            }

            API.post('user/update/' + getInput.id, formData)
                .then(res => {
                    localStorage.setItem('user', JSON.stringify(res.data));
                    openNotificationWithIcon('success');
                })
                .catch(err => {
                    errorSubmit.email = "Đã xảy ra lỗi, vui lòng thử lại!";
                    setError(errorSubmit);
                    openNotificationWithIcon('error');
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
    };

    const avatar = getInput.avatar;
    const imgSrc = avatar?.startsWith('data:') ? avatar : getImageSrc(avatar);

    return (
        <div>
            {contextHolder}
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Tài khoản của tôi</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/shop">Trang</Link>
                            <span className="breadcrumb-item active" aria-current="page">Tài khoản của tôi</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section id="login-form" className="py-5">
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col-sm-8 p-5 border shadow-sm rounded-3 bg-white">
                            <h5 className="text-uppercase mb-4 fw-bold">Cập nhật thông tin cá nhân</h5>
                            <form id="form" className="form-group flex-wrap" method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Họ và tên *</label>
                                    <input type="text" name="name" value={getInput.name} className="form-control" onChange={handleInput} autoFocus />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Địa chỉ Email</label>
                                    <input type="email" name="email" value={getInput.email} className="form-control" onChange={handleInput} readOnly />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Mật khẩu mới</label>
                                    <input type="password" name="password" className="form-control" onChange={handleInput} placeholder='Nhập mật khẩu mới (để trống nếu không đổi)' />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Số điện thoại *</label>
                                    <input type="text" name="phone" className="form-control" onChange={handleInput} value={getInput.phone} />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Địa chỉ nhận hàng *</label>
                                    <input type="text" name="address" className="form-control" onChange={handleInput} value={getInput.address} />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label">Quốc gia *</label>
                                    <input type="text" name="country" className="form-control" onChange={handleInput} value={getInput.country} />
                                </div>
                                <div className="col-12 pb-3">
                                    <input type="file" name="avatar" style={{ display: 'none' }} className="form-control" onChange={handleInputFile} ref={inputFileRef} />
                                </div>
                                <div className="col-12">
                                    <button type="submit" name="submit" className="btn btn-primary text-uppercase w-100 py-2">Lưu thay đổi</button>
                                </div>
                            </form>
                            <FormError error={getError} />
                        </div>
                        <div className="col-md-4 p-5 border shadow-sm rounded-3 bg-white ms-md-3 mt-4 mt-md-0">
                            <div className="card border-0">
                                <div className="card-body text-center">
                                    <img src={imgSrc} className="img-fluid rounded-circle mb-3 shadow-sm" width="128" height="128" alt="Avatar" onError={(e) => { e.currentTarget.src = fallbackImage; }} style={{ objectFit: 'cover' }} />
                                    <h5 className="card-title mb-1 fw-bold">{getInput.name}</h5>
                                    <div className="text-muted mb-3">{getInput.email}</div>
                                    <div>
                                        <Link className="btn btn-primary btn-sm px-3" to="" onClick={handlePhotoChangeClick}>Đổi ảnh đại diện</Link>
                                    </div>
                                </div>
                            </div>
                            <Card type="inner" style={{ marginTop: 16 }} title="Địa chỉ giao hàng mặc định" >
                                <p><strong>Địa chỉ:</strong> {getInput.address}</p>
                                <p><strong>Quốc gia:</strong> {getInput.country}</p>
                                <p><strong>Điện thoại:</strong> {getInput.phone}</p>
                                <p><strong>Email:</strong> {getInput.email}</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default MyAccount;