import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        };
    }

    handleClick = (page) => {
        if (page >= 1 && page <= this.props.totalPages) {
            this.setState({ currentPage: page });
            if (this.props.onPageChange) {
                this.props.onPageChange(page);
            }
        }
    };

    render() {
        const { currentPage } = this.state;
        const { totalPages } = this.props;

        // Get the range of page numbers to display
        const startPage = Math.max(1, currentPage - 3);
        const endPage = Math.min(totalPages, currentPage + 3);

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <Link
                            className="page-link"
                            to={`/blog/page/${currentPage > 1 ? currentPage - 1 : 1}`}
                            aria-label="Previous"
                            onClick={() => this.handleClick(currentPage - 1)}
                        >
                            <span aria-hidden="true">«</span>
                        </Link>
                    </li>
                    {pageNumbers.map((page) => (
                        <li
                            key={page}
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                            <Link
                                className="page-link"
                                to={`/blog/page/${page}`}
                                onClick={() => this.handleClick(page)}
                            >
                                {page}
                            </Link>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <Link
                            className="page-link"
                            to={`/blog/page/${currentPage < totalPages ? currentPage + 1 : totalPages}`}
                            aria-label="Next"
                            onClick={() => this.handleClick(currentPage + 1)}
                        >
                            <span aria-hidden="true">»</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;
