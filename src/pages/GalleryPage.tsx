import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ScreenshotCard } from '../components/gallery/ScreenshotCard';
import { ScreenshotModal } from '../components/gallery/ScreenshotModal';
import { screenshots, screenshotCategories, Screenshot } from '../data/galleryData';

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedScreenshot, setSelectedScreenshot] = useState<Screenshot | null>(null);

  // Фильтрация скриншотов по категории
  const filteredScreenshots = activeCategory === 'all'
    ? screenshots
    : screenshots.filter(s => s.category === activeCategory);

  // Подсчёт количества скриншотов в каждой категории
  const categoriesWithCounts = screenshotCategories.map(cat => ({
    ...cat,
    count: cat.id === 'all' 
      ? screenshots.length 
      : screenshots.filter(s => s.category === cat.id).length,
  }));

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
          Галерея
        </h1>
        <p className="text-norse-muted">
          Скриншоты из мира Вальхейма. Делись своими достижениями, вдохновляйся работами других воинов.
        </p>
      </motion.div>

      {/* Фильтры по категориям */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-6 overflow-x-auto pb-2"
      >
        {categoriesWithCounts.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === category.id
                ? 'bg-amber-600/20 text-amber-400 border border-amber-600/30'
                : 'text-norse-muted hover:text-norse-text hover:bg-white/5 border border-transparent'
            }`}
          >
            <span className="text-lg">{category.rune}</span>
            <span>{category.title}</span>
            <span className="text-xs px-1.5 py-0.5 bg-black/30 rounded">
              {category.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Описание активной категории */}
      {activeCategory !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-lg bg-black/30 border border-amber-900/20"
        >
          <p className="text-sm text-norse-muted">
            {categoriesWithCounts.find(c => c.id === activeCategory)?.description}
          </p>
        </motion.div>
      )}

      {/* Сетка скриншотов */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredScreenshots.map(screenshot => (
          <ScreenshotCard
            key={screenshot.id}
            screenshot={screenshot}
            onClick={() => setSelectedScreenshot(screenshot)}
          />
        ))}
      </motion.div>

      {/* Пустое состояние */}
      {filteredScreenshots.length === 0 && (
        <div className="text-center py-12 text-norse-muted">
          <p className="text-lg mb-2">Нет скриншотов в этой категории</p>
          <p className="text-sm">Будь первым, кто поделится своим скриншотом!</p>
        </div>
      )}

      {/* Модальное окно */}
      <ScreenshotModal
        screenshot={selectedScreenshot}
        onClose={() => setSelectedScreenshot(null)}
      />
    </div>
  );
}
