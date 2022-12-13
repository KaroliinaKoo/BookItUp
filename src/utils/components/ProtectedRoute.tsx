import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AlertContext from "../../context/AlertContext";

type Props = {
  userIsAuth: boolean;
  redirectPath: string;
  children: React.ReactNode;
};

const ProtectedRoute = ({
  userIsAuth,
  redirectPath = "/",
  children,
}: Props) => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error("AlertContext not found");
  }

  const { showAlert } = context;

  if (!userIsAuth) {
    showAlert("info", "You must be logged in to access this page.");
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
