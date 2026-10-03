import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Calendar } from 'lucide-react';
import { Screenshot } from '../../data/galleryData';
import { RankBadge } from '../forum/RankBadge';

interface ScreenshotCardProps {
  screenshot: Screenshot;
  onClick: () => void;
}

export function ScreenshotCard({ screenshot, onClick }: ScreenshotCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg border border-amber-900/20 bg-black/30">
        {/* Изображение */}
        <div className="aspect-video overflow-hidden">
          <img
            src={screenshot.imageUrl}
            alt={screenshot.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        {/* Оверлей с информацией */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-norse-text mb-1 line-clamp-1">
              {screenshot.title}
            </h3>
            <p className="text-sm text-norse-muted line-clamp-2 mb-3">
              {screenshot.description}
            </p>
            
            {/* Метаданные */}
            <div className="flex items-center gap-3 text-xs text-norse-muted">
              <span className="flex items-center gap-1">
                <Heart size={14} className="text-red-400" />
                {screenshot.likes}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {screenshot.createdAt}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Информация под карточкой */}
      <div className="mt-2 px-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-norse-text">@{screenshot.author}</span>
          <RankBadge rank={screenshot.authorRank} size="sm" />
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
  );
}
