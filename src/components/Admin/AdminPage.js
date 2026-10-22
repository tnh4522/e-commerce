import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import { useEffect, useState } from 'react';
import API from '../API/API';
import { fallbackImage, getImageSrc } from '../utils/imageUtils';

function AdminUserPage() {
    const [getData, setData] = useState([]);

    useEffect(() => {
        API.get('user/list')
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    function renderRole(role) {
        if (role === 1) {
            return 'Quản trị viên';
        } else if (role === 2) {
            return 'Người bán';
        } else {
            return 'Khách hàng';
        }
    };

    function renderData() {
        return getData.map((value, key) => {
            return (
                <tr key={key}>
                    <td>{value.id}</td>
                    <td>
                        <img 
                            src={getImageSrc(value.avatar)} 
                            alt={value.name} 
                            width="60px" 
                            height="60px" 
                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                            onError={(e) => { e.currentTarget.src = fallbackImage; }} 
                        />
                    </td>
                    <td className="fw-semibold">{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.phone}</td>
                    <td>{value.address}</td>
                    <td id={value.level}>
                        <span className={`badge ${value.level === 1 ? 'bg-danger' : value.level === 2 ? 'bg-warning text-dark' : 'bg-success'}`}>
                            {renderRole(value.level)}
                        </span>
                    </td>
                    <td><Link to={'/admin/update/' + value.id}><button type="button" className="btn btn-primary btn-sm">Cập nhật</button></Link></td>
                    <td><button id={value.id} type="button" className="btn btn-danger btn-sm" onClick={deleteUser}>Xóa</button></td>
                </tr>
            )
        })
    };

    function deleteUser(e) {
        const id = e.target.id;
        const level = e.target.parentNode.parentNode.childNodes[6].id;
        if (level === '1' || level === '2') {
            alert('Bạn không thể xóa tài khoản Quản trị viên hoặc Người bán!');
            return;
        };
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
            API.delete(`user/${id}`)
                .then(function (response) {
                    if (response.status === 200) {
                        setData(prev => prev.filter(u => String(u.id) !== String(id)));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };
    
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Quản lý người dùng</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                            <Link className="breadcrumb-item nav-link" to="/admin">Quản trị</Link>
                            <span className="breadcrumb-item active" aria-current="page">Người dùng</span>
                        </nav>
                    </div>
                </div>
            </section>
            <div className="container-fluid">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">Mã ID</th>
                                <th scope='col'>Ảnh đại diện</th>
                                <th scope="col">Họ và tên</th>
                                <th scope="col">Địa chỉ Email</th>
                                <th scope='col'>Số điện thoại</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Vai trò</th>
                                <th scope="col">Cập nhật</th>
                                <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {renderData()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default AdminUserPage;