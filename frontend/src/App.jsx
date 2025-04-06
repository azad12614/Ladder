// src/App.jsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import ManageProblem from "./pages/ManageProblem";
import ManageAdmin from "./pages/ManageAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProblemList from "./pages/ProblemList";
import AddProblem from "./pages/AddProblem";
import Register from "./pages/Register";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/manage-admins" element={<ManageAdmin />} />
          <Route path="/manage-problems" element={<ManageProblem />} />
          <Route path="/view-problems" element={<ProblemList />} />
          <Route path="/add-problem" element={<AddProblem />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
