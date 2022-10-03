import ReviewForm from "../components/ReviewForm";
import { useNavigate } from "react-router-dom";
import User from "../modules/user";

function NewReview() {
  const navigate = useNavigate();
  const auth = User.isAuthorized();

  return (
    <>
      {auth && (
        <div className="container">
          <ReviewForm />
        </div>
      )}
      {!auth && (
        <div className="container-card">
          <p>You must be logged in to review a book.</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}

export default NewReview;
