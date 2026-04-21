"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalItems, itemsPerPage = 10 }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number.parseInt(searchParams.get("page"), 10) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", String(nextPage));
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Prev
      </button>

      {getPageNumbers()[0] > 1 && (
        <>
          <button className="page-btn" onClick={() => handlePageChange(1)}>1</button>
          {getPageNumbers()[0] > 2 && <span className="page-dots">...</span>}
        </>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`page-btn ${currentPage === page ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
        <>
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
            <span className="page-dots">...</span>
          )}
          <button className="page-btn" onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        className="page-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
