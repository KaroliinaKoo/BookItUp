import { UserDataTypes } from "../queries/DataTypes";

const User = (function () {
  let id: UserDataTypes["id"],
    username: UserDataTypes["username"],
    email: UserDataTypes["email"],
    settings: {
      categories: string[];
    };

  const isAuthorized = () => {
    return getToken() ? true : false;
  };

  const getData = () => {
    return { id, username, email };
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

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getUserCategories = () => {
    return settings.categories;
  };

  const setData = (data: UserDataTypes) => {
    if (getToken()) {
      username = data.username;
      email = data.email;
      id = data.id;
    } else {
      console.log("No token found");
    }
  };

  const setUserSettings = (data: any) => {
    settings = data;
  };

  const clearData = () => {
    id = 0;
    username = "";
    email = "";
  };

  return {
    getData,
    getID,
    getName,
    getEmail,
    setData,
    setUserSettings,
    clearData,
    isAuthorized,
    getUserCategories,
  };
})();

export default User;
