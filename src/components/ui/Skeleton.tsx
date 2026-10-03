import React from 'react';

export function ThreadCardSkeleton() {
  return (
    <div className="p-4 rounded-lg border border-amber-900/20 bg-black/30 animate-pulse">
      <div className="flex items-start gap-3">
        {/* Аватар скелетон */}
        <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0" />

        {/* Контент скелетон */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Заголовок */}
          <div className="h-5 bg-gray-700 rounded w-3/4" />

          {/* Метаданные */}
          <div className="flex items-center gap-2">
            <div className="h-3 bg-gray-700 rounded w-20" />
            <div className="h-3 bg-gray-700 rounded w-16" />
            <div className="h-3 bg-gray-700 rounded w-24" />
          </div>

          {/* Превью */}
          <div className="space-y-1">
            <div className="h-3 bg-gray-700 rounded w-full" />
            <div className="h-3 bg-gray-700 rounded w-2/3" />
          </div>

          {/* Теги */}
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-700 rounded w-12" />
            <div className="h-4 bg-gray-700 rounded w-16" />
          </div>
        </div>

        {/* Полезно скелетон */}
        <div className="h-4 bg-gray-700 rounded w-12 shrink-0" />
      </div>
    </div>
  );
}

export function ThreadListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <ThreadCardSkeleton key={i} />
      ))}
    </div>
  );
}
