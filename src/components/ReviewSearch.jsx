function ReviewSearch({ setSearch }) {
  const handleChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="review-search">
      <h2>Search Reviews</h2>
      <form>
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="author">Author</label>
          <input type="text" name="author" onChange={handleChange} />
        </div>
        <div className="input-container">
          <label htmlFor="rating">Rating</label>
          <select name="rating" onChange={handleChange}>
            <option value="">All</option>
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
          <input type="text" name="username" onChange={handleChange} />
        </div>
      </form>
    </div>
  );
}

export default ReviewSearch;
