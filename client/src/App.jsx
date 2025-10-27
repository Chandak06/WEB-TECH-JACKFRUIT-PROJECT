import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import SignupPage from "./Pages/SignupPage.jsx";
import DashBoardPage from "./Pages/DashBoardPage.jsx";
import SkillsPage from "./Pages/SkillsPage.jsx";
import OfferSkillPage from "./Pages/OfferSkillPage.jsx";
import SkillsDetailsPage from "./Pages/SkillsDetailsPage.jsx";
import RequestPage from "./Pages/RequestPage.jsx";
import ProfilePage from "./Pages/ProfilePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/skill/:id" element={<SkillsDetailsPage />} />
      <Route
        path="/offer"
        element={
          <ProtectedRoute>
            <OfferSkillPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <RequestPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
