import FeedbackList from "../components/FeedbackList";
import FeedbackStats from "../components/FeedbackStats";

function FindReview() {
  return (
    <div className="container">
      <FeedbackStats />
      <FeedbackList />
    </div>
  );
}

export default FindReview;
