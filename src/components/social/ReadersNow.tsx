import React from 'react';
import { motion } from 'framer-motion';

interface ReadersNowProps {
  readers: string[];
}

export function ReadersNow({ readers }: ReadersNowProps) {
  if (readers.length === 0) return null;

  const displayReaders = readers.slice(0, 3);
  const moreCount = readers.length - 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 p-3 rounded-lg bg-amber-900/10 border border-amber-600/20"
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="text-amber-400 text-lg">ᛏ</span>
        <span className="text-norse-muted">Сейчас читают:</span>
        <div className="flex items-center gap-1 flex-wrap">
          {displayReaders.map((reader, i) => (
            <React.Fragment key={reader}>
              <span className="text-norse-text font-medium">@{reader}</span>
              {i < displayReaders.length - 1 && <span className="text-norse-muted">,</span>}
            </React.Fragment>
          ))}
          {moreCount > 0 && (
            <span className="text-norse-muted">+ {moreCount} гостей</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
