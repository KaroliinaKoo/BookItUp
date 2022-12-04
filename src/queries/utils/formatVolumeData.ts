import { sanitizeString } from "../../utils/sanitizeString";
import { langCodeToString } from "../../utils/langCodeToString";
import { getYear } from "../../utils/getYear";

const formatVolumeData: (data: any) => VolumeFormattedType[] = (data: any) => {
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

export default formatVolumeData;
