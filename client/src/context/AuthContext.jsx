import React, { createContext, useContext, useEffect, useState } from "react";

const KEY = "skillswap_user_v1";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // 🔥 THE MISSING PIECE

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        setUser(JSON.parse(raw));
      }
    } catch (err) {
      console.warn("Failed to read auth", err);
    }

    setLoading(false);  // 🔥 CRITICAL — do NOT redirect until done
  }, []);

  const login = (u) => {
    setUser(u);
    try {
      localStorage.setItem(KEY, JSON.stringify(u));
    } catch (err) {
      console.warn("Failed to save auth", err);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(KEY);
    } catch (err) {
      console.warn("Failed to remove auth", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loading,       // 🔥 expose loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
