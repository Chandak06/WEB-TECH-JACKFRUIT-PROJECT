import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import "../styles/SkillsPage.css";
import { useData } from "../context/DataContext.jsx";
import { useAuth } from "../context/AuthContext";

const SkillsPage = () => {
  const { profile } = useData();
  const [skillList, setSkillList] = useState([]);
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [selectedSkillForSwap, setSelectedSkillForSwap] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/skills");
        const data = await response.json();

        if (!response.ok) {
          console.warn(data.message || "Failed to fetch skills");
          return;
        }

        const formatted = data.map((s) => ({
          ...s,
          id: s._id,
        }));

        setSkillList(formatted);
      } catch (err) {
        console.warn("Error loading skills:", err);
      }
    };

    fetchSkills();
  }, []);

const handleRequest = async (skill) => {
  const mySkill = selectedSkillForSwap[skill.id];
  
  if (!mySkill) {
    toast.warning("Please select what skill you're offering in return");
    return;
  }

  const requester = user?.name || profile?.name || "Anonymous";
  const payload = {
    skill: skill.title,
    requesterSkill: mySkill,
    from: requester,
    to: skill.provider || "Unknown",
    message: `I want to learn ${skill.title} and can teach ${mySkill} in return`,
    date: new Date().toISOString().split("T")[0],
    status: "pending",
  };

  try {
    const res = await fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to save request to DB");
    await res.json();

    toast.success(`Request sent for ${skill.title}`);
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong while sending the request.");
  }
};

  const tags = useMemo(() => {
    const s = new Set();
    skillList.forEach((k) => (k.tags || []).forEach((t) => s.add(t)));
    return Array.from(s);
  }, [skillList]);

  const filtered = skillList.filter((s) => {
    const matchesQ =
      q.trim() === "" ||
      (s.title + " " + s.desc + " " + s.provider)
        .toLowerCase()
        .includes(q.toLowerCase());
    const matchesTag = tagFilter === "" || (s.tags || []).includes(tagFilter);
    return matchesQ && matchesTag;
  });

  return (
    <div className="skills-root">
      <header className="skills-header">
        <div>
          <h1>Available Skills</h1>
          <p className="muted">
            Browse micro-lessons and practice sessions offered by classmates.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <button className="btn" onClick={() => window.location.href = '/dashboard'}>Dashboard</button>
          <button className="btn" onClick={() => window.location.href = '/requests'}>Requests</button>
          <button className="btn" onClick={() => window.location.href = '/people'}>People</button>
          <button className="btn-primary" onClick={() => window.location.href = '/offer'}>Offer Skill</button>
        </div>
      </header>

      <div className="skills-controls">
        <input
          className="search"
          placeholder="Search skills or provider..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <div className="tag-list">
          <button
            className={`tag ${tagFilter === "" ? "active" : ""}`}
            onClick={() => setTagFilter("")}
          >
            All
          </button>
          {tags.map((t) => (
            <button
              key={t}
              className={`tag ${tagFilter === t ? "active" : ""}`}
              onClick={() => setTagFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-grid">
        {filtered.map((s) => (
          <article key={s.id} className="skill">
            <div className="skill-top">
              <h3>
                <Link to={`/skill/${s.id}`}>{s.title}</Link>
              </h3>
              <span className="level">{s.level}</span>
            </div>
            <div className="skill-meta">
              <span className="provider">By {s.provider}</span>
              <div className="skill-tags">
                {(s.tags || []).map((t) => (
                  <span key={t} className="pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <p className="desc">{s.desc}</p>
            {s.wantedSkill && (
              <div style={{ margin: '8px 0', padding: '8px', background: '#e3f2fd', borderRadius: '6px', fontSize: '13px' }}>
                <strong>🔄 Wants to learn:</strong> <span style={{ color: '#1976d2', fontWeight: '600' }}>{s.wantedSkill}</span>
              </div>
            )}
            <div style={{ marginTop: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px', color: '#666' }}>
                Your skill to offer in return:
              </label>
              <select 
                value={selectedSkillForSwap[s.id] || ''} 
                onChange={(e) => setSelectedSkillForSwap({...selectedSkillForSwap, [s.id]: e.target.value})}
                style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
              >
                <option value="">-- Select your skill --</option>
                {profile?.offered?.map((offeredSkill, idx) => (
                  <option key={idx} value={offeredSkill}>{offeredSkill}</option>
                ))}
              </select>
            </div>
            <div className="skill-actions">
              <button className="btn" onClick={() => handleRequest(s)}>Request</button>
              <Link to={`/skill/${s.id}`}>
                <button className="btn-ghost">View Details</button>
              </Link>
            </div>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="empty">No skills match your search.</div>
        )}
      </div>
    </div>
  );
};

export default SkillsPage;
