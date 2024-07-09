import React from 'react';
import PropTypes from 'prop-types';
import '../components/paginations.css';
const Paginations = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= Math.floor(maxPagesToShow / 2)) {
      for (let i = 1; i <= maxPagesToShow; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...', totalPages);
    } else if (currentPage > totalPages - Math.floor(maxPagesToShow / 2)) {
      pageNumbers.push(1, '...');
      for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1, '...');
      for (let i = currentPage - Math.floor(maxPagesToShow / 2); i <= currentPage + Math.floor(maxPagesToShow / 2); i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...', totalPages);
    }
  }

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'disabled' : ''}>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          First
        </button>
      </li>
      <li className={currentPage === 1 ? 'disabled' : ''}>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
      </li>
      {pageNumbers.map((page, index) => (
        <li key={index} className={page === currentPage ? 'active' : ''}>
          {page === '...' ? (
            <span>...</span>
          ) : (
            <button onClick={() => onPageChange(page)}>{page}</button>
          )}
        </li>
      ))}
      <li className={currentPage === totalPages ? 'disabled' : ''}>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </li>
      <li className={currentPage === totalPages ? 'disabled' : ''}>
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
          Last
        </button>
      </li>
    </ul>
  );
};

Paginations.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginations;
