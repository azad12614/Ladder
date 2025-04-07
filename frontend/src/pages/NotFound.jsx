import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="glitch" data-text="404">
        404
      </div>
      <div className="subtitle">Page Not Found</div>
      <div className="message">
        Looks like this route ran into a <span className="tle">TLE</span>...
      </div>
      <button className="back-button" onClick={() => navigate("/")}>
        Go Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
