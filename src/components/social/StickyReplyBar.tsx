import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';

interface StickyReplyBarProps {
  onSubmit: (text: string) => void;
}

export function StickyReplyBar({ onSubmit }: StickyReplyBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmit = () => {
    if (replyText.trim()) {
      onSubmit(replyText);
      setReplyText('');
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Компактная полоса внизу */}
      {!isExpanded && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-16 lg:bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div
            className="px-4 py-3 border-t border-amber-900/20"
            style={{
              background: 'linear-gradient(to top, rgba(20, 26, 36, 0.98) 0%, rgba(20, 26, 36, 0.95) 100%)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-black/40 border border-amber-900/30 
                rounded-lg text-norse-muted hover:border-amber-600/50 transition-colors"
            >
              <span className="text-sm">Написать ответ...</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Полноэкранный composer */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{
              background: 'rgba(11, 14, 20, 0.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-amber-900/20">
                <h3 className="text-lg font-bold text-norse-text">Ответить в теме</h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Закрыть"
                >
                  <X size={24} className="text-norse-muted" />
                </button>
              </div>

              {/* Textarea */}
              <div className="flex-1 p-4 overflow-y-auto">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Напишите свой ответ..."
                  className="w-full h-full p-4 bg-black/40 border border-amber-900/30 rounded-lg 
                    text-norse-text placeholder-norse-muted/50 focus:border-amber-500/50 
                    focus:outline-none transition-colors resize-none text-base leading-relaxed"
                  autoFocus
                />
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-amber-900/20 flex items-center justify-between gap-3">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-4 py-2 text-norse-muted hover:text-norse-text transition-colors"
                >
                  Отмена
                </button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={!replyText.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-600 to-amber-500 
                    text-black font-bold rounded-lg hover:from-amber-500 hover:to-amber-400 
                    transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} />
                  <span>Ответить</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
