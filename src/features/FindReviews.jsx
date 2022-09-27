import FeedbackList from "../components/FeedbackList";
import ReviewSearch from "../components/ReviewSearch";
import { useState } from "react";

function FindReview() {
  const [search, setSearch] = useState({
    title: "",
    author: "",
    rating: "",
    username: "",
  });

  console.log(search);

  return (
    <div className="container">
      <ReviewSearch setSearch={setSearch} />
      <FeedbackList search={search} />
    </div>
  );
}

export default FindReview;
