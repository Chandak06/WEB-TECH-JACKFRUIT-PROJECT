import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import SkillCard from './shared/SkillCard';
import UserCard from './shared/UserCard';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState('skills'); // 'skills' or 'mentors'

  const categories = ['All', 'Programming', 'Design', 'Business', 'Marketing', 'Music', 'Language', 'Cooking', 'Fitness'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Mock data
  const skills = [
    {
      name: 'React Development',
      category: 'Programming',
      mentor: { name: 'Sarah Johnson' },
      rating: 4.9,
      sessions: 156,
      price: 35,
      level: 'Intermediate'
    },
    {
      name: 'UI/UX Design',
      category: 'Design',
      mentor: { name: 'Michael Brown' },
      rating: 4.8,
      sessions: 89,
      price: 30,
      level: 'Beginner'
    },
    {
      name: 'Python Programming',
      category: 'Programming',
      mentor: { name: 'Lisa Wang' },
      rating: 4.9,
      sessions: 203,
      price: 40,
      level: 'Advanced'
    },
    {
      name: 'Digital Marketing',
      category: 'Marketing',
      mentor: { name: 'David Chen' },
      rating: 4.7,
      sessions: 124,
      price: 28,
      level: 'Intermediate'
    },
    {
      name: 'Graphic Design',
      category: 'Design',
      mentor: { name: 'Emily Davis' },
      rating: 4.9,
      sessions: 178,
      price: 32,
      level: 'Beginner'
    },
    {
      name: 'Business Strategy',
      category: 'Business',
      mentor: { name: 'James Wilson' },
      rating: 4.8,
      sessions: 95,
      price: 45,
      level: 'Advanced'
    }
  ];

  const mentors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: null,
      bio: 'Full-stack developer with 10+ years of experience in React and Node.js',
      skills: ['React', 'Node.js', 'TypeScript'],
      rating: 4.9,
      totalSessions: 156,
      isOnline: true
    },
    {
      id: 2,
      name: 'Michael Brown',
      avatar: null,
      bio: 'Senior UI/UX Designer passionate about creating beautiful user experiences',
      skills: ['UI/UX', 'Figma', 'Adobe XD'],
      rating: 4.8,
      totalSessions: 89,
      isOnline: false
    },
    {
      id: 3,
      name: 'Lisa Wang',
      avatar: null,
      bio: 'Data Scientist specializing in Python and Machine Learning',
      skills: ['Python', 'ML', 'Data Science'],
      rating: 4.9,
      totalSessions: 203,
      isOnline: true
    },
    {
      id: 4,
      name: 'David Chen',
      avatar: null,
      bio: 'Digital Marketing expert helping businesses grow online',
      skills: ['SEO', 'Social Media', 'Content Marketing'],
      rating: 4.7,
      totalSessions: 124,
      isOnline: true
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.mentor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || skill.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar isAuthenticated={true} user={{ name: 'John Doe', email: 'john@example.com' }} />

      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Discover</span> New Skills
            </h1>
            <p className="text-slate-400">Find the perfect mentor or skill to advance your journey</p>
          </div>

          {/* Search and Filters */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for skills or mentors..."
                className="w-full px-12 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-slate-400">View:</span>
              <div className="flex gap-2 backdrop-blur-xl bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('skills')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'skills'
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Skills
                </button>
                <button
                  onClick={() => setViewMode('mentors')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'mentors'
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mentors
                </button>
              </div>
            </div>

            {/* Filters */}
            {viewMode === 'skills' && (
              <div className="flex flex-wrap gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                  >
                    {levels.map(level => (
                      <option key={level} value={level.toLowerCase()}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                {(selectedCategory !== 'all' || selectedLevel !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedLevel('all');
                    }}
                    className="self-end px-4 py-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-slate-400">
              {viewMode === 'skills' 
                ? `${filteredSkills.length} ${filteredSkills.length === 1 ? 'skill' : 'skills'} found`
                : `${filteredMentors.length} ${filteredMentors.length === 1 ? 'mentor' : 'mentors'} found`
              }
            </p>
          </div>

          {/* Results Grid */}
          {viewMode === 'skills' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMentors.map(mentor => (
                <UserCard key={mentor.id} user={mentor} />
              ))}
            </div>
          )}

          {/* No Results */}
          {((viewMode === 'skills' && filteredSkills.length === 0) ||
            (viewMode === 'mentors' && filteredMentors.length === 0)) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl text-white font-medium transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
