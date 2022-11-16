import { useState, createContext } from "react";
import React from "react";

// Types

export type AlertContextTypes = {
  alert: AlertTypes;
  showAlert: (type: AlertTypes["type"], msg: AlertTypes["msg"]) => void;
  hideAlert: () => void;
};

type AlertTypes = {
  show: boolean;
  msg: string;
  type: "error" | "success" | "warning" | "info";
};

// Context

const AlertContext = createContext<AlertContextTypes | null>(null);

/* ------ USING THE CONTEXT INSIDE THE APP -------------------------
This check is to make sure that the app is not crashing when the context is not available (and to keep linting happy)
----------------------------------------------------------------

 const context = useContext(AlertContext);

if (!context) {
  throw new Error("AlertContext not found");
}

const { **CONTEXT DATA** } = context;

*/

export const AlertProvider = ({ children }: any) => {
  const [alert, setAlert] = useState<AlertTypes>({
    show: false,
    msg: "Message",
    type: "info",
  });

  const showAlert: AlertContextTypes["showAlert"] = (type, msg) => {
    setAlert({ show: true, type, msg });
  };

  const hideAlert: AlertContextTypes["hideAlert"] = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
