import { useState, useEffect } from "react";
import { ReviewDataTypes } from "../queries/DataTypes";
import React from "react";
import { DataContext, DataContextTypes } from "./DataContext";

// Provider

export const DataProvider = ({ children }: any) => {
  const [itemData, setItemData] = useState<DataContextTypes["itemData"]>([]);
  const [itemIsLoading, setItemIsLoading] =
    useState<DataContextTypes["itemIsLoading"]>(true);
  const [itemIsEditing, setItemIsEditing] = useState<
    DataContextTypes["itemIsEditing"]
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
      setItemData(data);
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
    setItemData([data, ...itemData]);
  };

  // DELETE
  const deleteItem = async (id: ReviewDataTypes["id"]) => {
    await fetch(`http://localhost:3001/review/${id}`, {
      method: "DELETE",
    });
    setItemData(itemData.filter((item: ReviewDataTypes) => item.id !== id));
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
    setItemData(itemData.map((item) => (item.id === id ? data : item)));
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
    <DataContext.Provider // pass the functions to the context provider so that they can be accessed by the components that use the context provider
      value={{
        itemData,
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
    </DataContext.Provider>
  );
};

export default DataProvider;
