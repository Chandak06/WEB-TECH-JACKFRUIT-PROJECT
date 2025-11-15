import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/PeoplePage.css";

const PeoplePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();

        if (!response.ok) {
          console.warn(data.message || "Failed to fetch users");
          return;
        }

        setPeople(data);
      } catch (err) {
        console.error("Error loading people:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const filteredPeople = people.filter((person) => {
    const query = searchQuery.toLowerCase();
    return (
      person.name?.toLowerCase().includes(query) ||
      person.email?.toLowerCase().includes(query) ||
      person.location?.toLowerCase().includes(query) ||
      person.bio?.toLowerCase().includes(query)
    );
  });

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="people-root">
        <div className="loading">Loading people...</div>
      </div>
    );
  }

  return (
    <div className="people-root">
      <header className="people-header">
        <h1>Browse People</h1>
        <p className="muted">
          Connect with classmates and discover what skills they offer or need.
        </p>
      </header>

      <div className="people-controls">
        <input
          className="search"
          placeholder="Search by name, email, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      <div className="people-grid">
        {filteredPeople.length === 0 && (
          <div className="empty">No people found matching your search.</div>
        )}

        {filteredPeople.map((person) => (
          <div key={person._id} className="person-card">
            <div className="person-avatar">{getInitials(person.name)}</div>
            <div className="person-info">
              <h3>{person.name || "Anonymous"}</h3>
              <p className="email">{person.email}</p>
              {person.location && (
                <p className="location">📍 {person.location}</p>
              )}
              {person.bio && <p className="bio">{person.bio}</p>}

              {person.offered && person.offered.length > 0 && (
                <div className="skills-section">
                  <strong>Offers:</strong>
                  <div className="tags">
                    {person.offered.map((skill, idx) => (
                      <span key={idx} className="tag offer">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {person.wanted && person.wanted.length > 0 && (
                <div className="skills-section">
                  <strong>Wants:</strong>
                  <div className="tags">
                    {person.wanted.map((skill, idx) => (
                      <span key={idx} className="tag want">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="person-actions">
                {user?.email !== person.email && (
                  <>
                    <button className="btn-primary small">Message</button>
                    <button className="btn small">View Profile</button>
                  </>
                )}
                {user?.email === person.email && (
                  <button
                    className="btn small"
                    onClick={() => navigate("/profile")}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeoplePage;
