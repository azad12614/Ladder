// src/pages/AddProblem.jsx
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./AddProblem.css";

const AddProblem = () => {
  const { admin, token } = useAuth();
  const [form, setForm] = useState({
    Rating: "",
    Link: "",
    Name: "",
    Tags: "",
    Level: "",
    Knowledge: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!admin) return setMessage("❌ You must be logged in as admin.");
    const payload = { ...form, addedBy: admin.username };

    try {
      await axios.post(`/api/problems/${form.Rating}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Problem added successfully!");
      setForm({
        Rating: "",
        Link: "",
        Name: "",
        Tags: "",
        Level: "",
        Knowledge: "",
      });
    } catch (err) {
      setMessage("❌ Failed to add problem.");
    }
  };

  return (
    <div className="add-problem-page">
      <h2>➕Add New Problem</h2>
      <form onSubmit={handleSubmit} className="add-problem-form">
        <input
          type="number"
          name="Rating"
          placeholder="Rating (e.g. 800 - 1400)"
          value={form.Rating}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Link"
          placeholder="Problem Link"
          value={form.Link}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Name"
          placeholder="Problem Name"
          value={form.Name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Tags"
          placeholder="Tags (comma-separated)"
          value={form.Tags}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Level"
          placeholder="Level (1-10)"
          value={form.Level}
          onChange={handleChange}
          required
        />
        <textarea
          name="Knowledge"
          placeholder="Required Knowledge"
          value={form.Knowledge}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Add Problem</button>
      </form>
      {message && <p className="add-problem-message">{message}</p>}
    </div>
  );
};

export default AddProblem;
