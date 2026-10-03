import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Category } from '../../data/forumData';

interface CategoryTopAuthorsProps {
  category: Category;
}

export function CategoryTopAuthors({ category }: CategoryTopAuthorsProps) {
  // Моковые данные топ авторов
  const topAuthors = category.topAuthors || [
    { username: 'skald', reputation: 1240 },
    { username: 'bjorn', reputation: 980 },
    { username: 'ragnar', reputation: 870 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-lg bg-black/30 border border-amber-900/20"
    >
      <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-3">
        Топ авторов {category.title}
      </h3>
      <div className="space-y-2">
        {topAuthors.map((author, index) => (
          <motion.div
            key={author.username}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs text-norse-muted w-4">{index + 1}.</span>
            <Link
              to={`/profile/${author.username}`}
              className="flex-1 text-sm text-norse-text hover:text-amber-400 transition-colors font-medium"
            >
              @{author.username}
            </Link>
            <span className="text-xs text-amber-400 font-semibold">
              {author.reputation}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
