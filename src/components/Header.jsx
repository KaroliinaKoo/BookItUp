import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import LinkList from "./shared/LinkList";
import { NavLink } from "react-router-dom";

function Header({ user, handleLogout }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };
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
          {windowWidth > 768 && (
            <LinkList user={user} handleLogout={handleLogout} />
          )}
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
                <LinkList
                  openClose={handleMobileMenu}
                  user={user}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
          )}
        </nav>
      </header>
    )
  );
}

export default Header;
