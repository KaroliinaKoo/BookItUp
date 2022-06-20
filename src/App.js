import { useState } from "react";
import FeedbackList from "./components/FeedbackList";
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData.json";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData.data);

  const deleteItem = (id) => {
    if (window.confirm(`Are you sure you want to delete this item? ${id}`)) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  return (
    <div className="App">
      <Header />
      <div className="container">
        <FeedbackList feedback={feedback} handleDelete={deleteItem} />
      </div>
    </div>
  );
}

export default App;
