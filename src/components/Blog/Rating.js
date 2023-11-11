import * as React from 'react';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router';
import API from '../API/API';
import { useEffect } from 'react';
export default function BasicRating(props) {
    const getUser = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    let url = '/blog/rate/' + props.idBlog;
    let accessToken = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };
    const [rating, setRating] = React.useState(0);
    const [data, setData] = React.useState('');
    useEffect(() => {
        API.get('blog/rate/' + props.idBlog)
            .then(res => {
                setData(res.data.data);
                Object.keys(res.data.data).forEach(function (key) {
                    if (res.data.data[key].user_id == getUser.id) {
                        setRating(res.data.data[key].rate);
                    }
                });
            })
            .catch(err => {
                console.log(err);
            })
    }, [props.idBlog]);
    function handleChangeRating(e) {
        if (getUser) {
            const valueInput = parseInt(e.target.value);
            setRating(valueInput);
        }
        else {
            alert('Please login to rate!');
            navigate('/login');
        }
    }
    function handleSubmitRating(e) {
        e.preventDefault();
        if (getUser) {
            const flag = Object.keys(data).some(function (key) {
                return data[key].user_id == getUser.id;
            });
            if (flag) {
                alert('You have rated this blog!');
            } else {
                const formData = new FormData();
                formData.append('blog_id', props.idBlog);
                formData.append('user_id', getUser.id);
                formData.append('rate', rating);
                API.post(url, formData, config)
                    .then(res => {
                        if (res.data.status === 200) {
                            alert("Your rating has been sent!");
                            window.location.reload();
                        }
                    }).catch(err => console.log(err));
            }
        } else {
            alert('Please login to rate!');
            navigate('/login');
        }
    }
    return (
        <div className="rating-area">
            <div className="ratings">
                <h2 className="fw-normal text-dark my-5">Rate this item:</h2>
                <form onSubmit={handleSubmitRating}>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={handleChangeRating}
                    />
                    <button type="submit" className="btn btn-primary pull-right ms-5">Rate</button>
                </form>
            </div>
        </div>
    );
}
