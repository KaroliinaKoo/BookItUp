import { FaBars, FaTimes, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import LinkList from "./shared/LinkList";
import { NavLink } from "react-router-dom";

function Header({ userLoggedIn, userName, logout }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };
  console.log("User logged in: " + userLoggedIn);
  return (
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    }),
    (
      <header>
        <NavLink to="/">
          <p className="logo">BookItUp</p>
        </NavLink>
        <nav>
          {windowWidth > 768 && <LinkList userLoggedIn={userLoggedIn} />}
          {windowWidth < 768 && (
            <div>
              <button
                className="btn-icon mobile-menu-btn"
                onClick={handleMobileMenu}
              >
                <FaBars />
              </button>
              <div
                className={menuOpen ? "mobile-menu open" : "mobile-menu closed"}
              >
                <div className="btn-container">
                  <button
                    className="btn-icon close-menu"
                    onClick={handleMobileMenu}
                  >
                    <FaTimes />
                  </button>
                </div>
                <LinkList openClose={handleMobileMenu} />
              </div>
            </div>
          )}
        </nav>
      </header>
    )
  );
}

export default Header;
