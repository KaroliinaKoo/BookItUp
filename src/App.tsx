import Main from "./features/Main";
import Login from "./features/Login";
import FindReviews from "./features/FindReviews";
import PageNotFound from "./features/PageNotFound";
import NewReview from "./features/NewReview";
import Header from "./components/Header";
import UserDashboard from "./features/UserDashboard";
import Alert from "./components/Alert";
import { Routes, Route } from "react-router-dom";
import { ReviewProvider } from "./context/ReviewContext";
import { AlertProvider } from "./context/AlertContext";
import React, { useContext, useEffect } from "react";
import UserContext from "./context/UserContext";
import FindBooks from "./features/FindBooks";
import { VolumeProvider } from "./context/VolumeContext";
import { useJwt } from "react-jwt";

function App() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext not found");
  }
  const { user, setUserData } = context;

  const { isExpired } = useJwt(localStorage.getItem("token")!);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && isExpired) {
      console.log("user token expired");
      //userLogOut();
      return;
    }
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user")!);
      if (userData) {
        setUserData(userData);
      }
    }
  }, [isExpired, token]);

  return (
    <ReviewProvider>
      <AlertProvider>
        <VolumeProvider>
          <div className="App">
            <Header />
            <main>
              <Alert />
              <Routes>
                <Route path="/" element={<Main user={user} />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/find-reviews" element={<FindReviews />} />
                <Route path="/add-review" element={<NewReview user={user} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/find-books" element={<FindBooks />} />
              </Routes>
            </main>
          </div>
        </VolumeProvider>
      </AlertProvider>
    </ReviewProvider>
  );
}

export default App;
