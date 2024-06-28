import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import { useEffect, useState } from 'react';
import API from '../API/API';

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
            return 'Admin';
        } else if (role === 2) {
            return 'Seller';
        } else {
            return 'User';
        }
    };

    function renderData() {
        return getData.map((value, key) => {
            return (
                <tr key={key}>
                    <td>{value.id}</td>
                    <td><img src={require('../../images/' + value.avatar)} alt="" width="70px" /></td>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.phone}</td>
                    <td>{value.address}</td>
                    <td id={value.level}>{renderRole(value.level)}</td>
                    <td><Link to={'/admin/update/' + value.id}><button type="button" className="btn btn-primary">Update</button></Link></td>
                    <td><button id={value.id} type="button" className="btn btn-danger" onClick={deleteUser}>Delete</button></td>
                </tr>
            )
        })
    };

    function deleteUser(e) {
        const id = e.target.id;
        const level = e.target.parentNode.parentNode.childNodes[6].id;
        if (level === '1' || level === '2') {
            alert('You cannot delete this user!');
            return;
        };
        if (window.confirm('Are you sure you want to delete this blog?')) {
            API.delete(`user/${id}`)
                .then(function (response) {
                    if (response.status === 200) {
                        e.target.parentNode.parentNode.remove();
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
                        <h1 className="page-title pb-2">User Admin Page</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Admin</span>
                        </nav>
                    </div>
                </div>
            </section>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope='col'>Avatar</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope='col'>Phone</th>
                        <th scope="col">Adress</th>
                        <th scope="col">Role</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {renderData()}
                </tbody>
            </table>
        </div>
    );
}
export default AdminUserPage;