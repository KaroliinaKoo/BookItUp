const User = (function () {
  let id = "";
  let name = "";

  const isAuthorized = () => {
    return getToken() ? true : false;
  };

  const getData = () => {
    return { id, name };
  };

  const getName = () => {
    return name;
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const setData = (data) => {
    id = data.id || "";
    name = data.name || "";
  };

  const clearData = () => {
    id = "";
    name = "";
  };

  return {
    getData,
    getToken,
    getName,
    setData,
    clearData,
    isAuthorized,
  };
})();

export default User;
