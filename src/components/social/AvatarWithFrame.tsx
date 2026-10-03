import React from 'react';

interface AvatarWithFrameProps {
  username: string;
  rank: 'newcomer' | 'viking' | 'jarl' | 'legend';
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-[120px] h-[120px]',
};

const frameColors = {
  newcomer: { stroke: '#6B7280', strokeWidth: 1, bg: '#4B5563', text: '#FFFFFF' },
  viking: { stroke: '#8B6F47', strokeWidth: 2, bg: '#8B6F47', text: '#FFFFFF' },
  jarl: { stroke: '#B8B8B8', strokeWidth: 2, bg: '#B8B8B8', text: '#1F2937' },
  legend: { stroke: 'url(#legendGradient)', strokeWidth: 2, bg: 'linear-gradient(135deg, #C89B3C, #E5B85C)', text: '#1F2937', glow: true },
};

export function AvatarWithFrame({ username, rank, size = 'md', src, onClick }: AvatarWithFrameProps) {
  const frame = frameColors[rank];
  const initial = username.charAt(0).toUpperCase();
  
  const sizeValue = size === 'sm' ? 40 : size === 'md' ? 48 : 120;
  const frameSize = sizeValue + 8;

  return (
    <div
      className={`relative inline-flex items-center justify-center cursor-pointer ${sizeClasses[size]}`}
      onClick={onClick}
      role="button"
      aria-label={`Профиль игрока @${username}`}
      tabIndex={0}
    >
      {/* SVG рамка */}
      <svg
        className="absolute inset-0"
        width={frameSize}
        height={frameSize}
        viewBox={`0 0 ${frameSize} ${frameSize}`}
        style={{ transform: 'translate(-4px, -4px)' }}
      >
        <defs>
          {rank === 'legend' && (
            <linearGradient id="legendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C89B3C" />
              <stop offset="100%" stopColor="#E5B85C" />
            </linearGradient>
          )}
        </defs>
        
        {/* Основной круг */}
        <circle
          cx={frameSize / 2}
          cy={frameSize / 2}
          r={(frameSize - frame.strokeWidth) / 2}
          fill="none"
          stroke={frame.stroke}
          strokeWidth={frame.strokeWidth}
        />
        
        {/* Декор для Викинг — 4 ромба */}
        {rank === 'viking' && (
          <>
            <rect x={frameSize / 2 - 3} y={2} width={6} height={6} fill={frame.stroke} transform={`rotate(45 ${frameSize / 2} 5)`} />
            <rect x={frameSize / 2 - 3} y={frameSize - 8} width={6} height={6} fill={frame.stroke} transform={`rotate(45 ${frameSize / 2} ${frameSize - 5})`} />
            <rect x={2} y={frameSize / 2 - 3} width={6} height={6} fill={frame.stroke} transform={`rotate(45 5 ${frameSize / 2})`} />
            <rect x={frameSize - 8} y={frameSize / 2 - 3} width={6} height={6} fill={frame.stroke} transform={`rotate(45 ${frameSize - 5} ${frameSize / 2})`} />
          </>
        )}
        
        {/* Декор для Ярл — руна ᛏ сверху */}
        {rank === 'jarl' && (
          <text
            x={frameSize / 2}
            y={12}
            textAnchor="middle"
            fill={frame.stroke}
            fontSize="10"
            fontFamily="serif"
          >
            ᛏ
          </text>
        )}
        
        {/* Декор для Легенда — руна ᛟ сверху + свечение */}
        {rank === 'legend' && (
          <>
            <text
              x={frameSize / 2}
              y={12}
              textAnchor="middle"
              fill="url(#legendGradient)"
              fontSize="10"
              fontFamily="serif"
            >
              ᛟ
            </text>
            <circle
              cx={frameSize / 2}
              cy={frameSize / 2}
              r={(frameSize - frame.strokeWidth) / 2}
              fill="none"
              stroke="url(#legendGradient)"
              strokeWidth={frame.strokeWidth}
              opacity="0.3"
              filter="blur(4px)"
            />
          </>
        )}
      </svg>
      
      {/* Аватар */}
      <div
        className={`relative rounded-full overflow-hidden flex items-center justify-center font-bold ${sizeClasses[size]}`}
        style={{
          background: src ? undefined : typeof frame.bg === 'string' && frame.bg.startsWith('linear') ? frame.bg : frame.bg,
          color: frame.text,
          fontSize: size === 'lg' ? '48px' : size === 'md' ? '20px' : '16px',
        }}
      >
        {src ? (
          <img src={src} alt={username} className="w-full h-full object-cover" />
        ) : (
          initial
        )}
      </div>
      
      {/* Свечение для Легенды */}
      {rank === 'legend' && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: '0 0 12px rgba(200, 155, 60, 0.4)',
          }}
        />
      )}
    </div>
  );
}
