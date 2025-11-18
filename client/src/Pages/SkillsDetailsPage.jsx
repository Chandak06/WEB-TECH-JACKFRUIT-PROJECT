import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import "../styles/SkillsDetailsPage.css";
import { useData } from "../context/DataContext.jsx";

const SkillsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, skills } = useData();
  const [skill, setSkill] = useState(null);
  const [mySkillToOffer, setMySkillToOffer] = useState("");

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
    if (!mySkillToOffer) {
      toast.warning("Please select what skill you're offering in return");
      return;
    }

    const payload = {
      skill: skill.title,
      requesterSkill: mySkillToOffer,
      from: profile?.name ?? "Anonymous",
      to: skill.provider || "Unknown",
      message: `I want to learn ${skill.title} and can teach ${mySkillToOffer} in return`,
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

      toast.success(`Request sent to ${skill.provider}`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while sending the request.");
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

          {skill.wantedSkill && (
            <div style={{ margin: '16px 0', padding: '12px', background: '#e3f2fd', borderRadius: '8px', borderLeft: '4px solid #2196F3' }}>
              <strong>🔄 {skill.provider} wants to learn:</strong> <span style={{ color: '#1976d2', fontWeight: '600' }}>{skill.wantedSkill}</span>
            </div>
          )}

          <section className="swap-section">
            <h3>Your Skill to Offer in Exchange</h3>
            <p className="muted">Select what skill you'll teach in return for learning {skill.title}</p>
            <select 
              value={mySkillToOffer} 
              onChange={(e) => setMySkillToOffer(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
            >
              <option value="">-- Select a skill you can offer --</option>
              {profile?.offered?.map((offeredSkill, idx) => (
                <option key={idx} value={offeredSkill}>{offeredSkill}</option>
              ))}
            </select>
            {(!profile?.offered || profile.offered.length === 0) && (
              <p style={{ color: '#ff6b6b', marginTop: '8px', fontSize: '14px' }}>
                ⚠️ Add skills to your profile first to offer in exchange
              </p>
            )}
          </section>

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
              <button className="btn" onClick={() => navigate('/dashboard')}>Dashboard</button>
              <button className="btn" onClick={() => navigate('/skills')} style={{ marginLeft: 8 }}>All Skills</button>
              <button className="btn" onClick={() => navigate('/people')} style={{ marginLeft: 8 }}>People</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SkillsDetailsPage;
