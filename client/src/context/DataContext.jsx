import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [requests, setRequests] = useState([]);
  const [profile, setProfile] = useState(null);

  // Fetch all data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch skills
        const skillRes = await fetch("http://localhost:5000/api/skills");
        const skillData = await skillRes.json();
        setSkills(skillData);

        // Fetch requests
        const reqRes = await fetch("http://localhost:5000/api/requests");
        const reqData = await reqRes.json();
        setRequests(reqData);

        // Fetch profile (if logged in)
        const email = localStorage.getItem("skillswap_user_v1")
          ? JSON.parse(localStorage.getItem("skillswap_user_v1")).email
          : null;

        if (email) {
          const profileRes = await fetch(`http://localhost:5000/api/profile/${encodeURIComponent(email)}`);
          const profileData = await profileRes.json();
          setProfile(profileData);
        }
      } catch (err) {
        console.error("❌ Failed to fetch data from backend:", err);
      }
    };

    fetchData();
  }, []);

  // Add new skill (Offer)
  const addOffer = async (offer) => {
    try {
      const response = await fetch("http://localhost:5000/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer),
      });

      if (!response.ok) throw new Error("Failed to add offer");

      const newSkill = await response.json();
      setSkills((prev) => [newSkill, ...prev]);
      return newSkill;
    } catch (err) {
      console.error("❌ Error adding offer:", err);
    }
  };

  // Add new request
  const addRequest = async (req) => {
    try {
      const response = await fetch("http://localhost:5000/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });

      if (!response.ok) throw new Error("Failed to add request");

      const newReq = await response.json();
      setRequests((prev) => [newReq, ...prev]);
      return newReq;
    } catch (err) {
      console.error("❌ Error adding request:", err);
    }
  };

  // Update request status
  const updateRequestStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update request status");

      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error("❌ Error updating request:", err);
    }
  };

  // Update user profile
  const updateProfile = async (next) => {
    const updated = typeof next === "function" ? next(profile) : next;
    setProfile(updated);

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!response.ok) throw new Error("Failed to update profile");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
    }
  };

  const findSkillById = (id) =>
    skills.find((s) => String(s._id || s.id) === String(id));

  return (
    <DataContext.Provider
      value={{
        skills,
        requests,
        profile,
        findSkillById,
        addOffer,
        addRequest,
        updateRequestStatus,
        updateProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

export default DataContext;
