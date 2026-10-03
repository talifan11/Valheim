import React from 'react';

interface PresenceDotProps {
  status: 'online' | 'away' | 'offline';
  size?: 'sm' | 'md';
}

const statusColors = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  offline: 'bg-gray-500',
};

const statusLabels = {
  online: 'Онлайн',
  away: 'Отошёл',
  offline: 'Не в сети',
};

export function PresenceDot({ status, size = 'md' }: PresenceDotProps) {
  const sizeClass = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';
  
  return (
    <span
      className={`inline-block rounded-full ${sizeClass} ${statusColors[status]} ${
        status === 'online' ? 'animate-pulse' : ''
      }`}
      aria-label={statusLabels[status]}
      title={statusLabels[status]}
    />
  );
}
