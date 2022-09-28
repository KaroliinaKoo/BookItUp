import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import LinkList from "./shared/LinkList";
import { NavLink } from "react-router-dom";

function Header({ user, handleLogout }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const content = document.querySelectorAll(
      "main a,area,button,input,object,select,textarea"
    );
    const mobileBtns = document.querySelectorAll(".mobile-btn");

    if (windowWidth < 768) {
      content.forEach((item) => {
        item.setAttribute("tabindex", "0");
      });
      mobileBtns.forEach((btn) => {
        btn.setAttribute("tabindex", "-1");
      });

      if (menuOpen) {
        content.forEach((item) => {
          item.setAttribute("tabindex", "-1");
        });

        mobileBtns.forEach((btn) => {
          btn.setAttribute("tabindex", "0");
        });
      }
    }
  }, [windowWidth, menuOpen]);

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
            <>
              <button
                className="btn-icon mobile-menu-btn"
                onClick={handleMobileMenu}
              >
                <FaBars />
              </button>
              <div className={menuOpen ? "mobile-menu open" : "mobile-menu"}>
                <div className="btn-container">
                  <button
                    className="mobile-btn btn-icon close-menu"
                    onClick={handleMobileMenu}
                  >
                    <FaTimes />
                  </button>
                </div>
                <LinkList
                  openClose={handleMobileMenu}
                  user={user}
                  handleLogout={handleLogout}
                  menuOpen={menuOpen}
                />
              </div>
            </>
          )}
        </nav>
      </header>
    )
  );
}

export default Header;
