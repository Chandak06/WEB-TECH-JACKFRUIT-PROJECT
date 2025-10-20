import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import SkillCard from './shared/SkillCard';
import SessionCard from './shared/SessionCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    skillsOffered: ['React', 'Node.js', 'Python'],
    skillsLearning: ['Machine Learning', 'UI/UX Design']
  });

  // Mock data - replace with API calls
  const upcomingSessions = [
    {
      id: 1,
      skill: 'React Basics',
      mentor: { name: 'Sarah Johnson' },
      mentee: { name: 'John Doe' },
      date: '2025-01-25',
      time: '10:00 AM',
      duration: 60,
      status: 'upcoming',
      type: 'One-on-One'
    },
    {
      id: 2,
      skill: 'Machine Learning',
      mentor: { name: 'David Chen' },
      mentee: { name: 'John Doe' },
      date: '2025-01-26',
      time: '2:00 PM',
      duration: 90,
      status: 'upcoming',
      type: 'One-on-One'
    }
  ];

  const recommendedSkills = [
    {
      name: 'Advanced React Patterns',
      category: 'Programming',
      mentor: { name: 'Emily Davis' },
      rating: 4.9,
      sessions: 156,
      price: 35,
      level: 'Advanced'
    },
    {
      name: 'UI/UX Design Fundamentals',
      category: 'Design',
      mentor: { name: 'Michael Brown' },
      rating: 4.8,
      sessions: 89,
      price: 30,
      level: 'Beginner'
    },
    {
      name: 'Python for Data Science',
      category: 'Programming',
      mentor: { name: 'Lisa Wang' },
      rating: 4.9,
      sessions: 203,
      price: 40,
      level: 'Intermediate'
    }
  ];

  const stats = [
    { label: 'Completed Sessions', value: '24', icon: '✅', color: 'from-green-600 to-emerald-600' },
    { label: 'Hours Learned', value: '48', icon: '⏱️', color: 'from-blue-600 to-cyan-600' },
    { label: 'Skills Mastered', value: '5', icon: '🎯', color: 'from-purple-600 to-pink-600' },
    { label: 'Points Earned', value: '1,250', icon: '⭐', color: 'from-yellow-600 to-orange-600' }
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar isAuthenticated={true} user={user} />

      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{user.name}! 👋</span>
            </h1>
            <p className="text-slate-400">Here's what's happening with your learning journey today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} opacity-20`}></div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button 
              onClick={() => navigate('/browse')}
              className="backdrop-blur-xl bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 p-6 text-left transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Browse Skills</h3>
              <p className="text-sm text-slate-400">Find new skills to learn</p>
            </button>

            <button 
              onClick={() => navigate('/messages')}
              className="backdrop-blur-xl bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 p-6 text-left transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Messages</h3>
              <p className="text-sm text-slate-400">Chat with your mentors</p>
            </button>

            <button 
              onClick={() => navigate('/profile')}
              className="backdrop-blur-xl bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 p-6 text-left transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">My Profile</h3>
              <p className="text-sm text-slate-400">Update your information</p>
            </button>
          </div>

          {/* Upcoming Sessions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Upcoming Sessions</h2>
              <button 
                onClick={() => navigate('/sessions')}
                className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {upcomingSessions.map(session => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>

          {/* Recommended Skills */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Recommended for You</h2>
              <button 
                onClick={() => navigate('/browse')}
                className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
              >
                Browse All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
