import React from 'react';
import { motion } from 'framer-motion';
import { Post, forumUsers } from '../../data/forumData';
import { RankBadge } from './RankBadge';
import { AuthorCard } from '../social/AuthorCard';
import { ReactionBar } from '../social/ReactionBar';

interface PostCardProps {
  post: Post;
  index: number;
  isThreadAuthor?: boolean;
}

export function PostCard({ post, index, isThreadAuthor }: PostCardProps) {
  const user = forumUsers.find(u => u.id === post.authorId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative rounded-lg border ${
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

      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Карточка автора (desktop) */}
        {user && (
          <div className="hidden md:block w-[200px] shrink-0">
            <AuthorCard user={user} />
          </div>
        )}

        {/* Контент поста */}
        <div className="flex-1 min-w-0">
          {/* Мобильная карточка автора */}
          {user && (
            <div className="flex items-center gap-3 mb-3 md:hidden">
              <AuthorCard user={user} />
              <div className="flex-1">
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
          )}

          {/* Десктоп метаданные */}
          <div className="hidden md:flex items-center gap-2 mb-3 text-xs text-norse-muted">
            <span className="text-norse-muted">{post.createdAt}</span>
            <span>·</span>
            <span>#{index + 1}</span>
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
          <div className="text-norse-text leading-[1.7] whitespace-pre-line mb-4">
            {post.body}
          </div>

          {/* Реакции */}
          <ReactionBar
            postId={post.id}
            usefulCount={post.usefulCount}
            agreedCount={post.agreedCount}
          />

          {/* Подпись автора */}
          {user?.signature && (
            <div className="mt-4 pt-3 border-t border-amber-900/10">
              <p className="text-xs text-norse-muted italic whitespace-pre-line">
                {user.signature}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
