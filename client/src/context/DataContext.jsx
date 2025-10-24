import React, { createContext, useContext, useEffect, useState } from "react";

const SKILLS_KEY = "skillswap_skills_v1";
const REQ_KEY = "skillswap_requests_v1";
const PROFILE_KEY = "skillswap_profile_v1";

const defaultSkills = [
  {
    id: 1,
    title: "Intro to React",
    level: "Beginner",
    provider: "Alex J",
    tags: ["react", "web"],
    desc: "Learn components, props, and hooks in a 45-min session.",
  },
  {
    id: 2,
    title: "HTML & CSS Basics",
    level: "Beginner",
    provider: "Sam P",
    tags: ["html", "css", "responsive"],
    desc: "Semantics, layout, and responsive techniques.",
  },
  {
    id: 3,
    title: "Figma UI Workshop",
    level: "Intermediate",
    provider: "Priya S",
    tags: ["design", "figma"],
    desc: "Design fundamentals and simple UI prototyping.",
  },
  {
    id: 4,
    title: "Photography 101",
    level: "Beginner",
    provider: "Ravi K",
    tags: ["photo", "editing"],
    desc: "Basics of composition and mobile editing.",
  },
  {
    id: 5,
    title: "Git & GitHub",
    level: "Intermediate",
    provider: "Lina M",
    tags: ["git", "version-control"],
    desc: "Commits, branches, and PR workflow.",
  },
];

const defaultRequests = [
  {
    id: 1,
    skill: "Intro to React",
    from: "Sam P",
    message: "Can we do this tomorrow evening?",
    date: "2025-10-20",
    status: "pending",
  },
  {
    id: 2,
    skill: "Photography 101",
    from: "Lina M",
    message: "Would love a 1 hour session.",
    date: "2025-10-22",
    status: "pending",
  },
  {
    id: 3,
    skill: "Git & GitHub",
    from: "Ravi K",
    message: "Quick help with PRs?",
    date: "2025-10-23",
    status: "pending",
  },
];

const defaultProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@student.edu",
  location: "Campus Library",
  bio: "Computer Science student who loves teaching web fundamentals and UI design.",
  offered: ["Intro to React", "HTML & CSS Basics"],
  wanted: ["Photoshop Basics"],
};

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [skills, setSkills] = useState(defaultSkills);
  const [requests, setRequests] = useState(defaultRequests);
  const [profile, setProfile] = useState(defaultProfile);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SKILLS_KEY);
      if (raw) setSkills(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to read skills from storage", e);
    }
    try {
      const raw = localStorage.getItem(REQ_KEY);
      if (raw) setRequests(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to read requests from storage", e);
    }
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to read profile from storage", e);
    }
  }, []);

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
    } catch (e) {
      console.warn("Failed to save skills", e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(REQ_KEY, JSON.stringify(requests));
    } catch (e) {
      console.warn("Failed to save requests", e);
    }
  }, [requests]);

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn("Failed to save profile", e);
    }
  }, [profile]);

  const findSkillById = (id) => skills.find((s) => String(s.id) === String(id));

  const addOffer = (offer) => {
    const id = Date.now();
    const next = { id, ...offer };
    setSkills((s) => [next, ...s]);
    // Optionally add to profile.offered if provider matches
    if (offer.provider && offer.provider === profile.name) {
      setProfile((p) => ({ ...p, offered: [...p.offered, offer.title] }));
    }
    return next;
  };

  const addRequest = (req) => {
    const id = Date.now();
    const next = { id, ...req };
    setRequests((r) => [next, ...r]);
    return next;
  };

  const updateRequestStatus = (id, status) => {
    setRequests((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  };

  const updateProfile = (next) => {
    setProfile((p) => (typeof next === "function" ? next(p) : next));
  };

  const resetProfile = () => setProfile(defaultProfile);

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
        resetProfile,
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
