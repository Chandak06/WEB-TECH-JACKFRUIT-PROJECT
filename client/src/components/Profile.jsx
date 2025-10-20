import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - replace with API call
  const [user, setUser] = useState({
    id: id || '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    bio: 'Passionate about web development and sharing knowledge. I love helping others learn and grow in their tech journey.',
    location: 'San Francisco, CA',
    joined: 'January 2024',
    rating: 4.8,
    totalSessions: 125,
    totalHours: 210,
    skillsOffered: [
      { name: 'React', level: 'Expert', sessions: 45 },
      { name: 'Node.js', level: 'Advanced', sessions: 30 },
      { name: 'Python', level: 'Intermediate', sessions: 25 },
      { name: 'UI/UX Design', level: 'Advanced', sessions: 25 }
    ],
    skillsLearning: [
      { name: 'Machine Learning', level: 'Beginner' },
      { name: 'DevOps', level: 'Beginner' },
      { name: 'GraphQL', level: 'Intermediate' }
    ],
    reviews: [
      {
        id: 1,
        reviewer: 'Sarah Johnson',
        rating: 5,
        comment: 'Excellent mentor! Very patient and knowledgeable about React.',
        skill: 'React',
        date: '2 weeks ago'
      },
      {
        id: 2,
        reviewer: 'Mike Chen',
        rating: 5,
        comment: 'Great session on Node.js. Learned a lot about best practices.',
        skill: 'Node.js',
        date: '1 month ago'
      },
      {
        id: 3,
        reviewer: 'Emily Davis',
        rating: 4,
        comment: 'Very helpful and clear explanations. Would recommend!',
        skill: 'React',
        date: '1 month ago'
      }
    ]
  });

  const stats = [
    { label: 'Sessions', value: user.totalSessions, icon: '📚' },
    { label: 'Hours', value: user.totalHours, icon: '⏰' },
    { label: 'Rating', value: user.rating, icon: '⭐' },
    { label: 'Reviews', value: user.reviews.length, icon: '💬' }
  ];

  const handleSaveProfile = () => {
    // Add save logic here
    console.log('Saving profile...');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar isAuthenticated={true} user={user} />

      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-5xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-950"></div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
                    <p className="text-slate-400">{user.email}</p>
                  </div>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <p className="text-slate-300 mb-4">{user.bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Joined {user.joined}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 mb-6">
            <div className="flex border-b border-white/10 overflow-x-auto">
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === 'about'
                    ? 'text-white border-b-2 border-violet-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('skills-offered')}
                className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === 'skills-offered'
                    ? 'text-white border-b-2 border-violet-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Skills I Teach
              </button>
              <button
                onClick={() => setActiveTab('skills-learning')}
                className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === 'skills-learning'
                    ? 'text-white border-b-2 border-violet-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Skills I'm Learning
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'text-white border-b-2 border-violet-500'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Reviews ({user.reviews.length})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div>
                <h2 className="text-2xl font-bold mb-4">About Me</h2>
                {isEditing ? (
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                    rows="6"
                  />
                ) : (
                  <p className="text-slate-300 text-lg leading-relaxed">{user.bio}</p>
                )}
              </div>
            )}

            {/* Skills Offered Tab */}
            {activeTab === 'skills-offered' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Skills I Teach</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.skillsOffered.map((skill, index) => (
                    <div key={index} className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                        <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">{skill.sessions} sessions completed</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Learning Tab */}
            {activeTab === 'skills-learning' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Skills I'm Learning</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.skillsLearning.map((skill, index) => (
                    <div key={index} className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                          {skill.level}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate('/browse')}
                        className="text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
                      >
                        Find a mentor →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Reviews & Ratings</h2>
                <div className="space-y-4">
                  {user.reviews.map((review) => (
                    <div key={review.id} className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold">
                            {review.reviewer.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-white">{review.reviewer}</h3>
                            <p className="text-sm text-slate-400">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-slate-600'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-300 mb-2">{review.comment}</p>
                      <span className="inline-block px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm">
                        {review.skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
