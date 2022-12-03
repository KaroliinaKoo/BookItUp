import React from "react";
import { useContext } from "react";
import { VolumeContext, FormattedVolumeType } from "../context/VolumeContext";
import BookItem from "../components/BookItem";

const BookList = ({ searchCount }: any) => {
  const context = useContext(VolumeContext);

  if (!context) {
    throw new Error("DataContext not found");
  }

  const { isLoading, volumeList } = context;

  if (isLoading) {
    return (
      <div className="spinner" role="status" aria-label="Loading results" />
    );
  }

  if (!isLoading && volumeList.items.length > 0) {
    return (
      <>
        <div>{volumeList.items.length} results found</div>

        {volumeList.items.map((item: FormattedVolumeType) => (
          <BookItem key={item.id} item={item} />
        ))}
      </>
    );
  }
  if (searchCount.current > 0 && !isLoading) {
    return <div>No results</div>;
  }
  return <></>;
};

export default BookList;
