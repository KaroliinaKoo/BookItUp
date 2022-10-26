import { useState, useContext, useEffect } from "react";
import { FeedbackTypes } from "../queries/DataTypes";
import React from "react";
import { FeedbackContext, FeedbackContextTypes } from "./FeedbackContext";

// Provider

export function Provider({ children }: { children: JSX.Element }): JSX.Element {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useFeedbackContext must be used within a FeedbackContext");
  }

  const [feedback, setFeedback] = useState<FeedbackContextTypes["feedback"]>(
    []
  );
  const [itemIsLoading, setItemIsLoading] =
    useState<FeedbackContextTypes["itemIsLoading"]>(true);
  const [itemIsEditing, setItemIsEditing] = useState<
    FeedbackContextTypes["itemIsEditing"]
  >({
    item: {},
    isEditing: false,
  });

  //INITIAL FETCH
  useEffect(() => {
    const fetchFeedback = async () => {
      const response = await fetch(
        "http://localhost:3001/review?_sort=id&_order=desc"
      );
      const data = await response.json();
      setFeedback(data);
      setItemIsLoading(false);
    };
    fetchFeedback();
  }, []);

  // ADD
  const addItem = async (item: FeedbackTypes) => {
    const response = await fetch("http://localhost:3001/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data: FeedbackTypes = await response.json();
    setFeedback([data, ...feedback]);
  };

  // DELETE
  const deleteItem = async (id: number) => {
    await fetch(`http://localhost:3001/review/${id}`, {
      method: "DELETE",
    });
    setFeedback(feedback.filter((item: FeedbackTypes) => item.id !== id));
  };

  // EDIT
  const editItem = (item: FeedbackTypes) => {
    setItemIsEditing({ item, isEditing: true });
  };

  // UPDATE
  const updateItem = async (id: number, updatedItem: FeedbackTypes) => {
    const response = await fetch(`http://localhost:3001/review/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    setFeedback(feedback.map((item) => (item.id === id ? data : item)));
    setItemIsEditing({
      item: {},
      isEditing: false,
    });
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setItemIsEditing({
      item: {},
      isEditing: false,
    });
  };

  return (
    <FeedbackContext.Provider // pass the functions to the context provider so that they can be accessed by the components that use the context provider
      value={{
        feedback,
        itemIsEditing,
        itemIsLoading,
        deleteItem,
        addItem,
        editItem,
        updateItem,
        cancelEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
