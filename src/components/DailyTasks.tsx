import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useUser } from '../context/UserContext';

export function DailyTasks() {
  const { tasks, progress, completeTask } = useUser();

  const completedCount = progress.completedTasks.length;
  const totalCount = tasks.length;
  const progressPercent = (completedCount / totalCount) * 100;

  const handleComplete = (taskId: string) => {
    completeTask(taskId);
    
    // Конфетти при выполнении задания
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#ffd700', '#c9952c'],
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <div className="glass-dark rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-norse-gold text-lg font-serif">ᛊ</span>
        <h3 className="text-norse-text font-[Cinzel] font-bold text-sm">Ежедневные Задания</h3>
      </div>

      {/* Общий прогресс */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-norse-muted">Прогресс</span>
          <span className="text-xs text-norse-gold font-semibold">
            {completedCount}/{totalCount}
          </span>
        </div>
        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="absolute h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      <motion.div
        className="space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tasks.map((task) => {
          const isCompleted = progress.completedTasks.includes(task.id);

          return (
            <motion.div
              key={task.id}
              className={`flex items-center gap-3 p-2 rounded transition-all ${
                isCompleted ? 'opacity-50 bg-green-500/5' : 'hover:bg-norse-gold/5 cursor-pointer'
              }`}
              variants={itemVariants}
              whileHover={!isCompleted ? { scale: 1.02, x: 5 } : {}}
              whileTap={!isCompleted ? { scale: 0.98 } : {}}
              onClick={() => !isCompleted && handleComplete(task.id)}
            >
              <motion.div
                className={`w-10 h-10 rounded flex items-center justify-center text-sm font-serif shrink-0 ${
                  isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-norse-gold/10 text-norse-gold'
                }`}
                whileHover={!isCompleted ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                {isCompleted ? '✓' : task.rune}
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="text-norse-text text-sm font-semibold truncate">{task.title}</div>
                <div className="text-norse-muted/60 text-xs truncate">{task.description}</div>
              </div>
              <motion.div
                className="text-norse-gold text-sm font-semibold shrink-0"
                animate={isCompleted ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                +{task.xpReward}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Награда за выполнение всех заданий */}
      {completedCount === totalCount && (
        <motion.div
          className="mt-4 p-3 rounded bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="text-amber-400 text-sm font-semibold mb-1">🎉 Все задания выполнены!</div>
            <div className="text-norse-muted/70 text-xs">Возвращайтесь завтра за новыми наградами</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
