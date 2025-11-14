import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/SkillsDetailsPage.css";
import { useData } from "../context/DataContext.jsx";

const SkillsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, skills } = useData();
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    const foundSkill = skills.find(s => s._id === id || s.id === id);
    setSkill(foundSkill);
  }, [id, skills]);

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

  const handleRequest = async () => {
    const payload = {
      skill: skill.title,
      from: profile?.name ?? "Anonymous",
      to: skill.provider || "Unknown",
      message: "Request via app",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    try {
      const res = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save request");
      await res.json();

      alert(`Request sent to ${skill.provider}`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while sending the request.");
    }
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
