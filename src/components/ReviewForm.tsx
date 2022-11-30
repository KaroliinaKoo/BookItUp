import React, { useEffect, useState, useContext } from "react";
import RatingSelector from "./RatingSelector";
import { ReviewContext } from "../context/ReviewContext";
import AlertContext from "../context/AlertContext";
import { useNavigate } from "react-router-dom";
import User from "../modules/user";
import { ReviewDataTypes } from "../queries/DataTypes";
import { getUUID } from "../utils/uuid";
import { getYear } from "../utils/getYear";
import { truncate } from "../utils/truncate";
import { FaSearch } from "react-icons/fa";
import { sanitizeString } from "../utils/sanitizeString";

function ReviewForm() {
  const navigate = useNavigate();

  const reviewContext = useContext(ReviewContext);
  const alertContext = useContext(AlertContext);

  if (!reviewContext) {
    throw new Error("ReviewContext not found");
  }
  if (!alertContext) {
    throw new Error("AlertContext not found");
  }

  const { addItem, updateItem, itemIsEditing, cancelEdit } = reviewContext;
  const { showAlert } = alertContext;

  useEffect(() => {
    if (itemIsEditing.isEditing && itemIsEditing.item) {
      setVolumeID(itemIsEditing.item.volumeID);
      setBody(itemIsEditing.item.body);
      setRating(itemIsEditing.item.rating);
    }
  }, [itemIsEditing]);

  const [listIsLoading, setListIsLoading] = useState(false);
  const [titleQuery, setTitleQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any>({});
  const [volumeData, setVolumeData] = useState<any>({});
  const [volumeID, setVolumeID] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setListIsLoading(true);

    const fetchVolumes = async (params: string) => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${params}&filter=ebooks&orderBy=relevance&startIndex=0&maxResults=10&printType=BOOKS`
      );
      //&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}
      const data = await response.json();

      if (data.totalItems) {
        setSearchResults({
          totalItems: data.totalItems,
          items: data.items.map((item: any) => {
            return {
              id: item.id || "",
              title: item.volumeInfo.title || "Unknown title",
              author: item.volumeInfo.authors || "Unknown author",
            };
          }),
        });
      }
      setListIsLoading(false);
    };
    if (titleQuery.length > 0) {
      fetchVolumes(titleQuery);
    }
  }, [titleQuery]);

  useEffect(() => {
    if (volumeID) {
      const fetchVolume = async (id: string) => {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        const data = await response.json();
        setVolumeData(data.volumeInfo);
        console.log(data);
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
        username: User.getName(),
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
    setTitleQuery("");
    setVolumeID("");
    setBody("");
    setRating(0);
  };

  const handleCancel = () => {
    cancelEdit();
    reset();
    navigate("/dashboard");
  };

  /* let timer: any;
  const volumeSearchInput = document.querySelector("#volume-search");
  volumeSearchInput?.addEventListener("keyup", (e) => {
    const currentInput = e.target as HTMLInputElement;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (currentInput.value.length > 2) {
        setTitleQuery(currentInput.value);
      }
    }, 500);
  }); */

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
                {!titleQuery && <p>Search for a book by title or author</p>}
              </label>
              <input
                type="text"
                name="volume-search"
                id="volume-search"
                value={titleQuery}
                onChange={(e) => setTitleQuery(e.target.value)}
              />
            </div>
            <div className="input-group keyword-search custom-select">
              {titleQuery && listIsLoading && <p>Loading...</p>}
              {titleQuery && !listIsLoading && searchResults.items && (
                <select
                  name="volumeID"
                  id="volumeID"
                  onChange={(e) => setVolumeID(e.target.value)}
                >
                  <option value="">Select a book</option>
                  {searchResults.items.map((item: any) => (
                    <option value={item.id}>
                      {item.title && sanitizeString(truncate(item.title, 30))}
                      {item.author &&
                        ` (${sanitizeString(item.author[0]) ?? "Unknown"})`}
                    </option>
                  ))}
                </select>
              )}
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
