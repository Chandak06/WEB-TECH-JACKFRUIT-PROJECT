import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
);

const Navbar = ({ isAuthenticated = false, user = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
          >
            <Logo />
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-violet-400 group-hover:to-purple-400 transition-all">
              Skill Swap
            </span>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-1">
              <NavLink 
                to="/dashboard" 
                isActive={isActive('/dashboard')}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/browse" 
                isActive={isActive('/browse')}
                onClick={() => navigate('/browse')}
              >
                Browse
              </NavLink>
              <NavLink 
                to="/sessions" 
                isActive={isActive('/sessions')}
                onClick={() => navigate('/sessions')}
              >
                My Sessions
              </NavLink>
              <NavLink 
                to="/messages" 
                isActive={isActive('/messages')}
                onClick={() => navigate('/messages')}
              >
                Messages
              </NavLink>

              {/* Profile Dropdown */}
              <div className="relative ml-4">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-xl border border-white/10 shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                      <p className="text-xs text-slate-400">{user?.email || 'user@example.com'}</p>
                    </div>
                    <button
                      onClick={() => { navigate('/profile'); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => { navigate('/settings'); setIsProfileMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors"
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors border-t border-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-lg text-white font-medium transition-all shadow-lg shadow-violet-500/30"
              >
                Get Started
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {isAuthenticated ? (
              <>
                <MobileNavLink to="/dashboard" isActive={isActive('/dashboard')} onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}>
                  Dashboard
                </MobileNavLink>
                <MobileNavLink to="/browse" isActive={isActive('/browse')} onClick={() => { navigate('/browse'); setIsMobileMenuOpen(false); }}>
                  Browse
                </MobileNavLink>
                <MobileNavLink to="/sessions" isActive={isActive('/sessions')} onClick={() => { navigate('/sessions'); setIsMobileMenuOpen(false); }}>
                  My Sessions
                </MobileNavLink>
                <MobileNavLink to="/messages" isActive={isActive('/messages')} onClick={() => { navigate('/messages'); setIsMobileMenuOpen(false); }}>
                  Messages
                </MobileNavLink>
                <MobileNavLink to="/profile" isActive={isActive('/profile')} onClick={() => { navigate('/profile'); setIsMobileMenuOpen(false); }}>
                  My Profile
                </MobileNavLink>
                <MobileNavLink to="/settings" isActive={isActive('/settings')} onClick={() => { navigate('/settings'); setIsMobileMenuOpen(false); }}>
                  Settings
                </MobileNavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-white/5 transition-colors mt-2 border-t border-white/10"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-slate-300 hover:bg-white/5 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => { navigate('/signup'); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 text-violet-400 hover:bg-white/5 transition-colors"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-all ${
      isActive
        ? 'bg-white/10 text-white font-medium'
        : 'text-slate-300 hover:text-white hover:bg-white/5'
    }`}
  >
    {children}
  </button>
);

const MobileNavLink = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 transition-colors ${
      isActive
        ? 'bg-white/10 text-white font-medium'
        : 'text-slate-300 hover:bg-white/5'
    }`}
  >
    {children}
  </button>
);

export default Navbar;
