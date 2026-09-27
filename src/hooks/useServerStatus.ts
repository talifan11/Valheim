import { useState, useEffect } from 'react';

export interface ServerStatus {
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  players: number;
  maxPlayers: number;
  tps: number;
  ping: number;
  uptime: string;
  weather: string;
  nextRaid: string;
  world: string;
}

const serverData: ServerStatus[] = [
  {
    name: 'Городской Сервер',
    status: 'online',
    players: 47,
    maxPlayers: 50,
    tps: 19.8,
    ping: 24,
    uptime: '3д 14ч',
    weather: 'Ясно',
    nextRaid: '2ч 15м',
    world: 'Хроники — Основной',
  },
  {
    name: 'Чёрный Лес',
    status: 'online',
    players: 12,
    maxPlayers: 20,
    tps: 20,
    ping: 18,
    uptime: '0д 6ч',
    weather: 'Туман',
    nextRaid: '—',
    world: 'Ресурсный — Вайп через 18ч',
  },
  {
    name: 'Горы',
    status: 'online',
    players: 8,
    maxPlayers: 20,
    tps: 19.5,
    ping: 31,
    uptime: '0д 6ч',
    weather: 'Метель',
    nextRaid: '—',
    world: 'Ресурсный — Вайп через 18ч',
  },
  {
    name: 'Болото',
    status: 'maintenance',
    players: 0,
    maxPlayers: 20,
    tps: 0,
    ping: 0,
    uptime: '—',
    weather: '—',
    nextRaid: '—',
    world: 'Техработы',
  },
  {
    name: 'Равнины',
    status: 'online',
    players: 5,
    maxPlayers: 20,
    tps: 20,
    ping: 42,
    uptime: '0д 6ч',
    weather: 'Жара',
    nextRaid: '—',
    world: 'Ресурсный — Вайп через 18ч',
  },
];

export function useServerStatus() {
  const [servers, setServers] = useState<ServerStatus[]>(serverData);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setServers(prev => prev.map(server => {
        if (server.status !== 'online') return server;
        
        const playerDelta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newPlayers = Math.max(0, Math.min(server.maxPlayers, server.players + playerDelta));
        const tpsVariation = (Math.random() - 0.5) * 0.4;
        const pingVariation = Math.floor((Math.random() - 0.5) * 6);
        
        return {
          ...server,
          players: newPlayers,
          tps: Math.max(15, Math.min(20, server.tps + tpsVariation)),
          ping: Math.max(10, server.ping + pingVariation),
        };
      }));
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalPlayers = servers.reduce((sum, s) => sum + s.players, 0);
  const onlineServers = servers.filter(s => s.status === 'online').length;

  return { servers, totalPlayers, onlineServers, lastUpdate };
}
