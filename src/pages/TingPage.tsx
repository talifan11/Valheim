import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ThreadCard } from '../components/forum/ThreadCard';
import { ForumSidebar, ForumCategoriesSidebar } from '../components/forum/ForumSidebar';
import { threads, categories } from '../data/forumData';
import { ActivityFeed } from '../components/social/ActivityFeed';
import { ThreadListSkeleton } from '../components/ui/Skeleton';

type FilterType = 'all' | 'new' | 'popular' | 'unanswered' | 'mine';

export function TingPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isLoading] = useState(false); // Для демонстрации скелетонов

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Все' },
    { id: 'new', label: 'Новые' },
    { id: 'popular', label: 'Популярные' },
    { id: 'unanswered', label: 'Без ответа' },
    { id: 'mine', label: 'Мои темы' },
  ];

  // Фильтрация тем
  const filteredThreads = threads.filter(thread => {
    switch (activeFilter) {
      case 'new':
        return thread.createdAt.includes('час') || thread.createdAt.includes('минут');
      case 'popular':
        return thread.viewsCount > 500;
      case 'unanswered':
        return thread.repliesCount === 0;
      case 'mine':
        return false; // В реальности фильтровать по текущему пользователю
      default:
        return true;
    }
  });

  // Сортировка: закреплённые сверху
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />

      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-[Cormorant] text-4xl md:text-5xl font-bold text-norse-gold mb-2">
          Тинг
        </h1>
        <p className="text-norse-muted">
          Народное собрание Вальхейма. Обсуждай, делись опытом, находи союзников.
        </p>
      </motion.div>

      {/* Панель действий */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6"
      >
        {/* Поиск */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-norse-muted" size={18} />
          <input
            type="text"
            placeholder="Поиск по Тингу..."
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-amber-900/30 rounded-lg text-norse-text placeholder-norse-muted/50 focus:border-amber-500/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Кнопка создания темы — усиленная */}
        <motion.button
          onClick={() => navigate('/ting/new')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 
            text-black font-bold rounded-lg hover:from-amber-500 hover:to-amber-400 
            transition-all shadow-lg hover:shadow-amber-500/50"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-xl font-serif">ᛏ</span>
          <span>Создать тему</span>
        </motion.button>
      </motion.div>

      {/* Фильтры */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2 mb-6 overflow-x-auto pb-2"
      >
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              activeFilter === filter.id
                ? 'bg-amber-600/20 text-amber-400 border border-amber-600/30'
                : 'text-norse-muted hover:text-norse-text hover:bg-white/5 border border-transparent'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Основной контент */}
      <div className="grid lg:grid-cols-[240px_1fr_280px] gap-6">
        {/* Левый сайдбар - категории */}
        <div className="hidden lg:block">
          <ForumCategoriesSidebar />
        </div>

        {/* Лента тем */}
        <div className="space-y-3">
          {isLoading ? (
            <ThreadListSkeleton count={5} />
          ) : sortedThreads.length > 0 ? (
            <>
              {sortedThreads.map(thread => {
                const category = categories.find(c => c.id === thread.categoryId);
                return (
                  <ThreadCard
                    key={thread.id}
                    thread={thread}
                    categorySlug={category?.slug || 'ting'}
                  />
                );
              })}

              {/* Загрузить ещё */}
              <button className="w-full py-3 text-sm text-norse-muted hover:text-amber-400 transition-colors">
                Загрузить ещё
              </button>
            </>
          ) : (
            <div className="text-center py-12 text-norse-muted">
              <p className="text-lg mb-2">Нет тем для отображения</p>
              <p className="text-sm">Попробуйте изменить фильтры или создайте первую тему</p>
            </div>
          )}
        </div>

        {/* Правый сайдбар */}
        <div className="hidden lg:block space-y-6">
          <ForumSidebar />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
