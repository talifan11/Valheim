import React from 'react';
import { motion } from 'framer-motion';
import { recentActivity } from '../../data/forumData';

const typeIcons = {
  reply: 'ᚱ',
  new_thread: 'ᚠ',
  badge: 'ᛋ',
  reaction: 'ᚨ',
};

const typeLabels = {
  reply: 'ответил в',
  new_thread: 'создал тему в',
  badge: 'получил бейдж',
  reaction: 'поставил Полезно в',
};

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-4 rounded-lg bg-black/30 border border-amber-900/20"
    >
      <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wide mb-3">
        Последние действия
      </h3>
      <div className="space-y-2">
        {recentActivity.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-2 text-xs"
          >
            <span className="text-amber-400 text-sm mt-0.5">{typeIcons[activity.type]}</span>
            <div className="flex-1 min-w-0">
              <span className="text-norse-text font-medium">@{activity.username}</span>
              <span className="text-norse-muted"> {typeLabels[activity.type]} </span>
              <span className="text-norse-text">«{activity.target}»</span>
              <div className="text-norse-muted text-[10px] mt-0.5">{activity.createdAt}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
