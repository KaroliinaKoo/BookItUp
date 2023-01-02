import React from "react";
import { VolumeFormattedType } from "../../queries/utils/formatVolumeData";
import BookItem from "./BookItem";
import { FetchVolumeListType } from "../../hooks/useFetchVolumeList";

type Props = {
  volumeList: FetchVolumeListType["volumeList"];
};

const BookList = ({ volumeList }: Props) => {
  if (volumeList.items.length > 0) {
    return (
      <>
        {volumeList.items.map((item: VolumeFormattedType) => (
          <BookItem key={item.id} layout="list-card" volumeData={item} />
        ))}
      </>
    );
  }
  return <></>;
};

export default BookList;
