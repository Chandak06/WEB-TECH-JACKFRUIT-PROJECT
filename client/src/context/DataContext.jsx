import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user from AuthContext instead of managing separately

  const [skills, setSkills] = useState([]);
  const [requests, setRequests] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skillsRes = await fetch("http://localhost:5000/api/skills");
        setSkills(await skillsRes.json());

        const reqRes = await fetch("http://localhost:5000/api/requests");
        setRequests(await reqRes.json());

        if (user?.email) {
          const pRes = await fetch(
            `http://localhost:5000/api/profile/${encodeURIComponent(user.email)}`
          );
          setProfile(await pRes.json());
        } else {
          setProfile(null);
        }

      } catch (err) {
        console.error("❌ Fetch error:", err);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  const updateProfile = async (updated) => {
    if (!user?.email) return;

    const res = await fetch(
      `http://localhost:5000/api/profile/${encodeURIComponent(user.email)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }
    );

    if (!res.ok) return;

    setProfile(updated);
  };

  return (
    <DataContext.Provider
      value={{
        loading,
        skills,
        requests,
        profile,
        updateProfile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
export default DataContext;
