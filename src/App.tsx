import React, { useContext, useEffect } from "react";
import Main from "./features/Main";
import PageNotFound from "./features/PageNotFound";
import { Register, LogIn } from "./features/user-auth/";
import FindReviews from "./features/reviews-search/Main";
import { Alert, Header } from "./components/layout/index";
import {
  UserDashboard,
  MyProfile,
  MyReviews,
  MySettings,
} from "./features/user-dashboard/";
import { Routes, Route } from "react-router-dom";
import { AlertProvider } from "./context/AlertContext";
import UserContext from "./context/UserContext";
import FindBooks from "./features/volumes-search/Main";
import ProtectedRoute from "./utils/components/ProtectedRoute";
import ReviewForm from "./features/review-form/ReviewForm";

function App() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext not found");
  }
  const { user, setUserData, userIsAuthenticated } = context;
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
    <AlertProvider>
      <div className="App">
        <Header />
        <main>
          <Alert />
          <Routes>
            <Route path="/" element={<Main user={user} />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/find-reviews" element={<FindReviews />} />
            <Route path="/review">
              <Route
                path=":volumeID"
                element={
                  <ProtectedRoute
                    userIsAuth={userIsAuthenticated()}
                    redirectPath="/auth/login"
                  >
                    <ReviewForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":volumeID/:reviewID/edit"
                element={
                  <ProtectedRoute
                    userIsAuth={userIsAuthenticated()}
                    redirectPath="/auth/login"
                  >
                    <ReviewForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/auth" />
            <Route path="/auth/login" element={<LogIn />} />
            <Route path="/auth/register" element={<Register />} />
            <Route />

            <Route
              path="/dashboard/"
              element={
                <ProtectedRoute
                  userIsAuth={userIsAuthenticated()}
                  redirectPath="/auth/login"
                >
                  <UserDashboard />
                </ProtectedRoute>
              }
            >
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
    </AlertProvider>
  );
}

export default App;
