const removeSpaces = (str: string) => {
  return str.replace(/\s+/g, " ").trim().replace(/ /g, "+");
};

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
      fields,
    } = queryOptions;

    query += keywords || title || author || publisher || category;
    query += title ? `+intitle:${title.replace(/ /g, "+")}` : "";
    query += author ? `+inauthor:${author.replace(/ /g, "+")}` : "";
    query += publisher ? `+inpublisher:${publisher.replace(/ /g, "+")}` : "";
    query += category ? `+subject:${category.replace(/ /g, "+")}` : "";
    query += language ? `&langRestrict=${language}` : "";
    query += "&maxResults=" + maxResults;
    query += "&orderBy=" + orderBy;
    query += "&startIndex=" + startIndex;
    query += "&filter=paid-ebooks&printType=BOOKS";
    // query += "&key=" + process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    query += "&fields=" + fields;
  }
  query = removeSpaces(query);
  return query;
};

export type QueryOptionsType = {
  keywords: string;
  title: string;
  author: string;
  publisher: string;
  category: string;
  language: string;
  maxResults: 10 | 20 | 30 | 40;
  orderBy: "relevance" | "newest";
  startIndex: number;
  fields: string;
};

export default formatVolumeQuery;
