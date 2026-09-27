import React from 'react';
import { useUser } from '../context/UserContext';

export function HUD() {
  const { progress, getRankName, getNextRank } = useUser();
  const nextRank = getNextRank();
  
  const currentThreshold = progress.rank === 'newcomer' ? 0 : progress.rank === 'viking' ? 200 : progress.rank === 'jarl' ? 500 : 1000;
  const nextThreshold = nextRank ? (nextRank.rank === 'viking' ? 200 : nextRank.rank === 'jarl' ? 500 : 1000) : currentThreshold;
  const progressPercent = nextRank ? ((progress.xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100 : 100;

  return (
    <div className="fixed bottom-4 left-4 z-30 hidden md:block">
      <div className="glass-dark rounded-lg p-3 min-w-[200px]">
        {/* Rank */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-norse-gold text-sm font-serif">{progress.rank === 'legend' ? 'ᛟ' : progress.rank === 'jarl' ? 'ᛏ' : progress.rank === 'viking' ? 'ᚱ' : 'ᚠ'}</span>
          <span className="text-norse-text text-xs font-semibold">{getRankName(progress.rank)}</span>
        </div>
        
        {/* XP Bar (Stamina style) */}
        <div className="mb-1">
          <div className="flex justify-between text-[10px] text-norse-muted mb-0.5">
            <span>Опыт</span>
            <span>{progress.xp} XP</span>
          </div>
          <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-norse-gold/60 to-norse-gold rounded-full transition-all duration-500"
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
    </div>
  );
}
