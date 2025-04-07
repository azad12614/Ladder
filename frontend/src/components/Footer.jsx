// File: src/components/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://azad12614.onrender.com/"
          target="_blank"
          className="accent-text"
        >
          Abdullah Al Azad
        </a>{" "}
        for <span className="accent-text">IIUCCPS</span>
      </p>
      <p>© 2024 IIUCCPS Ladder</p>
    </footer>
  );
};

export default Footer;
