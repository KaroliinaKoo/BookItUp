import { useLayoutEffect, useState } from "react";
import { formatVolumeDataItem } from "../queries/utils/formatVolumeData";

const useFetchVolumeByID = (volumeID: string) => {
  const [volumeData, setVolumeData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${volumeID}`
        );
        const data = await response.json();
        setVolumeData(formatVolumeDataItem(data));
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, [volumeID]);

  return { volumeData, isLoading };
};

export default useFetchVolumeByID;
