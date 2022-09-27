import FeedbackList from "../components/FeedbackList";
import ReviewSearch from "../components/ReviewSearch";

function FindReview() {
  return (
    <div className="container">
      <ReviewSearch />
      <FeedbackList />
    </div>
  );
}

export default FindReview;
