import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'reply' | 'useful' | 'mention' | 'task';
  message: string;
  createdAt: string;
  read: boolean;
}

// Моковые уведомления
const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'reply',
    message: '@bjorn ответил в вашей теме «Гайд: Эйктюрнир»',
    createdAt: '2 мин назад',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'useful',
    message: '@hildir поставил «Полезно» вашему посту',
    createdAt: '15 мин назад',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'mention',
    message: '@ragnar упомянул вас в теме «Поход на Модера»',
    createdAt: '1 час назад',
    read: false,
  },
  {
    id: 'notif-4',
    type: 'task',
    message: 'Новое ежедневное задание: «Ответь на вопрос новичка»',
    createdAt: '3 часа назад',
    read: true,
  },
];

export function NotificationsBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Закрытие при клике вне dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Закрытие по Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const typeIcons = {
    reply: 'ᚱ',
    useful: 'ᛋ',
    mention: 'ᚨ',
    task: 'ᛏ',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Колокольчик */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-white/5 transition-colors"
        aria-label={`Уведомления: ${unreadCount} непрочитанных`}
        aria-expanded={isOpen}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-norse-muted hover:text-amber-400 transition-colors">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        
        {/* Счётчик непрочитанных */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 text-black text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 rounded-lg bg-[#141A24] border border-amber-900/30 shadow-2xl overflow-hidden"
            role="menu"
            aria-labelledby="notifications-label"
          >
            {/* Заголовок */}
            <div className="flex items-center justify-between p-3 border-b border-amber-900/20">
              <h3 id="notifications-label" className="text-sm font-semibold text-norse-text">
                Уведомления
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Прочитать все
                </button>
              )}
            </div>

            {/* Список уведомлений */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 border-b border-amber-900/10 hover:bg-white/5 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-amber-900/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-amber-400 text-lg mt-0.5">
                        {typeIcons[notification.type]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-norse-text leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-xs text-norse-muted mt-1">
                          {notification.createdAt}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2" />
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="p-6 text-center text-norse-muted text-sm">
                  Нет уведомлений
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
