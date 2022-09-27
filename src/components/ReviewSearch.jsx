function ReviewSearch() {
  return (
    <div className="review-search">
      <div className="review-search__title">
        <h2>Search Reviews</h2>
      </div>
      <div className="review-search">
        <form>
          <div className="input-container">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" />
          </div>
          <div className="input-container">
            <label htmlFor="author">Author</label>
            <input type="text" name="author" />
          </div>
          <div className="input-container">
            <label htmlFor="rating">Min Rating</label>
            <select name="rating">
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
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" />
          </div>

          <div className="input-container">
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewSearch;
