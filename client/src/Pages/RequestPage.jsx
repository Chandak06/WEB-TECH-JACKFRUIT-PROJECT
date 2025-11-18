import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import "../styles/RequestPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // ✅ to get current user

const RequestPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ get logged-in user
  const [requests, setRequests] = useState([]);

  // 🧠 Fetch only requests where "to" = current user's name
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.name) return;

      try {
        const res = await fetch(
          `http://localhost:5000/api/requests?to=${encodeURIComponent(user.name)}`
        );
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error("Error loading requests:", err);
      }
    };

    fetchRequests();
  }, [user]);

  // 🧠 Update request status (Accept / Decline)
  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action }),
      });

      if (!res.ok) throw new Error("Failed to update request status");

      // Update locally too
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: action } : r
        )
      );

      toast.success(`Request ${action}`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while updating the request.");
    }
  };

  return (
    <div className="req-root">
      <header className="req-head">
        <div>
          <h1>Swap Requests</h1>
          <p className="muted">
            Pending skill swap requests from classmates. Accept to schedule or
            decline if not available.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="btn" onClick={() => navigate('/skills')}>Skills</button>
          <button className="btn" onClick={() => navigate('/people')}>People</button>
        </div>
      </header>

      <div className="req-list">
        {requests.length === 0 && (
          <div className="empty">No pending requests.</div>
        )}

        {requests.map((r) => (
          <div key={r._id} className={`req-card ${r.status}`}>
            <div className="req-main">
              <div className="req-info">
                <h3>Skill Swap Request</h3>
                <div className="swap-details" style={{ margin: '12px 0', padding: '12px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>{r.from}</strong> wants to learn: <span style={{ color: '#4CAF50', fontWeight: '600' }}>{r.skill}</span>
                  </div>
                  <div>
                    <strong>{r.from}</strong> will teach you: <span style={{ color: '#2196F3', fontWeight: '600' }}>{r.requesterSkill || 'Not specified'}</span>
                  </div>
                </div>
                <div className="meta">
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
                    onClick={() => handleAction(r._id, "accepted")}
                  >
                    Accept
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleAction(r._id, "declined")}
                  >
                    Decline
                  </button>
                </>
              ) : (
                <div className={`status ${r.status}`}>{r.status}</div>
              )}

              <button className="btn" onClick={() => navigate(`/skill/${r.skillId || 1}`)}>
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
