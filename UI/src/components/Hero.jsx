import { Link } from "react-router-dom";
import './button.css';

function Hero() {
  return (
    <>
      <div
        className="hero mx-auto w-screen h-screen"
        style={{
          backgroundImage: "url(https://wallpaperbat.com/img/392417-inspirational-motivational.jpg)",
        }}
      >
        <div className="hero-content flex-col lg:flex-row-reverse pt-8">
          <div className="text-center mt-96">
            <Link to={"/view-problem"}>
              <button class="button">
                Get Started Now!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
