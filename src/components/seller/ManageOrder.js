import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import { useState } from 'react';
import { useEffect } from 'react';
import API from '../API/API';

function ManageOrders() {
    const [getData, setData] = useState([]);
    useEffect(() => {
        API.get('order/list')
        .then(function (response) {
            setData(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);

    function renderData() {
        return getData.map((value, key) => {
            return (
                <tr key={key}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
                    <td>{value.email}</td>
                    <td>{value.phone}</td>
                    <td>{value.address}</td>
                    <td>{value.userId}</td>
                    <td>{value.total}</td>
                    <td>{value.updatedAt}</td>
                    <td><button id={value.id} type="button" className="btn btn-primary">View</button></td>
                </tr>
            )
        })
    };
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Seller Page</h1>
                        <nav className="breadcrumb fs-6">
                            <Link className="breadcrumb-item nav-link" to="/">Home</Link>
                            <Link className="breadcrumb-item nav-link" to="">Pages</Link>
                            <span className="breadcrumb-item active" aria-current="page">Seller</span>
                        </nav>
                    </div>
                </div>
            </section>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">OrderID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope='col'>Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">UserID</th>
                        <th scope="col">Total</th>
                        <th scope="col">Date</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {renderData()}
                </tbody>
            </table>
        </div>
    )
}
export default ManageOrders;