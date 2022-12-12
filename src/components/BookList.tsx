import React from "react";
import { VolumeFormattedType } from "../queries/utils/formatVolumeData";
import BookItem from "./BookItem";
import { FetchVolumeListType } from "../hooks/useFetchVolumeList";

type Props = {
  volumeList: FetchVolumeListType["volumeList"];
};

const BookList = ({ volumeList }: Props) => {
  if (volumeList.items.length > 0) {
    return (
      <>
        {volumeList!.items.map((item: VolumeFormattedType) => (
          <BookItem
            key={item.id}
            volumeData={item}
            fullDescription={false}
            isListItem={true}
          />
        ))}
      </>
    );
  }
  return <></>;
};

export default BookList;
