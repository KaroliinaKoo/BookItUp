const formatVolumeQuery = (queryOptions: QueryOptionsType) => {
  let query = `https://www.googleapis.com/books/v1/volumes?q=`;

  if (queryOptions) {
    const {
      keywords,
      title,
      author,
      publisher,
      category,
      language,
      maxResults,
      orderBy,
      startIndex,
    } = queryOptions;

    query += keywords ?? "";
    query += title ? `+intitle:${title}` : "";
    query += author ? `+inauthor:${author}` : "";
    query += publisher ? `+inpublisher:${publisher}` : "";
    query += category ? `+subject:${category}` : "";
    query += "&langRestrict=" + language;
    query += "&maxResults=" + maxResults;
    query += "&orderBy=" + orderBy;
    query += "&startIndex=" + startIndex;
    query += "&filter=ebooks&printType=BOOKS";
    // query += "&key=" + process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
  }
  return query;
};

export type QueryOptionsType = {
  keywords?: string;
  title?: string;
  author?: string;
  publisher?: string;
  category?: string;
  language?: string;
  maxResults: number;
  orderBy: string;
  startIndex: number;
};

export default formatVolumeQuery;
