import { Link } from 'react-router-dom';
function ListCommentBlog(props) {
    let { dataComment } = props;
    const mainCommentData = dataComment.filter((value) => {
        return value.idComment == 0;
    });
    const subCommentData = dataComment.filter((value) => {
        return value.idComment != 0;
    });
    const fetchImage = (image) => {
        try {
            return require('../../images/' + image)
        } catch (err) {
            return require('../../images/logo.png')
        }
    }
    function fetchMainComment() {
        if (mainCommentData) {
            return mainCommentData.map((value, key) => {
                return (
                    <div key={key}>
                        <article className="comment-item d-flex flex-wrap mb-3" >
                            <div className="col-lg-1 col-sm-3 me-4 mb-3">
                                <img src={fetchImage(value.imageUser)} alt="Default" className="img-fluid rounded-circle" />
                            </div>
                            <div className="col-lg-10 col-sm-9 author-wrap">
                                <div className="author-post">
                                    <div className="comment-meta d-flex">
                                        <h4 className="author-name text-dark pe-1">{value.nameUser}</h4>
                                        <span className="meta-date text-muted">{value.createdAt}</span>
                                    </div>
                                    <p className="no-margin">{value.comment}</p>
                                    <div className="comments-reply">
                                        <Link to="#" id={value.id} onClick={props.handleReplyComment} className="text-decoration-underline text-dark"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M205 34.8c11.5 5.1 19 16.6 19 29.2v64H336c97.2 0 176 78.8 176 176c0 113.3-81.5 163.9-100.2 174.1c-2.5 1.4-5.3 1.9-8.1 1.9c-10.9 0-19.7-8.9-19.7-19.7c0-7.5 4.3-14.4 9.8-19.5c9.4-8.8 22.2-26.4 22.2-56.7c0-53-43-96-96-96H224v64c0 12.6-7.4 24.1-19 29.2s-25 3-34.4-5.4l-160-144C3.9 225.7 0 217.1 0 208s3.9-17.7 10.6-23.8l160-144c9.4-8.5 22.9-10.6 34.4-5.4z" /></svg> Reply Now</Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                        {fetchSubComment(value.id)}
                    </div>
                )
            })
        }
    }
    function fetchSubComment(idComment) {
        if (subCommentData) {
            return subCommentData.map((value, key) => {
                if (value.idComment == idComment) {
                    return (
                        <article className="comment-item d-flex child-comments flex-wrap ps-5 mb-3" key={key}>
                            <div className="col-lg-1 col-sm-3 me-4 mb-3">
                                <img src={fetchImage(value.imageUser)} alt="Default" className="img-fluid rounded-circle" />
                            </div>
                            <div className="col-lg-10 col-sm-9 author-wrap">
                                <div className="author-post">
                                    <div className="comment-meta d-flex">
                                        <h4 className="author-name text-dark pe-1">{value.nameUser}</h4>
                                        <span className="meta-date text-muted">{value.createdAt}</span>
                                    </div>
                                    <p className="no-margin">{value.comment}</p>
                                </div>
                            </div>
                        </article>
                    )
                }
                return null;
            })
        }
    }
    const quantityComment = () => {
        if (dataComment.length > 0) {
            return dataComment.length;
        }
        return 0;
    }
    return (
        <section id="post-comment">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="comments-wrap">
                            <h2 className="display-6 fw-normal text-dark my-5">
                                <span className="count">{quantityComment()}</span> Comments
                            </h2>
                            <div className="comment-list padding-small">
                                {fetchMainComment()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ListCommentBlog;