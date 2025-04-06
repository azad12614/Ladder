// src/components/ProblemCard.jsx
import React from "react";
import "./ProblemCard.css";

const ProblemCard = ({
  problem,
  isAdmin,
  isMainAdmin,
  onRequestDelete,
  onApproveDelete,
  onDenyDelete,
  onHardDelete,
}) => {
  const { _id, Link, Name, Tags, Level, Knowledge, addedBy, deleteRequested } =
    problem;

  return (
    <div className="problem-card">
      <div className="problem-header">
        <a href={Link} target="_blank" rel="noopener noreferrer">
          <h3 className="problem-name">{Name}</h3>
        </a>
        {isMainAdmin ? (
          deleteRequested ? (
            <>
              <button
                className="approve-button"
                onClick={() => onApproveDelete(_id)}
              >
                ✅ Approve
              </button>
              <button className="deny-button" onClick={() => onDenyDelete(_id)}>
                ❌ Deny
              </button>
            </>
          ) : (
            <button className="delete-button" onClick={() => onHardDelete(_id)}>
              🗑️ Delete
            </button>
          )
        ) : isAdmin ? (
          deleteRequested ? (
            <span className="pending-label">⏳ Pending Approval</span>
          ) : (
            <button
              className="delete-button"
              onClick={() => onRequestDelete(_id)}
            >
              🗑️ Request Delete
            </button>
          )
        ) : null}
      </div>

      <div className="problem-details">
        <p>
          <span className="label">Tags:</span> {Tags}
        </p>
        <p>
          <span className="label">Level:</span> {Level}
        </p>
        <p>
          <span className="label">Knowledge:</span> {Knowledge || "Basic"}
        </p>
        <p>
          <span className="label">Added By:</span> {addedBy || "Default"}
        </p>
      </div>
    </div>
  );
};

export default ProblemCard;
