import React from 'react';

export function RuneDivider({ rune }: { rune: string }) {
  return (
    <div aria-hidden="true" className="flex items-center gap-4 max-w-3xl mx-auto px-4 opacity-40 py-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C89B3C]/60" />
      <span className="text-[#C89B3C] text-xl select-none font-serif">{rune}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C89B3C]/60" />
    </div>
  );
}
