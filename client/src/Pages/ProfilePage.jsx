import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import "../styles/ProfilePage.css";
import { useData } from "../context/DataContext.jsx";
import React, { useEffect, useState } from "react";

const ProfilePage = () => {
  const { profile: ctxProfile, updateProfile } = useData();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null); 
  const [editing, setEditing] = useState(false);
  const [newOffered, setNewOffered] = useState("");
  const [newWanted, setNewWanted] = useState("");

  useEffect(() => {
    if (ctxProfile) {
      setProfile(ctxProfile);
    }
  }, [ctxProfile]);

  if (!profile) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h2>Loading profile...</h2>
      </div>
    );
  }

  const save = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/profile/${encodeURIComponent(profile.email)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update profile");
        return;
      }

      updateProfile(profile);

      alert("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.warn("Error saving:", err);
      alert("Error saving profile");
    }
  };

  const reset = () => {
    setProfile(ctxProfile);
    setEditing(false);
  };

  const addOffered = () => {
    const v = newOffered.trim();
    if (!v) return;

    setProfile({
      ...profile,
      offered: [...(profile.offered || []), v],
    });

    setNewOffered("");
  };

  const addWanted = () => {
    const v = newWanted.trim();
    if (!v) return;

    setProfile({
      ...profile,
      wanted: [...(profile.wanted || []), v],
    });

    setNewWanted("");
  };

  const removeOffered = (i) => {
    setProfile({
      ...profile,
      offered: profile.offered.filter((_, idx) => idx !== i),
    });
  };

  const removeWanted = (i) => {
    setProfile({
      ...profile,
      wanted: profile.wanted.filter((_, idx) => idx !== i),
    });
  };

  return (
    <div className="pf-root">
      <div className="pf-card">
        <header className="pf-header">
          <div>
            <h1>{profile.name}</h1>
            <p className="muted">
              {profile.email} · {profile.location || "No location"}
            </p>
          </div>

          <div className="pf-controls">
            {editing ? (
              <>
                <button className="btn" onClick={reset}>Cancel</button>
                <button className="btn-primary" onClick={save}>Save Profile</button>
              </>
            ) : (
              <button className="btn-primary" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            )}

            <button
              className="btn"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Log out
            </button>
          </div>
        </header>

        <section className="pf-body">
          <div className="pf-left">
            <label>
              Display name
              <input
                value={profile.name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                disabled={!editing}
              />
            </label>

            <label>
              Email
              <input
                value={profile.email || ""}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                disabled={!editing}
              />
            </label>

            <label>
              Location
              <input
                value={profile.location || ""}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
                disabled={!editing}
              />
            </label>

            <label>
              Bio
              <textarea
                value={profile.bio || ""}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                disabled={!editing}
                rows={4}
              />
            </label>

            <div className="pf-actions">
              <button className="btn" onClick={reset}>
                Reset to defaults
              </button>
            </div>
          </div>

          <aside className="pf-right">
            <div className="panel">
              <h3>Offered skills</h3>
              <ul className="skill-list">
                {profile.offered?.map((s, i) => (
                  <li key={i} className="skill-item">
                    <span>{s}</span>
                    {editing && (
                      <button
                        className="btn-ghost small"
                        onClick={() => removeOffered(i)}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {editing && (
                <div className="add-row">
                  <input
                    placeholder="New offered skill"
                    value={newOffered}
                    onChange={(e) => setNewOffered(e.target.value)}
                  />
                  <button className="btn" onClick={addOffered}>
                    Add
                  </button>
                </div>
              )}
            </div>

            <div className="panel">
              <h3>Wanted skills</h3>
              <ul className="skill-list">
                {profile.wanted?.map((s, i) => (
                  <li key={i} className="skill-item">
                    <span>{s}</span>
                    {editing && (
                      <button
                        className="btn-ghost small"
                        onClick={() => removeWanted(i)}
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {editing && (
                <div className="add-row">
                  <input
                    placeholder="New wanted skill"
                    value={newWanted}
                    onChange={(e) => setNewWanted(e.target.value)}
                  />
                  <button className="btn" onClick={addWanted}>
                    Add
                  </button>
                </div>
              )}
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
