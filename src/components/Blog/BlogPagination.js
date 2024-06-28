import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function BlogPagination(props) {
    let { products } = props;
    const [page, setPage] = useState(1);
    const pageSize = 8;

    const totalPages = Math.ceil(products.length / pageSize);

    function changePage(newPage) {
        setPage(newPage);
    }

    function getProductsOfCurrentPage() {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return products.slice(startIndex, endIndex);
    }
    return (
<div>
    <div className="product-grid row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
        {props.renderProducts(getProductsOfCurrentPage())}
    </div>
    <nav className="navigation paging-navigation text-center py-4" role="navigation">
        <ul className="pagination loop-pagination justify-content-center align-items-center">
            {/* Uncomment and style previous button */}
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <Link className="page-link" to="#" onClick={() => changePage(page - 1)}>❮</Link>
            </li>
            {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${index + 1 === page ? 'active' : ''}`}>
                    <Link
                        className="page-link"
                        to={`#page-${index + 1}`}
                        onClick={() => changePage(index + 1)}
                    >
                        {index + 1}
                    </Link>
                </li>
            ))}
            {/* Uncomment and style next button */}
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <Link className="page-link" to="#" onClick={() => changePage(page + 1)}>❯</Link>
            </li>
        </ul>
    </nav>
</div>

    )
}
export default BlogPagination;