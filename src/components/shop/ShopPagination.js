import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function ShopPagination(props) {
    let { products } = props;
    const [page, setPage] = useState(1);
    const pageSize = 12;
    const visiblePages = 5;

    const totalPages = Math.max(1, Math.ceil(products.length / pageSize));

    useEffect(() => {
        setPage(1);
    }, [products]);

    function changePage(newPage, event) {
        if (event) event.preventDefault();
        const nextPage = Math.min(Math.max(newPage, 1), totalPages);
        setPage(nextPage);
    }

    function getProductsOfCurrentPage() {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return products.slice(startIndex, endIndex);
    }

    function getPaginationRange() {
        const startPage = Math.max(2, page - Math.floor(visiblePages / 2));
        const endPage = Math.min(totalPages - 1, page + Math.floor(visiblePages / 2));
        let range = [1];

        if (startPage > 2) {
            range.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            range.push(i);
        }

        if (endPage < totalPages - 1) {
            range.push('...');
        }

        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    }
    return (
        <div>
            <div className="product-grid row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
                {props.renderProducts(getProductsOfCurrentPage())}
            </div>
            <nav className="navigation paging-navigation text-center py-4" role="navigation">
                <ul className="pagination loop-pagination justify-content-center align-items-center">
                    {/* Nút trang trước */}
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <Link className="page-link" to="#" onClick={(event) => changePage(page - 1, event)} aria-label="Previous page">❮</Link>
                    </li>
                    {getPaginationRange().map((pageNum, index) => (
                        <li key={index} className={`page-item ${pageNum === page ? 'active' : ''} ${pageNum === '...' ? 'disabled' : ''}`}>
                            <Link
                                className="page-link"
                                to={`#page-${pageNum}`}
                                onClick={(event) => pageNum !== '...' && changePage(pageNum, event)}
                            >
                                {pageNum}
                            </Link>
                        </li>
                    ))}
                    {/* Nút trang sau */}
                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                        <Link className="page-link" to="#" onClick={(event) => changePage(page + 1, event)} aria-label="Next page">❯</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
export default ShopPagination;
