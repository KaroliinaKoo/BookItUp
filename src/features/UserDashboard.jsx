import User from "../modules/user";
import Card from "../components/shared/Card";
import MyProfile from "../components/MyProfile";
import MyReviews from "../components/MyReviews";

function UserDashboard() {
  const userIsAuthenticated = () => {
    return localStorage.getItem("token");
  };

  return (
    <div className="user-dashboard container">
      {userIsAuthenticated() && (
        <Card className="container-card full-height">
          <h1>{User.getName()}'s Dashboard</h1>
          <div className="dashboard-content">
            <MyProfile />
            <MyReviews />
          </div>
        </Card>
      )}
    </div>
  );
}

export default UserDashboard;
