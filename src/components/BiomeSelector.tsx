import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, Biome } from '../context/ThemeContext';

export function BiomeSelector() {
  const { biome, setBiome, allBiomes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const biomes = Object.entries(allBiomes) as [Biome, typeof allBiomes[Biome]][];

  const biomeThemes = {
    meadows: { primary: '#4ade80', secondary: '#86efac' },
    blackforest: { primary: '#166534', secondary: '#14532d' },
    mountains: { primary: '#60a5fa', secondary: '#93c5fd' },
    swamp: { primary: '#7c3aed', secondary: '#a78bfa' },
    plains: { primary: '#facc15', secondary: '#fde047' },
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 glass-dark rounded-lg px-3 py-2 hover:border-norse-gold/30 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="text-norse-gold text-sm font-serif"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {allBiomes[biome].rune}
        </motion.span>
        <span className="text-norse-text text-xs">{allBiomes[biome].nameRu}</span>
        <motion.span
          className="text-norse-muted text-[10px]"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          {isOpen ? '▲' : '▼'}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              className="absolute top-full mt-2 right-0 glass-dark rounded-lg p-2 z-50 min-w-[160px]"
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-[10px] text-norse-muted uppercase tracking-wider px-2 py-1 mb-1">
                Выбери биом
              </div>
              {biomes.map(([key, value], index) => (
                <motion.button
                  key={key}
                  onClick={() => {
                    setBiome(key);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${
                    biome === key ? 'bg-norse-gold/10 text-norse-gold' : 'text-norse-muted hover:text-norse-text hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-sm font-serif">{value.rune}</span>
                  <span className="text-xs">{value.nameRu}</span>
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
