import React, { useState, createContext } from "react";

/* ------ USING THE CONTEXT INSIDE THE APP -------------------------
This check is to make sure that the app is not crashing when the context is not available (and to keep linting happy)
----------------------------------------------------------------

 const context = useContext(UserContext);

if (!context) {
  throw new Error("UserContext not found");
}

const { **CONTEXT DATA** } = context;

*/

const UserContext = createContext<UserContextType | null>(null);

const userInitialData: UserDataTypes = {
  username: "",
  email: "",
  id: 0,
  categories: [],
};

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserDataTypes>(userInitialData);

  const userLogOut = () => {
    clearUserData();
    console.log("user logged out");
    window.location.href = "/";
  };

  const setUserData = (data: UserDataTypes) => {
    setUser(data);
    localStorage.setItem("user data set: ", JSON.stringify(data));
  };

  const clearUserData = () => {
    setUser(userInitialData);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserData,
        userLogOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export type UserContextType = {
  user: UserDataTypes;
  setUserData: (data: UserDataTypes) => void;
  userLogOut: () => void;
};

export type UserDataTypes = {
  username: string;
  email: string;
  id: number;
  password?: string;
  categories: string[];
};
