import FeedbackList from "../components/FeedbackList";
import FeedbackStats from "../components/FeedbackStats";
import FeedbackForm from "../components/FeedbackForm";

function App() {
  return (
    <div className="container">
      <FeedbackForm />
      <FeedbackStats />
      <FeedbackList />
    </div>
  );
}

export default App;
