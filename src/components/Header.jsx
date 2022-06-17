import PropTypes from "prop-types"; // eslint-disable-line import/no-extraneous-dependencies

function Header({ user }) {
  return (
    <header>
      <h2>FeedMe!</h2>
      <nav>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </nav>
      <span>Welcome, {user}</span>
    </header>
  );
}

Header.defaultProps = {
  user: "Guest", // default value for user if user is not passed then it will take default value "Guest" and display in header. If user is passed then it will display user name in header.
};

Header.propTypes = {
  user: PropTypes.string, // user name should be string
};

export default Header;
