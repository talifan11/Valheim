import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PostCard } from '../components/forum/PostCard';
import { ForumSidebar } from '../components/forum/ForumSidebar';
import { threads, posts, categories, Post } from '../data/forumData';
import { RankBadge } from '../components/forum/RankBadge';
import { ReadersNow } from '../components/social/ReadersNow';
import { FollowButton } from '../components/social/FollowButton';

export function ThreadPage() {
  const { threadId } = useParams<{ threadId: string }>();
  const [replyText, setReplyText] = useState('');
  const [localPosts, setLocalPosts] = useState<Post[]>([]);

  const thread = threads.find(t => t.id === threadId);
  const category = thread ? categories.find(c => c.id === thread.categoryId) : null;
  const threadPosts = [...posts.filter(p => p.threadId === threadId), ...localPosts];

  if (!thread || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-norse-text mb-2">Тема не найдена</h1>
          <p className="text-norse-muted">Проверьте правильность адреса</p>
        </div>
      </div>
    );
  }

  // Статусные руны
  const statusRunes = [];
  if (thread.isPinned) statusRunes.push({ rune: 'ᚱ', color: 'text-amber-400', label: 'Закреплено' });
  if (thread.isLocked) statusRunes.push({ rune: 'ᛚ', color: 'text-gray-400', label: 'Закрыто' });
  if (thread.isResolved) statusRunes.push({ rune: 'ᛋ', color: 'text-green-400', label: 'Решено' });

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.trim()) {
      // В реальности отправка на сервер
      console.log('Отправка ответа:', replyText);
      
      // Добавляем новый пост локально для демонстрации
      const newPost: Post = {
        id: `post-${Date.now()}`,
        threadId: threadId!,
        authorId: 'current-user',
        authorName: 'Вы',
        authorRank: 'viking',
        body: replyText,
        usefulCount: 0,
        agreedCount: 0,
        isAccepted: false,
        createdAt: 'только что',
      };
      
      setLocalPosts(prev => [...prev, newPost]);
      setReplyText('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />

      {/* Заголовок темы */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-start gap-3 mb-2">
          <h1 className="font-[Cormorant] text-2xl md:text-3xl font-bold text-norse-gold flex-1">
            {thread.title}
          </h1>
          
          {/* Статусные руны */}
          {statusRunes.length > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              {statusRunes.map((status, i) => (
                <span
                  key={i}
                  className={`text-2xl ${status.color}`}
                  title={status.label}
                  aria-label={status.label}
                >
                  {status.rune}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Метаданные + FollowButton */}
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <div className="flex items-center gap-2 text-sm text-norse-muted flex-wrap">
            <span className="font-medium text-norse-text">@{thread.authorName}</span>
            <RankBadge rank={thread.authorRank} size="sm" />
            <span>·</span>
            <span>{thread.createdAt}</span>
            <span>·</span>
            <span>{thread.repliesCount} ответов</span>
            <span>·</span>
            <span>{thread.viewsCount} просмотров</span>
          </div>
          
          {/* Кнопка "Следить" */}
          <FollowButton
            threadId={thread.id}
            initialFollowersCount={thread.followersCount}
          />
        </div>

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
      </motion.div>

      {/* Сейчас читают */}
      {thread.readersNow && thread.readersNow.length > 0 && (
        <ReadersNow readers={thread.readersNow} />
      )}

      {/* Основной контент */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Посты */}
        <div className="space-y-4">
          {threadPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              isThreadAuthor={post.authorId === thread.authorId}
            />
          ))}

          {/* Поле ответа */}
          {!thread.isLocked && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmitReply}
              className="p-4 rounded-lg bg-black/30 border border-amber-900/20"
            >
              <label htmlFor="reply" className="block text-sm font-semibold text-norse-text mb-2">
                Ответить в теме
              </label>
              <textarea
                id="reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Напишите свой ответ..."
                rows={4}
                className="w-full p-3 bg-black/40 border border-amber-900/30 rounded-lg text-norse-text placeholder-norse-muted/50 focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
              />
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-norse-muted">
                  Поддерживается Markdown
                </p>
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="btn-viking btn-viking-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  <span>Ответить</span>
                </button>
              </div>
            </motion.form>
          )}

          {thread.isLocked && (
            <div className="p-4 rounded-lg bg-gray-900/30 border border-gray-700/30 text-center">
              <p className="text-norse-muted">
                <span className="text-lg text-gray-400">ᛚ</span> Тема закрыта для новых ответов
              </p>
            </div>
          )}
        </div>

        {/* Правый сайдбар */}
        <div className="hidden lg:block">
          <ForumSidebar />
        </div>
      </div>
    </div>
  );
}
