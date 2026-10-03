import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  color?: 'green' | 'yellow' | 'red' | 'amber' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function ProgressBar({
  value,
  max,
  label,
  showValue = true,
  color = 'green',
  size = 'md',
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    green: 'from-green-500 to-emerald-400',
    yellow: 'from-yellow-500 to-amber-400',
    red: 'from-red-500 to-rose-400',
    amber: 'from-amber-500 to-yellow-400',
    blue: 'from-blue-500 to-cyan-400',
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-norse-muted">{label}</span>
          {showValue && (
            <span className="text-xs text-norse-text font-semibold">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={`relative ${sizeClasses[size]} bg-gray-800 rounded-full overflow-hidden`}>
        <motion.div
          className={`absolute h-full bg-gradient-to-r ${colorClasses[color]} rounded-full`}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
