import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WorldMap } from '../components/WorldMap';
import { WikiModal } from '../components/WikiModal';
import { SearchModal, useSearchShortcut } from '../components/SearchModal';
import { monsters, recipes, guides, biomes, bosses, Boss, Monster, Guide } from '../data/wikiData';

export function WikiPage() {
  const [tab, setTab] = useState<'map' | 'biomes' | 'bosses' | 'monsters' | 'craft' | 'guides'>('map');
  const [selectedItem, setSelectedItem] = useState<{ data: Boss | Monster | Guide; type: 'boss' | 'monster' | 'guide' } | null>(null);
  const { isOpen: searchOpen, setIsOpen: setSearchOpen } = useSearchShortcut();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="font-[Cinzel] text-3xl md:text-5xl font-bold mb-4">
          <span className="text-norse-gold">Вики Хроник</span>
        </h1>
        <p className="text-norse-muted">
          Записки хранителя порта. База знаний, карта, гайды.
        </p>
      </div>

      {/* Search Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 glass-dark rounded-lg px-4 py-2 hover:border-norse-gold/30 transition-colors"
        >
          <span className="text-norse-gold">⌕</span>
          <span className="text-norse-muted text-sm">Поиск по Вики</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-norse-gold/10 border border-norse-gold/20 text-norse-muted text-[10px]">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {[
          { id: 'map', label: 'Карта', rune: 'ᛟ' },
          { id: 'biomes', label: 'Биомы', rune: 'ᚠ' },
          { id: 'bosses', label: 'Боссы', rune: 'ᛏ' },
          { id: 'monsters', label: 'Существа', rune: 'ᛗ' },
          { id: 'craft', label: 'Крафт', rune: 'ᚱ' },
          { id: 'guides', label: 'Гайды', rune: 'ᛊ' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs md:text-sm transition-all ${
              tab === t.id
                ? 'bg-norse-gold/10 text-norse-gold border border-norse-gold/20'
                : 'text-norse-muted hover:text-norse-text hover:bg-white/5'
            }`}
          >
            <span className="font-serif">{t.rune}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Map Tab */}
      {tab === 'map' && (
        <div>
          <WorldMap />
          <p className="text-center text-xs text-norse-muted/50 mt-4">
            Интерактивная карта мира. Кликай на маркеры для подробностей.
          </p>
        </div>
      )}

      {/* Biomes Tab */}
      {tab === 'biomes' && (
        <div className="space-y-4">
          {biomes.map(biome => (
            <div key={biome.id} className="card-hover card-wood rounded-lg p-6 card-corner">
              <div className="flex items-start gap-4 mb-4">
                <div className="rune-icon shrink-0">
                  <span className="text-xl font-serif">{biome.rune}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-[Cinzel] text-lg font-bold text-norse-text">{biome.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      biome.difficulty === 'Лёгкий' ? 'bg-green-500/20 text-green-400' :
                      biome.difficulty === 'Средний' ? 'bg-yellow-500/20 text-yellow-400' :
                      biome.difficulty === 'Сложный' ? 'bg-orange-500/20 text-orange-400' :
                      biome.difficulty === 'Очень сложный' ? 'bg-red-500/20 text-red-400' :
                      'bg-red-700/20 text-red-600'
                    }`}>{biome.difficulty}</span>
                  </div>
                  <p className="text-norse-muted text-sm mb-4">{biome.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-norse-gold font-semibold mb-2 uppercase tracking-wider text-[10px]">Ресурсы</div>
                  <div className="flex flex-wrap gap-1">
                    {biome.resources.map((r, i) => (
                      <span key={i} className="bg-norse-gold/8 text-norse-gold px-2 py-0.5 rounded">{r}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-norse-gold font-semibold mb-2 uppercase tracking-wider text-[10px]">Существа</div>
                  <div className="flex flex-wrap gap-1">
                    {biome.creatures.map((c, i) => (
                      <span key={i} className="bg-red-500/8 text-red-400 px-2 py-0.5 rounded">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-norse-gold font-semibold mb-2 uppercase tracking-wider text-[10px]">Боссы</div>
                  <div className="flex flex-wrap gap-1">
                    {biome.bosses.map((b, i) => (
                      <span key={i} className="bg-purple-500/8 text-purple-400 px-2 py-0.5 rounded">{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bosses Tab */}
      {tab === 'bosses' && (
        <div className="space-y-4">
          {bosses.map(boss => (
            <div 
              key={boss.id} 
              className="card-hover card-inventory rounded-lg p-6 card-corner cursor-pointer"
              onClick={() => setSelectedItem({ data: boss, type: 'boss' })}
            >
              <div className="flex items-start gap-4 mb-4">
                {boss.image && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-norse-gold/20 shrink-0">
                    <img src={boss.image} alt={boss.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="rune-icon shrink-0">
                  <span className="text-xl font-serif">{boss.rune}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-[Cinzel] text-lg font-bold text-norse-text">{boss.name}</h3>
                    <span className="text-xs text-norse-muted">{boss.biome}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-norse-muted">Здоровье:</span>
                    <span className="text-red-400 font-bold">{boss.health.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-norse-muted">Урон:</span>
                    <span className="text-orange-400 font-bold">{boss.damage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-norse-muted">Слабость:</span>
                    <span className="text-green-400">{boss.weakness}</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Призыв</div>
                  <p className="text-norse-text text-xs">{boss.summoning}</p>
                </div>
              </div>

              <div className="glass rounded p-3 mb-3">
                <div className="text-[10px] text-norse-gold uppercase tracking-wider mb-1">Стратегия</div>
                <p className="text-norse-muted text-xs line-clamp-2">{boss.strategy}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Дроп</div>
                  <div className="flex flex-wrap gap-1">
                    {boss.drops.slice(0, 2).map((drop, i) => (
                      <span key={i} className="text-xs bg-norse-gold/8 text-norse-gold px-2 py-0.5 rounded">{drop}</span>
                    ))}
                  </div>
                </div>
                <span className="text-norse-gold text-xs">Подробнее →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Monsters Tab */}
      {tab === 'monsters' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {monsters.map(monster => (
            <div 
              key={monster.id} 
              className="card-hover card-wood rounded-lg p-5 card-corner cursor-pointer"
              onClick={() => setSelectedItem({ data: monster, type: 'monster' })}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {monster.image && (
                    <div className="w-12 h-12 rounded overflow-hidden border border-norse-gold/20 shrink-0">
                      <img src={monster.image} alt={monster.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <span className="text-norse-gold text-lg font-serif">{monster.rune}</span>
                  <h3 className="font-[Cinzel] font-bold text-norse-text text-sm">{monster.name}</h3>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded uppercase tracking-wider ${
                  monster.difficulty === 'boss' ? 'bg-red-500/20 text-red-400' :
                  monster.difficulty === 'hard' ? 'bg-orange-500/20 text-orange-400' :
                  monster.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {monster.difficulty === 'boss' ? 'Босс' : monster.difficulty === 'hard' ? 'Сложный' : monster.difficulty === 'medium' ? 'Средний' : 'Лёгкий'}
                </span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-norse-muted">Биом:</span>
                  <span className="text-norse-text">{monster.biome}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-norse-muted">Здоровье:</span>
                  <span className="text-red-400 font-semibold">{monster.health}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-norse-muted">Урон:</span>
                  <span className="text-orange-400 font-semibold">{monster.damage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-norse-muted">Слабость:</span>
                  <span className="text-green-400">{monster.weakness}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-norse-gold/10">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Дроп</div>
                  <span className="text-norse-gold text-[10px]">Подробнее →</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {monster.drops.slice(0, 3).map((drop, i) => (
                    <span key={i} className="text-[10px] bg-norse-gold/8 text-norse-gold px-2 py-0.5 rounded">{drop}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Craft Tab */}
      {tab === 'craft' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="card-hover card-inventory rounded-lg p-5 card-corner">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-norse-gold text-lg font-serif">{recipe.rune}</span>
                <div>
                  <h3 className="font-[Cinzel] font-bold text-norse-text text-sm">{recipe.name}</h3>
                  <span className={`text-[9px] uppercase tracking-wider ${
                    recipe.category === 'weapon' ? 'text-red-400' :
                    recipe.category === 'armor' ? 'text-blue-400' :
                    recipe.category === 'food' ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {recipe.category === 'weapon' ? 'Оружие' : recipe.category === 'armor' ? 'Броня' : recipe.category === 'food' ? 'Еда' : 'Строительство'}
                  </span>
                </div>
              </div>
              
              <div className="text-xs text-norse-muted mb-2">
                Станция: <span className="text-norse-text">{recipe.station}</span>
              </div>

              <div className="space-y-1">
                {recipe.materials.map((mat, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-norse-muted">{mat.name}</span>
                    <span className="text-norse-gold font-semibold">×{mat.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Guides Tab */}
      {tab === 'guides' && (
        <div className="grid sm:grid-cols-2 gap-4">
          {guides.map(guide => (
            <div 
              key={guide.id} 
              className="card-hover card-wood rounded-lg p-5 card-corner cursor-pointer"
              onClick={() => setSelectedItem({ data: guide, type: 'guide' })}
            >
              <div className="flex items-start gap-3">
                <span className="text-norse-gold text-2xl font-serif">{guide.rune}</span>
                <div className="flex-1">
                  <h3 className="font-[Cinzel] font-bold text-norse-text text-sm mb-1">{guide.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] bg-norse-gold/10 text-norse-gold px-2 py-0.5 rounded">{guide.category}</span>
                    <span className="text-[10px] text-norse-muted">{guide.readTime}</span>
                  </div>
                  <p className="text-norse-muted/70 text-xs">{guide.excerpt}</p>
                  <span className="text-norse-gold text-xs mt-2 inline-block">Читать →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Wiki Modal */}
      {selectedItem && (
        <WikiModal 
          data={selectedItem.data} 
          type={selectedItem.type}
          onClose={() => setSelectedItem(null)} 
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(data, type) => setSelectedItem({ data, type })}
      />
    </div>
  );
}
