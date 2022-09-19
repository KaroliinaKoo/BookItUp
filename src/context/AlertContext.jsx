import { useState, createContext } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    msg: "Message",
  });

  const showAlert = (type, msg) => {
    setAlert({ show: true, type, msg });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
