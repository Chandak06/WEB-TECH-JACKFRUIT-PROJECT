import React from 'react';

const SessionCard = ({ session }) => {
  const { skill, mentor, mentee, date, time, duration, status, type } = session;

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-1">{skill}</h3>
          <p className="text-sm text-slate-400">{type || 'One-on-One Session'}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
          {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </span>
      </div>

      {/* Participants */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
        {/* Mentor */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold">
            {mentor?.name?.charAt(0) || 'M'}
          </div>
          <div>
            <p className="text-xs text-slate-400">Mentor</p>
            <p className="text-sm font-medium text-white">{mentor?.name || 'Mentor Name'}</p>
          </div>
        </div>

        {/* Arrow */}
        <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>

        {/* Mentee */}
        <div className="flex items-center gap-2 flex-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 flex items-center justify-center text-white font-bold">
            {mentee?.name?.charAt(0) || 'M'}
          </div>
          <div>
            <p className="text-xs text-slate-400">Mentee</p>
            <p className="text-sm font-medium text-white">{mentee?.name || 'Mentee Name'}</p>
          </div>
        </div>
      </div>

      {/* Session Details */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-400 mb-1">Date</p>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium text-white">{formatDate(date) || 'Jan 15, 2025'}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">Time</p>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium text-white">{time || '10:00 AM'}</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">Duration</p>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-sm font-medium text-white">{duration || '60'} min</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {status === 'upcoming' && (
          <>
            <button className="flex-1 py-2 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl text-white text-sm font-medium transition-all shadow-lg shadow-violet-500/30">
              Join Session
            </button>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 text-sm font-medium transition-all border border-white/10">
              Reschedule
            </button>
          </>
        )}
        {status === 'completed' && (
          <button className="flex-1 py-2 px-4 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 text-sm font-medium transition-all border border-white/10">
            Leave Review
          </button>
        )}
        {status === 'in-progress' && (
          <button className="flex-1 py-2 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-xl text-white text-sm font-medium transition-all shadow-lg shadow-green-500/30 animate-pulse">
            Join Now
          </button>
        )}
      </div>
    </div>
  );
};

export default SessionCard;
