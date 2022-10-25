export interface FeedbackTypes {
  username: string;
  title: string;
  author: string;
  body: string;
  rating: number;
  date: string;
  id: number;
}

export interface UserDataTypes {
  username: string;
  email: string;
  id: number;
  password?: string;
}
