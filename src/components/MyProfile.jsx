import User from "../modules/user";

function MyProfile() {
  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {User.getName()}</p>
      <p>Email: {User.getEmail()}</p>
      <div className="btn-container">
        <button>Edit</button>
        <button>Change password</button>
      </div>
    </div>
  );
}

export default MyProfile;
