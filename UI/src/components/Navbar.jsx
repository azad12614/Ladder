import { Link } from "react-router-dom";
import pic1 from "../images/logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={pic1} alt="Ladder Logo" className="logo" />
          <h1 className="logo-text">Ladder</h1>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
