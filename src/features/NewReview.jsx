import ReviewForm from "../components/ReviewForm";
import { useNavigate } from "react-router-dom";

function NewReview() {
  const userIsAuthenticated = () => {
    return localStorage.getItem("token");
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Review a Book</h1>
      {userIsAuthenticated() ? (
        <ReviewForm />
      ) : (
        <>
          <p>You must be logged in to review a book.</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default NewReview;
