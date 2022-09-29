import User from "../modules/user";
import MyProfile from "../components/MyProfile";
import MyReviews from "../components/MyReviews";

function UserDashboard() {
  const userIsAuthenticated = () => {
    return localStorage.getItem("token");
  };

  return (
    <div className="user-dashboard container">
      {userIsAuthenticated() && (
        <>
          <h1>{User.getName()}'s Dashboard</h1>
          <div className="dashboard-content">
            <MyProfile />
            <MyReviews />
          </div>
        </>
      )}
    </div>
  );
}

export default UserDashboard;
