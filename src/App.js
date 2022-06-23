import Main from "./features/Main";
import Contact from "./features/Contact";
import About from "./features/About";
import PageNotFound from "./features/PageNotFound";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  return (
    <FeedbackProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </FeedbackProvider>
  );
}

export default App;
