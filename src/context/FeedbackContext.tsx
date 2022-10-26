import { createContext } from "react";
import { FeedbackTypes } from "../queries/DataTypes";

// Interfaces

export interface FeedbackContextTypes {
  feedback: FeedbackTypes[];
  itemIsLoading: boolean;
  itemIsEditing: itemIsEditingTypes;
  deleteItem: (id: number) => void;
  addItem: (item: FeedbackTypes) => void;
  editItem: (item: FeedbackTypes) => void;
  updateItem: (id: number, updatedItem: FeedbackTypes) => void;
  cancelEdit: () => void;
}

interface itemIsEditingTypes {
  item: FeedbackTypes | {};
  isEditing: boolean;
}

// Context

export const FeedbackContext = createContext<FeedbackContextTypes | null>(null);
