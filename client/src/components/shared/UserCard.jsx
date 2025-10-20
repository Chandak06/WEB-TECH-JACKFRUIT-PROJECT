import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const { id, name, avatar, bio, skills, rating, totalSessions, isOnline } = user;

  return (
    <div 
      onClick={() => navigate(`/profile/${id}`)}
      className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/20 cursor-pointer"
    >
      {/* Avatar and Status */}
      <div className="relative w-20 h-20 mx-auto mb-4">
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover border-2 border-violet-500" />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold border-2 border-violet-500">
            {name?.charAt(0) || 'U'}
          </div>
        )}
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-950"></div>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-white text-center mb-2 group-hover:text-violet-300 transition-colors">
        {name}
      </h3>

      {/* Bio */}
      {bio && (
        <p className="text-sm text-slate-400 text-center mb-4 line-clamp-2">
          {bio}
        </p>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300">
              +{skills.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-around pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="text-sm font-bold text-white">{rating || '4.9'}</span>
          </div>
          <p className="text-xs text-slate-400">Rating</p>
        </div>
        <div className="w-px h-8 bg-white/10"></div>
        <div className="text-center">
          <p className="text-sm font-bold text-white mb-1">{totalSessions || '127'}</p>
          <p className="text-xs text-slate-400">Sessions</p>
        </div>
      </div>

      {/* Connect Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          // Add connect logic
          console.log('Connect with', name);
        }}
        className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl text-white text-sm font-medium transition-all shadow-lg shadow-violet-500/30"
      >
        View Profile
      </button>
    </div>
  );
};

export default UserCard;
