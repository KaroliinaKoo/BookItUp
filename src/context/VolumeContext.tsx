import { createContext, useEffect } from "react";
import React, { useState } from "react";
import {
  formatVolumeDataList,
  VolumeFormattedType,
} from "../queries/utils/formatVolumeData";
import formatVolumeQuery, {
  QueryOptionsType,
} from "../queries/utils/formatVolumeQuery";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const queryInitialOptions: QueryOptionsType = {
    keywords: "",
    title: "",
    author: "",
    publisher: "",
    category: "",
    language: "en",
    maxResults: 40,
    orderBy: "relevance",
    startIndex: 0,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [volumeList, setVolumeList] = useState<VolumeContextType["volumeList"]>(
    {
      totalItems: null,
      items: [],
    }
  );
  const [queryOptions, setQueryOptions] = useState(queryInitialOptions);
  const [error, setError] = useState<string>("");

  const resetSearch = () => {
    setQueryOptions(queryInitialOptions);
    setError("");
    setVolumeList({ totalItems: null, items: [] });
  };

  useEffect(() => {
    resetSearch();
  }, [location]);

  const validateQueryOptions = (options: QueryOptionsType) => {
    const { keywords, title, author, publisher, category } = options;
    if (!title && !author && !publisher && !category && keywords!.length < 2) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!validateQueryOptions(queryOptions)) {
      return;
    }
    (async () => {
      setError("");
      setVolumeList({ totalItems: null, items: [] });
      setIsLoading(true);
      try {
        const response = await fetch(formatVolumeQuery(queryOptions));
        const data = await response.json();
        setVolumeList({
          totalItems: data.totalItems,
          items: formatVolumeDataList(data.items),
        });
      } catch (error: any) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, [queryOptions]);

  return (
    <VolumeContext.Provider
      value={{
        volumeList,
        isLoading,
        queryOptions,
        setQueryOptions,
        resetSearch,
        validateQueryOptions,
        error,
      }}
    >
      {children}
    </VolumeContext.Provider>
  );
};

export type VolumeContextType = {
  validateQueryOptions: (options: QueryOptionsType) => boolean;
  isLoading: boolean;
  volumeList: {
    totalItems: number | null;
    items: VolumeFormattedType[];
  };
  queryOptions: QueryOptionsType;
  setQueryOptions: (options: QueryOptionsType) => void;
  error: any;
  resetSearch: () => void;
};
