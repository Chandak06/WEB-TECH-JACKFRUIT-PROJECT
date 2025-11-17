import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";
import { toast } from 'react-toastify';
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";


const DashBoardPage = () => {
  const { user } = useAuth();
  const { skills, requests, profile, refreshData } = useData();
  const navigate = useNavigate();
  const [editingSkill, setEditingSkill] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    level: '',
    desc: '',
    tags: []
  });

  const displayUser = {
    name: profile?.name ?? user?.name,
    email: profile?.email ?? user?.email,
    location: profile?.location,
    bio: profile?.bio,
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setEditForm({
      title: skill.title,
      level: skill.level,
      desc: skill.desc,
      tags: skill.tags || []
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/skills/${editingSkill._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        toast.error('Failed to update skill');
        return;
      }

      toast.success('Skill updated successfully!');
      setEditingSkill(null);
      setTimeout(() => {
        refreshData();
      }, 1000);
    } catch (err) {
      console.error('Error updating skill:', err);
      toast.error('An error occurred while updating the skill');
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/skills/${skillId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        toast.error('Failed to delete skill');
        return;
      }

      toast.success('Skill deleted successfully!');
      setTimeout(() => {
        refreshData();
      }, 1000);
    } catch (err) {
      console.error('Error deleting skill:', err);
      toast.error('An error occurred while deleting the skill');
    }
  };

  const handleCancelRequest = async (requestId) => {
    if (!window.confirm('Are you sure you want to cancel this request?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/requests/${requestId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        toast.error('Failed to cancel request');
        return;
      }

      toast.success('Request cancelled successfully!');
      setTimeout(() => {
        refreshData();
      }, 1000);
    } catch (err) {
      console.error('Error cancelling request:', err);
      toast.error('An error occurred while cancelling the request');
    }
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' }),
      });

      if (!response.ok) {
        toast.error('Failed to accept request');
        return;
      }

      toast.success('Request accepted successfully!');
      setTimeout(() => {
        refreshData();
      }, 1000);
    } catch (err) {
      console.error('Error accepting request:', err);
      toast.error('An error occurred while accepting the request');
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/requests/${requestId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'declined' }),
      });

      if (!response.ok) {
        toast.error('Failed to decline request');
        return;
      }

      toast.success('Request declined');
      setTimeout(() => {
        refreshData();
      }, 1000);
    } catch (err) {
      console.error('Error declining request:', err);
      toast.error('An error occurred while declining the request');
    }
  };

  return (
    <div className="db-root">
      <BackButton />
      <header className="db-header">
        <h1>Dashboard</h1>
        <p className="db-sub">
          Welcome back, {displayUser.name.split(" ")[0]} — here are your skills and
          requests.
        </p>
      </header>

      <div className="db-grid">
        <aside className="db-left">
          <div className="user-card">
            <div className="avatar">
              {displayUser.avatar ||
                displayUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
            </div>
            <div className="user-info">
              <h3>{displayUser.name}</h3>
              <p className="muted">{displayUser.email}</p>
              <p className="muted">{displayUser.location}</p>
              <p className="bio">{displayUser.bio}</p>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-num">{(skills || []).filter((s) => s.provider === displayUser.name).length}</div>
              <div className="stat-label">Offered</div>
            </div>
            <div className="stat">
              <div className="stat-num">{(requests || []).length}</div>
              <div className="stat-label">Requested</div>
            </div>
          </div>
        </aside>

        <section className="db-main">
          <div className="section">
            <div className="section-head">
              <h2>Offer Skills</h2>
              <button className="btn-primary small" onClick={() => navigate("/offer-skill")}>Add</button>
            </div>

            <div className="list">
              {(skills || [])
                .filter((s) => s.provider === displayUser.name)
                .map((s) => (
                  <div key={s._id || s.id} className="skill-card">
                    <div className="skill-head">
                      <h3>{s.title}</h3>
                      <span className="level">{s.level}</span>
                    </div>
                    <p className="muted">{s.desc}</p>
                    <div className="skill-actions">
                      <button className="btn" onClick={() => handleEditSkill(s)}>Edit</button>
                      <button className="btn" onClick={() => handleDeleteSkill(s._id)}>Delete</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="section">
            <div className="section-head">
              <h2>Show Requests</h2>
              <button className="btn-primary small" onClick={() => navigate("/request-skill")}>Request</button>
            </div>

            <div className="list">
              {(requests || []).map((s) => (
                <div key={s._id || s.id} className="skill-card">
                  <div className="skill-head">
                    <h3>{s.skill}</h3>
                    <span className="level">{s.status}</span>
                  </div>
                  <p className="muted">Requested by {s.from}</p>
                  <div className="skill-actions">
                    {s.status === 'pending' ? (
                      <>
                        <button className="btn-primary" onClick={() => handleAcceptRequest(s._id)}>Accept</button>
                        <button className="btn" onClick={() => handleDeclineRequest(s._id)}>Decline</button>
                      </>
                    ) : (
                      <>
                        <span className="status-badge">{s.status}</span>
                        <button className="btn" onClick={() => handleCancelRequest(s._id)}>Remove</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="db-right">
          <div className="panel">
            <h3>Quick actions</h3>
            <ul className="actions">
              <li>
                <button className="btn" onClick={() => navigate("/offer")}>Create listing</button>
              </li>
              <li>
                <button className="btn" onClick={() => navigate("/people")}>Browse people</button>
              </li>
            </ul>
          </div>

          <div className="panel">
            <h3>Recent activity</h3>
            <p className="muted">
              No recent activity — start by creating your first listing.
            </p>
          </div>
        </aside>
      </div>

      {/* Edit Skill Modal */}
      {editingSkill && (
        <div className="modal-overlay" onClick={() => setEditingSkill(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Skill</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <label>
                Title
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  required
                />
              </label>
              
              <label>
                Level
                <select
                  value={editForm.level}
                  onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>

              <label>
                Description
                <textarea
                  value={editForm.desc}
                  onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                  rows="4"
                  required
                />
              </label>

              <label>
                Tags (comma separated)
                <input
                  type="text"
                  value={editForm.tags.join(', ')}
                  onChange={(e) => setEditForm({ ...editForm, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
                />
              </label>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">Save Changes</button>
                <button type="button" className="btn" onClick={() => setEditingSkill(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardPage;
