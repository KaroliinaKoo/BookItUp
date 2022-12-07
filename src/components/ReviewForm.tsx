import React, { useEffect, useState, useContext } from "react";
import RatingSelector from "./RatingSelector";
import ReviewContext, { ReviewDataTypes } from "../context/ReviewContext";
import AlertContext from "../context/AlertContext";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getUUID } from "../utils/uuid";
import { getYear } from "../utils/getYear";
import { truncate } from "../utils/truncate";
import { FaSearch } from "react-icons/fa";
import { sanitizeString } from "../utils/sanitizeString";
import { languages } from "../data/lang";

type SearchBy = "title" | "author";

function ReviewForm() {
  const navigate = useNavigate();

  const reviewContext = useContext(ReviewContext);
  const alertContext = useContext(AlertContext);
  const userContext = useContext(UserContext);

  if (!reviewContext) {
    throw new Error("ReviewContext not found");
  }
  if (!alertContext) {
    throw new Error("AlertContext not found");
  }
  if (!userContext) {
    throw new Error("UserContext not found");
  }

  const { addItem, updateItem, itemIsEditing, cancelEdit } = reviewContext;
  const { showAlert } = alertContext;
  const { user } = userContext;

  useEffect(() => {
    if (itemIsEditing.isEditing && itemIsEditing.item) {
      setVolumeID(itemIsEditing.item.volumeID);
      setBody(itemIsEditing.item.body);
      setRating(itemIsEditing.item.rating);
    }
  }, [itemIsEditing]);

  const [listIsLoading, setListIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>({});
  const [volumeData, setVolumeData] = useState<any>({});
  const [volumeID, setVolumeID] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [keywords, setKeywords] = useState("");
  const [searchBy, setSearchBy] = useState<SearchBy>("title");
  const [searchByLanguage, setSearchByLanguage] = useState("en");

  // fetches the volume data from the Google Books API
  useEffect(() => {
    setListIsLoading(true);

    const query = (params: string) =>
      `https://www.googleapis.com/books/v1/volumes?q=${params}+in${searchBy}:${params}&langRestrict=${searchByLanguage}&filter=ebooks&orderBy=relevance&startIndex=0&maxResults=20&printType=BOOKS`;

    const fetchVolumes = async (query: string) => {
      const response = await fetch(query);
      const data = await response.json();

      if (data.totalItems) {
        setSearchResults({
          totalItems: data.totalItems,
          items: data.items.map((item: any) => {
            return {
              id: item.id,
              title: item.volumeInfo.title || "Unknown title",
              author: item.volumeInfo.authors || "Unknown author",
            };
          }),
        });
      }
      setListIsLoading(false);
    };

    if (keywords.length) {
      fetchVolumes(query(keywords));
    }
  }, [keywords, searchBy, searchByLanguage]);

  // fetches the volume data from the Google Books API by volumeID
  useEffect(() => {
    if (volumeID) {
      const fetchVolume = async (id: string) => {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const data = await response.json();
        setVolumeData(data.volumeInfo);
      };
      fetchVolume(volumeID);
    }
  }, [volumeID]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let currentTime = new Date().toJSON();

    if (volumeID && rating) {
      const newReview: ReviewDataTypes = {
        volumeID,
        body: sanitizeString(body, true),
        rating,
        date: currentTime,
        id: getUUID(),
        userID: user.id,
        username: user.username,
      };

      if (itemIsEditing.isEditing && itemIsEditing.item) {
        updateItem(itemIsEditing.item.id, newReview);
        showAlert("success", "Review updated successfully!");
      } else {
        addItem(newReview);
        showAlert("success", "Review submitted successfully!");
      }
      reset();
      navigate("/dashboard");
    } else {
      showAlert("error", "Error");
    }
  };

  const reset = () => {
    setVolumeID("");
    setBody("");
    setRating(0);
  };

  const handleCancel = () => {
    cancelEdit();
    reset();
    navigate("/dashboard");
  };

  return (
    <>
      <h1>{itemIsEditing.isEditing ? "Edit Review" : "Add a Review"}</h1>
      {!itemIsEditing.isEditing && (
        <div className="volumes-search">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            autoComplete="off"
          >
            <div className="input-group keyword-search">
              <label htmlFor="volume-search">
                <FaSearch />
                {!keywords && <p>Enter a keyword or phrase</p>}
              </label>
              <input
                type="text"
                name="volume-search"
                id="volume-search"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <div className="input-group keyword-search custom-select">
              {keywords && listIsLoading && <p>Loading...</p>}
              {keywords && !listIsLoading && searchResults.items && (
                <select
                  name="volumeID"
                  id="volumeID"
                  onChange={(e) => setVolumeID(e.target.value)}
                >
                  <option value="">Select a book</option>
                  {searchResults.items
                    .filter((item: any, index: number) => {
                      return (
                        searchResults.items.findIndex(
                          (item2: any) => item2.id === item.id
                        ) === index
                      );
                    })
                    .map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.title && sanitizeString(truncate(item.title, 30))}
                        {item.author &&
                          ` (${sanitizeString(item.author[0]) ?? "Unknown"})`}
                      </option>
                    ))}
                </select>
              )}
            </div>
            <div className="search-options">
              <fieldset>
                <legend>Search Options</legend>
                <fieldset className="radio-field">
                  <legend>Search by</legend>
                  <div
                    className={`input-group radio-input ${
                      searchBy === "title" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id="title"
                      name="searchBy"
                      value="title"
                      checked={searchBy === "title"}
                      onChange={(e) =>
                        setSearchBy((e.target.value as SearchBy) || "title")
                      }
                    />
                    <label htmlFor="title">Title</label>
                  </div>
                  <div
                    className={`input-group radio-input ${
                      searchBy === "author" ? "active" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id="author"
                      name="searchBy"
                      value="author"
                      checked={searchBy === "author"}
                      onChange={(e) =>
                        setSearchBy((e.target.value as SearchBy) || "title")
                      }
                    />
                    <label htmlFor="author">Author</label>
                  </div>
                </fieldset>
                <div className="input-group language-input">
                  <label htmlFor="language">Language</label>
                  <select
                    name="language"
                    value={searchByLanguage}
                    id="language"
                    onChange={(e) => setSearchByLanguage(e.target.value)}
                  >
                    {Object.entries(languages)
                      .sort((a, b) => a[1].localeCompare(b[1]))
                      .map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                  </select>
                </div>
              </fieldset>
            </div>
          </form>
        </div>
      )}
      {volumeID && (
        <form
          className="volume-review "
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {volumeID && (
            <section className="volume-info-card">
              <div className="volume-info-card-text">
                <div className="volume-title">
                  {volumeData.title && (
                    <h2 className="heading-title">
                      {volumeData.title ?? "No title"}
                    </h2>
                  )}
                  {volumeData.subtitle && (
                    <h3 className="subtitle">
                      {sanitizeString(volumeData.subtitle) ?? ""}
                    </h3>
                  )}
                  {volumeData.authors &&
                    (sanitizeString([...volumeData.authors].join(", ")) ??
                      "Unknown author")}
                  {volumeData.publishedDate && (
                    <span className="volume-year">
                      {" "}
                      {getYear(volumeData.publishedDate) ?? ""}
                    </span>
                  )}
                </div>

                {volumeData.description && (
                  <div className="volume-info-card-description">
                    <p>{sanitizeString(volumeData.description)}</p>
                  </div>
                )}
              </div>
              {volumeData && volumeData.imageLinks && (
                <img
                  className="volume-info-card-cover"
                  src={
                    volumeData.imageLinks.medium ??
                    volumeData.imageLinks.small ??
                    volumeData.imageLinks.thumbnail ??
                    ""
                  }
                  alt={`Cover of ${
                    sanitizeString(volumeData.title) ?? "the book"
                  }`}
                />
              )}
            </section>
          )}
          <section className="volume-review">
            <div className="input-group">
              <label htmlFor="body">
                Your Review (optional)
                <span aria-label="Characters left" className="character-count">
                  {2000 - body.length}/2000
                </span>
              </label>
              <textarea
                name="body"
                placeholder="What did you think about the book?"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={2000}
              />
            </div>
            <RatingSelector select={(rating) => setRating(rating)} />
            <div className="btn-container">
              {itemIsEditing.isEditing && (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    handleCancel();
                  }}
                >
                  Cancel
                </button>
              )}
              <button className="btn btn-primary" type="submit">
                {itemIsEditing.isEditing ? "Update Review" : "Submit Review"}
              </button>
            </div>
          </section>
        </form>
      )}
    </>
  );
}

export default ReviewForm;
