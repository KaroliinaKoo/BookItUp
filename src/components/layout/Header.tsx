import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LinkList from "../shared/LinkList";
import { NavLink } from "react-router-dom";
import FocusTrap from "focus-trap-react";

function Header() {
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
        <NavLink to="/" aria-label="Home">
          <p className="logo">BookItUp</p>
        </NavLink>
        <nav>
          {windowWidth > 768 && <LinkList openClose={handleMobileMenu} />}
          {windowWidth < 768 && (
            <>
              <button
                aria-label="Open Menu"
                className="btn-icon mobile-menu-btn"
                onClick={handleMobileMenu}
              >
                <FaBars />
              </button>
              <FocusTrap active={menuOpen}>
                <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
                  <div className="btn-container">
                    <button
                      aria-label="Close Menu"
                      className="mobile-btn btn-icon close-menu"
                      onClick={handleMobileMenu}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <LinkList openClose={handleMobileMenu} />
                </div>
              </FocusTrap>
            </>
          )}
        </nav>
      </header>
    )
  );
}

export default Header;
