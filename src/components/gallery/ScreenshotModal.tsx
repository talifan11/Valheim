import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Calendar, User } from 'lucide-react';
import { Screenshot } from '../../data/galleryData';
import { RankBadge } from '../forum/RankBadge';

interface ScreenshotModalProps {
  screenshot: Screenshot | null;
  onClose: () => void;
}

export function ScreenshotModal({ screenshot, onClose }: ScreenshotModalProps) {
  if (!screenshot) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto glass-dark rounded-lg p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/50 hover:bg-black/70 transition-colors z-10"
            aria-label="Закрыть"
          >
            <X size={24} className="text-norse-text" />
          </button>

          {/* Изображение */}
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={screenshot.imageUrl}
              alt={screenshot.title}
              className="w-full h-auto"
            />
          </div>

          {/* Информация */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-norse-text mb-2">
                {screenshot.title}
              </h2>
              <p className="text-norse-muted leading-relaxed">
                {screenshot.description}
              </p>
            </div>

            {/* Метаданные */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} className="text-norse-muted" />
                <span className="text-norse-text font-semibold">@{screenshot.author}</span>
                <RankBadge rank={screenshot.authorRank} size="sm" />
              </div>
              <div className="flex items-center gap-2 text-norse-muted">
                <Heart size={16} className="text-red-400" />
                <span>{screenshot.likes} нравится</span>
              </div>
              <div className="flex items-center gap-2 text-norse-muted">
                <Calendar size={16} />
                <span>{screenshot.createdAt}</span>
              </div>
            </div>

            {/* Теги */}
            {screenshot.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {screenshot.tags.map((tag, i) => (
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
