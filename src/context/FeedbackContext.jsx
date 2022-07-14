import React from "react";
import { v4 as uuidv4 } from "uuid";
import { createContext, useState } from "react";
import FeedbackData from "../data/FeedbackData.json";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(FeedbackData.feedback);
  const [itemIsEditing, setItemIsEditing] = useState({
    item: {},
    isEditing: false,
  });

  const addItem = (item) => {
    // add a new feedback item to the list of feedback items
    item.id = uuidv4();
    setFeedback([item, ...feedback]);
  };

  const deleteItem = (id) => {
    // delete an item from the list of feedbacks
    if (
      window.confirm(`Are you sure you want to delete this item? [Item ${id}]`)
    ) {
      setFeedback(feedback.filter((item) => item.id !== id)); // filter the feedback array to remove the item with the matching id
    }
  };

  const editItem = (item) => {
    // edit an item in the list of feedbacks
    setItemIsEditing({ item, isEditing: true }); // set the item to be edited and set isEditing to true
  };

  // update an item in the list of feedbacks
  const updateItem = (id, item) => {
    console.log(id, item);
  };

  return (
    <FeedbackContext.Provider // pass the functions to the context provider so that they can be accessed by the components that use the context provider
      value={{
        feedback,
        itemIsEditing,
        deleteItem,
        addItem,
        editItem,
        updateItem,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
