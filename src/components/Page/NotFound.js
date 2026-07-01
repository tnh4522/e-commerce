import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <section className="py-5">
            <div className="container-fluid">
                <div className="empty-state text-center py-5">
                    <h1 className="page-title">Page not found</h1>
                    <p className="text-muted">The page you are looking for does not exist or may have moved.</p>
                    <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">
                        <Link to="/" className="btn btn-dark">Back to home</Link>
                        <Link to="/shop" className="btn btn-primary">Browse products</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
