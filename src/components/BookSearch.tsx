import React, { useContext, useState } from "react";
import { VolumeContext } from "../context/VolumeContext";
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { languages } from "../data/lang";
import { subjectHeadingsList } from "../data/subjectHeadingsList";

function BookSearch({ searchCount }: any) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const context = useContext(VolumeContext);
  if (!context) {
    throw new Error("DataContext not found");
  }
  const { keywords, setKeywords, queryOptions, setQueryOptions, error } =
    context;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    searchCount.current = searchCount.current + 1;
    setShowAdvanced(false);
    handleSearch();
  };

  const handleSearch = () => {
    setQueryOptions({ ...queryOptions, startIndex: 0 });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQueryOptions({ ...queryOptions, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="volumes-search">
        <form
          name="volumes-search-form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="input-group keyword-search">
            <label htmlFor="includes">
              <FaSearch />
              {!keywords && <p>Enter a keyword or a phrase</p>}
            </label>
            <input
              type="text"
              name="includes"
              onChange={(e) => setKeywords(e.target.value)}
              className={error ? "error" : ""}
            />
          </div>
          <div className="advanced-search">
            <button
              className="btn-link advanced-search-btn"
              aria-label="Toggle advanced search options"
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? (
                <FaChevronUp aria-label="Hide" />
              ) : (
                <FaChevronDown aria-label="Show" />
              )}
              Advanced Search
            </button>
            <div
              className="advanced-search-options"
              style={{ display: showAdvanced ? "block" : "none" }}
            >
              <div className="input-group">
                <label htmlFor="title">Book Title</label>
                <input
                  className={error ? "error" : ""}
                  type="text"
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  name="author"
                  onChange={handleChange}
                  className={error ? "error" : ""}
                />
              </div>
              <div className="input-group">
                <label htmlFor="publisher">Publisher</label>
                <input
                  type="text"
                  name="publisher"
                  onChange={handleChange}
                  className={error ? "error" : ""}
                />
              </div>
              <div className="input-group">
                <label htmlFor="category">Category</label>
                <select name="category" onChange={handleChange}>
                  <option value="">Select a category</option>
                  {subjectHeadingsList.sort().map((item) => (
                    <option key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="language">Language</label>
                <select
                  name="language"
                  onChange={handleChange}
                  value={queryOptions.language}
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
              <button
                className="reset btn-link"
                type="button"
                onClick={() => {
                  document.forms[0].reset();
                }}
              >
                <FaTimes /> Clear all fields
              </button>
            </div>
          </div>
          {error && (
            <p className="error form-error">
              {error.message || "An error occurred"}
            </p>
          )}

          <button className="btn btn-primary" type="submit">
            <FaSearch /> Search
          </button>
        </form>
      </div>
    </>
  );
}

export default BookSearch;
