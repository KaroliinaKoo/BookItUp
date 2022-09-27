import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [itemIsLoading, setItemIsLoading] = useState(true);
  const [itemIsEditing, setItemIsEditing] = useState({
    item: {},
    isEditing: false,
  });

  const location = useLocation();

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

  //DETECT ROUTE CHANGE
  useEffect(() => {
    setItemIsEditing({ item: {}, isEditing: false });
  }, [location]);

  // ADD
  const addItem = async (item) => {
    const response = await fetch("http://localhost:3001/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  // DELETE
  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await fetch(`http://localhost:3001/review/${id}`, {
        method: "DELETE",
      });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // EDIT
  const editItem = (item) => {
    setItemIsEditing({ item, isEditing: true });
  };

  // UPDATE
  const updateItem = async (id, updatedItem) => {
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
};

export default FeedbackContext;
