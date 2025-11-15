import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/SkillsDetailsPage.css";
import { useData } from "../context/DataContext.jsx";

const SkillsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findSkillById, addRequest, profile } = useData();
  const skill = findSkillById(id);

  if (!skill) {
    return (
      <div className="sd-root">
        <div className="sd-card">
          <h2>Skill not found</h2>
          <p className="muted">
            The requested skill doesn't exist or was removed.
          </p>
          <button className="btn" onClick={() => navigate("/skills")}>
            Back to skills
          </button>
        </div>
      </div>
    );
  }

  const handleRequest = () => {
    // Create a demo request and persist via DataContext
    addRequest({
      skill: skill.title,
      from: profile?.name ?? "Anonymous",
      message: "Request via app",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    });
    alert(`Request sent to ${skill.provider} (mock).`);
    navigate("/dashboard");
  };

  return (
    <div className="sd-root">
      <div className="sd-card">
        <div className="sd-top">
          <div>
            <h1>{skill.title}</h1>
            <div className="sd-meta">
              <span className="level">{skill.level}</span>{" "}
              <span className="provider">by {skill.provider}</span>
            </div>
          </div>
          <div className="sd-actions">
            <button className="btn" onClick={() => navigate("/skills")}>
              Back
            </button>
            <button className="btn-primary" onClick={handleRequest}>
              Request swap
            </button>
          </div>
        </div>

        <div className="sd-body">
          <p className="desc">{skill.desc}</p>
          <div className="tags">
            {skill.tags.map((t) => (
              <span key={t} className="pill">
                {t}
              </span>
            ))}
          </div>

          <section className="provider-card">
            <h3>Offered by</h3>
            <div className="prov-row">
              <div className="avatar">
                {skill.provider
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <strong>{skill.provider}</strong>
                <div className="muted">Member · Campus</div>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="btn">Message</button>
              <button className="btn" style={{ marginLeft: 8 }}>
                View profile
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SkillsDetailsPage;
