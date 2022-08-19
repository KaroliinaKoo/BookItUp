import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import LinkList from "./shared/LinkList";

function Header() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    }),
    (
      <header>
        <p className="logo">FeedMeow!</p>
        <nav>
          {windowWidth > 768 && <LinkList />}
          {windowWidth < 768 && (
            <div>
              <button
                className="btn-icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <FaBars />
              </button>
              <div
                className={
                  isMenuOpen ? "mobile-menu open" : "mobile-menu closed"
                }
              >
                <button
                  className="btn-icon close-menu"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <FaTimes />
                </button>

                <LinkList />
              </div>
            </div>
          )}
        </nav>
      </header>
    )
  );
}

export default Header;
