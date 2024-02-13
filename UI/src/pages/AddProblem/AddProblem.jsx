import Footer from "../../components/Footer";
import Form from "./Form";
import Navbar from "../../components/Navbar";
import '../../components/button.css';
import { Link } from "react-router-dom";

function AddProblem() {
  return (
    <div className="d-flex flex-column max-w-full vh-100 overflow-x-hidden bg-[#31304D]">
      <Navbar></Navbar>
      <div className="mt-28">
        <Form></Form>
        <div className="text-center my-4">
          <Link to={"/view-problem"}>
            <button class="button">
              View Problem!
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-auto mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default AddProblem;
