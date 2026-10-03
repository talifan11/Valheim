import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useServerStatus } from '../hooks/useServerStatus';
import { ServerModal } from '../components/ServerModal';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function ServersPage() {
  const { servers, totalPlayers, onlineServers, lastUpdate } = useServerStatus();
  const [selectedServer, setSelectedServer] = useState<any>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  useFocusTrap(modalRef, !!selectedServer);
  
  // Обработка Escape для закрытия модалки
  useEffect(() => {
    if (!selectedServer || !modalRef.current) return;
    
    const handleClose = () => setSelectedServer(null);
    modalRef.current.addEventListener('modal-close', handleClose);
    return () => {
      modalRef.current?.removeEventListener('modal-close', handleClose);
    };
  }, [selectedServer]);

  const getTpsColor = (tps: number): 'green' | 'yellow' | 'red' => {
    if (tps >= 19.5) return 'green';
    if (tps >= 18) return 'yellow';
    return 'red';
  };

  const getPingColor = (ping: number): 'green' | 'yellow' | 'red' => {
    if (ping <= 30) return 'green';
    if (ping <= 50) return 'yellow';
    return 'red';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Breadcrumbs />
      
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-[Cinzel] text-3xl md:text-5xl font-bold mb-4">
          <span className="text-norse-gold">Серверы</span>
        </h1>
        <p className="text-norse-muted">
          Техническая информация в реальном времени. Обновление каждые 5 секунд.
        </p>
      </motion.div>

      {/* Global Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="glass-dark rounded-lg p-4 text-center card-corner"
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(74, 222, 128, 0.3)' }}
        >
          <div className="text-2xl font-bold text-green-400">{totalPlayers}</div>
          <div className="text-xs text-norse-muted">Игроков онлайн</div>
        </motion.div>
        <motion.div
          className="glass-dark rounded-lg p-4 text-center card-corner"
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}
        >
          <div className="text-2xl font-bold text-norse-gold">{onlineServers}/{servers.length}</div>
          <div className="text-xs text-norse-muted">Серверов активно</div>
        </motion.div>
        <motion.div
          className="glass-dark rounded-lg p-4 text-center card-corner"
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}
        >
          <div className="text-2xl font-bold text-norse-text">19.8</div>
          <div className="text-xs text-norse-muted">Средний TPS</div>
        </motion.div>
        <motion.div
          className="glass-dark rounded-lg p-4 text-center card-corner"
          variants={itemVariants}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' }}
        >
          <div className="text-2xl font-bold text-norse-text">28ms</div>
          <div className="text-xs text-norse-muted">Средний пинг</div>
        </motion.div>
      </motion.div>

      {/* Server List */}
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {servers.map((server, i) => (
          <motion.div
            key={i}
            className="glass-dark rounded-lg p-6 card-corner cursor-pointer hover:border-norse-gold/30 transition-all"
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => setSelectedServer(server)}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-3 h-3 rounded-full ${
                    server.status === 'online' ? 'bg-green-500 animate-pulse' :
                    server.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <h3 className="font-[Cinzel] text-lg font-bold text-norse-text">{server.name}</h3>
                </div>
                <div className="text-xs text-norse-muted mb-3">{server.world}</div>
                
                {/* Player Progress Bar */}
                <ProgressBar
                  value={server.players}
                  max={server.maxPlayers}
                  label="Игроки"
                  color={server.players >= server.maxPlayers * 0.9 ? 'red' : server.players >= server.maxPlayers * 0.7 ? 'yellow' : 'green'}
                  size="md"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">TPS</div>
                  <div className={`text-lg font-bold ${
                    server.tps >= 19.5 ? 'text-green-400' :
                    server.tps >= 18 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {server.tps > 0 ? server.tps.toFixed(1) : '—'}
                  </div>
                  <ProgressBar
                    value={server.tps}
                    max={20}
                    showValue={false}
                    color={getTpsColor(server.tps)}
                    size="sm"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Пинг</div>
                  <div className={`text-lg font-bold ${
                    server.ping <= 30 ? 'text-green-400' :
                    server.ping <= 50 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {server.ping > 0 ? `${server.ping}ms` : '—'}
                  </div>
                  <ProgressBar
                    value={100 - server.ping}
                    max={100}
                    showValue={false}
                    color={getPingColor(server.ping)}
                    size="sm"
                  />
                </div>
                <div>
                  <div className="text-[10px] text-norse-muted uppercase tracking-wider mb-1">Аптайм</div>
                  <div className="text-lg font-bold text-norse-text">{server.uptime}</div>
                </div>
              </div>
            </div>

            {server.status === 'online' && (
              <motion.div
                className="mt-4 pt-4 border-t border-norse-gold/10 flex flex-wrap gap-4 text-xs text-norse-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div>Погода: <span className="text-norse-text">{server.weather}</span></div>
                {server.nextRaid !== '—' && (
                  <div>Следующий рейд: <span className="text-norse-gold">{server.nextRaid}</span></div>
                )}
              </motion.div>
            )}

            {server.status === 'maintenance' && (
              <motion.div
                className="mt-4 p-3 rounded bg-yellow-500/10 border border-yellow-500/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-yellow-500 text-xs font-semibold">⚠ Техработы</div>
                <p className="text-norse-muted/70 text-xs mt-1">Сервер временно недоступен. Ориентировочное время восстановления: 2 часа.</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Technical Info */}
      <motion.div
        className="mt-12 glass-dark rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
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
      </motion.div>

      <div className="mt-4 text-center text-xs text-norse-muted/50">
        Последнее обновление: {lastUpdate.toLocaleTimeString('ru-RU')}
      </div>

      {/* Server Modal */}
      {selectedServer && (
        <ServerModal 
          server={selectedServer} 
          onClose={() => setSelectedServer(null)}
          modalRef={modalRef}
        />
      )}    </div>
  );
}
