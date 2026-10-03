import React from 'react';
import { Link } from 'react-router-dom';
import { AvatarWithFrame } from './AvatarWithFrame';
import { PresenceDot } from './PresenceDot';
import { RankBadge } from '../forum/RankBadge';
import { ForumUser } from '../../data/forumData';

interface AuthorCardProps {
  user: ForumUser;
}

export function AuthorCard({ user }: AuthorCardProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-black/20 rounded-lg border border-amber-900/20">
      {/* Аватар с рамкой */}
      <Link to={`/profile/${user.username}`} className="mb-2">
        <AvatarWithFrame
          username={user.username}
          rank={user.rank}
          size="md"
        />
      </Link>

      {/* Ник */}
      <Link
        to={`/profile/${user.username}`}
        className="text-sm font-semibold text-norse-text hover:text-amber-400 transition-colors mb-1"
      >
        @{user.username}
      </Link>

      {/* Ранг и статус */}
      <div className="flex items-center gap-2 mb-2">
        <RankBadge rank={user.rank} size="sm" />
        <PresenceDot status={user.status} size="sm" />
      </div>

      {/* Статистика */}
      <div className="w-full space-y-1 text-xs">
        <div className="flex justify-between">
          <span className="text-norse-muted">Репутация</span>
          <span className="text-amber-400 font-semibold">{user.reputation}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-norse-muted">Постов</span>
          <span className="text-norse-text">{user.stats.postsCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-norse-muted">С нами с</span>
          <span className="text-norse-text">{new Date(user.joinedAt).toLocaleDateString('ru-RU', { month: 'short', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
