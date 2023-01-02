import { useEffect, useState } from "react";
import {
  formatVolumeDataList,
  VolumeFormattedType,
} from "../queries/utils/formatVolumeData";
import formatVolumeQuery, {
  QueryOptionsType,
} from "../queries/utils/formatVolumeQuery";

type QueryDataTypes = {
  totalItems: number;
  items: VolumeFormattedType[] | [];
};

export type FetchVolumeListType = {
  fetchVolumes: () => void;
  initialQueryOptions: QueryOptionsType;
  isLoading: boolean;
  message: { type: string; text: string };
  queryIsValid: boolean;
  queryOptions: QueryOptionsType;
  resetSearchResults: () => void;
  setQueryOptions: React.Dispatch<React.SetStateAction<QueryOptionsType>>;
  volumeList: QueryDataTypes;
};

const initialQueryOptions: QueryOptionsType = {
  keywords: "",
  title: "",
  author: "",
  publisher: "",
  category: "",
  language: "",
  maxResults: 20,
  orderBy: "relevance",
  startIndex: 0,
  fields:
    "&fields=items(id,volumeInfo(title,authors,publisher,categories,pageCount,publishedDate,description,imageLinks/*,language))",
};

const useFetchVolumeList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [volumeList, setVolumeList] = useState<QueryDataTypes>({
    totalItems: 0,
    items: [],
  });
  const [queryOptions, setQueryOptions] =
    useState<QueryOptionsType>(initialQueryOptions);
  const [message, setMessage] = useState({
    type: "info",
    text: "Search for books by keywords, title, author, publisher, or category.",
  });
  const [queryIsValid, setQueryIsValid] = useState(false);

  const resetSearchResults = () => {
    setVolumeList({ totalItems: 0, items: [] });
    setMessage({
      type: "info",
      text: "Search for books by keywords, title, author, publisher, or category.",
    });
  };

  useEffect(() => {
    if (!queryOptions) {
      return;
    }
    ((options: QueryOptionsType) => {
      const { keywords, title, author, publisher, category } = options;
      if (
        !title &&
        !author &&
        !publisher &&
        !category &&
        keywords!.length < 2
      ) {
        setQueryIsValid(false);
      } else {
        setQueryIsValid(true);
      }
    })(queryOptions);
  }, [queryOptions]);

  const fetchVolumes = () => {
    (async () => {
      if (!queryIsValid || !queryOptions) {
        return;
      }
      setMessage({ type: "", text: "" });
      setIsLoading(true);
      try {
        const response = await fetch(formatVolumeQuery(queryOptions));
        const data = await response.json();

        if (data.items === undefined) {
          setMessage({
            type: "warning",
            text: "No results found. Please try again with different keywords.",
          });
          setVolumeList({ totalItems: 0, items: [] });
          setIsLoading(false);
          return;
        } else {
          setMessage({
            type: "success",
            text: `Found ${data.items.length} result(s).`,
          });
          setVolumeList({
            totalItems: data.totalItems,
            items: formatVolumeDataList(data.items),
          });
          setIsLoading(false);
        }
      } catch (error: any) {
        console.log(error);
        setMessage({ type: "error", text: error.message });
      }
    })();
  };

  return {
    fetchVolumes,
    initialQueryOptions,
    isLoading,
    message,
    queryIsValid,
    queryOptions,
    resetSearchResults,
    setQueryOptions,
    volumeList,
  };
};

export default useFetchVolumeList;
