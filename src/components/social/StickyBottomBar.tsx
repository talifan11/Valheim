import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Bell, User } from 'lucide-react';

export function StickyBottomBar() {
  const location = useLocation();
  const isForumPage = location.pathname.startsWith('/ting') || location.pathname.startsWith('/profile');

  if (!isForumPage) return null;

  const tabs = [
    { path: '/ting', icon: Home, label: 'Главная', rune: 'ᛟ' },
    { path: '/ting/search', icon: Search, label: 'Поиск', rune: 'ᚱ' },
    { path: '/ting/new', icon: null, label: 'Тема', rune: 'ᛏ', isCenter: true },
    { path: '/notifications', icon: Bell, label: 'Уведомления', rune: 'ᛊ' },
    { path: '/profile', icon: User, label: 'Профиль', rune: 'ᚠ' },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      style={{
        background: 'linear-gradient(to top, rgba(20, 26, 36, 0.98) 0%, rgba(20, 26, 36, 0.95) 100%)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div className="flex items-center justify-around h-14 px-2">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;

          if (tab.isCenter) {
            // Центральная кнопка "Создать тему" — приподнятая
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className="relative -mt-6"
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-500 
                    flex items-center justify-center shadow-lg shadow-amber-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl font-serif text-black">{tab.rune}</span>
                </motion.div>
              </Link>
            );
          }

          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                isActive ? 'text-amber-400' : 'text-norse-muted hover:text-norse-text'
              }`}
            >
              {Icon && <Icon size={20} />}
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-amber-400 rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
