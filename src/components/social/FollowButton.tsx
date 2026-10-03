import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FollowButtonProps {
  threadId: string;
  initialFollowersCount: number;
}

export function FollowButton({ threadId, initialFollowersCount }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(initialFollowersCount);

  useEffect(() => {
    // Загружаем состояние из localStorage
    const stored = localStorage.getItem(`follow-${threadId}`);
    if (stored === 'true') {
      setIsFollowing(true);
    }
  }, [threadId]);

  const handleToggle = () => {
    const newState = !isFollowing;
    setIsFollowing(newState);
    setFollowersCount(prev => newState ? prev + 1 : prev - 1);
    
    // Сохраняем в localStorage
    localStorage.setItem(`follow-${threadId}`, newState.toString());
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        isFollowing
          ? 'bg-amber-600/20 text-amber-400 border border-amber-600/30'
          : 'bg-black/30 text-norse-muted border border-amber-900/20 hover:border-amber-600/40'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isFollowing}
    >
      {isFollowing ? (
        <>
          <span className="text-lg">ᛋ</span>
          <span>Слежу ({followersCount})</span>
        </>
      ) : (
        <>
          <span>Следить</span>
          <span className="text-xs">({followersCount})</span>
        </>
      )}
    </motion.button>
  );
}
