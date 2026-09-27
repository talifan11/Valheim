import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export function ProfilePage() {
  const { progress, getRankName, tasks, completeTask, isLoggedIn, login, logout } = useUser();
  const [username, setUsername] = useState('');
  const [steamId, setSteamId] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  const handleLinkAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь будет API-вызов для привязки
    setShowLinkModal(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="glass-dark rounded-lg p-8 text-center card-corner">
          <span className="text-norse-gold text-5xl font-serif mb-4 block animate-rune-glow">ᛟ</span>
          <h1 className="font-[Cinzel] text-2xl font-bold text-norse-text mb-2">Личный Кабинет</h1>
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
      </div>
    );
  }

  const currentThreshold = progress.rank === 'newcomer' ? 0 : progress.rank === 'viking' ? 200 : progress.rank === 'jarl' ? 500 : 1000;
  const nextThreshold = progress.rank === 'newcomer' ? 200 : progress.rank === 'viking' ? 500 : progress.rank === 'jarl' ? 1000 : 1000;
  const progressPercent = progress.rank === 'legend' ? 100 : ((progress.xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  const rankRewards = {
    newcomer: {
      title: 'Новичок',
      rewards: ['Доступ к общему чату', 'Базовые задания'],
      rune: 'ᚠ',
    },
    viking: {
      title: 'Викинг',
      rewards: ['Закрытый Discord-канал', 'Косметический тег в игре', 'Доступ к гильдиям'],
      rune: 'ᚱ',
    },
    jarl: {
      title: 'Ярл',
      rewards: ['Право голоса на выборах мэра', 'Приоритетный вход на сервер', 'Уникальная броня'],
      rune: 'ᛏ',
    },
    legend: {
      title: 'Легенда',
      rewards: ['Легендарный плащ', 'Статуя в городе', 'Вечная слава в Зале Героев'],
      rune: 'ᛟ',
    },
  };

  const currentRankRewards = rankRewards[progress.rank];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="font-[Cinzel] text-3xl md:text-4xl font-bold mb-2">
          <span className="text-norse-gold">Личный Кабинет</span>
        </h1>
        <p className="text-norse-muted text-sm">Твой путь воина</p>
      </div>

      {/* Profile Header */}
      <div className="glass-dark rounded-lg p-6 mb-6 card-corner">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-norse-gold/20 to-norse-gold/5 border-2 border-norse-gold/30 flex items-center justify-center">
            <span className="text-norse-gold text-5xl font-serif">{currentRankRewards.rune}</span>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-[Cinzel] text-2xl font-bold text-norse-text mb-1">
              {progress.username || 'Воин'}
            </h2>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
              <span className="text-norse-gold text-sm font-semibold">{currentRankRewards.title}</span>
              <span className="text-norse-muted text-xs">•</span>
              <span className="text-norse-muted text-xs">{progress.xp} XP</span>
            </div>
            
            {/* XP Progress Bar */}
            {progress.rank !== 'legend' && (
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-norse-muted">До следующего ранга</span>
                  <span className="text-norse-gold">{nextThreshold - progress.xp} XP</span>
                </div>
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-norse-gold/60 to-norse-gold rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, progressPercent)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowLinkModal(true)}
            className="btn-viking btn-viking-secondary !py-2 !px-4 !text-xs"
          >
            Привязать аккаунты
          </button>
        </div>
      </div>

      {/* Rank Rewards */}
      <div className="glass-dark rounded-lg p-6 mb-6 card-corner">
        <h3 className="font-[Cinzel] text-lg font-bold text-norse-gold mb-4 flex items-center gap-2">
          <span className="font-serif">{currentRankRewards.rune}</span>
          Награды ранга «{currentRankRewards.title}»
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {currentRankRewards.rewards.map((reward, i) => (
            <div key={i} className="flex items-center gap-2 glass rounded p-3">
              <span className="text-norse-gold text-sm">✓</span>
              <span className="text-norse-text text-sm">{reward}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-dark rounded-lg p-4 text-center card-corner">
          <div className="text-2xl font-bold text-norse-gold mb-1">{progress.completedTasks.length}</div>
          <div className="text-xs text-norse-muted">Заданий</div>
        </div>
        <div className="glass-dark rounded-lg p-4 text-center card-corner">
          <div className="text-2xl font-bold text-norse-gold mb-1">{progress.foundRunes.length}</div>
          <div className="text-xs text-norse-muted">Рун найдено</div>
        </div>
        <div className="glass-dark rounded-lg p-4 text-center card-corner">
          <div className="text-2xl font-bold text-norse-gold mb-1">{progress.xp}</div>
          <div className="text-xs text-norse-muted">Всего XP</div>
        </div>
        <div className="glass-dark rounded-lg p-4 text-center card-corner">
          <div className="text-2xl font-bold text-norse-gold mb-1">{progress.guild || '—'}</div>
          <div className="text-xs text-norse-muted">Гильдия</div>
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="glass-dark rounded-lg p-6 mb-6">
        <h3 className="font-[Cinzel] text-lg font-bold text-norse-gold mb-4 flex items-center gap-2">
          <span className="font-serif">ᛊ</span>
          Ежедневные Задания
        </h3>
        <div className="space-y-2">
          {tasks.map(task => {
            const isCompleted = progress.completedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-3 rounded transition-all ${
                  isCompleted ? 'opacity-50 bg-green-500/5' : 'hover:bg-norse-gold/5 cursor-pointer'
                }`}
                onClick={() => !isCompleted && completeTask(task.id)}
              >
                <div className={`w-10 h-10 rounded flex items-center justify-center text-sm font-serif shrink-0 ${
                  isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-norse-gold/10 text-norse-gold'
                }`}>
                  {isCompleted ? '✓' : task.rune}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-norse-text text-sm font-semibold truncate">{task.title}</div>
                  <div className="text-norse-muted/60 text-xs truncate">{task.description}</div>
                </div>
                <div className="text-norse-gold text-sm font-semibold shrink-0">+{task.xpReward}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Linked Accounts */}
      <div className="glass-dark rounded-lg p-6">
        <h3 className="font-[Cinzel] text-lg font-bold text-norse-gold mb-4 flex items-center gap-2">
          <span className="font-serif">ᚠ</span>
          Привязанные аккаунты
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between glass rounded p-3">
            <div className="flex items-center gap-3">
              <span className="text-[#5865F2] text-xl">🎮</span>
              <div>
                <div className="text-norse-text text-sm font-semibold">Steam</div>
                <div className="text-norse-muted/60 text-xs">{progress.steamId || 'Не привязан'}</div>
              </div>
            </div>
            <button 
              onClick={() => setShowLinkModal(true)}
              className="text-norse-gold text-xs hover:underline"
            >
              {progress.steamId ? 'Изменить' : 'Привязать'}
            </button>
          </div>
          
          <div className="flex items-center justify-between glass rounded p-3">
            <div className="flex items-center gap-3">
              <span className="text-[#5865F2] text-xl">💬</span>
              <div>
                <div className="text-norse-text text-sm font-semibold">Discord</div>
                <div className="text-norse-muted/60 text-xs">{progress.discordId || 'Не привязан'}</div>
              </div>
            </div>
            <button 
              onClick={() => setShowLinkModal(true)}
              className="text-norse-gold text-xs hover:underline"
            >
              {progress.discordId ? 'Изменить' : 'Привязать'}
            </button>
          </div>
        </div>
      </div>

      {/* Link Accounts Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowLinkModal(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div 
            className="relative glass-dark rounded-lg p-6 w-full max-w-md animate-scale-in card-corner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLinkModal(false)}
              className="absolute top-4 right-4 text-norse-gold/60 hover:text-norse-gold transition-colors text-xl"
            >
              ✕
            </button>

            <h2 className="font-[Cinzel] text-xl font-bold text-norse-gold mb-4">Привязать аккаунты</h2>
            
            <form onSubmit={handleLinkAccount} className="space-y-4">
              <div>
                <label className="text-sm text-norse-muted mb-1 block">Steam ID</label>
                <input
                  type="text"
                  value={steamId}
                  onChange={(e) => setSteamId(e.target.value)}
                  className="w-full bg-black/40 border border-norse-gold/20 rounded px-4 py-3 text-norse-text focus:border-norse-gold/60 focus:outline-none transition-colors placeholder-norse-text/30"
                  placeholder="76561198012345678"
                />
              </div>
              <div>
                <label className="text-sm text-norse-muted mb-1 block">Discord ID</label>
                <input
                  type="text"
                  value={discordId}
                  onChange={(e) => setDiscordId(e.target.value)}
                  className="w-full bg-black/40 border border-norse-gold/20 rounded px-4 py-3 text-norse-text focus:border-norse-gold/60 focus:outline-none transition-colors placeholder-norse-text/30"
                  placeholder="username#1234"
                />
              </div>
              <button type="submit" className="w-full btn-viking btn-viking-primary">
                Сохранить
              </button>
            </form>

            <p className="text-norse-muted/60 text-xs mt-4 text-center">
              В реальной версии здесь будет OAuth2 авторизация через Steam/Discord API
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
