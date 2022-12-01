import { UserDataTypes } from "../queries/DataTypes";

type User = {
  isAuthorized: () => boolean;
  getData: () => UserDataTypes;
  getID: () => number;
  getName: () => string;
  getEmail: () => string;
  getCategories: () => UserDataTypes["categories"];
  setData: (data: UserDataTypes) => void;
  setCategories: (data: UserDataTypes["categories"]) => void;
  clearData: () => void;
};

const User = (function (): User {
  let id: UserDataTypes["id"],
    username: UserDataTypes["username"],
    email: UserDataTypes["email"],
    categories: UserDataTypes["categories"];

  const isAuthorized = () => {
    return getToken() ? true : false;
  };

  const getData = () => {
    return { id, username, email, categories };
  };

  const getID = () => {
    return id;
  };

  const getName = () => {
    return username;
  };

  const getEmail = () => {
    return email;
  };

  const getCategories = () => {
    return categories;
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const setData = (data: UserDataTypes) => {
    if (getToken()) {
      username = data.username;
      email = data.email;
      id = data.id;
      categories = data.categories;
    } else {
      console.log("No token found. Please login.");
    }
  };

  const setCategories = (data: UserDataTypes["categories"]) => {
    if (getToken()) {
      categories = data;
    } else {
      console.log("No token found. Please login.");
    }
  };

  const clearData = () => {
    id = 0;
    username = "";
    email = "";
    categories = [];
  };

  return {
    isAuthorized,
    getData,
    getID,
    getName,
    getEmail,
    setData,
    clearData,
    getCategories,
    setCategories,
  };
})();

export default User;
