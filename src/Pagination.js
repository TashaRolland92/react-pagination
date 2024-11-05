import React from "react";
import classnames from "classnames";
import { usePagination } from "./usePagination";
import './pagination.scss';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        totalCount,
        siblingCount,
        currentPage,
        pageSize
    });

    // If there is only one page, don't show pagination
    if (currentPage === 0 || paginationRange.length === 1) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return(
        <ul className={classnames('pagination-container', className)}>
            {/* Previous pagination btn */}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}>
                <button>Previous</button>
            </li>

            {paginationRange.map(pageNumber => {
                // If the page number is an ellipsis, render it as such
                if (pageNumber === 'DOTS') {
                    return <li className="pagination-item ellipsis" key={pageNumber}><button>...</button></li>;
                }

                // Render the page number
                return (
                    <li
                        className={classnames('pagination-item', {
                            selected: pageNumber === currentPage
                        })}
                        onClick={() => onPageChange(pageNumber)}
                        key={pageNumber}>
                        <button>{pageNumber}</button>
                    </li>
                )
            })}

            {/* Next pagination btn */}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}>
                <button>Next</button>
            </li>
        </ul>
    );
};

export default Pagination;