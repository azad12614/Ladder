// src/App.jsx
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import AddProblem from "./pages/AddProblem";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageAdmin from "./pages/ManageAdmin";
import ManageProblem from "./pages/ManageProblem";
import NotFound from "./pages/NotFound";
import ProblemList from "./pages/ProblemList";
import RecoverPassword from "./pages/RecoverPassword";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recover" element={<RecoverPassword />} />
          <Route path="/update" element={<UpdatePassword />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/manage-admins" element={<ManageAdmin />} />
          <Route path="/manage-problems" element={<ManageProblem />} />
          <Route path="/view-problems" element={<ProblemList />} />
          <Route path="/add-problem" element={<AddProblem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
