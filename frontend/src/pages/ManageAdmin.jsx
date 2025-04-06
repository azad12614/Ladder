// src/pages/ManageAdmin.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import "./ManageAdmin.css";

const ManageAdmin = () => {
  const { admin, token } = useAuth();
  const [adminList, setAdminList] = useState([]);

  const fetchAdmins = () => {
    axios
      .get("/api/admin/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setAdminList(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    if (admin?.role === "main_admin") {
      fetchAdmins();
    }
  }, [admin, token]);

  const approve = async (id) => {
    await axios.patch(
      `/api/admin/approve-admin/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchAdmins();
  };

  const deny = async (id) => {
    await axios.delete(`/api/admin/deny/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAdmins();
  };

  const revoke = async (id) => {
    await axios.post(
      `/api/admin/revoke/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchAdmins();
  };

  if (admin?.role !== "main_admin") {
    return (
      <p className="unauthorized">
        ❌ Unauthorized. Only Main Admin can access this page.
      </p>
    );
  }

  return (
    <div className="approval-page">
      <h2>🛡️Admin Management</h2>
      {adminList.length === 0 ? (
        <p className="empty-msg">No admin users found.</p>
      ) : (
        <ul className="approval-list">
          {adminList.map(
            (a) =>
              a.role !== "main_admin" && (
                <li key={a._id} className="approval-item">
                  <div className="admin-info">
                    <strong>{a.username}</strong>
                    <span className="admin-email">{a.email}</span>
                    <span
                      className={`status ${
                        a.isApproved ? "approved" : "pending"
                      }`}
                    >
                      {a.isApproved ? "✅ Approved" : "⏳ Pending"}
                    </span>
                  </div>
                  <div className="action-buttons">
                    {!a.isApproved ? (
                      <>
                        <Button onClick={() => approve(a._id)}>Approve</Button>
                        <Button
                          onClick={() => deny(a._id)}
                          className="btn-deny"
                        >
                          Deny
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => revoke(a._id)}
                        className="btn-revoke"
                      >
                        Revoke
                      </Button>
                    )}
                  </div>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default ManageAdmin;
