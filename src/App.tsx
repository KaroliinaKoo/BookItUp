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
import MySettings from "./components/MySettings";
import MyProfile from "./components/MyProfile";
import MyReviews from "./components/MyReviews";

function App() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext not found");
  }
  const { user, setUserData } = context;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const userData = JSON.parse(localStorage.getItem("user")!);
      if (userData) {
        setUserData(userData);
      }
    }
  }, [token]);

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
                <Route path="/dashboard/" element={<UserDashboard />}>
                  <Route path="/dashboard/settings" element={<MySettings />} />
                  <Route
                    path="/dashboard/profile"
                    element={<MyProfile user={user} />}
                  />
                  <Route
                    path="/dashboard/reviews"
                    element={<MyReviews user={user} />}
                  />
                </Route>
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
