import React from 'react';

// WoW-style talent icons - square with border, detailed designs
export const TalentIcons = {
  // Attack Tree
  powerStrike: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="powerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4444" />
          <stop offset="100%" stopColor="#aa0000" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#powerGrad)" />
      <path d="M32 12 L40 32 L32 52 L24 32 Z" fill="#fff" opacity="0.9" />
      <circle cx="32" cy="32" r="8" fill="#ff6666" />
    </svg>
  ),

  critStrike: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="critGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6600" />
          <stop offset="100%" stopColor="#cc3300" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#critGrad)" />
      <path d="M32 8 L36 28 L56 32 L36 36 L32 56 L28 36 L8 32 L28 28 Z" fill="#fff" opacity="0.9" />
    </svg>
  ),

  critPower: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="critPowerGrad">
          <stop offset="0%" stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#ff4400" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#critPowerGrad)" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="32" cy="32" r="8" fill="#fff" />
      <path d="M32 8 L32 16 M32 48 L32 56 M8 32 L16 32 M48 32 L56 32" stroke="#fff" strokeWidth="2" />
    </svg>
  ),

  berserkerRage: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="berserkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="100%" stopColor="#880000" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#berserkGrad)" />
      <path d="M20 20 Q32 8 44 20 L44 44 Q32 56 20 44 Z" fill="#fff" opacity="0.9" />
      <circle cx="26" cy="28" r="3" fill="#ff0000" />
      <circle cx="38" cy="28" r="3" fill="#ff0000" />
      <path d="M24 38 Q32 44 40 38" stroke="#ff0000" strokeWidth="2" fill="none" />
    </svg>
  ),

  mortalStrike: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="mortalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#660000" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#mortalGrad)" />
      <path d="M32 8 L38 28 L58 32 L38 36 L32 56 L26 36 L6 32 L26 28 Z" fill="#ff0000" />
      <circle cx="32" cy="32" r="6" fill="#000" />
    </svg>
  ),

  // Speed Tree
  swiftFeet: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="swiftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00aaff" />
          <stop offset="100%" stopColor="#0066cc" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#swiftGrad)" />
      <path d="M16 40 L24 32 L32 40 L40 32 L48 40" stroke="#fff" strokeWidth="4" fill="none" opacity="0.9" />
      <path d="M20 48 L28 40 L36 48 L44 40" stroke="#fff" strokeWidth="3" fill="none" opacity="0.6" />
    </svg>
  ),

  quickHands: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="quickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ccff" />
          <stop offset="100%" stopColor="#0088cc" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#quickGrad)" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M32 16 L32 32 L44 32" stroke="#fff" strokeWidth="3" fill="none" />
      <circle cx="32" cy="32" r="3" fill="#fff" />
    </svg>
  ),

  cooldownReduce: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="cdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0088ff" />
          <stop offset="100%" stopColor="#0044aa" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#cdGrad)" />
      <path d="M32 12 A20 20 0 1 1 32 52 A20 20 0 1 1 32 12" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="10 5" />
      <path d="M32 20 L32 32 L40 32" stroke="#fff" strokeWidth="2" fill="none" />
    </svg>
  ),

  whirlwind: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="whirlGrad">
          <stop offset="0%" stopColor="#66ccff" />
          <stop offset="100%" stopColor="#0066cc" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#whirlGrad)" />
      <path d="M32 16 Q48 16 48 32 Q48 48 32 48 Q16 48 16 32 Q16 20 28 18" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="32" cy="32" r="6" fill="#fff" />
    </svg>
  ),

  // Defense Tree
  toughBody: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="toughGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00cc66" />
          <stop offset="100%" stopColor="#008844" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#toughGrad)" />
      <path d="M32 12 C20 12 12 20 12 32 C12 44 20 52 32 52 C44 52 52 44 52 32 C52 20 44 12 32 12 Z" fill="#fff" opacity="0.9" />
      <path d="M32 20 L32 44 M20 32 L44 32" stroke="#00cc66" strokeWidth="3" />
    </svg>
  ),

  toughArmor: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#44aa66" />
          <stop offset="100%" stopColor="#226644" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#armorGrad)" />
      <path d="M32 8 L48 20 L48 44 L32 56 L16 44 L16 20 Z" fill="#fff" opacity="0.9" />
      <path d="M32 16 L40 24 L40 40 L32 48 L24 40 L24 24 Z" fill="#44aa66" />
    </svg>
  ),

  dodge: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="dodgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#66dd88" />
          <stop offset="100%" stopColor="#338855" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#dodgeGrad)" />
      <path d="M20 44 Q32 20 44 44" fill="none" stroke="#fff" strokeWidth="4" />
      <circle cx="20" cy="44" r="4" fill="#fff" />
      <circle cx="44" cy="44" r="4" fill="#fff" />
    </svg>
  ),

  regeneration: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="regenGrad">
          <stop offset="0%" stopColor="#88ff88" />
          <stop offset="100%" stopColor="#00aa00" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#regenGrad)" />
      <path d="M32 16 L32 48 M16 32 L48 32" stroke="#fff" strokeWidth="6" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" />
    </svg>
  ),

  blockTraining: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="blockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22aa44" />
          <stop offset="100%" stopColor="#116622" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#blockGrad)" />
      <circle cx="32" cy="32" r="18" fill="#fff" opacity="0.9" />
      <path d="M32 14 L32 50 M14 32 L50 32" stroke="#22aa44" strokeWidth="4" />
      <circle cx="32" cy="32" r="6" fill="#22aa44" />
    </svg>
  ),

  // Production Tree
  efficientGather: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="gatherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffaa00" />
          <stop offset="100%" stopColor="#cc7700" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#gatherGrad)" />
      <path d="M32 12 L40 28 L32 44 L24 28 Z" fill="#fff" opacity="0.9" />
      <path d="M20 48 L44 48" stroke="#fff" strokeWidth="3" />
      <circle cx="32" cy="28" r="4" fill="#ffaa00" />
    </svg>
  ),

  craftMaster: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="craftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffcc00" />
          <stop offset="100%" stopColor="#cc8800" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#craftGrad)" />
      <path d="M24 16 L24 48 M40 16 L40 48" stroke="#fff" strokeWidth="4" />
      <path d="M20 24 L44 24 M20 40 L44 40" stroke="#fff" strokeWidth="3" />
    </svg>
  ),

  durability: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="durGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffdd44" />
          <stop offset="100%" stopColor="#aa8800" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#durGrad)" />
      <rect x="20" y="20" width="24" height="24" fill="#fff" opacity="0.9" />
      <rect x="24" y="24" width="16" height="16" fill="#ffdd44" />
    </svg>
  ),

  farmGrid: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="farmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#88cc00" />
          <stop offset="100%" stopColor="#558800" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#farmGrad)" />
      <rect x="16" y="16" width="12" height="12" fill="#fff" opacity="0.9" />
      <rect x="36" y="16" width="12" height="12" fill="#fff" opacity="0.9" />
      <rect x="16" y="36" width="12" height="12" fill="#fff" opacity="0.9" />
      <rect x="36" y="36" width="12" height="12" fill="#fff" opacity="0.9" />
    </svg>
  ),

  enchant: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="enchantGrad">
          <stop offset="0%" stopColor="#ffee88" />
          <stop offset="100%" stopColor="#ffaa00" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#enchantGrad)" />
      <path d="M32 12 L36 28 L52 32 L36 36 L32 52 L28 36 L12 32 L28 28 Z" fill="#fff" />
      <circle cx="32" cy="32" r="6" fill="#ffaa00" />
    </svg>
  ),

  // Bow Tree
  preciseShot: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="preciseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#88dd00" />
          <stop offset="100%" stopColor="#558800" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#preciseGrad)" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="32" cy="32" r="8" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="32" cy="32" r="3" fill="#fff" />
    </svg>
  ),

  quickReload: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="reloadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#aadd00" />
          <stop offset="100%" stopColor="#668800" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#reloadGrad)" />
      <path d="M20 32 Q32 16 44 32" fill="none" stroke="#fff" strokeWidth="4" />
      <path d="M44 32 L40 28 M44 32 L40 36" stroke="#fff" strokeWidth="3" />
    </svg>
  ),

  piercingArrow: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="piercingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ccff00" />
          <stop offset="100%" stopColor="#88aa00" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#piercingGrad)" />
      <path d="M16 32 L48 32" stroke="#fff" strokeWidth="4" />
      <path d="M48 32 L40 24 M48 32 L40 40" stroke="#fff" strokeWidth="3" />
    </svg>
  ),

  explosiveArrow: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="explosiveGrad">
          <stop offset="0%" stopColor="#ffff00" />
          <stop offset="100%" stopColor="#ff6600" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#explosiveGrad)" />
      <circle cx="32" cy="32" r="12" fill="#fff" />
      <path d="M32 16 L32 8 M32 48 L32 56 M16 32 L8 32 M48 32 L56 32" stroke="#fff" strokeWidth="3" />
    </svg>
  ),

  arrowRain: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="rainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#66cc00" />
          <stop offset="100%" stopColor="#336600" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#rainGrad)" />
      <path d="M20 16 L20 48 M32 16 L32 48 M44 16 L44 48" stroke="#fff" strokeWidth="3" />
      <path d="M20 48 L16 44 M32 48 L28 44 M44 48 L40 44" stroke="#fff" strokeWidth="2" />
    </svg>
  ),

  // Sword Tree
  swordMastery: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="swordGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8866ff" />
          <stop offset="100%" stopColor="#4433aa" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#swordGrad)" />
      <path d="M32 12 L36 40 L32 52 L28 40 Z" fill="#fff" opacity="0.9" />
      <path d="M24 36 L40 36" stroke="#fff" strokeWidth="3" />
    </svg>
  ),

  quickStrikes: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="quickStrikesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#aa88ff" />
          <stop offset="100%" stopColor="#6644cc" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#quickStrikesGrad)" />
      <path d="M20 20 L44 44 M44 20 L20 44" stroke="#fff" strokeWidth="4" />
    </svg>
  ),

  parry: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="parryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9977ff" />
          <stop offset="100%" stopColor="#5533bb" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#parryGrad)" />
      <circle cx="32" cy="32" r="16" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M20 32 L44 32" stroke="#fff" strokeWidth="4" />
    </svg>
  ),

  rushSlash: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="rushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bb99ff" />
          <stop offset="100%" stopColor="#7755dd" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#rushGrad)" />
      <path d="M16 32 L48 32" stroke="#fff" strokeWidth="5" />
      <path d="M48 32 L40 24 M48 32 L40 40" stroke="#fff" strokeWidth="3" />
    </svg>
  ),

  whirlwindSlash: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="whirlSlashGrad">
          <stop offset="0%" stopColor="#ddbbff" />
          <stop offset="100%" stopColor="#8855ff" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#whirlSlashGrad)" />
      <path d="M32 12 Q48 12 48 32 Q48 48 32 48 Q16 48 16 32 Q16 20 28 18" fill="none" stroke="#fff" strokeWidth="4" />
      <circle cx="32" cy="32" r="8" fill="#fff" />
    </svg>
  ),

  // Staff Tree
  magicPower: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="magicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cc66ff" />
          <stop offset="100%" stopColor="#8833cc" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#magicGrad)" />
      <circle cx="32" cy="32" r="12" fill="#fff" opacity="0.9" />
      <path d="M32 16 L32 8 M32 48 L32 56 M16 32 L8 32 M48 32 L56 32" stroke="#fff" strokeWidth="2" />
    </svg>
  ),

  manaFlow: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="manaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dd88ff" />
          <stop offset="100%" stopColor="#9944dd" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#manaGrad)" />
      <path d="M20 20 Q32 32 20 44 Q32 32 44 44 Q32 32 44 20 Q32 32 20 20" fill="#fff" opacity="0.9" />
    </svg>
  ),

  quickCast: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="castGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ee99ff" />
          <stop offset="100%" stopColor="#aa55ee" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#castGrad)" />
      <circle cx="32" cy="32" r="14" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M32 18 L32 32 L42 32" stroke="#fff" strokeWidth="2" />
    </svg>
  ),

  doubleCast: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="doubleCastGrad">
          <stop offset="0%" stopColor="#ffbbff" />
          <stop offset="100%" stopColor="#cc66ff" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#doubleCastGrad)" />
      <circle cx="24" cy="32" r="8" fill="#fff" />
      <circle cx="40" cy="32" r="8" fill="#fff" />
    </svg>
  ),

  fireRain: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="fireRainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6600" />
          <stop offset="100%" stopColor="#cc3300" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#fireRainGrad)" />
      <path d="M20 12 L20 52 M32 12 L32 52 M44 12 L44 52" stroke="#fff" strokeWidth="4" />
      <circle cx="20" cy="12" r="4" fill="#fff" />
      <circle cx="32" cy="12" r="4" fill="#fff" />
      <circle cx="44" cy="12" r="4" fill="#fff" />
    </svg>
  ),

  // Job Trees
  highJump: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="jumpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#88ff44" />
          <stop offset="100%" stopColor="#44aa00" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#jumpGrad)" />
      <path d="M32 48 L32 20" stroke="#fff" strokeWidth="5" />
      <path d="M32 20 L24 28 M32 20 L40 28" stroke="#fff" strokeWidth="3" />
    </svg>
  ),

  softLanding: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#aaff66" />
          <stop offset="100%" stopColor="#66cc22" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#landGrad)" />
      <path d="M20 40 Q32 48 44 40" fill="none" stroke="#fff" strokeWidth="4" />
      <circle cx="32" cy="28" r="6" fill="#fff" />
    </svg>
  ),

  arrowSave: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="saveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ccff88" />
          <stop offset="100%" stopColor="#88dd44" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#saveGrad)" />
      <path d="M20 32 L44 32" stroke="#fff" strokeWidth="4" />
      <path d="M44 32 L36 24 M44 32 L36 40" stroke="#fff" strokeWidth="3" />
      <circle cx="20" cy="32" r="6" fill="#fff" />
    </svg>
  ),

  multishot: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="multiGrad">
          <stop offset="0%" stopColor="#eeffaa" />
          <stop offset="100%" stopColor="#aadd44" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#multiGrad)" />
      <path d="M16 24 L48 24 M16 32 L48 32 M16 40 L48 40" stroke="#fff" strokeWidth="3" />
    </svg>
  ),

  elementalMaster: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="elemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff88ff" />
          <stop offset="100%" stopColor="#aa44aa" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#elemGrad)" />
      <circle cx="32" cy="32" r="14" fill="#fff" opacity="0.9" />
      <path d="M32 18 L32 46 M18 32 L46 32 M22 22 L42 42 M42 22 L22 42" stroke="#ff88ff" strokeWidth="2" />
    </svg>
  ),

  energyFlow: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffaaff" />
          <stop offset="100%" stopColor="#cc66cc" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#energyGrad)" />
      <path d="M20 20 Q32 32 20 44 Q32 32 44 44 Q32 32 44 20 Q32 32 20 20" fill="#fff" opacity="0.9" />
    </svg>
  ),

  manaRegen: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="manaRegenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffccff" />
          <stop offset="100%" stopColor="#dd88dd" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#manaRegenGrad)" />
      <circle cx="32" cy="32" r="14" fill="none" stroke="#fff" strokeWidth="3" />
      <path d="M32 18 L32 46 M18 32 L46 32" stroke="#fff" strokeWidth="3" />
    </svg>
  ),

  magicBurst: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="burstGrad">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ff88ff" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#burstGrad)" />
      <circle cx="32" cy="32" r="12" fill="#fff" />
      <path d="M32 12 L32 8 M32 52 L32 56 M12 32 L8 32 M52 32 L56 32 M18 18 L14 14 M46 46 L50 50 M46 18 L50 14 M18 46 L14 50" stroke="#fff" strokeWidth="2" />
    </svg>
  ),

  livingWall: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#44ddaa" />
          <stop offset="100%" stopColor="#228866" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#wallGrad)" />
      <rect x="16" y="16" width="32" height="32" fill="#fff" opacity="0.9" />
      <rect x="20" y="20" width="24" height="24" fill="#44ddaa" />
    </svg>
  ),

  ironSkin: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="ironGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#66eebb" />
          <stop offset="100%" stopColor="#33aa77" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#ironGrad)" />
      <circle cx="32" cy="32" r="16" fill="#fff" opacity="0.9" />
      <circle cx="32" cy="32" r="10" fill="#66eebb" />
    </svg>
  ),

  provoke: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <linearGradient id="provokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#88ffcc" />
          <stop offset="100%" stopColor="#44cc88" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" fill="url(#provokeGrad)" />
      <circle cx="32" cy="32" r="14" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="32" cy="32" r="8" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="32" cy="32" r="3" fill="#fff" />
    </svg>
  ),

  warCry: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <defs>
        <radialGradient id="cryGrad">
          <stop offset="0%" stopColor="#aaffdd" />
          <stop offset="100%" stopColor="#44ddaa" />
        </radialGradient>
      </defs>
      <rect width="64" height="64" fill="url(#cryGrad)" />
      <path d="M32 16 L32 48" stroke="#fff" strokeWidth="5" />
      <path d="M20 24 Q32 16 44 24 M20 40 Q32 48 44 40" stroke="#fff" strokeWidth="3" fill="none" />
    </svg>
  ),
};

export type TalentIconKey = keyof typeof TalentIcons;
