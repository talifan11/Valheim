import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ThreadCard } from '../components/forum/ThreadCard';
import { ForumSidebar } from '../components/forum/ForumSidebar';
import { threads, categories, subCategories } from '../data/forumData';

type FilterType = 'all' | 'new' | 'popular' | 'resolved' | 'mine';

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const category = categories.find(c => c.slug === categorySlug);
  const categorySubCategories = subCategories.filter(s => s.categoryId === category?.id);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-norse-text mb-2">Категория не найдена</h1>
          <p className="text-norse-muted">Проверьте правильность адреса</p>
        </div>
      </div>
    );
  }

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Все' },
    { id: 'new', label: 'Новые' },
    { id: 'popular', label: 'Популярные' },
    { id: 'resolved', label: 'Решённые' },
    { id: 'mine', label: 'Мои' },
  ];

  // Фильтрация тем по категории
  const categoryThreads = threads.filter(t => t.categoryId === category.id);

  // Дополнительная фильтрация
  const filteredThreads = categoryThreads.filter(thread => {
    switch (activeFilter) {
      case 'new':
        return thread.createdAt.includes('час') || thread.createdAt.includes('минут');
      case 'popular':
        return thread.viewsCount > 500;
      case 'resolved':
        return thread.isResolved;
      case 'mine':
        return false;
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

      {/* Заголовок категории */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl text-amber-400">{category.rune}</span>
          <h1 className="font-[Cormorant] text-3xl md:text-4xl font-bold text-norse-gold">
            {category.title}
          </h1>
        </div>
        <p className="text-norse-muted">{category.description}</p>
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
            placeholder={`Поиск в ${category.title}...`}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-amber-900/30 rounded-lg text-norse-text placeholder-norse-muted/50 focus:border-amber-500/50 focus:outline-none transition-colors"
          />
        </div>

        {/* Кнопка создания темы */}
        <button className="btn-viking btn-viking-primary flex items-center gap-2 justify-center">
          <Plus size={18} />
          <span>Создать тему</span>
        </button>
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

      {/* Подкатегории */}
      {categorySubCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-3">
            Подкатегории
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categorySubCategories.map(subCat => (
              <div
                key={subCat.id}
                className="p-3 rounded-lg bg-black/30 border border-amber-900/20 hover:border-amber-600/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg text-amber-400">{subCat.rune}</span>
                  <span className="text-sm font-semibold text-norse-text">{subCat.title}</span>
                </div>
                <p className="text-xs text-norse-muted">{subCat.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Основной контент */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Лента тем */}
        <div className="space-y-3">
          {sortedThreads.length > 0 ? (
            sortedThreads.map(thread => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                categorySlug={category.slug}
              />
            ))
          ) : (
            <div className="text-center py-12 text-norse-muted">
              <p className="text-lg mb-2">Пока нет тем в этой категории</p>
              <p className="text-sm">Создайте первую тему!</p>
            </div>
          )}

          {/* Загрузить ещё */}
          {sortedThreads.length > 0 && (
            <button className="w-full py-3 text-sm text-norse-muted hover:text-amber-400 transition-colors">
              Загрузить ещё
            </button>
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
