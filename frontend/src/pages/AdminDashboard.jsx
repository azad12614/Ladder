// src/pages/AdminDashboard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminStatsPopup from "../components/AdminStatsPopup";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { admin } = useAuth();
  const isMainAdmin = admin?.role === "main_admin";
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>
          Welcome, <span className="accent-text">{admin?.username}</span>
        </h1>
        <p className="role-badge">
          📚 {isMainAdmin ? "Main Admin" : "Admin"} Dashboard
        </p>
      </header>

      <section className="admin-widgets">
        <div className="widget-card">
          <h3>📁 Manage Problems</h3>
          <p>
            Add, edit, or request deletion of problems in your assigned ratings.
          </p>
        </div>
        <div className="widget-card">
          <h3>👥 Manage Admins</h3>
          <p>
            {isMainAdmin
              ? "Approve or revoke admin access."
              : "You have limited access."}
          </p>
        </div>
        <div className="widget-card">
          <h3>📊 Analytics (Coming Soon)</h3>
          <p>Visualize submission stats and user activity (in progress).</p>
        </div>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/manage-problems">
            <button className="btn-primary">Manage Problems</button>
          </Link>
          {isMainAdmin && (
            <>
              <Link to="/manage-admins">
                <button className="btn-approve">Review Admin Requests</button>
              </Link>

              <button
                onClick={() => setShowPopup(true)}
                className="admin-stats-btn"
              >
                View Admin Stats
              </button>
            </>
          )}
          <Link to="/view-problems">
            <button className="btn-secondary">Go to Problem List</button>
          </Link>
        </div>
        <AdminStatsPopup open={showPopup} onClose={() => setShowPopup(false)} />
      </section>
    </div>
  );
};

export default AdminDashboard;
