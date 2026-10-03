import React from 'react';

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-800 rounded ${className}`} />
  );
}

export function ServerCardSkeleton() {
  return (
    <div className="glass-dark rounded-lg p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-2 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

export function SkillNodeSkeleton() {
  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24">
      <Skeleton className="w-full h-full rounded-full" />
      <Skeleton className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full" />
    </div>
  );
}

export function TaskSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-amber-900/20 bg-black/30">
      <Skeleton className="w-6 h-6 rounded" />
      <Skeleton className="w-10 h-10 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}
