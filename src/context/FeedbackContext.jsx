import React from "react";
import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";
import FeedbackData from "../data/FeedbackData.json";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData.feedback);

  const addItem = (item) => {
    setFeedback.id = uuidv4();
    setFeedback([item, ...feedback]);
  };

  const deleteItem = (id) => {
    if (
      window.confirm(`Are you sure you want to delete this item? [Item ${id}]`)
    ) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteItem,
        addItem,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
