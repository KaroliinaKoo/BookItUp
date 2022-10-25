import Main from "./features/Main";
import Login from "./features/Login";
import FindReviews from "./features/FindReviews";
import PageNotFound from "./features/PageNotFound";
import NewReview from "./features/NewReview";
import Header from "./components/Header";
import UserDashboard from "./features/UserDashboard";
import Alert from "./components/Alert";
import { Routes, Route } from "react-router-dom";
import { FeedbackContext } from "./context/FeedbackContext";
import { AlertProvider } from "./context/AlertContext";
import User from "./modules/user";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";

function App() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(User.getData());
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (isExpired || !token) {
      localStorage?.removeItem("token");
      localStorage?.removeItem("user");
      User.clearData();
    }

    if (!isExpired && token) {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        User.setData(userData);
        setUser(User.getData());
      }
    }
  }, [isExpired, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <FeedbackContext.Provider>
      <AlertProvider>
        <div className="App">
          <Header user={user} handleLogout={handleLogout} />
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
    </FeedbackContext.Provider>
  );
}

export default App;
