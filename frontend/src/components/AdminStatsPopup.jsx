// src/components/AdminStatsPopup.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminStatsPopup.css";
import { useAuth } from "../context/AuthContext";

const AdminStatsPopup = ({ open, onClose }) => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError("");
      setStats(null);

      try {
        const res = await axios.get(`${BASE_URL}/api/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        setStats(res.data);
      } catch (err) {
        console.error("AdminStatsPopup error:", err);
        if (axios.isCancel(err)) return;
        if (err.response) {
          setError(err.response.data?.message || "Failed to fetch stats");
        } else {
          setError("Network error");
        }
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [open, token]);

  if (!open) return null;

  return (
    <div className="admin-popup-overlay" role="dialog" aria-modal="true">
      <div className="admin-popup">
        <h3>🛡️ Admin Overview</h3>

        {loading && <p>Loading...</p>}

        {error && (
          <>
            <p className="error-text">{error}</p>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </>
        )}

        {!loading && !error && stats && (
          <>
            <div className="stats-box">
              <p>
                <strong>Total Admins:</strong> {stats.total}
              </p>
              <p>
                <strong>Approved:</strong> {stats.approved}
              </p>
              <p>
                <strong>Pending:</strong> {stats.pending}
              </p>
            </div>

            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminStatsPopup;
