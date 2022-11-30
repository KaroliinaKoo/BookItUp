import React, { useState, createContext } from "react";

type VolumeContextTypes = {
  listIsLoading: boolean;
  handleReset: () => void;
  handleSearch: () => void;
  keywords: Record<KeywordsTypes, string>;
  setKeywords: React.Dispatch<
    React.SetStateAction<Record<KeywordsTypes, string>>
  >;
  startIndex: number;
  searchResults: SearchResultsTypes;
};

export type KeywordsTypes =
  | "includes"
  | "title"
  | "author"
  | "publisher"
  | "subject"
  | "language";

export type SearchResultsTypes = {
  totalItems: number | null;
  items: VolumeTypes[] | [];
};

export type VolumeTypes = {
  id: string;
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string;
  categories: string[];
  pageCount: number;
  language: string;
  imageLinks: Record<string, string>;
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

export const VolumeContext = createContext<VolumeContextTypes | null>(null);

// Provider

export const VolumeProvider = ({ children }: any) => {
  const [listIsLoading, setListIsLoading] = useState(false);
  const [keywords, setKeywords] = useState<VolumeContextTypes["keywords"]>({
    includes: "",
    title: "",
    author: "",
    publisher: "",
    subject: "",
    language: "en",
  });
  const startIndex = 0;
  const [searchResults, setSearchResults] = useState<
    VolumeContextTypes["searchResults"]
  >({
    totalItems: null,
    items: [],
  });

  const handleReset = () => {
    setKeywords({
      includes: "",
      title: "",
      author: "",
      publisher: "",
      subject: "",
      language: "en",
    });

    setSearchResults({
      totalItems: null,
      items: [],
    });
  };

  //FETCH

  const formatQuery = () => {
    let query = keywords.includes;
    query += keywords.title ? `+intitle:${keywords.title}` : "";
    query += keywords.author ? `+inauthor:${keywords.author}` : "";
    query += keywords.publisher ? `+inpublisher:${keywords.publisher}` : "";
    query += keywords.subject ? `+subject:${keywords.subject}` : "";
    query += keywords.language ? `&langRestrict=${keywords.language}` : "en";
    return query;
  };

  const handleSearch = () => {
    setListIsLoading(true);
    setSearchResults({ totalItems: null, items: [] });

    const fetchVolumes = async (params: string) => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${params}&filter=ebooks&orderBy=relevance&startIndex=${startIndex}&maxResults=40&printType=BOOKS`
      );
      //&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}
      const data = await response.json();

      if (data.totalItems) {
        setSearchResults({
          totalItems: data.totalItems,
          items: data.items.map((item: any) => {
            return {
              id: item.id,
              title: item.volumeInfo.title || "",
              subtitle: item.volumeInfo.subtitle || "",
              authors: item.volumeInfo.authors || "",
              publisher: item.volumeInfo.publisher || "",
              publishedDate: item.volumeInfo.publishedDate || "",
              description: item.volumeInfo.description || "",
              categories: item.volumeInfo.categories || "",
              pageCount: item.volumeInfo.pageCount || "",
              language: item.volumeInfo.language || "",
              imageLinks: item.volumeInfo.imageLinks || "",
            };
          }),
        });
      }
      setListIsLoading(false);
    };
    fetchVolumes(formatQuery());
  };

  return (
    <VolumeContext.Provider
      value={{
        handleSearch,
        listIsLoading,
        keywords,
        setKeywords,
        startIndex,
        searchResults,
        handleReset,
      }}
    >
      {children}
    </VolumeContext.Provider>
  );
};

export default VolumeProvider;
