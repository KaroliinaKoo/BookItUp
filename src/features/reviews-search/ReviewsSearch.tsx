import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import ClearInputBtn from "../../components/shared/ClearInputBtn";
import { ReviewQueryOptions } from "../../hooks/useFetchReviewList";

type Props = {
  queryOptions: ReviewQueryOptions;
  setQueryOptions: React.Dispatch<React.SetStateAction<ReviewQueryOptions>>;
  fetchReviewsByQuery: (queryOptions: ReviewQueryOptions) => void;
};

function ReviewSearch({
  queryOptions,
  setQueryOptions,
  fetchReviewsByQuery,
}: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchReviewsByQuery(queryOptions);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setQueryOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
    console.log(queryOptions);
  };

  const handleInputClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    setQueryOptions((prevOptions) => ({ ...prevOptions, [id]: "" }));
    document.getElementsByTagName("input")[
      Object.keys(queryOptions).indexOf(id)
    ].value = "";
    console.log(queryOptions);
  };

  useEffect(() => {
    setQueryOptions(queryOptions);
  }, [queryOptions]);

  return (
    <>
      <div className="reviews-search">
        <form
          autoComplete="off"
          name="reviews-search-form"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <span className="input-field-group">
              <input type="text" name="username" onChange={handleChange} />
              <ClearInputBtn
                display={!!queryOptions.username}
                fieldName="username"
                onClick={handleInputClear}
              />
            </span>
          </div>
          <div className="input-group">
            <label htmlFor="rating">Rating</label>
            <select name="rating" onChange={handleChange}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <button
            className="btn-primary"
            type="submit"
            disabled={!(queryOptions.username || queryOptions.rating)}
          >
            <FaSearch /> Search
          </button>
        </form>
      </div>
    </>
  );
}

export default ReviewSearch;
