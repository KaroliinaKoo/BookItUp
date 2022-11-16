import React from "react";

import AlertContext from "../context/AlertContext";
import { useContext } from "react";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Alert() {
  const { alert, hideAlert } = useContext(AlertContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 8000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <div
      className={`alert ${alert.show ? "show" : ""} ${alert.type}`}
      onClick={hideAlert}
    >
      <div className="alert-msg">{alert.msg}</div>
      <span>
        <FaTimes />
      </span>
    </div>
  );
}
