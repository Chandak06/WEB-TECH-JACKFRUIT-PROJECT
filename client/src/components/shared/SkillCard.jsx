import React from 'react';

const SkillCard = ({ skill }) => {
  const { name, category, mentor, rating, sessions, price, image, level } = skill;

  return (
    <div className="group backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/20">
      {/* Image/Icon */}
      <div className="relative h-48 bg-gradient-to-br from-violet-600/20 to-purple-600/20 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="text-6xl">
            {getCategoryIcon(category)}
          </div>
        )}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full backdrop-blur-lg bg-black/30 border border-white/20 text-xs font-medium text-white">
          {level || 'Beginner'}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30 mb-3">
          {category}
        </span>

        {/* Skill Name */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
          {name}
        </h3>

        {/* Mentor Info */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
            {mentor?.name?.charAt(0) || 'M'}
          </div>
          <div>
            <p className="text-sm text-slate-300">{mentor?.name || 'Expert Mentor'}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
            <span className="text-sm font-medium text-white">{rating || '4.8'}</span>
            <span className="text-xs text-slate-400">({sessions || 45} sessions)</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">${price || '25'}<span className="text-xs text-slate-400">/hr</span></p>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full py-2.5 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-xl text-white font-medium transition-all shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/50">
          Book Session
        </button>
      </div>
    </div>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    'Programming': '💻',
    'Design': '🎨',
    'Business': '📊',
    'Marketing': '📱',
    'Music': '🎵',
    'Language': '🌍',
    'Cooking': '🍳',
    'Fitness': '💪',
    'Photography': '📷',
    'Writing': '✍️',
  };
  return icons[category] || '📚';
};

export default SkillCard;
