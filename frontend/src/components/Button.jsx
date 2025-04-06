// File: src/components/Button.jsx
import React from "react";
import "./Button.css";

const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button type={type} onClick={onClick} className="btn">
      {children}
    </button>
  );
};

export default Button;
