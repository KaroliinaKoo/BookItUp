import React, { useState } from "react";
import BookList from "../../components/volumes/BookList";
import BookSearch from "./BookSearch";
import { FaChevronUp } from "react-icons/fa";
import useFetchVolumeList from "../../hooks/useFetchVolumeList";

function FindBooks() {
  const {
    isLoading,
    volumeList,
    queryOptions,
    setQueryOptions,
    resetSearchResults,
    message,
    queryIsValid,
    fetchVolumes,
    initialQueryOptions,
  } = useFetchVolumeList();

  const [showScroll, setShowScroll] = useState(false);

  const scrollEvent = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (e.currentTarget.scrollTop > 500) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    document.getElementsByClassName("container")[0].scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container" onScroll={scrollEvent}>
      <h1>Find Books</h1>
      <BookSearch
        setQueryOptions={setQueryOptions}
        resetSearchResults={resetSearchResults}
        queryOptions={queryOptions}
        queryIsValid={queryIsValid}
        initialQueryOptions={initialQueryOptions}
        fetchVolumes={fetchVolumes}
      />

      <div className={`message-container ${message.type}`}>
        {message.text && <p className={`${message.type}`}>{message.text}</p>}
      </div>
      {isLoading ? (
        <div className="spinner" role="status" aria-label="Loading book list" />
      ) : (
        <BookList volumeList={volumeList} />
      )}

      {showScroll && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaChevronUp />
        </button>
      )}
    </div>
  );
}
export default FindBooks;
