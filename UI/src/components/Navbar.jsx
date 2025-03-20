import { Link, useLocation, useNavigate } from "react-router-dom";
import pic1 from "../images/logo.png";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // If a token exists, set logged-in state
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if the link is active
  const isActive = (path) => (location.pathname === path ? "active" : "");

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setIsLoggedIn(false); // Update state to reflect logged-out status
    // navigate("/login"); // Redirect to home page
    // Reload the page after successful login
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={pic1} alt="Ladder Logo" className="logo" />
          <h1 className="logo-text">Ladder</h1>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive("/")}`}>
          Home
        </Link>
        <Link
          to="/view-problem"
          className={`nav-link ${isActive("/view-problem")}`}
        >
          View Problem
        </Link>

        {/* Show Login and Register links if not logged in */}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className={`login-btn nav-link ${isActive("/login")}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`register-btn nav-link ${isActive("/register")}`}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Show Add Problem link and Logout if logged in */}
            <Link
              to="/add-problem"
              className={`nav-link ${isActive("/add-problem")}`}
            >
              Add Problem
            </Link>
            <button onClick={handleLogout} className="logout-btn nav-link">
              Logout
            </button>
          </>
        )}
      </div>

      {/* Hamburger Menu for mobile */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Mobile Navbar Links */}
      <div className={`navbar-links-mobile ${isMenuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className={`nav-link ${isActive("/")}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/view-problem"
          className={`nav-link ${isActive("/view-problem")}`}
          onClick={() => setIsMenuOpen(false)}
        >
          View Problem
        </Link>

        {/* Show Login and Register links if not logged in */}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className={`login-btn nav-link ${isActive("/login")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`register-btn nav-link ${isActive("/register")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {/* Show Add Problem link and Logout if logged in */}
            <Link
              to="/add-problem"
              className={`nav-link ${isActive("/add-problem")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Add Problem
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false); // Close the mobile menu when logging out
              }}
              className="logout-btn nav-link"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
