import { useState, createContext, useEffect } from "react";
import User from "../modules/user";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(User.getData());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        User.setData(userData);
        setUser(User.getData());
        console.log("Logged in" + JSON.stringify(User.getData()));
      }
    }
    if (!token) {
      User.clearData();
      setUser(User.getData());
      console.log("Logged out" + JSON.stringify(User.getData()));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <UserContext.Provider value={{ user, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
