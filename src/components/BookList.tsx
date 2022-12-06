import React from "react";
import { useContext } from "react";
import { VolumeContext } from "../context/VolumeContext";
import { VolumeFormattedType } from "../queries/utils/formatVolumeData";
import BookItem from "./BookListItem";

type PropTypes = {
  searchIsActive: boolean;
};
const BookList = ({ searchIsActive }: PropTypes) => {
  const context = useContext(VolumeContext);

  if (!context) {
    throw new Error("DataContext not found");
  }

  const { isLoading, volumeList } = context;

  if (searchIsActive && isLoading) {
    return (
      <div className="spinner" role="status" aria-label="Loading results" />
    );
  }

  if (searchIsActive && !isLoading && volumeList.items.length > 0) {
    return (
      <>
        <div>{volumeList.items.length} results found</div>

        {volumeList.items.map((item: VolumeFormattedType) => (
          <BookItem key={item.id} item={item} />
        ))}
      </>
    );
  }
  if (searchIsActive && !isLoading) {
    return <div>No results</div>;
  }
  return <></>;
};

export default BookList;
