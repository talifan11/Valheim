import React from 'react';
// Norse-themed SVG icons

export function SwordIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M38 6L22 22" />
      <path d="M38 6L34 10" />
      <path d="M38 6L42 10" />
      <path d="M22 22L18 26" />
      <path d="M14 30L18 26L22 30L18 34L14 30Z" />
      <path d="M14 30L6 38" />
      <path d="M18 34L14 42" />
    </svg>
  );
}

export function ShieldIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 4L6 12V24C6 34 14 42 24 44C34 42 42 34 42 24V12L24 4Z" />
      <path d="M24 14V34" />
      <path d="M14 24H34" />
      <circle cx="24" cy="24" r="4" />
    </svg>
  );
}

export function HealIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 44C24 44 6 32 6 18C6 10 12 6 18 6C21 6 23 8 24 10C25 8 27 6 30 6C36 6 42 10 42 18C42 32 24 44 24 44Z" />
      <path d="M20 22H28" />
      <path d="M24 18V26" />
    </svg>
  );
}

export function MagicIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="20" r="10" />
      <path d="M24 10V30" />
      <path d="M14 20H34" />
      <path d="M18 14L30 26" />
      <path d="M30 14L18 26" />
      <path d="M24 30V44" />
      <path d="M20 44H28" />
    </svg>
  );
}

export function BowIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 38C10 38 8 24 18 14C28 4 42 6 42 6" />
      <path d="M10 38L38 10" />
      <path d="M38 10L42 6" />
      <path d="M38 10L34 6" />
      <path d="M38 10L42 14" />
      <path d="M6 42L10 38" />
    </svg>
  );
}

export function DruidIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 44V24" />
      <path d="M24 24C24 24 16 20 16 12C16 6 24 4 24 4C24 4 32 6 32 12C32 20 24 24 24 24Z" />
      <path d="M18 32C18 32 12 30 10 24" />
      <path d="M30 32C30 32 36 30 38 24" />
      <path d="M20 38C20 38 14 38 12 34" />
      <path d="M28 38C28 38 34 38 36 34" />
    </svg>
  );
}

export function PortalIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="24" cy="24" rx="16" ry="20" />
      <ellipse cx="24" cy="24" rx="10" ry="14" />
      <ellipse cx="24" cy="24" rx="4" ry="6" />
    </svg>
  );
}

export function CrownIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 36L10 16L18 26L24 10L30 26L38 16L42 36H6Z" />
      <path d="M6 36H42V42H6V36Z" />
      <circle cx="24" cy="10" r="2" />
      <circle cx="10" cy="16" r="2" />
      <circle cx="38" cy="16" r="2" />
    </svg>
  );
}

export function CastleIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 44V20H14V14H18V20H30V14H34V20H40V44" />
      <path d="M4 44H44" />
      <path d="M20 44V32H28V44" />
      <path d="M8 20V16H10V20" />
      <path d="M38 20V16H40V20" />
      <path d="M14 28H18" />
      <path d="M30 28H34" />
    </svg>
  );
}

export function HammerIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 34L30 18" />
      <path d="M26 14L38 6L42 10L34 22L26 14Z" />
      <path d="M10 38L14 34L18 38L14 42L10 38Z" />
    </svg>
  );
}

export function HorseIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M36 12C36 12 40 8 42 10C44 12 40 16 40 16L36 20" />
      <path d="M36 12L28 16L24 24L16 28L12 36" />
      <path d="M24 24L20 36" />
      <path d="M28 16L32 24L28 36" />
      <path d="M12 36L8 40" />
      <path d="M20 36L18 42" />
      <path d="M28 36L26 42" />
      <path d="M36 20C36 20 38 24 36 28" />
    </svg>
  );
}

export function BuildIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 44L24 4L40 44" />
      <path d="M14 32H34" />
      <path d="M18 24H30" />
      <path d="M4 44H44" />
    </svg>
  );
}

export function DaggerIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M34 8L18 24" />
      <path d="M34 8L38 12" />
      <path d="M34 8L30 4" />
      <path d="M18 24L14 28" />
      <path d="M10 32L14 28L18 32L14 36L10 32Z" />
      <path d="M10 32L6 42" />
      <path d="M14 36L10 44" />
    </svg>
  );
}

export function DownloadIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3V15" />
      <path d="M8 11L12 15L16 11" />
      <path d="M4 17V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V17" />
    </svg>
  );
}

export function RuneDecor({ rune, className = "", style }: { rune: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className={`rune-bg animate-rune-float ${className}`} style={style}>{rune}</span>
  );
}

// Norse knot pattern as SVG
export function NorseKnot({ className = "w-full h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10 Q25 0 50 10 Q75 20 100 10 Q125 0 150 10 Q175 20 200 10 Q225 0 250 10 Q275 20 300 10 Q325 0 350 10 Q375 20 400 10" 
        stroke="#c9a84c" strokeWidth="1" opacity="0.3" />
      <path d="M0 10 Q25 20 50 10 Q75 0 100 10 Q125 20 150 10 Q175 0 200 10 Q225 20 250 10 Q275 0 300 10 Q325 20 350 10 Q375 0 400 10" 
        stroke="#c9a84c" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}
