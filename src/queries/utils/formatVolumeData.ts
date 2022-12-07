import { sanitizeString } from "../../utils/sanitizeString";
import { langCodeToString } from "../../utils/langCodeToString";
import { getYear } from "../../utils/getYear";

export const formatVolumeDataItem: (volume: any) => VolumeFormattedType = (
  volume: any
) => {
  return {
    id: volume.id,
    title: volume.volumeInfo.title || "Unknown Title",
    subtitle: volume.volumeInfo.subtitle || "",
    authors: volume.volumeInfo.authors || ["Unknown Author"],
    publisher: volume.volumeInfo.publisher || "Unknown Publisher",
    publishedDate: volume.volumeInfo.publishedDate
      ? getYear(volume.volumeInfo.publishedDate)
      : "",
    description: volume.volumeInfo.description
      ? sanitizeString(volume.volumeInfo.description)
      : "No description available.",
    category: volume.volumeInfo.categories || "-",
    pageCount: volume.volumeInfo.pageCount || "-",
    language: volume.volumeInfo.language
      ? langCodeToString(volume.volumeInfo.language)
      : "-",
    imageLinks: volume.volumeInfo.imageLinks
      ? volume.volumeInfo.imageLinks
      : { placeholder: "https://via.placeholder.com/128x193?text=No+Cover" },
  };
};

export const formatVolumeDataList: (data: any) => VolumeFormattedType[] = (
  data: any
) => {
  return data.map((volume: any) => {
    return formatVolumeDataItem(volume);
  });
};

export const formatStringArray = (array: string[]) => {
  return [...array].join(", ");
};

export type VolumeFormattedType = {
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
