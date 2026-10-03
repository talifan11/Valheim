import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ReactionBarProps {
  postId: string;
  usefulCount: number;
  agreedCount: number;
}

export function ReactionBar({ postId, usefulCount: initialUseful, agreedCount: initialAgreed }: ReactionBarProps) {
  const [usefulCount, setUsefulCount] = useState(initialUseful);
  const [agreedCount, setAgreedCount] = useState(initialAgreed);
  const [isUseful, setIsUseful] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleUseful = () => {
    if (!isUseful) {
      setUsefulCount(prev => prev + 1);
      setIsUseful(true);
    } else {
      setUsefulCount(prev => prev - 1);
      setIsUseful(false);
    }
  };

  const handleAgreed = () => {
    if (!isAgreed) {
      setAgreedCount(prev => prev + 1);
      setIsAgreed(true);
    } else {
      setAgreedCount(prev => prev - 1);
      setIsAgreed(false);
    }
  };

  return (
    <div className="flex items-center gap-3 pt-3 border-t border-amber-900/20">
      {/* Полезно */}
      <motion.button
        onClick={handleUseful}
        className={`flex items-center gap-1.5 text-sm transition-colors ${
          isUseful
            ? 'text-amber-400 font-semibold'
            : 'text-norse-muted hover:text-amber-400'
        }`}
        aria-pressed={isUseful}
        aria-label={`Полезно: ${usefulCount}`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          animate={isUseful ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          ᛋ
        </motion.span>
        <span>Полезно ({usefulCount})</span>
      </motion.button>

      {/* Согласен */}
      <motion.button
        onClick={handleAgreed}
        className={`flex items-center gap-1.5 text-sm transition-colors ${
          isAgreed
            ? 'text-green-400 font-semibold'
            : 'text-norse-muted hover:text-green-400'
        }`}
        aria-pressed={isAgreed}
        aria-label={`Согласен: ${agreedCount}`}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          animate={isAgreed ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          ᚨ
        </motion.span>
        <span>Согласен ({agreedCount})</span>
      </motion.button>

      {/* Ответить */}
      <button
        className="flex items-center gap-1.5 text-sm text-norse-muted hover:text-amber-400 transition-colors ml-auto"
        aria-label="Ответить"
      >
        <span>Ответить</span>
      </button>

      {/* Жалоба */}
      <button
        className="flex items-center gap-1.5 text-sm text-norse-muted hover:text-red-400 transition-colors"
        aria-label="Пожаловаться"
      >
        <span>Жалоба</span>
      </button>
    </div>
  );
}
