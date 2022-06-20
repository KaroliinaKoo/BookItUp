import { useState } from "react";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackData from "./data/FeedbackData.json";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData.feedback);

  const deleteItem = (id) => {
    if (
      window.confirm(`Are you sure you want to delete this item? [Item ${id}]`)
    ) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  return (
    <div className="App">
      <Header />
      <div className="container">
        <FeedbackForm />
        <FeedbackStats feedback={feedback} />
        <FeedbackList feedback={feedback} handleDelete={deleteItem} />
      </div>
    </div>
  );
}

export default App;
