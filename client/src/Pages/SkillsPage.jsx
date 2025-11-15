import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/SkillsPage.css";
import { useData } from "../context/DataContext.jsx";

const SkillsPage = () => {
  const { skills } = useData();
  const [q, setQ] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const tags = useMemo(() => {
    const s = new Set();
    (skills || []).forEach((k) => k.tags.forEach((t) => s.add(t)));
    return Array.from(s);
  }, [skills]);

  const filtered = (skills || []).filter((s) => {
    const matchesQ =
      q.trim() === "" ||
      (s.title + " " + s.desc + " " + s.provider)
        .toLowerCase()
        .includes(q.toLowerCase());
    const matchesTag = tagFilter === "" || s.tags.includes(tagFilter);
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
                {s.tags.map((t) => (
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
