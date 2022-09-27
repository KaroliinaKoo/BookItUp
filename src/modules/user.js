const User = (function () {
  let id = "";
  let username = "";
  let email = "";

  const isAuthorized = () => {
    return getToken() ? true : false;
  };

  const getData = () => {
    return { id, username, email };
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

  const setData = (data) => {
    id = data.id || "";
    username = data.username || "";
    email = data.email || "";
  };

  const clearData = () => {
    id = "";
    username = "";
  };

  return {
    getData,
    getName,
    getEmail,
    setData,
    clearData,
    isAuthorized,
  };
})();

export default User;
