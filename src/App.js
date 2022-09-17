import Main from "./features/Main";
import Review from "./features/Review";
import Login from "./features/Login";
import PageNotFound from "./features/PageNotFound";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  return (
    <FeedbackProvider>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/review" element={<Review />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </FeedbackProvider>
  );
}

export default App;
