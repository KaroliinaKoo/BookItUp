import React, { useState } from "react";
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { languages } from "../../data/lang";
import { subjectHeadingsList } from "../../data/subjectHeadingsList";
import { FetchVolumeListType } from "../../hooks/useFetchVolumeList";
import ClearInputBtn from "../../components/shared/ClearInputBtn";
import { truncate } from "../../utils/truncate";

type Props = {
  fetchVolumes: FetchVolumeListType["fetchVolumes"];
  initialQueryOptions: FetchVolumeListType["initialQueryOptions"];
  queryIsValid: FetchVolumeListType["queryIsValid"];
  queryOptions: FetchVolumeListType["queryOptions"];
  resetSearchResults: FetchVolumeListType["resetSearchResults"];
  setQueryOptions: FetchVolumeListType["setQueryOptions"];
};

function BookSearch({
  fetchVolumes,
  initialQueryOptions,
  queryIsValid,
  queryOptions,
  resetSearchResults,
  setQueryOptions,
}: Props) {
  const inputOptions = [
    "keywords",
    "title",
    "author",
    "publisher",
    "category",
    "language",
  ];
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAdvanced(false);
    fetchVolumes();
  };

  const handleInputClear = (fieldName: string) => {
    setQueryOptions((prevOptions) => ({ ...prevOptions, [fieldName]: "" }));
    document.getElementsByTagName("input")[
      inputOptions.indexOf(fieldName)
    ].value = "";
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQueryOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };
  return (
    <>
      <div className="volumes-search">
        <form
          autoComplete="off"
          name="volumes-search-form"
          onSubmit={handleSubmit}
        >
          <div className="input-group keyword-search">
            <label htmlFor="includes">
              <FaSearch />
              {!queryOptions.keywords && <>Enter a keyword or a phrase</>}
            </label>
            <input type="text" name="keywords" onChange={handleChange} />
            <ClearInputBtn
              display={!!queryOptions.keywords}
              fieldName="keywords"
              handleClick={handleInputClear}
            />
          </div>

          <div className="advanced-search">
            <button
              aria-label="Toggle advanced search options"
              className="btn-link advanced-search-btn"
              onClick={() => setShowAdvanced(!showAdvanced)}
              type="button"
            >
              {showAdvanced ? (
                <FaChevronUp aria-label="Hide" />
              ) : (
                <FaChevronDown aria-label="Show" />
              )}
              {showAdvanced ? "Hide" : "Show"} filter options
            </button>
            {queryIsValid && (
              <div
                className="current-search-container"
                style={{ display: showAdvanced ? "none" : "block" }}
              >
                <div className="current-search-items-container">
                  {Object.entries(queryOptions)
                    .filter(([key, value]) => {
                      return inputOptions.includes(key) && value;
                    })
                    .map(([key, value]) => (
                      <ClearInputBtn
                        key={key}
                        className="current-search-item"
                        fieldName={key}
                        handleClick={handleInputClear}
                        display={!!value}
                      >
                        <span className="label-title">{key}</span>
                        <span className="label">
                          {truncate(value.toString(), 20)}
                        </span>
                      </ClearInputBtn>
                    ))}
                </div>
              </div>
            )}
            <div
              className="advanced-search-options"
              style={{ display: showAdvanced ? "block" : "none" }}
            >
              <div className="input-group">
                <label htmlFor="title">Book Title</label>
                <span className="input-field-group">
                  <input type="text" name="title" onChange={handleChange} />
                  <ClearInputBtn
                    display={!!queryOptions.title}
                    fieldName="title"
                    handleClick={handleInputClear}
                  />
                </span>
              </div>
              <div className="input-group">
                <label htmlFor="author">Author</label>

                <span className="input-field-group">
                  <input type="text" name="author" onChange={handleChange} />
                  <ClearInputBtn
                    display={!!queryOptions.author}
                    fieldName="author"
                    handleClick={handleInputClear}
                  />
                </span>
              </div>
              <div className="input-group">
                <label htmlFor="publisher">Publisher</label>
                <span className="input-field-group">
                  <input type="text" name="publisher" onChange={handleChange} />
                  <ClearInputBtn
                    fieldName="publisher"
                    handleClick={handleInputClear}
                    display={!!queryOptions.publisher}
                  />
                </span>
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
                  <option value="">Select a language</option>
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
                  document.forms.namedItem("volumes-search-form")?.reset();
                  setQueryOptions(initialQueryOptions);
                  resetSearchResults();
                }}
              >
                <FaTimes /> Clear all fields
              </button>
            </div>
          </div>

          <button
            className="btn-primary"
            type="submit"
            disabled={!queryIsValid}
          >
            <FaSearch /> Search
          </button>
        </form>
      </div>
    </>
  );
}

export default BookSearch;
