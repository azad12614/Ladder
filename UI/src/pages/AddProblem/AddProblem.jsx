import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import "./AddProblem.css";

function AddProblem({ URL }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is present in localStorage (indicating the user is logged in)
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token is found, redirect to the login page
      navigate("/login");
    }
  }, [navigate]); // `navigate` dependency ensures the effect runs once when component is mounted

  return (
    <div className="add-problem-content">
      <Form URL={URL} />
    </div>
  );
}

export default AddProblem;
