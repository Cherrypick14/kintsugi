import React from 'react';

import '../styles/dao.css';

const Pagination = ({ totalPages, currentPage, onPageChange }) => (
  <div className="pagination">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => onPageChange(index + 1)}
        className={currentPage === index + 1 ? 'active' : ''}
        aria-label={`Page ${index + 1}`}
      >
        {index + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
