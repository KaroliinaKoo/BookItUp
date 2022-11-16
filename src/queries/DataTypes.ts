export type FeedbackTypes = {
  title: string;
  author: string;
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
};
