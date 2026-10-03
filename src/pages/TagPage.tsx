import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ThreadCard } from '../components/forum/ThreadCard';
import { ForumSidebar } from '../components/forum/ForumSidebar';
import { threads, categories } from '../data/forumData';

export function TagPage() {
  const { tagName } = useParams<{ tagName: string }>();

  // Фильтруем темы по тегу
  const taggedThreads = threads.filter(thread => 
    thread.tags.some(tag => tag.toLowerCase() === tagName?.toLowerCase())
  );

  if (!tagName) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-norse-text mb-2">Тег не найден</h1>
          <p className="text-norse-muted">Проверьте правильность адреса</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs />

      {/* Заголовок */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <Link
            to="/ting"
            className="p-2 rounded-lg hover:bg-amber-900/20 transition-colors"
            aria-label="Вернуться в Тинг"
          >
            <ArrowLeft size={20} className="text-norse-muted" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-3xl text-amber-400">#</span>
            <h1 className="font-[Cormorant] text-3xl md:text-4xl font-bold text-norse-gold">
              {tagName}
            </h1>
          </div>
        </div>
        <p className="text-norse-muted">
          Темы с тегом «{tagName}» — найдено {taggedThreads.length}
        </p>
      </motion.div>

      {/* Основной контент */}
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Лента тем */}
        <div className="space-y-3">
          {taggedThreads.length > 0 ? (
            taggedThreads.map(thread => {
              const category = categories.find(c => c.id === thread.categoryId);
              return (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  categorySlug={category?.slug || 'ting'}
                />
              );
            })
          ) : (
            <div className="text-center py-12 text-norse-muted">
              <p className="text-lg mb-2">Нет тем с этим тегом</p>
              <p className="text-sm">
                <Link to="/ting" className="text-amber-400 hover:underline">
                  Вернуться в Тинг
                </Link>
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
