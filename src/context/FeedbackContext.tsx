import { createContext } from "react";
import { FeedbackTypes } from "../queries/DataTypes";

// Types

export type FeedbackContextTypes = {
  feedback: FeedbackTypes[];
  itemIsLoading: boolean;
  itemIsEditing: itemIsEditingTypes;
  deleteItem: (id: string) => void;
  addItem: (item: FeedbackTypes) => void;
  editItem: (item: FeedbackTypes) => void;
  updateItem: (id: string, updatedItem: FeedbackTypes) => void;
  cancelEdit: () => void;
};

type itemIsEditingTypes = {
  item?: FeedbackTypes;
  isEditing: boolean;
};

// Context

/* ------ USING CONTEXT INSIDE THE APP -------------------------
This check is to make sure that the app is not crashing when the context is not available (and to keep linting happy)
----------------------------------------------------------------

 const context = useContext(FeedbackContext);

if (!context) {
  throw new Error("Context not found");
}

const { **CONTEXT DATA** } = context;

*/

export const FeedbackContext = createContext<FeedbackContextTypes | null>(null);
