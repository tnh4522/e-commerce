import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import RecentBlog from "../HomePage/RecentBlog";
import dataService from "../../services/dataService";
import { fallbackImage, getImageSrc } from "../utils/imageUtils";

function BlogDetail() {
    let { id } = useParams();
    const [getData, setData] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        dataService.getBlogDetail(id)
            .then(res => {
                const blogData = (res && res.data) ? res.data : res;
                setData(blogData);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    function fetchData() {
        if (loading) {
            return (
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Đang tải bài viết...</span>
                    </div>
                </div>
            );
        }

        if (getData) {
            const createMarkup = (html) => {
                return { __html: html };
            }
            return (
                <div>
                    <section className="py-5">
                        <div className="container">
                            <nav className="breadcrumb fs-6 mb-4">
                                <Link className="breadcrumb-item nav-link" to="/">Trang chủ</Link>
                                <Link className="breadcrumb-item nav-link" to="/blog">Bài viết</Link>
                                <span className="breadcrumb-item active" aria-current="page">Chi tiết</span>
                            </nav>
                            <div className="mt-3">
                                <div className="post-meta d-flex align-items-center text-muted mb-2">
                                    <span className="post-category">Ngày đăng: {getData.createdAt}</span>
                                    {getData.updatedAt && <span className="meta-date ms-2"> / Cập nhật: {getData.updatedAt}</span>}
                                    {getData.author && <span className="post-author ms-3 fw-semibold">Tác giả: {getData.author}</span>}
                                </div>
                                <h1 className="page-title display-5 fw-bold">{getData.title}</h1>
                            </div>
                        </div>
                    </section>
                    <div>
                        <div className="container">
                            <div className="row">
                                <main className="post-grid">
                                    <div className="row">
                                        <article className="post-item">
                                            <div className="post-content">
                                                <div className="post-thumbnail mb-5 text-center">
                                                    <img
                                                        src={getImageSrc(getData.image)}
                                                        alt={getData.title}
                                                        className="img-fluid rounded-4 shadow-sm"
                                                        style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
                                                        onError={(e) => { e.currentTarget.src = fallbackImage; }}
                                                    />
                                                </div>
                                                <div className="post-description py-3">
                                                    <p className="lead fs-5 text-secondary">
                                                        <strong>{getData.description}</strong>
                                                    </p>
                                                </div>
                                                <div className="container px-0">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="post-content fs-5" style={{ lineHeight: '1.8' }}>
                                                                <div className="post-description py-4" dangerouslySetInnerHTML={createMarkup(getData.content)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                    <RecentBlog />
                </div>
            )
        }

        return (
            <div className="container py-5 text-center">
                <h3>Không tìm thấy bài viết</h3>
                <Link to="/blog" className="btn btn-primary mt-3">Quay lại danh sách bài viết</Link>
            </div>
        );
    }

    return (
        <div>
            {fetchData()}
        </div>
    )
}
export default BlogDetail;
