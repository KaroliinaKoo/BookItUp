import Main from "./features/Main";
import Login from "./features/Login";
import FindReviews from "./features/FindReviews";
import PageNotFound from "./features/PageNotFound";
import NewReview from "./features/NewReview";
import Header from "./components/Header";
import UserDashboard from "./features/UserDashboard";
import Alert from "./components/Alert";
import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataProvider";
import { AlertProvider } from "./context/AlertContext";
import User from "./modules/user";
import { useEffect } from "react";
import { useJwt } from "react-jwt";
import React from "react";

function App() {
  const token = localStorage.getItem("token") || "";
  const { isExpired } = useJwt(localStorage.getItem("token")!);

  useEffect(() => {
    if (token && isExpired) {
      console.log("token expired");
      handleLogout();
    } else if (token) {
      User.setData(JSON.parse(localStorage.getItem("user")!));
    }
  }, [isExpired, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    User.clearData();
    window.location.href = "/";
    console.log("user logged out");
  };

  return (
    <DataProvider>
      <AlertProvider>
        <div className="App">
          <Header user={User.getData()} handleLogout={handleLogout} />
          <main>
            <Alert />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/find-reviews" element={<FindReviews />} />
              <Route path="/add-review" element={<NewReview />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </main>
        </div>
      </AlertProvider>
    </DataProvider>
  );
}

export default App;
