import React from "react";

type PropTypes = {
  datalist: number;
  showResultsAmount: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

const Pagination = ({
  datalist,
  showResultsAmount,
  currentPage,
  handlePageChange,
}: PropTypes) => {
  const pages = Math.ceil(datalist / showResultsAmount);
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? "active" : ""}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

/*
type PropTypes = {
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  datalist: any;
  maxResults?: number;
};

const Pagination = ({
  startIndex,
  setStartIndex,
  datalist,
  maxResults = 10,
}: PropTypes) => {
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() =>
          setStartIndex(
            startIndex - maxResults < 0 ? 0 : startIndex - maxResults
          )
        }
        disabled={startIndex === 0}
      >
        Previous
      </button>
      <button
        className="pagination__button"
        onClick={() =>
          setStartIndex(
            startIndex + maxResults > datalist.totalItems
              ? startIndex
              : startIndex + maxResults
          )
        }
        disabled={startIndex + maxResults >= datalist.totalItems}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
*/
