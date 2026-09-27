import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export function HUD() {
  const { progress, getRankName, getNextRank, isLoggedIn } = useUser();
  const [showXpGain, setShowXpGain] = useState(false);
  const [prevXp, setPrevXp] = useState(progress.xp);
  
  const nextRank = getNextRank();
  
  const currentThreshold = progress.rank === 'newcomer' ? 0 : progress.rank === 'viking' ? 200 : progress.rank === 'jarl' ? 500 : 1000;
  const nextThreshold = nextRank ? (nextRank.rank === 'viking' ? 200 : nextRank.rank === 'jarl' ? 500 : 1000) : currentThreshold;
  const progressPercent = nextRank ? ((progress.xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100 : 100;

  // Detect XP gain for animation
  useEffect(() => {
    if (progress.xp > prevXp) {
      setShowXpGain(true);
      setTimeout(() => setShowXpGain(false), 1500);
    }
    setPrevXp(progress.xp);
  }, [progress.xp]);

  if (!isLoggedIn) return null;

  return (
    <Link to="/profile" className="fixed bottom-4 left-4 z-30 hidden md:block">
      <div className={`glass-dark rounded-lg p-3 min-w-[200px] transition-all duration-300 hover:border-norse-gold/30 cursor-pointer ${showXpGain ? 'ring-1 ring-norse-gold/40 shadow-lg shadow-norse-gold/10' : ''}`}>
        {/* Rank */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-norse-gold text-sm font-serif">{progress.rank === 'legend' ? 'ᛟ' : progress.rank === 'jarl' ? 'ᛏ' : progress.rank === 'viking' ? 'ᚱ' : 'ᚠ'}</span>
          <span className="text-norse-text text-xs font-semibold">{getRankName(progress.rank)}</span>
          {showXpGain && (
            <span className="text-norse-gold text-[10px] font-bold animate-bounce ml-auto">+XP!</span>
          )}
        </div>
        
        {/* XP Bar (Stamina style) */}
        <div className="mb-1">
          <div className="flex justify-between text-[10px] text-norse-muted mb-0.5">
            <span>Опыт</span>
            <span>{progress.xp} XP</span>
          </div>
          <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${showXpGain ? 'bg-gradient-to-r from-norse-gold to-norse-amber shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'bg-gradient-to-r from-norse-gold/60 to-norse-gold'}`}
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>
        
        {/* Next rank */}
        {nextRank && (
          <div className="text-[9px] text-norse-muted/60">
            До «{getRankName(nextRank.rank)}»: {nextRank.xpNeeded} XP
          </div>
        )}
      </div>
    </Link>
  );
}
