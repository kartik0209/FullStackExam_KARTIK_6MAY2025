import './Pagination.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  
  const getPageNumbersToShow = () => {
    const delta = 2; 
    const range = [];
    const rangeWithDots = [];
    let l;
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }
    
    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    
    return rangeWithDots;
  };
  
  return (
    <div className="pagination-container">
      <nav className="pagination-nav" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button pagination-button-prev"
        >
          Previous
        </button>
        
        {getPageNumbersToShow().map((pageNumber, index) => (
          pageNumber === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="pagination-ellipsis"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${pageNumber}`}
              onClick={() => onPageChange(pageNumber as number)}
              className={`pagination-button pagination-button-page ${
                pageNumber === currentPage
                  ? 'pagination-button-active'
                  : ''
              }`}
            >
              {pageNumber}
            </button>
          )
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button pagination-button-next"
        >
          Next
        </button>
      </nav>
    </div>
  );
}