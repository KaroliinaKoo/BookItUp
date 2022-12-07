import React, { createContext, useState, useEffect } from "react";

export type ReviewContextTypes = {
  reviewData: ReviewDataTypes[];
  itemIsLoading: boolean;
  itemIsEditing: itemIsEditingTypes;
  deleteItem: (id: string) => void;
  addItem: (item: ReviewDataTypes) => void;
  editItem: (item: ReviewDataTypes) => void;
  updateItem: (id: string, updatedItem: ReviewDataTypes) => void;
  cancelEdit: () => void;
};

type itemIsEditingTypes = {
  item?: ReviewDataTypes;
  isEditing: boolean;
};

export type ReviewDataTypes = {
  volumeID: string;
  body: string;
  rating: number;
  date: string;
  id: string;
  userID: number;
  username: string;
};

/* ------ USING THE CONTEXT INSIDE THE APP -------------------------
This check is to make sure that the app is not crashing when the context is not available (and to keep linting happy)
----------------------------------------------------------------

 const context = useContext(ReviewContext);

if (!context) {
  throw new Error("ReviewContext not found");
}

const { **CONTEXT DATA** } = context;

*/

const ReviewContext = createContext<ReviewContextTypes | null>(null);

export const ReviewProvider = ({ children }: any) => {
  const [reviewData, setReviewData] = useState<
    ReviewContextTypes["reviewData"]
  >([]);
  const [itemIsLoading, setItemIsLoading] =
    useState<ReviewContextTypes["itemIsLoading"]>(true);
  const [itemIsEditing, setItemIsEditing] = useState<
    ReviewContextTypes["itemIsEditing"]
  >({
    item: undefined,
    isEditing: false,
  });

  //INITIAL FETCH
  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(
        "http://localhost:3001/review?_sort=id&_order=desc"
      );
      const data = await response.json();
      setReviewData(data);
      setItemIsLoading(false);
    };
    fetchItem();
  }, []);

  // ADD
  const addItem = async (item: ReviewDataTypes) => {
    const response = await fetch("http://localhost:3001/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data: ReviewDataTypes = await response.json();
    setReviewData([data, ...reviewData]);
  };

  // DELETE
  const deleteItem = async (id: ReviewDataTypes["id"]) => {
    await fetch(`http://localhost:3001/review/${id}`, {
      method: "DELETE",
    });
    setReviewData(reviewData.filter((item: ReviewDataTypes) => item.id !== id));
  };

  // EDIT
  const editItem = (item: ReviewDataTypes) => {
    setItemIsEditing({ item, isEditing: true });
  };

  // UPDATE
  const updateItem = async (
    id: ReviewDataTypes["id"],
    updatedItem: ReviewDataTypes
  ) => {
    const response = await fetch(`http://localhost:3001/review/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    setReviewData(
      reviewData.map((review) => (review.id === id ? data : review))
    );
    setItemIsEditing({
      item: undefined,
      isEditing: false,
    });
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setItemIsEditing({
      item: undefined,
      isEditing: false,
    });
  };

  return (
    <ReviewContext.Provider // pass the functions to the context provider so that they can be accessed by the components that use the context provider
      value={{
        reviewData,
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
    </ReviewContext.Provider>
  );
};

export default ReviewContext;
