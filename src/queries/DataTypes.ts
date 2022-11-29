export type ReviewDataTypes = {
  volumeID: string;
  body: string;
  rating: number;
  date: string;
  id: string;
  username: UserDataTypes["username"];
};

export type UserDataTypes = {
  username: string;
  email: string;
  id: number;
  password?: string;
  settings: {
    preferredCategories: string[];
  };
};
