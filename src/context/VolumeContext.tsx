import { createContext, useEffect } from "react";
import React, { useState } from "react";
import formatVolumeData, {
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
    projection: "full",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState<VolumeContextType["volume"]>();
  const [volumeID, setVolumeID] = useState<string>("");
  const [volumeList, setVolumeList] = useState<VolumeContextType["volumeList"]>(
    {
      totalItems: null,
      items: [],
    }
  );

  const [queryOptions, setQueryOptions] = useState(queryInitialOptions);
  const [error, setError] = useState<VolumeContextType["error"]>(null);

  const resetQueryOptions = () => {
    setQueryOptions(queryInitialOptions);
  };

  useEffect(() => {
    setVolumeID("");
    resetQueryOptions();
  }, [location]);

  useEffect(() => {
    setVolume(undefined);
    const fetchVolumeByID = async () => {
      console.log(volumeID);
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
      fetchVolumeByID();
      setError(null);
    }
    if (!volumeID) {
      setError("No volume ID provided");
    }
  }, [volumeID, location]);

  useEffect(() => {
    setVolumeList({ totalItems: null, items: [] });

    const fetchVolumeList = async () => {
      console.log(queryOptions);
      setIsLoading(true);
      try {
        const response = await fetch(formatVolumeQuery(queryOptions));
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
      (queryOptions.keywords && queryOptions.keywords.length > 1) ||
      queryOptions.title ||
      queryOptions.author ||
      queryOptions.publisher ||
      queryOptions.category
    ) {
      fetchVolumeList();
      setError(null);
    } else {
      setError("Please enter at least 2 characters, or select a filter.");
    }
  }, [queryOptions]);

  return (
    <VolumeContext.Provider
      value={{
        volume,
        volumeList,
        isLoading,
        volumeID,
        setVolumeID,
        queryOptions,
        setQueryOptions,
        error,
        resetQueryOptions,
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
    items: VolumeFormattedType[];
  };
  volumeID: string;
  setVolumeID: (volumeID: string) => void;
  queryOptions: QueryOptionsType;
  setQueryOptions: (options: QueryOptionsType) => void;
  error: any;
  resetQueryOptions: () => void;
};
