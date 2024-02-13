import { Link } from "react-router-dom";
import pic1 from "../images/logo.png";
function Navbar() {
  const logo = pic1;
  return (
    <>
      <div className="navbar fixed z-1 mx-auto px-1 lg:px-3 max-w-screen bg-[#161A30]">
        <div className="navbar-start">
          <Link to='/'>
            <img src={`${logo}`} className="-m-4 ml-3 w-16 rounded-lg" />
          </Link>
          <Link to='/'>
            <h1 className="ml-4 font-bold text-3xl text-[#dfbb13]">
              Ladder
            </h1>
          </Link>
        </div>
        <div className="navbar-end pr-8 font-bold text-xl text-white">
          <Link to={"/add-problem"}>
            <div className="font-bold text-center sm:text-lg md:text-xl lg:text-2xl text-[#FFFFFF] hover:text-[#dfbb13]">
              Add Problem!
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
