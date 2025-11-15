import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useData } from "../context/DataContext.jsx";
import "../styles/Dashboard.css";

const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@student.edu",
  avatar: "",
  location: "Campus Library",
  bio: "Computer Science student who loves teaching web fundamentals and UI design.",
};

const DashBoardPage = () => {
  const { user } = useAuth();
  const { skills, requests, profile } = useData();
  const displayUser = {
    ...mockUser,
    name: user?.name ?? profile?.name ?? mockUser.name,
    email: user?.email ?? profile?.email ?? mockUser.email,
  };
  return (
    <div className="db-root">
      <header className="db-header">
        <h1>Dashboard</h1>
        <p className="db-sub">
          Welcome back, {mockUser.name.split(" ")[0]} — here are your skills and
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
              <h2>Offered Skills</h2>
              <button className="btn-primary small">Add</button>
            </div>

            <div className="list">
              {(skills || [])
                .filter((s) => s.provider === displayUser.name)
                .map((s) => (
                  <div key={s.id} className="skill-card">
                    <div className="skill-head">
                      <h3>{s.title}</h3>
                      <span className="level">{s.level}</span>
                    </div>
                    <p className="muted">{s.desc}</p>
                    <div className="skill-actions">
                      <button className="btn">Edit</button>
                      <button className="btn">Message</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="section">
            <div className="section-head">
              <h2>Requested Skills</h2>
              <button className="btn-primary small">Request</button>
            </div>

            <div className="list">
              {(requests || []).map((s) => (
                <div key={s.id} className="skill-card">
                  <div className="skill-head">
                    <h3>{s.skill}</h3>
                    <span className="level">{s.status}</span>
                  </div>
                  <p className="muted">Requested by {s.from}</p>
                  <div className="skill-actions">
                    <button className="btn">Cancel</button>
                    <button className="btn">Find Match</button>
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
                <button className="btn">Create listing</button>
              </li>
              <li>
                <button className="btn">Browse people</button>
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
    </div>
  );
};

export default DashBoardPage;
