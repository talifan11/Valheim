import React from 'react';

interface RankBadgeProps {
  rank: 'newcomer' | 'viking' | 'jarl' | 'legend';
  size?: 'sm' | 'md' | 'lg';
}

const rankConfig = {
  newcomer: {
    label: 'Новичок',
    color: 'bg-gray-600/20 text-gray-400 border-gray-600/30',
    rune: 'ᚠ',
  },
  viking: {
    label: 'Викинг',
    color: 'bg-amber-700/20 text-amber-600 border-amber-700/30',
    rune: 'ᚱ',
  },
  jarl: {
    label: 'Ярл',
    color: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
    rune: 'ᛏ',
  },
  legend: {
    label: 'Легенда',
    color: 'bg-gradient-to-r from-amber-600/30 to-yellow-500/30 text-amber-400 border-amber-500/40',
    rune: 'ᛟ',
  },
};

const sizeClasses = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2 py-0.5',
  lg: 'text-sm px-3 py-1',
};

export function RankBadge({ rank, size = 'md' }: RankBadgeProps) {
  const config = rankConfig[rank];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border font-semibold uppercase tracking-wide ${config.color} ${sizeClasses[size]}`}
    >
      <span className="text-xs">{config.rune}</span>
      <span>{config.label}</span>
    </span>
  );
}
