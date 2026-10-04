import { useState, useEffect } from 'react';
import { serverData as initialServerData } from '../data/serverData';

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

// Используем единый источник данных
const serverData = initialServerData;

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
