import { createContext } from "react";
import { ReviewDataTypes } from "../queries/DataTypes";

// Types

export type DataContextTypes = {
  itemData: ReviewDataTypes[];
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

/* ------ USING THE CONTEXT INSIDE THE APP -------------------------
This check is to make sure that the app is not crashing when the context is not available (and to keep linting happy)
----------------------------------------------------------------

 const context = useContext(DataContext);

if (!context) {
  throw new Error("DataContext not found");
}

const { **CONTEXT DATA** } = context;

*/

export const DataContext = createContext<DataContextTypes | null>(null);
