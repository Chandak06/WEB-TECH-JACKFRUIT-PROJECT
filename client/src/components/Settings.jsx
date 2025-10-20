import React, { useState } from 'react';
import Navbar from './shared/Navbar';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account settings
    name: 'John Doe',
    email: 'john@example.com',
    location: 'San Francisco, CA',
    bio: 'Passionate about web development and sharing knowledge.',
    
    // Notification settings
    emailNotifications: true,
    sessionReminders: true,
    messageNotifications: true,
    weeklyDigest: false,
    
    // Privacy settings
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    
    // Session settings
    defaultSessionDuration: 60,
    bufferTime: 15,
    maxSessionsPerDay: 5
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Add API call here
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar isAuthenticated={true} user={{ name: settings.name, email: settings.email }} />

      {/* Background gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.15),transparent_50%)]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Settings</span>
            </h1>
            <p className="text-slate-400">Manage your account preferences and settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-2">
                <button
                  onClick={() => setActiveTab('account')}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === 'account'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Account</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === 'notifications'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="font-medium">Notifications</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('privacy')}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === 'privacy'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="font-medium">Privacy</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('sessions')}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === 'sessions'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Sessions</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8">
                {/* Account Settings */}
                {activeTab === 'account' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={settings.name}
                        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                      <input
                        type="text"
                        value={settings.location}
                        onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                      <textarea
                        value={settings.bio}
                        onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg font-medium transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Notification Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Notification Preferences</h2>
                      <p className="text-slate-400">Manage how you receive notifications</p>
                    </div>

                    <div className="space-y-4">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive email updates about your account' },
                        { key: 'sessionReminders', label: 'Session Reminders', description: 'Get reminded before upcoming sessions' },
                        { key: 'messageNotifications', label: 'Message Notifications', description: 'Receive notifications for new messages' },
                        { key: 'weeklyDigest', label: 'Weekly Digest', description: 'Get a weekly summary of your activity' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                          <div>
                            <h3 className="font-medium text-white mb-1">{item.label}</h3>
                            <p className="text-sm text-slate-400">{item.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings[item.key]}
                              onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg font-medium transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Privacy Settings</h2>
                      <p className="text-slate-400">Control who can see your information</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Profile Visibility</label>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="public">Public - Everyone can see</option>
                        <option value="members">Members Only</option>
                        <option value="private">Private - Only you</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      {[
                        { key: 'showEmail', label: 'Show Email on Profile' },
                        { key: 'showLocation', label: 'Show Location on Profile' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                          <h3 className="font-medium text-white">{item.label}</h3>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={settings[item.key]}
                              onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg font-medium transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {/* Session Settings */}
                {activeTab === 'sessions' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Session Preferences</h2>
                      <p className="text-slate-400">Configure your session defaults</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Default Session Duration (minutes)</label>
                      <select
                        value={settings.defaultSessionDuration}
                        onChange={(e) => setSettings({ ...settings, defaultSessionDuration: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="30">30 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="90">90 minutes</option>
                        <option value="120">120 minutes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Buffer Time Between Sessions (minutes)</label>
                      <select
                        value={settings.bufferTime}
                        onChange={(e) => setSettings({ ...settings, bufferTime: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="0">No buffer</option>
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">60 minutes</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Maximum Sessions Per Day</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={settings.maxSessionsPerDay}
                        onChange={(e) => setSettings({ ...settings, maxSessionsPerDay: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg font-medium transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
