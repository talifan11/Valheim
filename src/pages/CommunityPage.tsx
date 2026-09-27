import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

interface Guild {
  name: string;
  members: number;
  leader: string;
  rank: string;
  rune: string;
}

interface Player {
  name: string;
  rank: string;
  guild: string;
  xp: number;
  rune: string;
}

const topPlayers: Player[] = [
  { name: 'Ульф-Мэр', rank: 'Легенда', guild: 'Железный Кулак', xp: 2450, rune: 'ᛟ' },
  { name: 'Свен-Восьмирукий', rank: 'Легенда', guild: 'Железный Кулак', xp: 2100, rune: 'ᛏ' },
  { name: 'Хильдир-Целитель', rank: 'Ярл', guild: 'Серебряная Нить', xp: 1800, rune: 'ᛒ' },
  { name: 'Бьорн-Строитель', rank: 'Ярл', guild: 'Каменный Круг', xp: 1500, rune: 'ᛒ' },
  { name: 'Астра-Стрелок', rank: 'Викинг', guild: 'Теневой Путь', xp: 980, rune: 'ᚱ' },
  { name: 'Лейф-Торговец', rank: 'Викинг', guild: 'Золотой Путь', xp: 750, rune: 'ᚠ' },
  { name: 'Ингвар-Маг', rank: 'Викинг', guild: 'Серебряная Нить', xp: 620, rune: 'ᚨ' },
  { name: 'Фрейя-Друид', rank: 'Новичок', guild: '—', xp: 340, rune: 'ᛚ' },
];

const guilds: Guild[] = [
  { name: 'Железный Кулак', members: 15, leader: 'Ульф-Мэр', rank: 'Боевая', rune: 'ᛏ' },
  { name: 'Серебряная Нить', members: 12, leader: 'Хильдир', rank: 'Ремесленная', rune: 'ᚠ' },
  { name: 'Каменный Круг', members: 10, leader: 'Бьорн', rank: 'Строительная', rune: 'ᛒ' },
  { name: 'Теневой Путь', members: 8, leader: 'Астра', rank: 'Торговая', rune: 'ᚱ' },
  { name: 'Золотой Путь', members: 7, leader: 'Лейф', rank: 'Торговая', rune: 'ᚠ' },
];

export function CommunityPage() {
  const { isLoggedIn, login, progress, getRankName, tasks, completeTask } = useUser();
  const [username, setUsername] = useState('');
  const [tab, setTab] = useState<'players' | 'guilds' | 'profile'>('players');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="font-[Cinzel] text-3xl md:text-5xl font-bold mb-4">
          <span className="text-norse-gold">Сообщество</span>
        </h1>
        <p className="text-norse-muted">
          Зал Славы. Гильдии. Достижения воинов.
        </p>
      </div>

      {/* Login Gate */}
      {!isLoggedIn ? (
        <div className="max-w-md mx-auto glass-dark rounded-lg p-8 text-center card-corner">
          <span className="text-norse-gold text-4xl font-serif mb-4 block animate-rune-glow">ᛟ</span>
          <h2 className="font-[Cinzel] text-xl font-bold text-norse-text mb-2">Войди в Зал Славы</h2>
          <p className="text-norse-muted text-sm mb-6">Представь своё имя, воин.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/40 border border-norse-gold/20 rounded px-4 py-3 text-norse-text focus:border-norse-gold/60 focus:outline-none transition-colors placeholder-norse-text/30"
              placeholder="Твоё имя..."
              required
            />
            <button type="submit" className="w-full btn-viking btn-viking-primary">
              ᛏ  Войти
            </button>
          </form>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {[
              { id: 'players', label: 'Таблица Славы', rune: 'ᛏ' },
              { id: 'guilds', label: 'Гильдии', rune: 'ᚠ' },
              { id: 'profile', label: 'Мой Профиль', rune: 'ᛟ' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded text-sm transition-all ${
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

          {/* Players Tab */}
          {tab === 'players' && (
            <div className="glass-dark rounded-lg overflow-hidden card-corner">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-norse-gold/10">
                      <th className="text-left text-[10px] text-norse-muted uppercase tracking-wider px-4 py-3">#</th>
                      <th className="text-left text-[10px] text-norse-muted uppercase tracking-wider px-4 py-3">Воин</th>
                      <th className="text-left text-[10px] text-norse-muted uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Ранг</th>
                      <th className="text-left text-[10px] text-norse-muted uppercase tracking-wider px-4 py-3 hidden md:table-cell">Гильдия</th>
                      <th className="text-right text-[10px] text-norse-muted uppercase tracking-wider px-4 py-3">XP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPlayers.map((player, i) => (
                      <tr key={i} className="border-b border-norse-gold/5 hover:bg-norse-gold/5 transition-colors">
                        <td className="px-4 py-3 text-norse-muted text-sm">{i + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-norse-gold font-serif">{player.rune}</span>
                            <span className="text-norse-text text-sm font-medium">{player.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className={`text-xs ${
                            player.rank === 'Легенда' ? 'text-norse-gold' :
                            player.rank === 'Ярл' ? 'text-purple-400' :
                            player.rank === 'Викинг' ? 'text-blue-400' : 'text-norse-muted'
                          }`}>{player.rank}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-norse-muted text-xs">{player.guild}</td>
                        <td className="px-4 py-3 text-right text-norse-gold text-sm font-semibold">{player.xp.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Guilds Tab */}
          {tab === 'guilds' && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {guilds.map((guild, i) => (
                <div key={i} className="card-hover card-wood rounded-lg p-5 card-corner">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rune-icon">
                      <span className="font-serif text-lg">{guild.rune}</span>
                    </div>
                    <div>
                      <h3 className="font-[Cinzel] font-bold text-norse-text text-sm">{guild.name}</h3>
                      <span className="text-[10px] text-norse-gold uppercase tracking-wider">{guild.rank}</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-norse-muted">
                    <div>Лидер: <span className="text-norse-text">{guild.leader}</span></div>
                    <div>Членов: <span className="text-norse-text">{guild.members}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Profile Tab */}
          {tab === 'profile' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Card */}
              <div className="glass-dark rounded-lg p-6 card-corner">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-lg bg-norse-gold/10 border border-norse-gold/20 flex items-center justify-center">
                    <span className="text-norse-gold text-3xl font-serif">{progress.rank === 'legend' ? 'ᛟ' : progress.rank === 'jarl' ? 'ᛏ' : progress.rank === 'viking' ? 'ᚱ' : 'ᚠ'}</span>
                  </div>
                  <div>
                    <h2 className="font-[Cinzel] text-xl font-bold text-norse-text">{progress.username || 'Воин'}</h2>
                    <span className="text-norse-gold text-sm">{getRankName(progress.rank)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-norse-muted">Опыт</span>
                      <span className="text-norse-gold">{progress.xp} XP</span>
                    </div>
                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-norse-gold/60 to-norse-gold rounded-full" style={{ width: `${Math.min(100, (progress.xp / 1000) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2 rounded bg-norse-gold/5">
                      <div className="text-norse-muted">Заданий</div>
                      <div className="text-norse-text font-bold">{progress.completedTasks.length}</div>
                    </div>
                    <div className="p-2 rounded bg-norse-gold/5">
                      <div className="text-norse-muted">Рун найдено</div>
                      <div className="text-norse-text font-bold">{progress.foundRunes.length}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="glass-dark rounded-lg p-6">
                <h3 className="font-[Cinzel] text-sm font-bold text-norse-gold mb-4 flex items-center gap-2">
                  <span className="font-serif">ᛊ</span> Ежедневные Задания
                </h3>
                <div className="space-y-2">
                  {tasks.map(task => {
                    const isCompleted = progress.completedTasks.includes(task.id);
                    return (
                      <div
                        key={task.id}
                        className={`flex items-center gap-3 p-2 rounded transition-all ${
                          isCompleted ? 'opacity-50' : 'hover:bg-norse-gold/5 cursor-pointer'
                        }`}
                        onClick={() => !isCompleted && completeTask(task.id)}
                      >
                        <div className={`w-7 h-7 rounded flex items-center justify-center text-xs font-serif ${
                          isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-norse-gold/10 text-norse-gold'
                        }`}>
                          {isCompleted ? '✓' : task.rune}
                        </div>
                        <div className="flex-1">
                          <div className="text-norse-text text-xs font-medium">{task.title}</div>
                          <div className="text-norse-muted/50 text-[10px]">{task.description}</div>
                        </div>
                        <div className="text-norse-gold text-[10px] font-semibold">+{task.xpReward}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
