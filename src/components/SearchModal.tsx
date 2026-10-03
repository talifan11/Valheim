import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bosses, monsters, guides, biomes } from '../data/wikiData';

interface SearchResult {
  id: string;
  name: string;
  type: 'boss' | 'monster' | 'guide' | 'biome';
  rune: string;
  description: string;
  data: any;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: any, type: 'boss' | 'monster' | 'guide') => void;
}

export function SearchModal({ isOpen, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const found: SearchResult[] = [];

    // Search bosses
    bosses.forEach(boss => {
      if (boss.name.toLowerCase().includes(q) || boss.biome.toLowerCase().includes(q) || boss.description?.toLowerCase().includes(q)) {
        found.push({ id: boss.id, name: boss.name, type: 'boss', rune: boss.rune, description: boss.biome, data: boss });
      }
    });

    // Search monsters
    monsters.forEach(monster => {
      if (monster.name.toLowerCase().includes(q) || monster.biome.toLowerCase().includes(q) || monster.description?.toLowerCase().includes(q)) {
        found.push({ id: monster.id, name: monster.name, type: 'monster', rune: monster.rune, description: monster.biome, data: monster });
      }
    });

    // Search guides
    guides.forEach(guide => {
      if (guide.title.toLowerCase().includes(q) || guide.category.toLowerCase().includes(q) || guide.excerpt.toLowerCase().includes(q)) {
        found.push({ id: guide.id, name: guide.title, type: 'guide', rune: guide.rune, description: guide.category, data: guide });
      }
    });

    // Search biomes
    biomes.forEach(biome => {
      if (biome.name.toLowerCase().includes(q) || biome.description.toLowerCase().includes(q)) {
        found.push({ id: biome.id, name: biome.name, type: 'biome', rune: biome.rune, description: biome.difficulty, data: biome });
      }
    });

    setResults(found.slice(0, 8));
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        const result = results[selectedIndex];
        if (result.type !== 'biome') {
          onSelect(result.data, result.type as 'boss' | 'monster' | 'guide');
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, onSelect]);

  if (!isOpen) return null;

  const typeLabels = {
    boss: 'Босс',
    monster: 'Существо',
    guide: 'Гайд',
    biome: 'Биом',
  };

  const typeColors = {
    boss: 'text-red-400',
    monster: 'text-orange-400',
    guide: 'text-norse-blue',
    biome: 'text-green-400',
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 search-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative glass-dark rounded-xl w-full max-w-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-norse-gold/10">
          <div className="flex items-center gap-3">
            <span className="text-norse-gold text-xl">⌕</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по Вики... (боссы, существа, гайды)"
              className="search-input flex-1 bg-transparent border-0 outline-none text-norse-text placeholder-norse-muted/50 text-sm"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded bg-norse-gold/10 border border-norse-gold/20 text-norse-muted text-[10px]">
              ESC
            </kbd>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && query && (
            <div className="text-center py-8 text-norse-muted/50 text-sm">
              Ничего не найдено по запросу «{query}»
            </div>
          )}
          
          {results.length === 0 && !query && (
            <div className="text-center py-8 text-norse-muted/50 text-sm">
              <div className="text-norse-gold text-2xl mb-2 font-serif">ᚱ</div>
              <p>Начните вводить для поиска</p>
              <p className="text-xs mt-1">Боссы, существа, гайды, биомы</p>
            </div>
          )}

          {results.map((result, i) => (
            <button
              key={`${result.type}-${result.id}`}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                i === selectedIndex ? 'bg-norse-gold/10 border border-norse-gold/20' : 'hover:bg-norse-gold/5'
              }`}
              onClick={() => {
                if (result.type !== 'biome') {
                  onSelect(result.data, result.type as 'boss' | 'monster' | 'guide');
                  onClose();
                }
              }}
            >
              <span className="text-norse-gold text-lg font-serif shrink-0">{result.rune}</span>
              <div className="flex-1 min-w-0">
                <div className="text-norse-text text-sm font-medium truncate">{result.name}</div>
                <div className="text-norse-muted/60 text-xs truncate">{result.description}</div>
              </div>
              <span className={`text-[10px] uppercase tracking-wider ${typeColors[result.type]}`}>
                {typeLabels[result.type]}
              </span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-norse-gold/10 flex items-center justify-between text-[10px] text-norse-muted/50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-norse-gold/10 border border-norse-gold/20">↑↓</kbd>
              навигация
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-norse-gold/10 border border-norse-gold/20">↵</kbd>
              выбрать
            </span>
          </div>
          <span>Ctrl+K для открытия</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Hook for Ctrl+K shortcut
export function useSearchShortcut() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isOpen, setIsOpen };
}
