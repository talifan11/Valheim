import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, MessageCircle, ThumbsUp } from 'lucide-react';
import { Thread } from '../../data/forumData';
import { RankBadge } from './RankBadge';

interface ThreadCardProps {
  thread: Thread;
  categorySlug: string;
}

export function ThreadCard({ thread, categorySlug }: ThreadCardProps) {
  // Определяем статусные руны
  const statusRunes = [];
  if (thread.isPinned) statusRunes.push({ rune: 'ᚱ', color: 'text-amber-400', label: 'Закреплено' });
  if (thread.isLocked) statusRunes.push({ rune: 'ᛚ', color: 'text-gray-400', label: 'Закрыто' });
  if (thread.isResolved) statusRunes.push({ rune: 'ᛋ', color: 'text-green-400', label: 'Решено' });
  if (thread.isHot) statusRunes.push({ rune: 'ᚦ', color: 'text-orange-400', label: 'Горячее' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-4 rounded-lg border transition-all ${
        thread.isPinned
          ? 'bg-amber-900/10 border-amber-600/30 hover:border-amber-500/50'
          : 'bg-black/30 border-amber-900/20 hover:border-amber-600/40'
      }`}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Янтарная полоса для закреплённых */}
      {thread.isPinned && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-l-lg" />
      )}

      <div className="flex items-start gap-3">
        {/* Аватар */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600/20 to-amber-900/20 border border-amber-600/30 flex items-center justify-center shrink-0">
          <span className="text-amber-400 text-sm font-bold">
            {thread.authorName.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Контент */}
        <div className="flex-1 min-w-0">
          {/* Заголовок + статусы */}
          <div className="flex items-start gap-2 mb-1">
            <Link
              to={`/ting/${categorySlug}/${thread.id}`}
              className="text-lg font-semibold text-norse-text hover:text-amber-400 transition-colors line-clamp-1"
            >
              {thread.title}
            </Link>
            
            {/* Статусные руны */}
            {statusRunes.length > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                {statusRunes.map((status, i) => (
                  <span
                    key={i}
                    className={`text-lg ${status.color}`}
                    title={status.label}
                    aria-label={status.label}
                  >
                    {status.rune}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Метаданные */}
          <div className="flex items-center gap-2 text-xs text-norse-muted mb-2 flex-wrap">
            <span className="font-medium text-norse-text">@{thread.authorName}</span>
            <RankBadge rank={thread.authorRank} size="sm" />
            <span>·</span>
            <span>{thread.createdAt}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MessageCircle size={12} />
              {thread.repliesCount}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {thread.viewsCount}
            </span>
          </div>

          {/* Превью */}
          <p className="text-sm text-norse-muted line-clamp-2 mb-2">
            {thread.excerpt}
          </p>

          {/* Теги */}
          {thread.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {thread.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-0.5 bg-amber-600/10 text-amber-400 rounded border border-amber-600/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Полезно */}
        {thread.usefulCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-green-400 shrink-0">
            <ThumbsUp size={14} />
            <span className="font-semibold">{thread.usefulCount}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
