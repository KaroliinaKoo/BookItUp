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

function App() {
  return (
    <FeedbackProvider>
      <AlertProvider>
        <div className="App">
          <Header />
          <main className="pattern-bg">
            <Alert />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/read-reviews" element={<FindReviews />} />
              <Route path="/new-review" element={<NewReview />} />
              <Route path="/log-in" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </AlertProvider>
    </FeedbackProvider>
  );
}

export default App;
