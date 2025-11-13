import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/SkillsPage.css";
import { useData } from "../context/DataContext.jsx";
import { useAuth } from "../context/AuthContext";

const SkillsPage = () => {
  const {addRequest, profile } = useData();
  const [skillList, setSkillList] = useState([]);
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [tagFilter, setTagFilter] = useState("");

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
  const requester = user?.name || profile?.name || "Anonymous";
  const payload = {
    skill: skill.title,
    from: requester,
    to: skill.provider || "Unknown",
    message: `Request for ${skill.title}`,
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
    const saved = await res.json();

    alert(`Request sent for ${skill.title}`);
  } catch (err) {
    console.error(err);
    alert("Something went wrong while sending the request.");
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
        <h1>Available Skills</h1>
        <p className="muted">
          Browse micro-lessons and practice sessions offered by classmates.
        </p>
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
            <div className="skill-actions">
              <button className="btn" onClick={() => handleRequest(s)}>Request</button>
              <button className="btn-ghost">Message</button>
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
