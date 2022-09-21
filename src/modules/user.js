const User = (function () {
  let id = "";
  let name = "";
  let authorized = false;

  const isAuthorized = () => {
    return authorized;
  };

  const getData = () => {
    return { id, name, authorized };
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
    authorized = data.authorized || false;
  };

  return {
    getData,
    getToken,
    getName,
    setData,
    isAuthorized,
  };
})();

export default User;
