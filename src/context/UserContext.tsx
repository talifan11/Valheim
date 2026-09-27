import React, { createContext, useContext, useState, useEffect } from 'react';

export type Rank = 'newcomer' | 'viking' | 'jarl' | 'legend';

interface UserProgress {
  rank: Rank;
  xp: number;
  completedTasks: string[];
  foundRunes: string[];
  guild?: string;
  username?: string;
}

interface DailyTask {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  type: 'read' | 'interact' | 'secret' | 'social';
  rune: string;
}

const dailyTasks: DailyTask[] = [
  { id: 'read-wiki', title: 'Изучи свитки', description: 'Прочитай любой гайд в Вики', xpReward: 50, type: 'read', rune: 'ᚱ' },
  { id: 'check-server', title: 'Разведка', description: 'Проверь статус серверов', xpReward: 30, type: 'interact', rune: 'ᚠ' },
  { id: 'find-rune', title: 'Тайная руна', description: 'Найди скрытую руну на странице', xpReward: 100, type: 'secret', rune: 'ᛟ' },
  { id: 'visit-community', title: 'Зал Славы', description: 'Загляни в сообщество', xpReward: 40, type: 'social', rune: 'ᛏ' },
];

const rankThresholds: Record<Rank, number> = {
  newcomer: 0,
  viking: 200,
  jarl: 500,
  legend: 1000,
};

const rankNames: Record<Rank, string> = {
  newcomer: 'Новичок',
  viking: 'Викинг',
  jarl: 'Ярл',
  legend: 'Легенда',
};

interface UserContextType {
  progress: UserProgress;
  tasks: DailyTask[];
  completeTask: (taskId: string) => void;
  findRune: (runeId: string) => void;
  getRankName: (rank: Rank) => string;
  getNextRank: () => { rank: Rank; xpNeeded: number } | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('valheim-user');
    return saved ? JSON.parse(saved) : {
      rank: 'newcomer',
      xp: 0,
      completedTasks: [],
      foundRunes: [],
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('valheim-logged-in') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('valheim-user', JSON.stringify(progress));
  }, [progress]);

  const completeTask = (taskId: string) => {
    const task = dailyTasks.find(t => t.id === taskId);
    if (!task || progress.completedTasks.includes(taskId)) return;

    const newXp = progress.xp + task.xpReward;
    let newRank: Rank = progress.rank;
    
    if (newXp >= rankThresholds.legend) newRank = 'legend';
    else if (newXp >= rankThresholds.jarl) newRank = 'jarl';
    else if (newXp >= rankThresholds.viking) newRank = 'viking';

    setProgress(prev => ({
      ...prev,
      xp: newXp,
      rank: newRank,
      completedTasks: [...prev.completedTasks, taskId],
    }));
  };

  const findRune = (runeId: string) => {
    if (progress.foundRunes.includes(runeId)) return;
    
    const newXp = progress.xp + 75;
    let newRank: Rank = progress.rank;
    
    if (newXp >= rankThresholds.legend) newRank = 'legend';
    else if (newXp >= rankThresholds.jarl) newRank = 'jarl';
    else if (newXp >= rankThresholds.viking) newRank = 'viking';

    setProgress(prev => ({
      ...prev,
      xp: newXp,
      rank: newRank,
      foundRunes: [...prev.foundRunes, runeId],
    }));
  };

  const getRankName = (rank: Rank) => rankNames[rank];

  const getNextRank = () => {
    const ranks: Rank[] = ['newcomer', 'viking', 'jarl', 'legend'];
    const currentIndex = ranks.indexOf(progress.rank);
    if (currentIndex >= ranks.length - 1) return null;
    
    const nextRank = ranks[currentIndex + 1];
    return {
      rank: nextRank,
      xpNeeded: rankThresholds[nextRank] - progress.xp,
    };
  };

  const login = (username: string) => {
    setProgress(prev => ({ ...prev, username }));
    setIsLoggedIn(true);
    localStorage.setItem('valheim-logged-in', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('valheim-logged-in', 'false');
  };

  return (
    <UserContext.Provider value={{
      progress,
      tasks: dailyTasks,
      completeTask,
      findRune,
      getRankName,
      getNextRank,
      isLoggedIn,
      login,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}
