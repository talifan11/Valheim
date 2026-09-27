import React from 'react';
import { ServerStatus } from '../hooks/useServerStatus';

interface ServerModalProps {
  server: ServerStatus;
  onClose: () => void;
}

export function ServerModal({ server, onClose }: ServerModalProps) {
  // Simulated online players (in real app, this would come from API)
  const onlinePlayers = [
    'Ульф-Мэр', 'Свен-Восьмирукий', 'Хильдир-Целитель', 'Бьорн-Строитель',
    'Астра-Стрелок', 'Лейф-Торговец', 'Ингвар-Маг', 'Фрейя-Друид'
  ].slice(0, Math.min(server.players, 8));

  const recentEvents = [
    { time: '5 мин назад', event: 'Рейд на город отбит', type: 'defense' },
    { time: '12 мин назад', event: 'Открыт портал в Чёрный Лес', type: 'portal' },
    { time: '23 мин назад', event: 'Гильдия "Железный Кулак" завершила рейд', type: 'guild' },
    { time: '45 мин назад', event: 'Выбран новый Мэр', type: 'election' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div 
        className="relative glass-dark rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in card-corner"
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
        <div className="flex items-center gap-3 mb-6">
          <span className={`w-4 h-4 rounded-full ${
            server.status === 'online' ? 'bg-green-500 animate-pulse' :
            server.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <div>
            <h2 className="font-[Cinzel] text-2xl font-bold text-norse-text">{server.name}</h2>
            <p className="text-xs text-norse-muted">{server.world}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="glass rounded-lg p-3 text-center">
            <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Игроки</div>
            <div className="text-xl font-bold text-norse-text">{server.players}/{server.maxPlayers}</div>
          </div>
          <div className="glass rounded-lg p-3 text-center">
            <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">TPS</div>
            <div className={`text-xl font-bold ${server.tps >= 19 ? 'text-green-500' : server.tps >= 17 ? 'text-yellow-500' : 'text-red-500'}`}>
              {server.tps > 0 ? server.tps.toFixed(1) : '—'}
            </div>
          </div>
          <div className="glass rounded-lg p-3 text-center">
            <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Пинг</div>
            <div className={`text-xl font-bold ${server.ping <= 30 ? 'text-green-500' : server.ping <= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
              {server.ping > 0 ? `${server.ping}ms` : '—'}
            </div>
          </div>
          <div className="glass rounded-lg p-3 text-center">
            <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Аптайм</div>
            <div className="text-xl font-bold text-norse-text">{server.uptime}</div>
          </div>
        </div>

        {/* Weather & Next Raid */}
        {server.status === 'online' && (
          <div className="glass rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Погода</div>
                <div className="text-norse-text">{server.weather}</div>
              </div>
              {server.nextRaid !== '—' && (
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Следующий рейд</div>
                  <div className="text-norse-gold font-semibold">{server.nextRaid}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Online Players */}
        {server.status === 'online' && server.players > 0 && (
          <div className="mb-6">
            <h3 className="font-[Cinzel] text-sm font-bold text-norse-gold mb-3 flex items-center gap-2">
              <span className="font-serif">ᚠ</span> Игроки онлайн
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {onlinePlayers.map((player, i) => (
                <div key={i} className="glass rounded px-3 py-2 text-xs text-norse-text flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  {player}
                </div>
              ))}
              {server.players > 8 && (
                <div className="glass rounded px-3 py-2 text-xs text-norse-muted text-center">
                  +{server.players - 8} ещё
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Events */}
        {server.status === 'online' && (
          <div className="mb-6">
            <h3 className="font-[Cinzel] text-sm font-bold text-norse-gold mb-3 flex items-center gap-2">
              <span className="font-serif">ᛏ</span> Последние события
            </h3>
            <div className="space-y-2">
              {recentEvents.map((event, i) => (
                <div key={i} className="glass rounded px-3 py-2 flex items-start gap-3">
                  <div className="text-[10px] text-norse-muted whitespace-nowrap pt-0.5">{event.time}</div>
                  <div className="text-xs text-norse-text">{event.event}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discord Link */}
        <div className="glass rounded-lg p-4 border border-[#5865F2]/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-norse-text mb-1">Присоединяйся к обсуждению</div>
              <div className="text-xs text-norse-muted">Discord-канал этого сервера</div>
            </div>
            <a 
              href="https://discord.gg/valheim" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-viking btn-viking-secondary !py-2 !px-4 !text-xs"
            >
              Discord
            </a>
          </div>
        </div>

        {/* Maintenance Notice */}
        {server.status === 'maintenance' && (
          <div className="mt-4 p-4 rounded bg-yellow-500/10 border border-yellow-500/20">
            <div className="text-yellow-500 text-sm font-semibold mb-1">⚠ Техработы</div>
            <p className="text-norse-muted/70 text-xs">
              Сервер временно недоступен. Ориентировочное время восстановления: 2 часа.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
