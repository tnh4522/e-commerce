import { useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import FormError from "../Error/FormError";
import API from "../API/API";
import { fallbackImage, getImageSrc } from "../utils/imageUtils";

function UpdateUser() {
    let { id } = useParams();
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

    const inputFileRef = useRef(null);
    const handlePhotoChangeClick = (event) => {
        event.preventDefault();
        inputFileRef.current.click();
    };

    useEffect(() => {
        API.get('user/' + id)
            .then(function (response) {
                const user = (response && response.data) ? response.data : response;
                if (user) {
                    setInput((state) => ({
                        ...state,
                        id: user.id || id,
                        name: user.name || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        address: user.address || '',
                        country: user.country || '',
                        avatar: user.avatar || ''
                    }));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    const [getError, setError] = useState("");
    function handleInput(e) {
        const nameInput = e.target.name;
        const valueInput = e.target.value;
        setInput((state) => ({
            ...state,
            [nameInput]: valueInput
        }));
    };

    let navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        let errorSubmit = {};
        let flag = true;
        if (getInput.name === '') {
            flag = false;
            errorSubmit.name = 'Vui lòng nhập họ và tên!';
        }
        if (getInput.phone === '') {
            flag = false;
            errorSubmit.phone = 'Vui lòng nhập số điện thoại!';
        }
        if (getInput.address === '') {
            flag = false;
            errorSubmit.address = 'Vui lòng nhập địa chỉ!';
        }
        if (getInput.country === '') {
            flag = false;
            errorSubmit.country = 'Vui lòng nhập quốc gia!';
        }
        if (flag === false) {
            setError(errorSubmit);
        } else {
            setError('');

            const data_json = {
                name: getInput.name,
                email: getInput.email,
                password: getInput.password === '' ? null : getInput.password,
                phone: getInput.phone,
                address: getInput.address,
                country: getInput.country,
                avatar: getInput.file ? getInput.file.name : null
            }

            API.post('user/update/' + id, data_json)
                .then(function (response) {
                    alert('Cập nhật thông tin người dùng thành công!');
                    navigate('/admin');
                })
                .catch(function (error) {
                    console.log(error);
                    setError({ form: 'Cập nhật thất bại. Vui lòng thử lại!' });
                });
        }
    };

    function handleInputFile(e) {
        const fileInput = e.target.files;
        if (!fileInput || fileInput.length === 0) return;
        let reader = new FileReader();
        reader.onload = function (e) {
            setInput((state) => ({
                ...state,
                avatar: e.target.result,
                file: fileInput[0]
            }));
        };
        reader.readAsDataURL(fileInput[0]);
    };

    const avatar = getInput.avatar;
    const imgSrc = avatar?.startsWith('data:') ? avatar : getImageSrc(avatar);

    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Cập nhật người dùng</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/admin">Quản trị</Link>
                            <span className="breadcrumb-item active" aria-current="page">Người dùng</span>
                        </nav>
                    </div>
                </div>
            </section>
            <section id="login-form" className="py-5">
                <div className="container-sm">
                    <div className="row justify-content-center">
                        <div className="col-sm-8 p-5 border shadow-sm rounded-3 bg-white">
                            <h5 className="text-uppercase mb-4 fw-bold">Thông tin tài khoản</h5>
                            <form id="form" className="form-group flex-wrap" method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="col-12 pb-3">
                                    <label className="form-label fw-semibold">Họ và tên *</label>
                                    <input type="text" name="name" value={getInput.name} className="form-control" onChange={handleInput} autoFocus />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label fw-semibold">Địa chỉ Email</label>
                                    <input type="email" name="email" value={getInput.email} className="form-control" onChange={handleInput} readOnly />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label fw-semibold">Mật khẩu mới</label>
                                    <input type="password" name="password" className="form-control" onChange={handleInput} placeholder="Nhập mật khẩu mới (để trống nếu không đổi)" />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label fw-semibold">Số điện thoại *</label>
                                    <input type="text" name="phone" className="form-control" onChange={handleInput} value={getInput.phone} />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label fw-semibold">Địa chỉ *</label>
                                    <input type="text" name="address" className="form-control" onChange={handleInput} value={getInput.address} />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label fw-semibold">Quốc gia *</label>
                                    <input type="text" name="country" className="form-control" onChange={handleInput} value={getInput.country} />
                                </div>
                                <div className="col-12 pb-3">
                                    <label className="form-label fw-semibold">Ảnh đại diện</label>
                                    <input type="file" name="avatar" accept=".png, .jpg, .jpeg" className="form-control" onChange={handleInputFile} ref={inputFileRef} />
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" name="submit" className="btn btn-primary text-uppercase w-100 py-2">Lưu cập nhật</button>
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
                                        <button type="button" className="btn btn-primary btn-sm px-3" onClick={handlePhotoChangeClick}>Đổi ảnh đại diện</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default UpdateUser;