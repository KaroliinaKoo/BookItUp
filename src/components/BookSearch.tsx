import React, { useContext, useEffect, useState } from "react";
import { VolumeContext } from "../context/VolumeContext";
import {
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaExclamationCircle,
} from "react-icons/fa";
import { languages } from "../data/lang";
import { subjectHeadingsList } from "../data/subjectHeadingsList";

type PropTypes = {
  searchIsActive: boolean;
  setSearchIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function BookSearch({ searchIsActive, setSearchIsActive }: PropTypes) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const context = useContext(VolumeContext);
  if (!context) {
    throw new Error("DataContext not found");
  }
  const { queryOptions, setQueryOptions, error, resetQueryOptions } = context;
  const [searchTerms, setSearchTerms] = useState({ ...queryOptions });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchTerms);
    setSearchIsActive(true);
    setQueryOptions(searchTerms);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchTerms({ ...searchTerms, [name]: value });
  };

  useEffect(() => {
    const fields = document.querySelectorAll("input, select");

    if (searchIsActive && error && fields) {
      for (let i = 0; i < fields.length; i++) {
        fields[i].classList.add("error");
      }
    }
    if (!error && fields) {
      for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove("error");
      }
    }
  }, [searchIsActive, error]);

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
              {!searchTerms.keywords && <p>Enter a keyword or a phrase</p>}
            </label>
            <input type="text" name="keywords" onChange={handleChange} />
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
              Filter Options
            </button>
            <div
              className="advanced-search-options"
              style={{ display: showAdvanced ? "block" : "none" }}
            >
              <div className="input-group">
                <label htmlFor="title">Book Title</label>
                <input type="text" name="title" onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="author">Author</label>
                <input type="text" name="author" onChange={handleChange} />
              </div>
              <div className="input-group">
                <label htmlFor="publisher">Publisher</label>
                <input type="text" name="publisher" onChange={handleChange} />
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
                  value={searchTerms.language}
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
                  resetQueryOptions();
                }}
              >
                <FaTimes /> Clear all fields
              </button>
            </div>
          </div>
          {searchIsActive && error && (
            <p className="error form-error">
              <FaExclamationCircle />
              {error || error.message || "An error occurred"}
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
