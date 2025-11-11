import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/SkillsPage.css";

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
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

        setSkills(formatted);
      } catch (err) {
        console.warn("Error loading skills:", err);
      }
    };

    fetchSkills();
  }, []);

  const tags = useMemo(() => {
    const s = new Set();
    skills.forEach((k) => (k.tags || []).forEach((t) => s.add(t)));
    return Array.from(s);
  }, [skills]);

  const filtered = skills.filter((s) => {
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
              <button className="btn">Request</button>
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
