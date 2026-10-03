import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageSquare, Flag } from 'lucide-react';
import { Post } from '../../data/forumData';
import { RankBadge } from './RankBadge';

interface PostCardProps {
  post: Post;
  index: number;
  isThreadAuthor?: boolean;
}

export function PostCard({ post, index, isThreadAuthor }: PostCardProps) {
  const [usefulCount, setUsefulCount] = useState(post.usefulCount);
  const [isUseful, setIsUseful] = useState(false);

  const handleUseful = () => {
    if (!isUseful) {
      setUsefulCount(prev => prev + 1);
      setIsUseful(true);
    } else {
      setUsefulCount(prev => prev - 1);
      setIsUseful(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative p-4 rounded-lg border ${
        post.isAccepted
          ? 'bg-green-900/10 border-green-600/30'
          : 'bg-black/30 border-amber-900/20'
      }`}
    >
      {/* Бейдж принятого ответа */}
      {post.isAccepted && (
        <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-green-400 font-semibold">
          <span className="text-lg">ᛋ</span>
          <span>Принятый ответ</span>
        </div>
      )}

      {/* Шапка поста */}
      <div className="flex items-start gap-3 mb-3">
        {/* Аватар */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-600/20 to-amber-900/20 border border-amber-600/30 flex items-center justify-center shrink-0">
          <span className="text-amber-400 text-lg font-bold">
            {post.authorName.charAt(0).toUpperCase()}
          </span>
        </div>

        {/* Метаданные */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-norse-text">@{post.authorName}</span>
            {isThreadAuthor && (
              <span className="text-xs px-2 py-0.5 bg-amber-600/20 text-amber-400 rounded border border-amber-600/30 font-semibold">
                Автор
              </span>
            )}
            <RankBadge rank={post.authorRank} size="sm" />
            <span className="text-xs text-norse-muted">·</span>
            <span className="text-xs text-norse-muted">{post.createdAt}</span>
            <span className="text-xs text-norse-muted">·</span>
            <span className="text-xs text-norse-muted">#{index + 1}</span>
          </div>
        </div>
      </div>

      {/* Цитата */}
      {post.quotedPostBody && (
        <div className="mb-3 pl-4 border-l-2 border-amber-600/30 bg-black/20 rounded-r p-3">
          <div className="text-xs text-norse-muted mb-1">
            <span className="font-semibold text-norse-text">@{post.quotedPostAuthor}</span> писал:
          </div>
          <p className="text-sm text-norse-muted italic line-clamp-3">
            {post.quotedPostBody}
          </p>
        </div>
      )}

      {/* Тело поста */}
      <div className="text-norse-text leading-relaxed whitespace-pre-line mb-4">
        {post.body}
      </div>

      {/* Действия */}
      <div className="flex items-center gap-4 pt-3 border-t border-amber-900/20">
        <button
          onClick={handleUseful}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            isUseful
              ? 'text-green-400 font-semibold'
              : 'text-norse-muted hover:text-green-400'
          }`}
          aria-pressed={isUseful}
          aria-label={`Полезно: ${usefulCount}`}
        >
          <ThumbsUp size={16} />
          <span>Полезно ({usefulCount})</span>
        </button>

        <button
          className="flex items-center gap-1.5 text-sm text-norse-muted hover:text-amber-400 transition-colors"
          aria-label="Ответить"
        >
          <MessageSquare size={16} />
          <span>Ответить</span>
        </button>

        <button
          className="flex items-center gap-1.5 text-sm text-norse-muted hover:text-red-400 transition-colors ml-auto"
          aria-label="Пожаловаться"
        >
          <Flag size={16} />
          <span>Жалоба</span>
        </button>
      </div>
    </motion.div>
  );
}
