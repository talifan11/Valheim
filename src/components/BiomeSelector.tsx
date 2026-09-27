import React, { useState } from 'react';
import { useTheme, Biome } from '../context/ThemeContext';

export function BiomeSelector() {
  const { biome, setBiome, allBiomes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const biomes = Object.entries(allBiomes) as [Biome, typeof allBiomes[Biome]][];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 glass-dark rounded-lg px-3 py-2 hover:border-norse-gold/30 transition-colors"
      >
        <span className="text-norse-gold text-sm font-serif">{allBiomes[biome].rune}</span>
        <span className="text-norse-text text-xs">{allBiomes[biome].nameRu}</span>
        <span className="text-norse-muted text-[10px]">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 right-0 glass-dark rounded-lg p-2 z-50 min-w-[160px] animate-scale-in">
            <div className="text-[10px] text-norse-muted uppercase tracking-wider px-2 py-1 mb-1">Выбери биом</div>
            {biomes.map(([key, value]) => (
              <button
                key={key}
                onClick={() => { setBiome(key); setIsOpen(false); }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                  biome === key ? 'bg-norse-gold/10 text-norse-gold' : 'text-norse-muted hover:text-norse-text hover:bg-white/5'
                }`}
              >
                <span className="text-sm font-serif">{value.rune}</span>
                <span className="text-xs">{value.nameRu}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
