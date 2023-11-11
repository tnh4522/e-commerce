import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API/API";
function CommentBlog(props) {
    const [getComment, setComment] = useState('');
    const [getCommentError, setCommentError] = useState('');
    const getUser = JSON.parse(localStorage.getItem('user'));
    const getUserName = getUser ? getUser.name : '';
    const getEmailUser = getUser ? getUser.email : '';
    const navigate = useNavigate();
    let url = 'blog/comment/' + props.id;
    let accessToken = localStorage.getItem('token');
    let config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
    function handleChangeCommentInput(e) {
        setComment(e.target.value);
    }
    function handleCommentSubmit(e) {
        e.preventDefault();
        if (getUser) {
            const formData = new FormData();
            formData.append('id_blog', props.idBlog);
            formData.append('id_user', getUser.id);
            formData.append('id_comment', props.idSubComment ? props.idSubComment : 0);
            formData.append('comment', getComment);
            formData.append('image_user', getUser.avatar);
            formData.append('name_user', getUser.name);

            API.post(url, formData, config)
                .then(res => {
                    if (res.data.status === 200) {
                        setComment('');
                        props.getCMT(res.data.data);
                    }
                }).catch(err => console.log(err));
        } else {
            alert('Please login to comment!');
            navigate('/login');
        }
        if (getComment === '') {
            setCommentError('Please enter your comment!');
        } else {
            setCommentError('');
        }
    }
    return (
        <div className="comment-respond mt-3 rounded-5 bg-light p-5 mt-5">
            <h2 className="display-6 fw-normal text-dark my-5">Leave a Comment</h2>
            <form method="post" className="form-group padding-small" onSubmit={handleCommentSubmit}>
                <p>Comments are only allowed when logged in. Required fields are marked *</p>
                <div className="row">
                    <div className="col-lg-12 mb-3">
                        <textarea className="form-control ps-3 pt-3" id="comment" name="message" placeholder="Write your comment here *" value={getComment} onChange={handleChangeCommentInput} />
                    </div>
                    <h5 style={{ color: "red" }}>{getCommentError}</h5>
                    <div className="col-lg-6 mb-3">
                        <input className="form-control ps-3" type={getUser ? 'text' : 'hidden'} name="author" id="author" value={getUserName} readOnly />
                    </div>
                    <div className="col-lg-6">
                        <input className="form-control ps-3" type={getUser ? 'text' : 'hidden'} name="email" id="email" value={getEmailUser} readOnly />
                    </div>
                    <div className="col-lg-12 mt-3">
                        <button className="btn btn-lg btn-primary text-uppercase btn-rounded-none w-100" type="submit">Post Comment</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CommentBlog;