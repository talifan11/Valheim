import React from 'react';
import { useUser } from '../context/UserContext';

export function DailyTasks() {
  const { tasks, progress, completeTask } = useUser();

  return (
    <div className="glass-dark rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-norse-gold text-lg font-serif">ᛊ</span>
        <h3 className="text-norse-text font-[Cinzel] font-bold text-sm">Ежедневные Задания</h3>
      </div>
      
      <div className="space-y-2">
        {tasks.map(task => {
          const isCompleted = progress.completedTasks.includes(task.id);
          
          return (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-2 rounded transition-all ${
                isCompleted ? 'opacity-50' : 'hover:bg-norse-gold/5 cursor-pointer'
              }`}
              onClick={() => !isCompleted && completeTask(task.id)}
            >
              <div className={`w-8 h-8 rounded flex items-center justify-center text-sm font-serif ${
                isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-norse-gold/10 text-norse-gold'
              }`}>
                {isCompleted ? '✓' : task.rune}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-norse-text text-xs font-semibold truncate">{task.title}</div>
                <div className="text-norse-muted/60 text-[10px] truncate">{task.description}</div>
              </div>
              <div className="text-norse-gold text-[10px] font-semibold">+{task.xpReward}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
