import { Link } from "react-router-dom";
import "./Hero.css";
// import logo from "../images/logo.png";
import sideImage from "../images/side.png";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          {/* <img src={logo} alt="Ladder Logo" className="logo" /> */}
          <h1 className="logo-text">Ladder</h1>
          <h2>Elevate Your Programming Journey</h2>
          <p>
            Level up your programming skills! Our curated problem ladders
            (800-1400), crafted by IIUCCPS, guide you through 100 targeted
            challenges per rating. Climb ranks and master concepts,
            step-by-step.
          </p>
          <Link to="/view-problem">
            <button className="cta-button">Start the Journey!</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={sideImage} alt="Programming Journey" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
