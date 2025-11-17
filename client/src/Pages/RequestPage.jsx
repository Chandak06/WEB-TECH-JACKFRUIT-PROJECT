import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import "../styles/RequestPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // ✅ to get current user
import BackButton from "../components/BackButton.jsx";

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
    <div>
      <BackButton />
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
          <div key={r._id} className={`req-card ${r.status}`}>
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
