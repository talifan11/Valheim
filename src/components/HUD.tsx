import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useUser } from '../context/UserContext';

export function HUD() {
  const { progress, getRankName, getNextRank, isLoggedIn } = useUser();
  const [showXpGain, setShowXpGain] = useState(false);
  const [prevXp, setPrevXp] = useState(progress.xp);

  const nextRank = getNextRank();

  const currentThreshold =
    progress.rank === 'newcomer' ? 0 : progress.rank === 'viking' ? 200 : progress.rank === 'jarl' ? 500 : 1000;
  const nextThreshold = nextRank
    ? nextRank.rank === 'viking'
      ? 200
      : nextRank.rank === 'jarl'
      ? 500
      : 1000
    : currentThreshold;
  const progressPercent = nextRank ? ((progress.xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100 : 100;

  // Detect XP gain for animation
  useEffect(() => {
    if (progress.xp > prevXp) {
      setShowXpGain(true);

      // Конфетти при получении опыта
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.9 },
        colors: ['#d4af37', '#ffd700', '#c9952c'],
      });

      setTimeout(() => setShowXpGain(false), 1500);
    }
    setPrevXp(progress.xp);
  }, [progress.xp]);

  if (!isLoggedIn) return null;

  const levelIcons = ['ᚱ', 'ᚠ', 'ᛟ', 'ᛏ', 'ᚲ'];
  const currentIcon = progress.rank === 'legend' ? 'ᛟ' : progress.rank === 'jarl' ? 'ᛏ' : progress.rank === 'viking' ? 'ᚱ' : 'ᚠ';

  return (
    <Link to="/profile" className="fixed bottom-4 left-4 z-30 hidden md:block cursor-pointer">
      <motion.div
        className={`glass-dark rounded-lg p-3 min-w-[200px] transition-all duration-300 ${
          showXpGain ? 'ring-2 ring-norse-gold/60 shadow-lg shadow-norse-gold/20' : ''
        }`}
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Rank */}
        <div className="flex items-center gap-2 mb-2">
          <motion.span
            className="text-norse-gold text-sm font-serif"
            animate={showXpGain ? { rotate: [0, 360], scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.6 }}
          >
            {currentIcon}
          </motion.span>
          <span className="text-norse-text text-xs font-semibold">{getRankName(progress.rank)}</span>
          <AnimatePresence>
            {showXpGain && (
              <motion.span
                className="text-norse-gold text-[10px] font-bold ml-auto"
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                +XP!
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* XP Bar (Stamina style) */}
        <div className="mb-1">
          <div className="flex justify-between text-[10px] text-norse-muted mb-0.5">
            <span>Опыт</span>
            <span>{progress.xp} XP</span>
          </div>
          <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                showXpGain
                  ? 'bg-gradient-to-r from-norse-gold to-norse-amber shadow-[0_0_8px_rgba(212,175,55,0.5)]'
                  : 'bg-gradient-to-r from-norse-gold/60 to-norse-gold'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, progressPercent)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Next rank */}
        {nextRank && (
          <div className="text-[9px] text-norse-muted/60">
            До «{getRankName(nextRank.rank)}»: {nextRank.xpNeeded} XP
          </div>
        )}
      </motion.div>
    </Link>
  );
}
