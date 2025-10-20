import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import SessionCard from './shared/SessionCard';

const MySessions = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data
  const sessions = {
    upcoming: [
      {
        id: 1,
        skill: 'React Advanced Patterns',
        mentor: { name: 'Sarah Johnson' },
        mentee: { name: 'John Doe' },
        date: '2025-01-25',
        time: '10:00 AM',
        duration: 60,
        status: 'upcoming',
        type: 'One-on-One',
      },
      {
        id: 2,
        skill: 'Machine Learning Basics',
        mentor: { name: 'David Chen' },
        mentee: { name: 'John Doe' },
        date: '2025-01-26',
        time: '2:00 PM',
        duration: 90,
        status: 'upcoming',
        type: 'One-on-One',
      },
      {
        id: 3,
        skill: 'UI/UX Design Workshop',
        mentor: { name: 'Emily Davis' },
        mentee: { name: 'John Doe' },
        date: '2025-01-27',
        time: '11:00 AM',
        duration: 120,
        status: 'in-progress',
        type: 'Group Session',
      },
    ],
    completed: [
      {
        id: 4,
        skill: 'React Fundamentals',
        mentor: { name: 'Sarah Johnson' },
        mentee: { name: 'John Doe' },
        date: '2025-01-15',
        time: '10:00 AM',
        duration: 60,
        status: 'completed',
        type: 'One-on-One',
      },
      {
        id: 5,
        skill: 'Python Basics',
        mentor: { name: 'Lisa Wang' },
        mentee: { name: 'John Doe' },
        date: '2025-01-12',
        time: '3:00 PM',
        duration: 90,
        status: 'completed',
        type: 'One-on-One',
      },
      {
        id: 6,
        skill: 'JavaScript ES6',
        mentor: { name: 'Michael Brown' },
        mentee: { name: 'John Doe' },
        date: '2025-01-08',
        time: '1:00 PM',
        duration: 60,
        status: 'completed',
        type: 'One-on-One',
      },
    ],
    cancelled: [
      {
        id: 7,
        skill: 'Node.js Masterclass',
        mentor: { name: 'James Wilson' },
        mentee: { name: 'John Doe' },
        date: '2025-01-20',
        time: '4:00 PM',
        duration: 90,
        status: 'cancelled',
        type: 'One-on-One',
      },
    ],
  };

  const getTabCount = (tab) => sessions[tab].length;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        isAuthenticated={true}
        user={{ name: 'John Doe', email: 'john@example.com' }}
      />

      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex justify-center pt-24 pb-12">
        <div className="w-full max-w-[1200px] px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                My Sessions
              </span>
            </h1>
            <p className="text-slate-400">
              Manage your upcoming and past mentorship sessions
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {getTabCount('upcoming')}
                  </p>
                  <p className="text-sm text-slate-400">Upcoming</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {getTabCount('completed')}
                  </p>
                  <p className="text-sm text-slate-400">Completed</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {sessions.completed.reduce((acc, s) => acc + s.duration, 0)}
                  </p>
                  <p className="text-sm text-slate-400">Total Hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 mb-6">
            <div className="flex border-b border-white/10">
              {['upcoming', 'completed', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-medium transition-all ${
                    activeTab === tab
                      ? 'text-white border-b-2 border-violet-500'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} (
                  {getTabCount(tab)})
                </button>
              ))}
            </div>
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sessions[activeTab].map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>

          {/* Empty State */}
          {sessions[activeTab].length === 0 && (
            <div className="text-center py-16 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No {activeTab} sessions
              </h3>
              <p className="text-slate-400 mb-6">
                {activeTab === 'upcoming' &&
                  'Book a session to get started with your learning journey'}
                {activeTab === 'completed' &&
                  'Completed sessions will appear here'}
                {activeTab === 'cancelled' &&
                  'Cancelled sessions will appear here'}
              </p>
              {activeTab === 'upcoming' && (
                <button
                  onClick={() => (window.location.href = '/browse')}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl text-white font-medium transition-all"
                >
                  Browse Skills
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySessions;
