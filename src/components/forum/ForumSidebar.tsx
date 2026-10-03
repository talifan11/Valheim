import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories, topAuthors, forumStats } from '../../data/forumData';
import { RankBadge } from './RankBadge';

export function ForumSidebar() {
  return (
    <aside className="space-y-6">
      {/* Топ авторов */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-4 rounded-lg bg-black/30 border border-amber-900/20"
      >
        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-3">
          Топ авторов
        </h3>
        <div className="space-y-2">
          {topAuthors.map((author, index) => (
            <div key={author.id} className="flex items-center gap-2">
              <span className="text-xs text-norse-muted w-4">{index + 1}.</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-norse-text font-medium truncate">
                  @{author.username}
                </div>
              </div>
              <RankBadge rank={author.rank} size="sm" />
              <span className="text-xs text-amber-400 font-semibold">
                {author.reputation}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Discord виджет */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 rounded-lg bg-[#5865F2]/10 border border-[#5865F2]/30"
      >
        <h3 className="text-sm font-semibold text-[#5865F2] uppercase tracking-wide mb-2">
          Discord
        </h3>
        <p className="text-xs text-norse-muted mb-3">
          Быстрое общение с игроками
        </p>
        <a
          href="https://discord.gg/valheim"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2 px-4 bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-semibold rounded transition-colors"
        >
          Присоединиться
        </a>
      </motion.div>

      {/* Статистика */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 rounded-lg bg-black/30 border border-amber-900/20"
      >
        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-3">
          Статистика
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-norse-muted">Тем:</span>
            <span className="text-norse-text font-semibold">{forumStats.totalThreads}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-norse-muted">Постов:</span>
            <span className="text-norse-text font-semibold">{forumStats.totalPosts}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-norse-muted">Игроков:</span>
            <span className="text-norse-text font-semibold">{forumStats.activeUsers}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-norse-muted">Онлайн:</span>
            <span className="text-green-400 font-semibold">{forumStats.dau}</span>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}

export function ForumCategoriesSidebar() {
  const blocks = {
    vesti: categories.filter(c => c.block === 'vesti'),
    game: categories.filter(c => c.block === 'game'),
    community: categories.filter(c => c.block === 'community'),
  };

  return (
    <aside className="space-y-6">
      {Object.entries(blocks).map(([blockKey, blockCategories]) => (
        <motion.div
          key={blockKey}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 rounded-lg bg-black/30 border border-amber-900/20"
        >
          <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-3">
            {blockKey === 'vesti' ? 'Вести' : blockKey === 'game' ? 'Игра' : 'Сообщество'}
          </h3>
          <div className="space-y-1">
            {blockCategories.map(category => (
              <Link
                key={category.id}
                to={`/ting/${category.slug}`}
                className="flex items-center gap-2 p-2 rounded hover:bg-amber-900/10 transition-colors group"
              >
                <span className="text-lg text-amber-400 group-hover:text-amber-300">
                  {category.rune}
                </span>
                <span className="flex-1 text-sm text-norse-text group-hover:text-amber-400 transition-colors">
                  {category.title}
                </span>
                {category.threadsCount24h > 0 && (
                  <span className="text-xs bg-amber-600/20 text-amber-400 px-1.5 py-0.5 rounded font-semibold">
                    {category.threadsCount24h}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      ))}
    </aside>
  );
}
