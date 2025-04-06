// src/pages/MAnageProblem
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProblemCard from "../components/ProblemCard";
import "./ManageProblem.css";

const ManageProblem = () => {
  const { token, admin } = useAuth();
  const [rating, setRating] = useState("800");
  const [problems, setProblems] = useState([]);

  const isAdmin = admin?.role === "admin";
  const isMainAdmin = admin?.role === "main_admin";

  const fetchProblems = async () => {
    try {
      const res = await axios.get(`/api/problems/${rating}`);
      setProblems(res.data);
    } catch (err) {
      console.error("Error fetching problems:", err);
    }
  };

  const handleRequestDelete = async (problemId) => {
    try {
      await axios.delete(`/api/problems/${rating}/${problemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProblems(); // refresh after request
    } catch (err) {
      console.error("Error requesting delete:", err);
    }
  };

  const handleApproveDelete = async (id) => {
    try {
      await axios.delete(`/api/problems/approve-delete/${rating}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProblems();
    } catch (err) {
      console.error("Error approving delete:", err);
    }
  };

  const handleDenyDelete = async (id) => {
    try {
      await axios.patch(
        `/api/problems/deny-delete/${rating}/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProblems();
    } catch (err) {
      console.error("Error denying delete:", err);
    }
  };

  const handleHardDelete = async (id) => {
    try {
      await axios.delete(`/api/problems/${rating}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProblems();
    } catch (err) {
      console.error("Error hard deleting problem:", err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [rating]);

  return (
    <div className="manage-problem-page">
      <h2>🧩Manage Problems</h2>

      <div className="rating-tabs">
        {[800, 900, 1000, 1100, 1200, 1300, 1400].map((r) => (
          <button
            key={r}
            className={rating === `${r}` ? "active" : ""}
            onClick={() => setRating(`${r}`)}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="rating-tabs">
        <Link to="/add-problem">
          <button>➕Add New Problem</button>
        </Link>
      </div>

      <div className="problem-list">
        {problems.length === 0 ? (
          <p>No problems found for rating {rating}</p>
        ) : (
          problems.map((p) => (
            <ProblemCard
              key={p._id}
              problem={p}
              isAdmin={isAdmin}
              isMainAdmin={isMainAdmin}
              onRequestDelete={handleRequestDelete}
              onApproveDelete={handleApproveDelete}
              onDenyDelete={handleDenyDelete}
              onHardDelete={handleHardDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProblem;
