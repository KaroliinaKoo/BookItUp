import ReviewForm from "../components/ReviewForm";
import React from "react";
import { useNavigate } from "react-router-dom";

function NewReview({ user }: { user: any }) {
  const navigate = useNavigate();

  return (
    <>
      {user.id === 0 ? (
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
      ) : (
        <div className="container">
          <ReviewForm />
        </div>
      )}
    </>
  );
}

export default NewReview;
