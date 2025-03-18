import pic1 from "../images/logo.png";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/">
            <img src={pic1} alt="Ladder Logo" className="logo" />
            <h1 className="logo-text">Ladder</h1>
          </Link>
        </div>
        <p>© Copyright 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
