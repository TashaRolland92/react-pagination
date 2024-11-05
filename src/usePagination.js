import { useMemo } from 'react';

export const DOTS = "...";

const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage
}) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);

        // Page count is determined based on siblingCount, firstPage, lastPage, currentPage and ellipsis
        const totalPageNumbers = siblingCount + 5;

        // Case 1: When the total page numbers are less than the total page count
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        // Calculate left and right sibling index
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        // We do not show the ellipsis if there are no gaps between the page numbers
        const shouldShowLeftEllipsis = leftSiblingIndex > 2;
        const shouldShowRightEllipsis = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        // Case 1: No left ellipsis, but a right ellipsis is shown
        if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            const leftRange = range(1, 3 + 2 * siblingCount); // Display up to `3 + 2 * siblingCount` pages
            return [...leftRange, 'DOTS', lastPageIndex];
        }

        // Case 2: No right ellipsis, but a left ellipsis is shown
        if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
            const rightRange = range(totalPageCount - (3 + 2 * siblingCount) + 1, totalPageCount);
            return [firstPageIndex, 'DOTS', ...rightRange];
        }

        // Case 3: Both left and right ellipses are shown
        if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
        }

    }, [totalCount, siblingCount, pageSize, currentPage]);

    return paginationRange;
};