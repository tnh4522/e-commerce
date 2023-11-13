import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import backgroundPattern from '../../images/background-pattern.jpg';
import axios from 'axios';
function ManageBlogs() {
    const [users, setUsers] = useState({});
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/user/list')
        .then(function (response) {
            setUsers(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);
    useEffect(() => {
        axios.get('https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/blog/list')
        .then(function (response) {
            setBlogs(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }, []);
    function renderAuthor(idAuth) {
        let Author = 'member';
        users.forEach((value, key) => {
            if (value.id === idAuth) {
                Author = value.name;
            }
        });
        return Author;
    }
    function renderData() {
        return blogs.map((value, key) => {
            return (
                <tr key={key}>
                    <td>{value.id}</td>
                    <td><img src={require('../../images/' + value.image)} alt="" width="80px" /></td>
                    <td>{value.title}</td>
                    <td>{value.description}</td>
                    <td>{renderAuthor(value.idAuth)}</td>
                    <td><Link to={'/admin/update-blog/' + value.id}><button type="button" className="btn btn-primary">Update</button></Link></td>
                    <td><button id={value.id} type="button" className="btn btn-danger" onClick={deleteBlog}>Delete</button></td>
                </tr>
            )
        })
    }
    function deleteBlog(e) {
        const id = e.target.id;
        if(window.confirm('Are you sure you want to delete this blog?')){
            axios.delete(`https://intense-inlet-71668-b76c23b36694.herokuapp.com/api/blog/${id}`)
            .then(function (response) {
                if (response.status === 200) {
                    e.target.parentNode.parentNode.remove();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    return (
        <div>
            <section className="py-5 mb-5" style={{ background: `url(${backgroundPattern})` }}>
                <div className="container-fluid">
                    <div className="d-flex justify-content-between">
                        <h1 className="page-title pb-2">Blog Admin Page</h1>
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
                        <th scope='col'>Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope='col'>Author</th>
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

export default ManageBlogs;