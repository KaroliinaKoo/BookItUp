import React from "react";
import { useContext } from "react";
import { VolumeContext, VolumeTypes } from "../context/VolumeContext";
import BookItem from "../components/BookItem";

const BookList = ({ searchCount }: any) => {
  const context = useContext(VolumeContext);

  if (!context) {
    throw new Error("DataContext not found");
  }

  const { searchResults, listIsLoading } = context;

  // const options: OrderByTypes[] = ["relevance", "newest"];
  //type OrderByTypes = "newest" | "relevance";

  if (listIsLoading) {
    return (
      <div className="spinner" role="status" aria-label="Loading results" />
    );
  }

  if (!listIsLoading && searchResults.items.length > 0) {
    return (
      <>
        <div>{searchResults.items.length} results found</div>

        {searchResults.items.map((item: VolumeTypes) => (
          <BookItem key={item.id} item={item} />
        ))}
      </>
    );
  }
  if (searchCount.current > 0 && !listIsLoading) {
    return <div>No results</div>;
  }
  return <></>;
};

export default BookList;

/* <div className="sort-by">
            <label htmlFor="sort">Order by:</label>
            <select
              name="sort"
              id="sort"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value as OrderByTypes)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>

            <label htmlFor="max-results">Max results:</label>
            <select
              name="max-results"
              id="max-results"
              value={maxResults}
              onChange={(e) =>
                setMaxResults(Number(e.target.value) as MaxResultsTypes)
              }
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select> 
          </div>*/
