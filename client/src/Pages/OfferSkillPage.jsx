import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OfferSkillPage.css";
import { useData } from "../context/DataContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const OfferSkillPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [tags, setTags] = useState("");
  const [desc, setDesc] = useState("");
  const { addOffer, profile } = useData();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple client-side validation
    if (!title.trim() || !desc.trim()) {
      alert("Please provide a title and description for the skill.");
      return;
    }

    // Build payload and persist via DataContext
    const payload = {
      title,
      level,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      desc,
      provider: profile?.name || (user && user.name) || "Anonymous",
    };
    addOffer(payload);

    // Confirmation then redirect to dashboard
    alert("Skill offer created (mock). Redirecting to dashboard...");
    navigate("/dashboard");
  };

  return (
    <div className="offer-root">
      <div className="offer-card">
        <h2>Offer a Skill</h2>
        <p className="muted">
          Create a short listing so classmates can request your session.
        </p>

        <form className="offer-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Intro to React"
            />
          </label>

          <label>
            Level
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>

          <label>
            Tags (comma separated)
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, web, ui"
            />
          </label>

          <label>
            Description
            <textarea
              style={{ resize: "none" }}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Briefly describe what you'll teach and how long a session takes."
              rows={5}
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Publish
            </button>
            <button type="button" className="btn" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferSkillPage;
