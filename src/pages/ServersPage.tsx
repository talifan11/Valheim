import React from 'react';
import { useServerStatus } from '../hooks/useServerStatus';

export function ServersPage() {
  const { servers, totalPlayers, onlineServers, lastUpdate } = useServerStatus();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-[Cinzel] text-3xl md:text-5xl font-bold mb-4">
          <span className="text-norse-gold">Серверы</span>
        </h1>
        <p className="text-norse-muted">
          Техническая информация в реальном времени. Обновление каждые 5 секунд.
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-dark rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-500">{totalPlayers}</div>
          <div className="text-xs text-norse-muted">Игроков онлайн</div>
        </div>
        <div className="glass-dark rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-norse-gold">{onlineServers}/{servers.length}</div>
          <div className="text-xs text-norse-muted">Серверов активно</div>
        </div>
        <div className="glass-dark rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-norse-text">19.8</div>
          <div className="text-xs text-norse-muted">Средний TPS</div>
        </div>
        <div className="glass-dark rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-norse-text">28ms</div>
          <div className="text-xs text-norse-muted">Средний пинг</div>
        </div>
      </div>

      {/* Server List */}
      <div className="space-y-4">
        {servers.map((server, i) => (
          <div key={i} className="glass-dark rounded-lg p-6 card-corner">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-3 h-3 rounded-full ${
                    server.status === 'online' ? 'bg-green-500 animate-pulse' :
                    server.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <h3 className="font-[Cinzel] text-lg font-bold text-norse-text">{server.name}</h3>
                </div>
                <div className="text-xs text-norse-muted">{server.world}</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Игроки</div>
                  <div className="text-lg font-bold text-norse-text">{server.players}/{server.maxPlayers}</div>
                </div>
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">TPS</div>
                  <div className={`text-lg font-bold ${server.tps >= 19 ? 'text-green-500' : server.tps >= 17 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {server.tps > 0 ? server.tps.toFixed(1) : '—'}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Пинг</div>
                  <div className={`text-lg font-bold ${server.ping <= 30 ? 'text-green-500' : server.ping <= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                    {server.ping > 0 ? `${server.ping}ms` : '—'}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Аптайм</div>
                  <div className="text-lg font-bold text-norse-text">{server.uptime}</div>
                </div>
              </div>
            </div>

            {server.status === 'online' && (
              <div className="mt-4 pt-4 border-t border-norse-gold/10 flex flex-wrap gap-4 text-xs text-norse-muted">
                <div>Погода: <span className="text-norse-text">{server.weather}</span></div>
                {server.nextRaid !== '—' && (
                  <div>Следующий рейд: <span className="text-norse-gold">{server.nextRaid}</span></div>
                )}
              </div>
            )}

            {server.status === 'maintenance' && (
              <div className="mt-4 p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                <div className="text-yellow-500 text-xs font-semibold">⚠ Техработы</div>
                <p className="text-norse-muted/70 text-xs mt-1">Сервер временно недоступен. Ориентировочное время восстановления: 2 часа.</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Technical Info */}
      <div className="mt-12 glass-dark rounded-lg p-6">
        <h2 className="font-[Cinzel] text-xl font-bold text-norse-gold mb-4">Технические Характеристики</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="text-norse-text font-semibold mb-2">Городской Сервер</h3>
            <ul className="space-y-1 text-norse-muted">
              <li>• 8 ядер / 4.5+ ГГц</li>
              <li>• 32–64 GB RAM</li>
              <li>• NVMe 1 TB</li>
              <li>• Канал 1 Гбит/с</li>
            </ul>
          </div>
          <div>
            <h3 className="text-norse-text font-semibold mb-2">Ресурсные Серверы</h3>
            <ul className="space-y-1 text-norse-muted">
              <li>• 4 ядра / 4.0+ ГГц</li>
              <li>• 8–16 GB RAM</li>
              <li>• NVMe 500 GB</li>
              <li>• Вайп раз в сутки</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-norse-muted/50">
        Последнее обновление: {lastUpdate.toLocaleTimeString('ru-RU')}
      </div>
    </div>
  );
}
