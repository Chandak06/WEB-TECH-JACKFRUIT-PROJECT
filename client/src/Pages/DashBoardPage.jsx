import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";
import { toast } from 'react-toastify';
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";


const DashBoardPage = () => {
  const { user } = useAuth();
  const { skills, requests, profile, refreshData } = useData();
  const navigate = useNavigate();
  const [editingSkill, setEditingSkill] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    level: '',
    desc: '',
    tags: [],
    wantedSkill: ''
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
      tags: skill.tags || [],
      wantedSkill: skill.wantedSkill || ''
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
      <header className="db-header">
        <div>
          <h1>Dashboard</h1>
          <p className="db-sub">
            Welcome back, {displayUser.name.split(" ")[0]} — here are your skills and
            requests.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <button className="btn" onClick={() => navigate('/skills')}>Browse Skills</button>
          <button className="btn" onClick={() => navigate('/people')}>People</button>
          <button className="btn" onClick={() => navigate('/requests')}>Requests</button>
          <button className="btn" onClick={() => navigate('/profile')}>Profile</button>
          <button className="btn-primary" onClick={() => navigate('/offer-skill')}>Offer Skill</button>
        </div>
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
                    {s.wantedSkill && (
                      <div style={{ margin: '8px 0', padding: '8px', background: '#e3f2fd', borderRadius: '6px', fontSize: '13px' }}>
                        <strong>🔄 You want to learn:</strong> <span style={{ color: '#1976d2', fontWeight: '600' }}>{s.wantedSkill}</span>
                      </div>
                    )}
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
                    <h3>Skill Swap</h3>
                    <span className="level">{s.status}</span>
                  </div>
                  <div style={{ margin: '8px 0', padding: '8px', background: '#f8f9fa', borderRadius: '6px' }}>
                    <p style={{ marginBottom: '4px' }}>
                      👉 <strong>{s.from}</strong> wants: <span style={{ color: '#4CAF50', fontWeight: '600' }}>{s.skill}</span>
                    </p>
                    <p>
                      👈 <strong>{s.from}</strong> offers: <span style={{ color: '#2196F3', fontWeight: '600' }}>{s.requesterSkill || 'Not specified'}</span>
                    </p>
                  </div>
                  <p className="muted">Request from {s.from} · {s.date}</p>
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

              <label>
                Skill You Want to Learn (Optional)
                <input
                  type="text"
                  value={editForm.wantedSkill}
                  onChange={(e) => setEditForm({ ...editForm, wantedSkill: e.target.value })}
                  placeholder="e.g. Python, Public Speaking"
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
