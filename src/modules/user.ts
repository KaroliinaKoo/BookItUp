import { UserDataTypes } from "../queries/DataTypes";

const User = (function () {
  let id: number,
    username: string,
    email: string,
    settings: {
      preferredCategories: string[];
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

  const getUserSettings = () => {
    return settings;
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

  const setUserSettings = (data: UserDataTypes) => {
    if (getToken()) {
      settings.preferredCategories = data.settings.preferredCategories;
    } else {
      console.log("No token found");
    }
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
    clearData,
    isAuthorized,
    getUserSettings,
    setUserSettings,
  };
})();

export default User;
