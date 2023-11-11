import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function ShopPagination(props) {
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
                <div className="pagination loop-pagination d-flex justify-content-center align-items-center">
                    {/* <Link to="#" disabled={page === 1} onClick={() => changePage(page - 1)}>❮</Link> */}
                    {[...Array(totalPages)].map((_, index) => (
                        <Link
                            key={index}
                            to={`#page-${index + 1}`}
                            className={index + 1 === page ? 'active' : ''}
                            onClick={() => changePage(index + 1)}
                        >
                            {index + 1}
                        </Link>
                    ))}
                    {/* <Link to="#" disabled={page === totalPages} onClick={() => changePage(page + 1)}>❯</Link> */}
                </div>
            </nav>
        </div>
    )
}
export default ShopPagination;