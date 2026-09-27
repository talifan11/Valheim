import React from 'react';
import { Boss, Monster, Guide } from '../data/wikiData';

interface WikiModalProps {
  data: Boss | Monster | Guide;
  type: 'boss' | 'monster' | 'guide';
  onClose: () => void;
}

export function WikiModal({ data, type, onClose }: WikiModalProps) {
  const isBoss = type === 'boss';
  const isMonster = type === 'monster';
  const isGuide = type === 'guide';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div 
        className="relative glass-dark rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in card-corner"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-norse-gold/60 hover:text-norse-gold transition-colors text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          {('image' in data && data.image) && (
            <div className="w-32 h-32 rounded-lg overflow-hidden border border-norse-gold/20 shrink-0">
              <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-norse-gold text-2xl font-serif">{data.rune}</span>
              <h2 className="font-[Cinzel] text-2xl font-bold text-norse-text">{data.name}</h2>
            </div>
            {isBoss && (
              <div className="flex items-center gap-3 text-xs text-norse-muted">
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded">БОСС</span>
                <span>Биом: {(data as Boss).biome}</span>
              </div>
            )}
            {isMonster && (
              <div className="flex items-center gap-3 text-xs text-norse-muted">
                <span className={`px-2 py-0.5 rounded ${
                  (data as Monster).difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                  (data as Monster).difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {(data as Monster).difficulty === 'easy' ? 'Лёгкий' :
                   (data as Monster).difficulty === 'medium' ? 'Средний' : 'Сложный'}
                </span>
                <span>Биом: {(data as Monster).biome}</span>
              </div>
            )}
            {isGuide && (
              <div className="flex items-center gap-3 text-xs text-norse-muted">
                <span className="bg-norse-gold/20 text-norse-gold px-2 py-0.5 rounded">{(data as Guide).category}</span>
                <span>Время чтения: {(data as Guide).readTime}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {('description' in data && data.description) && (
          <div className="mb-6">
            <h3 className="text-norse-gold text-sm font-semibold mb-2 uppercase tracking-wider">Описание</h3>
            <p className="text-norse-muted text-sm leading-relaxed">{data.description}</p>
          </div>
        )}

        {/* Stats (Boss/Monster) */}
        {(isBoss || isMonster) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="glass rounded p-3 text-center">
              <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Здоровье</div>
              <div className="text-lg font-bold text-red-400">{(data as Boss | Monster).health.toLocaleString()}</div>
            </div>
            <div className="glass rounded p-3 text-center">
              <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Урон</div>
              <div className="text-lg font-bold text-orange-400">{(data as Boss | Monster).damage}</div>
            </div>
            <div className="glass rounded p-3 text-center col-span-2">
              <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Слабость</div>
              <div className="text-sm font-bold text-green-400">{(data as Boss | Monster).weakness}</div>
            </div>
          </div>
        )}

        {/* Attacks (Boss) */}
        {isBoss && (data as Boss).attacks && (
          <div className="mb-6">
            <h3 className="text-norse-gold text-sm font-semibold mb-2 uppercase tracking-wider">Атаки</h3>
            <div className="space-y-1">
              {(data as Boss).attacks!.map((attack, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-norse-muted">
                  <span className="text-red-400">⚔</span>
                  <span>{attack}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summoning (Boss) */}
        {isBoss && (
          <div className="mb-6">
            <h3 className="text-norse-gold text-sm font-semibold mb-2 uppercase tracking-wider">Призыв</h3>
            <p className="text-norse-muted text-sm">{(data as Boss).summoning}</p>
          </div>
        )}

        {/* Strategy (Boss) */}
        {isBoss && (
          <div className="mb-6">
            <h3 className="text-norse-gold text-sm font-semibold mb-2 uppercase tracking-wider">Стратегия</h3>
            <p className="text-norse-muted text-sm leading-relaxed">{(data as Boss).strategy}</p>
          </div>
        )}

        {/* Tips (Boss) */}
        {isBoss && (data as Boss).tips && (
          <div className="mb-6">
            <h3 className="text-norse-gold text-sm font-semibold mb-2 uppercase tracking-wider">Советы</h3>
            <div className="space-y-1">
              {(data as Boss).tips!.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-norse-muted">
                  <span className="text-norse-gold mt-0.5">✓</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Power (Boss) */}
        {isBoss && (data as Boss).power && (
          <div className="mb-6">
            <h3 className="text-norse-gold text-sm font-semibold mb-2 uppercase tracking-wider">Сила Павшего</h3>
            <p className="text-norse-muted text-sm">{(data as Boss).power}</p>
          </div>
        )}

        {/* Drops (Boss/Monster) */}
        {(isBoss || isMonster) && (
          <div className="mb-6">
            <h3 className="text-norse-gold text-sm font-semibold mb-2 uppercase tracking-wider">Добыча</h3>
            <div className="flex flex-wrap gap-2">
              {(data as Boss | Monster).drops.map((drop, i) => (
                <span key={i} className="text-xs bg-norse-gold/10 text-norse-gold px-3 py-1 rounded border border-norse-gold/20">
                  {drop}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Guide Content */}
        {isGuide && (
          <div className="mb-6">
            <h3 className="text-norse-gold text-sm font-semibold mb-2 uppercase tracking-wider">Содержание</h3>
            <p className="text-norse-muted text-sm leading-relaxed">{(data as Guide).excerpt}</p>
            <div className="mt-4 p-4 glass rounded">
              <p className="text-norse-text text-sm">
                Полный текст гайда будет доступен после подключения CMS (Sanity/Strapi).
                Сейчас это превью из базы данных Valheim Fandom.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-norse-gold/10 pt-4 mt-6">
          <p className="text-norse-muted/50 text-xs text-center">
            Информация из Valheim Fandom • Данные могут отличаться на сервере
          </p>
        </div>
      </div>
    </div>
  );
}
