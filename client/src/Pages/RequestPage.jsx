import React from "react";
import "../styles/RequestPage.css";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext.jsx";

const RequestPage = () => {
  const { requests, updateRequestStatus } = useData();
  const navigate = useNavigate();

  const handleAction = (id, action) => {
    // Update via DataContext
    updateRequestStatus(id, action);
    alert(`Request ${action}`);
  };

  return (
    <div className="req-root">
      <header className="req-head">
        <h1>Swap Requests</h1>
        <p className="muted">
          Pending skill swap requests from classmates. Accept to schedule or
          decline if not available.
        </p>
      </header>

      <div className="req-list">
        {requests.length === 0 && (
          <div className="empty">No pending requests.</div>
        )}

        {requests.map((r) => (
          <div key={r.id} className={`req-card ${r.status}`}>
            <div className="req-main">
              <div className="req-info">
                <h3>{r.skill}</h3>
                <div className="meta">
                  from <strong>{r.from}</strong> ·{" "}
                  <span className="muted">{r.date}</span>
                </div>
                <p className="msg">{r.message}</p>
              </div>
            </div>

            <div className="req-actions">
              {r.status === "pending" ? (
                <>
                  <button
                    className="btn-primary"
                    onClick={() => handleAction(r.id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleAction(r.id, "declined")}
                  >
                    Decline
                  </button>
                </>
              ) : (
                <div className={`status ${r.status}`}>{r.status}</div>
              )}

              <button className="btn" onClick={() => navigate("/skill/1")}>
                View skill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestPage;
