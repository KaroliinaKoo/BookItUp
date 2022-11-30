import { UserDataTypes } from "../queries/DataTypes";

const User = (function () {
  let id: UserDataTypes["id"],
    username: UserDataTypes["username"],
    email: UserDataTypes["email"],
    settings: UserDataTypes["settings"];

  const isAuthorized = () => {
    return getToken() ? true : false;
  };

  const getData = () => {
    return { id, username, email, settings };
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

  const getSettings = () => {
    return settings;
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const setData = (data: UserDataTypes) => {
    if (getToken()) {
      username = data.username;
      email = data.email;
      id = data.id;
      settings = data.settings;
    } else {
      console.log("No token found");
    }
  };

  const clearData = () => {
    id = 0;
    username = "";
    email = "";
    settings = { categories: [] };
  };

  return {
    getData,
    getID,
    getName,
    getEmail,
    setData,
    clearData,
    isAuthorized,
    getSettings,
  };
})();

export default User;
