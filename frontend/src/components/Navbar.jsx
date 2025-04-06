// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toggleTheme, initTheme } from "../utils/theme";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    initTheme();
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleThemeToggle = () => {
    toggleTheme();
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">
          <Link to="/">
            <img src={logo}></img>
            Ladder
          </Link>
        </h1>
      </div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        {admin?.role === "admin" || admin?.role === "main_admin" ? (
          <>
            <li>
              <Link to="/dashboard" onClick={toggleMenu}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/view-problems" onClick={toggleMenu}>
                View Problems
              </Link>
            </li>
            <li>
              <Link to="/manage-problems" onClick={toggleMenu}>
                Manage Problems
              </Link>
            </li>
            {admin?.role === "main_admin" && (
              <li>
                <Link to="/manage-admins" onClick={toggleMenu}>
                  Manage Admins
                </Link>
              </li>
            )}
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/view-problems" onClick={toggleMenu}>
                View Problems
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" onClick={toggleMenu}>
                Register
              </Link>
            </li>
          </>
        )}
        <li>
          <button className="theme-toggle-button" onClick={handleThemeToggle}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
