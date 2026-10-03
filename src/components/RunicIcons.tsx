import React from 'react';

// Скандинавские рунические иконки в SVG формате
// Все иконки выполнены в едином стиле: тёмный фон, светящиеся руны, металлическая текстура

interface IconProps {
  className?: string;
  color?: string;
}

// ═══════════════════════════════════════════
// ATTACK TREE SKILLS
// ═══════════════════════════════════════════

export const StrengthIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#ef4444" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="strengthGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#strengthGrad)" />
    <path d="M20 28 Q32 16 44 28 L44 40 Q32 52 20 40 Z" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="26" cy="32" r="3" fill={color} />
    <circle cx="38" cy="32" r="3" fill={color} />
    <path d="M28 38 Q32 42 36 38" stroke={color} strokeWidth="2" fill="none" />
    <text x="32" y="50" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛏ</text>
  </svg>
);

export const CriticalIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#ef4444" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="critGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#critGrad)" />
    <circle cx="32" cy="32" r="20" fill="none" stroke={color} strokeWidth="1.5" />
    <circle cx="32" cy="32" r="12" fill="none" stroke={color} strokeWidth="1.5" />
    <circle cx="32" cy="32" r="4" fill={color} />
    <line x1="32" y1="8" x2="32" y2="56" stroke={color} strokeWidth="1" />
    <line x1="8" y1="32" x2="56" y2="32" stroke={color} strokeWidth="1" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚱ</text>
  </svg>
);

export const PowerIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#ef4444" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="powerGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#powerGrad)" />
    <path d="M32 8 L36 28 L56 32 L36 36 L32 56 L28 36 L8 32 L28 28 Z" fill={color} opacity="0.8" />
    <circle cx="32" cy="32" r="6" fill="#fff" opacity="0.9" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚠ</text>
  </svg>
);

export const BerserkerIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#ef4444" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="berserkGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#berserkGrad)" />
    <circle cx="32" cy="28" r="12" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="28" cy="26" r="2" fill={color} />
    <circle cx="36" cy="26" r="2" fill={color} />
    <path d="M26 32 Q32 36 38 32" stroke={color} strokeWidth="2" fill="none" />
    <path d="M20 20 L16 12 M44 20 L48 12" stroke={color} strokeWidth="2" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛏ</text>
  </svg>
);

export const DeathStrikeIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#ef4444" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="deathGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#deathGrad)" />
    <circle cx="32" cy="28" r="10" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="28" cy="26" r="2" fill={color} />
    <circle cx="36" cy="26" r="2" fill={color} />
    <path d="M28 32 L36 32" stroke={color} strokeWidth="2" />
    <path d="M20 40 L32 52 L44 40" stroke={color} strokeWidth="2" fill="none" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛗ</text>
  </svg>
);

// ═══════════════════════════════════════════
// SPEED TREE SKILLS
// ═══════════════════════════════════════════

export const SwiftFeetIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#3b82f6" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="swiftGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#swiftGrad)" />
    <path d="M16 40 L24 32 L32 40 L40 32 L48 40" stroke={color} strokeWidth="3" fill="none" />
    <path d="M20 48 L28 40 L36 48 L44 40" stroke={color} strokeWidth="2" fill="none" opacity="0.6" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚱ</text>
  </svg>
);

export const QuickHandsIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#3b82f6" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="quickGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#quickGrad)" />
    <circle cx="32" cy="32" r="16" fill="none" stroke={color} strokeWidth="3" />
    <path d="M32 16 L32 32 L44 32" stroke={color} strokeWidth="3" fill="none" />
    <circle cx="32" cy="32" r="3" fill={color} />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚠ</text>
  </svg>
);

export const CooldownIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#3b82f6" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="cdGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#cdGrad)" />
    <path d="M32 12 A20 20 0 1 1 32 52 A20 20 0 1 1 32 12" fill="none" stroke={color} strokeWidth="3" strokeDasharray="10 5" />
    <path d="M32 20 L32 32 L40 32" stroke={color} strokeWidth="2" fill="none" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛏ</text>
  </svg>
);

export const WhirlwindIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#3b82f6" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="whirlGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#whirlGrad)" />
    <path d="M32 16 Q48 16 48 32 Q48 48 32 48 Q16 48 16 32 Q16 20 28 18" fill="none" stroke={color} strokeWidth="3" />
    <circle cx="32" cy="32" r="6" fill={color} />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛊ</text>
  </svg>
);

// ═══════════════════════════════════════════
// DEFENSE TREE SKILLS
// ═══════════════════════════════════════════

export const VitalityIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#10b981" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="vitalGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a1a0f" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#vitalGrad)" />
    <path d="M32 44 C32 44 20 36 20 28 C20 22 24 18 28 18 C30 18 32 20 32 22 C32 20 34 18 36 18 C40 18 44 22 44 28 C44 36 32 44 32 44 Z" fill={color} opacity="0.8" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚠ</text>
  </svg>
);

export const ArmorIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#10b981" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="armorGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a1a0f" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#armorGrad)" />
    <path d="M32 8 L48 20 L48 44 L32 56 L16 44 L16 20 Z" fill="none" stroke={color} strokeWidth="2" />
    <path d="M32 16 L40 24 L40 40 L32 48 L24 40 L24 24 Z" fill={color} opacity="0.6" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛁ</text>
  </svg>
);

export const DodgeIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#10b981" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="dodgeGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a1a0f" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#dodgeGrad)" />
    <path d="M20 44 Q32 20 44 44" fill="none" stroke={color} strokeWidth="4" />
    <circle cx="20" cy="44" r="4" fill={color} />
    <circle cx="44" cy="44" r="4" fill={color} />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚱ</text>
  </svg>
);

export const RegenIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#10b981" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="regenGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0a1a0f" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#regenGrad)" />
    <path d="M32 16 L32 48 M16 32 L48 32" stroke={color} strokeWidth="6" />
    <circle cx="32" cy="32" r="20" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛒ</text>
  </svg>
);

export const BlockIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#10b981" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="blockGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0a1a0f" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#blockGrad)" />
    <circle cx="32" cy="32" r="18" fill={color} opacity="0.8" />
    <path d="M32 14 L32 50 M14 32 L50 32" stroke="#0a1a0f" strokeWidth="4" />
    <circle cx="32" cy="32" r="6" fill="#0a1a0f" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛏ</text>
  </svg>
);

// ═══════════════════════════════════════════
// PRODUCTION TREE SKILLS
// ═══════════════════════════════════════════

export const GatherIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#f59e0b" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="gatherGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#gatherGrad)" />
    <path d="M32 12 L40 28 L32 44 L24 28 Z" fill={color} opacity="0.8" />
    <path d="M20 48 L44 48" stroke={color} strokeWidth="3" />
    <circle cx="32" cy="28" r="4" fill="#1a0f0a" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚠ</text>
  </svg>
);

export const CraftIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#f59e0b" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="craftGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#craftGrad)" />
    <path d="M24 16 L24 48 M40 16 L40 48" stroke={color} strokeWidth="4" />
    <path d="M20 24 L44 24 M20 40 L44 40" stroke={color} strokeWidth="3" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛒ</text>
  </svg>
);

export const DurabilityIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#f59e0b" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="durGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#durGrad)" />
    <rect x="20" y="20" width="24" height="24" fill={color} opacity="0.8" />
    <rect x="24" y="24" width="16" height="16" fill="#1a0f0a" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛁ</text>
  </svg>
);

export const FarmIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#f59e0b" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="farmGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#farmGrad)" />
    <rect x="16" y="16" width="12" height="12" fill={color} opacity="0.8" />
    <rect x="36" y="16" width="12" height="12" fill={color} opacity="0.8" />
    <rect x="16" y="36" width="12" height="12" fill={color} opacity="0.8" />
    <rect x="36" y="36" width="12" height="12" fill={color} opacity="0.8" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛚ</text>
  </svg>
);

export const EnchantIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#f59e0b" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="enchantGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1a0f0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#enchantGrad)" />
    <path d="M32 12 L36 28 L52 32 L36 36 L32 52 L28 36 L12 32 L28 28 Z" fill={color} opacity="0.8" />
    <circle cx="32" cy="32" r="6" fill="#1a0f0a" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛟ</text>
  </svg>
);

// ═══════════════════════════════════════════
// WEAPON TREE SKILLS (BOW)
// ═══════════════════════════════════════════

export const PreciseShotIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#84cc16" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="preciseGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0f1a0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#preciseGrad)" />
    <circle cx="32" cy="32" r="16" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="32" cy="32" r="8" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="32" cy="32" r="3" fill={color} />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚱ</text>
  </svg>
);

export const RapidFireIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#84cc16" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="rapidGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0f1a0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#rapidGrad)" />
    <path d="M20 32 Q32 16 44 32" fill="none" stroke={color} strokeWidth="4" />
    <path d="M44 32 L40 28 M44 32 L40 36" stroke={color} strokeWidth="3" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚠ</text>
  </svg>
);

export const PiercingIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#84cc16" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="piercingGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0f1a0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#piercingGrad)" />
    <path d="M16 32 L48 32" stroke={color} strokeWidth="4" />
    <path d="M48 32 L40 24 M48 32 L40 40" stroke={color} strokeWidth="3" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛏ</text>
  </svg>
);

export const ExplosiveIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#84cc16" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="explosiveGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0f1a0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#explosiveGrad)" />
    <circle cx="32" cy="32" r="12" fill={color} opacity="0.8" />
    <path d="M32 16 L32 8 M32 48 L32 56 M16 32 L8 32 M48 32 L56 32" stroke={color} strokeWidth="3" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛊ</text>
  </svg>
);

export const ArrowRainIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#84cc16" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="rainGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0f1a0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#rainGrad)" />
    <path d="M20 16 L20 48 M32 16 L32 48 M44 16 L44 48" stroke={color} strokeWidth="3" />
    <path d="M20 48 L16 44 M32 48 L28 44 M44 48 L40 44" stroke={color} strokeWidth="2" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛚ</text>
  </svg>
);

// ═══════════════════════════════════════════
// WEAPON TREE SKILLS (SWORD)
// ═══════════════════════════════════════════

export const SwordMasteryIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#6366f1" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="swordGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#swordGrad)" />
    <path d="M32 12 L36 40 L32 52 L28 40 Z" fill={color} opacity="0.8" />
    <path d="M24 36 L40 36" stroke={color} strokeWidth="3" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛏ</text>
  </svg>
);

export const QuickStrikesIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#6366f1" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="quickStrikesGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#quickStrikesGrad)" />
    <path d="M20 20 L44 44 M44 20 L20 44" stroke={color} strokeWidth="4" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚱ</text>
  </svg>
);

export const ParryIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#6366f1" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="parryGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#parryGrad)" />
    <circle cx="32" cy="32" r="16" fill="none" stroke={color} strokeWidth="3" />
    <path d="M20 32 L44 32" stroke={color} strokeWidth="4" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛁ</text>
  </svg>
);

export const RushSlashIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#6366f1" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="rushGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#rushGrad)" />
    <path d="M16 32 L48 32" stroke={color} strokeWidth="5" />
    <path d="M48 32 L40 24 M48 32 L40 40" stroke={color} strokeWidth="3" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛏ</text>
  </svg>
);

export const WhirlwindSlashIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#6366f1" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="whirlSlashGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0a0f1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#whirlSlashGrad)" />
    <path d="M32 12 Q48 12 48 32 Q48 48 32 48 Q16 48 16 32 Q16 20 28 18" fill="none" stroke={color} strokeWidth="4" />
    <circle cx="32" cy="32" r="8" fill={color} opacity="0.8" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛊ</text>
  </svg>
);

// ═══════════════════════════════════════════
// WEAPON TREE SKILLS (STAFF)
// ═══════════════════════════════════════════

export const MagicPowerIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="magicGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0a1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#magicGrad)" />
    <circle cx="32" cy="32" r="12" fill={color} opacity="0.8" />
    <path d="M32 16 L32 8 M32 48 L32 56 M16 32 L8 32 M48 32 L56 32" stroke={color} strokeWidth="2" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚠ</text>
  </svg>
);

export const ManaFlowIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="manaGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0a1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#manaGrad)" />
    <path d="M20 20 Q32 32 20 44 Q32 32 44 44 Q32 32 44 20 Q32 32 20 20" fill={color} opacity="0.8" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛟ</text>
  </svg>
);

export const QuickCastIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="castGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0a1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#castGrad)" />
    <circle cx="32" cy="32" r="14" fill="none" stroke={color} strokeWidth="3" />
    <path d="M32 18 L32 32 L42 32" stroke={color} strokeWidth="2" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚱ</text>
  </svg>
);

export const DoubleCastIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="doubleCastGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1a0a1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#doubleCastGrad)" />
    <circle cx="24" cy="32" r="8" fill={color} opacity="0.8" />
    <circle cx="40" cy="32" r="8" fill={color} opacity="0.8" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛏ</text>
  </svg>
);

export const FireRainIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="fireRainGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1a0a1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#fireRainGrad)" />
    <path d="M20 12 L20 52 M32 12 L32 52 M44 12 L44 52" stroke={color} strokeWidth="4" />
    <circle cx="20" cy="12" r="4" fill={color} />
    <circle cx="32" cy="12" r="4" fill={color} />
    <circle cx="44" cy="12" r="4" fill={color} />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛊ</text>
  </svg>
);

// ═══════════════════════════════════════════
// PROFESSION TREE SKILLS
// ═══════════════════════════════════════════

export const HighJumpIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#84cc16" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="jumpGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0f1a0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#jumpGrad)" />
    <path d="M32 48 L32 20" stroke={color} strokeWidth="5" />
    <path d="M32 20 L24 28 M32 20 L40 28" stroke={color} strokeWidth="3" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚱ</text>
  </svg>
);

export const SoftLandingIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#84cc16" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="landGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0f1a0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#landGrad)" />
    <path d="M20 40 Q32 48 44 40" fill="none" stroke={color} strokeWidth="4" />
    <circle cx="32" cy="28" r="6" fill={color} opacity="0.8" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛚ</text>
  </svg>
);

export const ArrowSaveIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#84cc16" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="saveGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0f1a0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#saveGrad)" />
    <path d="M20 32 L44 32" stroke={color} strokeWidth="4" />
    <path d="M44 32 L36 24 M44 32 L36 40" stroke={color} strokeWidth="3" />
    <circle cx="20" cy="32" r="6" fill={color} opacity="0.8" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚠ</text>
  </svg>
);

export const MultishotIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#84cc16" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="multiGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0f1a0a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#multiGrad)" />
    <path d="M16 24 L48 24 M16 32 L48 32 M16 40 L48 40" stroke={color} strokeWidth="3" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛊ</text>
  </svg>
);

export const ElementalIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="elemGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0a1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#elemGrad)" />
    <circle cx="32" cy="32" r="14" fill={color} opacity="0.8" />
    <path d="M32 18 L32 46 M18 32 L46 32 M22 22 L42 42 M42 22 L22 42" stroke="#1a0a1a" strokeWidth="2" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛟ</text>
  </svg>
);

export const EnergyFlowIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="energyGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0a1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#energyGrad)" />
    <path d="M20 20 Q32 32 20 44 Q32 32 44 44 Q32 32 44 20 Q32 32 20 20" fill={color} opacity="0.8" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚠ</text>
  </svg>
);

export const ManaRegenIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="manaRegenGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#1a0a1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#manaRegenGrad)" />
    <circle cx="32" cy="32" r="14" fill="none" stroke={color} strokeWidth="3" />
    <path d="M32 18 L32 46 M18 32 L46 32" stroke={color} strokeWidth="3" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛒ</text>
  </svg>
);

export const MagicBurstIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#a855f7" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="burstGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1a0a1a" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#burstGrad)" />
    <circle cx="32" cy="32" r="12" fill={color} opacity="0.8" />
    <path d="M32 12 L32 8 M32 52 L32 56 M12 32 L8 32 M52 32 L56 32 M18 18 L14 14 M46 46 L50 50 M46 18 L50 14 M18 46 L14 50" stroke={color} strokeWidth="2" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛊ</text>
  </svg>
);

export const LivingWallIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#10b981" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="wallGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a1a0f" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#wallGrad)" />
    <rect x="16" y="16" width="32" height="32" fill={color} opacity="0.8" />
    <rect x="20" y="20" width="24" height="24" fill="#0a1a0f" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛁ</text>
  </svg>
);

export const IronSkinIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#10b981" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="ironGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a1a0f" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#ironGrad)" />
    <circle cx="32" cy="32" r="16" fill={color} opacity="0.8" />
    <circle cx="32" cy="32" r="10" fill="#0a1a0f" />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛏ</text>
  </svg>
);

export const ProvokeIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#10b981" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="provokeGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0a1a0f" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#provokeGrad)" />
    <circle cx="32" cy="32" r="14" fill="none" stroke={color} strokeWidth="3" />
    <circle cx="32" cy="32" r="8" fill="none" stroke={color} strokeWidth="2" />
    <circle cx="32" cy="32" r="3" fill={color} />
    <text x="32" y="56" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᚠ</text>
  </svg>
);

export const WarCryIcon: React.FC<IconProps> = ({ className = "w-full h-full", color = "#10b981" }) => (
  <svg viewBox="0 0 64 64" className={className}>
    <defs>
      <radialGradient id="cryGrad">
        <stop offset="0%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor="#0a1a0f" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#cryGrad)" />
    <path d="M32 16 L32 48" stroke={color} strokeWidth="5" />
    <path d="M20 24 Q32 16 44 24 M20 40 Q32 48 44 40" stroke={color} strokeWidth="3" fill="none" />
    <text x="32" y="58" textAnchor="middle" fill={color} fontSize="8" fontFamily="serif">ᛊ</text>
  </svg>
);

// ═══════════════════════════════════════════
// ICON MAP
// ═══════════════════════════════════════════

export const iconMap: Record<string, React.FC<IconProps>> = {
  // Attack
  strength: StrengthIcon,
  critical: CriticalIcon,
  power: PowerIcon,
  berserker: BerserkerIcon,
  'death-strike': DeathStrikeIcon,
  
  // Speed
  'swift-feet': SwiftFeetIcon,
  'quick-hands': QuickHandsIcon,
  cooldown: CooldownIcon,
  whirlwind: WhirlwindIcon,
  
  // Defense
  vitality: VitalityIcon,
  armor: ArmorIcon,
  dodge: DodgeIcon,
  regen: RegenIcon,
  block: BlockIcon,
  
  // Production
  gather: GatherIcon,
  craft: CraftIcon,
  durability: DurabilityIcon,
  farm: FarmIcon,
  enchant: EnchantIcon,
  
  // Bow
  'precise-shot': PreciseShotIcon,
  'rapid-fire': RapidFireIcon,
  piercing: PiercingIcon,
  explosive: ExplosiveIcon,
  'arrow-rain': ArrowRainIcon,
  
  // Sword
  'sword-mastery': SwordMasteryIcon,
  'quick-strikes': QuickStrikesIcon,
  parry: ParryIcon,
  'rush-slash': RushSlashIcon,
  'whirlwind-slash': WhirlwindSlashIcon,
  
  // Staff
  'magic-power': MagicPowerIcon,
  'mana-flow': ManaFlowIcon,
  'quick-cast': QuickCastIcon,
  'double-cast': DoubleCastIcon,
  'fire-rain': FireRainIcon,
  
  // Archer
  'high-jump': HighJumpIcon,
  'soft-landing': SoftLandingIcon,
  'arrow-save': ArrowSaveIcon,
  multishot: MultishotIcon,
  
  // Mage
  elemental: ElementalIcon,
  'energy-flow': EnergyFlowIcon,
  'mana-regen': ManaRegenIcon,
  'magic-burst': MagicBurstIcon,
  
  // Tanker
  'living-wall': LivingWallIcon,
  'iron-skin': IronSkinIcon,
  provoke: ProvokeIcon,
  'war-cry': WarCryIcon,
};
