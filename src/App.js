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

function UserLoggedIn() {
  const check = User.getToken();

  if (check) {
    return true;
  }
  return false;
}

function App() {
  console.log(User.getData());
  return (
    <FeedbackProvider>
      <AlertProvider>
        <div className="App">
          <Header userLoggedIn={UserLoggedIn()} />
          <main>
            <Alert />
            <Routes>
              <Route
                path="/"
                element={<Main userLoggedIn={UserLoggedIn()} />}
              />
              <Route path="/read-reviews" element={<FindReviews />} />
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
