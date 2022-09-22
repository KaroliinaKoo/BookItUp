import User from "../modules/user";
import Card from "../components/shared/Card";

function UserDashboard() {
  return (
    <div className="user-dashboard container">
      <Card className="container-card full-height">
        <h1>{User.getName()}'s Dashboard</h1>
        <div className="dashboard-nav">
          <button className="btn">My Reviews</button>
          <button className="btn">My Profile</button>
          <button className="btn">Settings</button>
        </div>
      </Card>
    </div>
  );
}

export default UserDashboard;
