import { createContext, useEffect } from "react";
import { sanitizeString } from "../utils/sanitizeString";
import { langCodeToString } from "../utils/langCodeToString";
import { getYear } from "../utils/getYear";
import React, { useState } from "react";

export const formatVolumeData: (data: any) => FormattedVolumeType[] = (
  data: any
) => {
  return data.items.map((item: any) => {
    return {
      id: item.id,
      title: item.volumeInfo.title || "Unknown Title",
      subtitle: item.volumeInfo.subtitle || "",
      authors: item.volumeInfo.authors
        ? [...item.volumeInfo.authors].join(", ")
        : ["Unknown Author"],
      publisher: item.volumeInfo.publisher || "Unknown Publisher",
      publishedDate: item.volumeInfo.publishedDate
        ? getYear(item.volumeInfo.publishedDate)
        : "Unknown Year",
      description: item.volumeInfo.description
        ? sanitizeString(item.volumeInfo.description)
        : "No description available.",
      category: item.volumeInfo.categories
        ? [...item.volumeInfo.categories].join(", ")
        : "-",
      pageCount: item.volumeInfo.pageCount || "-",
      language: item.volumeInfo.language
        ? langCodeToString(item.volumeInfo.language)
        : "-",
      imageLinks: item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks
        : { placeholder: "https://via.placeholder.com/128x193?text=No+Cover" },
    };
  });
};

export type FormattedVolumeType = {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  category: string[];
  pageCount: number;
  language: string;
  imageLinks: { [key: string]: any };
};

export const formatVolumeQuery = (
  keywords: string,
  queryOptions?: QueryOptionsType
) => {
  let query = `https://www.googleapis.com/books/v1/volumes?`;

  query += "q=" + keywords ?? "";

  if (queryOptions) {
    query += queryOptions.title ?? `+intitle:${queryOptions.title}`;
    query += queryOptions.author ?? `+inauthor:${queryOptions.author}`;
    query += queryOptions.publisher ?? `+inpublisher:${queryOptions.publisher}`;
    query += queryOptions.category ?? `+subject:${queryOptions.category}`;
    query += "&langRestrict=" + queryOptions.language;
    query += "&maxResults=" + queryOptions.maxResults;
    query += "&orderBy=" + queryOptions.orderBy;
    query += "&startIndex=" + queryOptions.startIndex;
    query += "&projection=" + queryOptions.projection;
    query += "&filter=ebooks&printType=BOOKS";
    // query += "&key=" + process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
  }
  console.log(query);
  return query;
};

/* ------ USING THE CONTEXT INSIDE THE APP -------------------------
This check is to make sure that the app is not crashing when the context is not available (and to keep linting happy)
----------------------------------------------------------------

 const context = useContext(VolumeContext);

if (!context) {
  throw new Error("VolumeContext not found");
}

const { **CONTEXT DATA** } = context;

*/

export const VolumeContext = createContext<VolumeContextType | null>(null);

export const VolumeProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState<VolumeContextType["volume"]>();
  const [volumeList, setVolumeList] = useState<VolumeContextType["volumeList"]>(
    {
      totalItems: null,
      items: [],
    }
  );
  const [volumeID, setVolumeID] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [queryOptions, setQueryOptions] = useState<QueryOptionsType>({
    title: "",
    author: "",
    publisher: "",
    category: "",
    language: "en",
    maxResults: 40,
    orderBy: "relevance",
    startIndex: 0,
    projection: "full",
  });
  const [error, setError] = useState<VolumeContextType["error"]>(null);

  useEffect(() => {
    setVolumeID(volumeID);

    const fetchVolumeByID = async (volumeID: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${volumeID}`
        );
        const data = await response.json();
        setVolume(data);
      } catch (error: any) {
        console.log(error);
        setError(error);
      }
      console.log(volumeID);
      setIsLoading(false);
    };

    if (volumeID) {
      fetchVolumeByID(volumeID);
    }
  }, [volumeID]);

  useEffect(() => {
    setVolumeList({ totalItems: null, items: [] });

    const fetchVolumeList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(formatVolumeQuery(keywords, queryOptions));
        const data = await response.json();
        if (data.items) {
          setVolumeList({
            totalItems: data.totalItems,
            items: formatVolumeData(data),
          });
        }
      } catch (error: any) {
        console.log(error);
        setError(error);
      }

      console.log(volumeList);
      setIsLoading(false);
    };

    if (
      keywords.length > 2 ||
      queryOptions.title ||
      queryOptions.author ||
      queryOptions.publisher ||
      queryOptions.category
    ) {
      fetchVolumeList();
    }
  }, [keywords, queryOptions]);

  return (
    <VolumeContext.Provider
      value={{
        volume,
        volumeList,
        isLoading,
        volumeID,
        setVolumeID,
        keywords,
        setKeywords,
        queryOptions,
        setQueryOptions,
        error,
      }}
    >
      {children}
    </VolumeContext.Provider>
  );
};

export type VolumeContextType = {
  isLoading: boolean;
  volume: {} | undefined;
  volumeList: {
    totalItems: number | null;
    items: FormattedVolumeType[];
  };
  volumeID: string;
  setVolumeID: (volumeID: string) => void;
  keywords: string;
  setKeywords: (keywords: string) => void;
  queryOptions: QueryOptionsType;
  setQueryOptions: (options: QueryOptionsType) => void;
  error: any;
};

export type QueryOptionsType = {
  title?: string;
  author?: string;
  publisher?: string;
  category?: string;
  language?: string;
  maxResults?: number;
  orderBy?: string;
  startIndex?: number;
  projection?: string;
};
