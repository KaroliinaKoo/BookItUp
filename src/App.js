import Main from "./features/Main";
import Login from "./features/Login";
import FindReviews from "./features/FindReviews";
import PageNotFound from "./features/PageNotFound";
import NewReview from "./features/NewReview";
import Header from "./components/Header";
import Alert from "./components/Alert";
import { Routes, Route } from "react-router-dom";
import { FeedbackProvider } from "./context/FeedbackContext";
import { AlertProvider } from "./context/AlertContext";
import User from "./modules/user";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      User.setData(userData);
    }
  }, []);

  return (
    <FeedbackProvider>
      <AlertProvider>
        <div className="App">
          <Header />
          <main>
            <Alert />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/find-reviews" element={<FindReviews />} />
              <Route path="/new-review" element={<NewReview />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </AlertProvider>
    </FeedbackProvider>
  );
}

export default App;
