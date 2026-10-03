import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, BookOpen, Map, Search, Users } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Task {
  id: string;
  title: string;
  description: string;
  instruction: string;
  icon: React.ReactNode;
  points: number;
  completed: boolean;
  action?: () => void;
}

export function DailyTasks() {
  const { tasks: userTasks, progress, completeTask } = useUser();

  const tasks: Task[] = [
    {
      id: 'read-wiki',
      title: 'Изучи свитки',
      description: 'Прочитай любой гайд в Вики',
      instruction: 'Открой Вики → выбери любой гайд → прочитай до конца',
      icon: <BookOpen size={20} />,
      points: 50,
      completed: progress.completedTasks.includes('read-wiki'),
      action: () => window.location.hash = '#/wiki',
    },
    {
      id: 'check-server',
      title: 'Разведка',
      description: 'Проверь статус серверов',
      instruction: 'Перейди на страницу Серверы → обнови статус',
      icon: <Map size={20} />,
      points: 30,
      completed: progress.completedTasks.includes('check-server'),
      action: () => window.location.hash = '#/servers',
    },
    {
      id: 'find-rune',
      title: 'Тайная руна',
      description: 'Найди скрытую руну на странице',
      instruction: 'Ищи руну ᚱ в правом нижнем углу главной страницы',
      icon: <Search size={20} />,
      points: 100,
      completed: progress.completedTasks.includes('find-rune'),
    },
    {
      id: 'visit-community',
      title: 'Зал Славы',
      description: 'Загляни в сообщество',
      instruction: 'Открой Discord → напиши привет в #общий',
      icon: <Users size={20} />,
      points: 40,
      completed: progress.completedTasks.includes('visit-community'),
      action: () => window.open('https://discord.gg/valheim', '_blank'),
    },
    // Форумные задания
    {
      id: 'forum-reply',
      title: 'Ответь новичку',
      description: 'Ответь на вопрос в Тинге',
      instruction: 'Открой Тинг → найди тему с вопросом → напиши ответ',
      icon: <Users size={20} />,
      points: 20,
      completed: progress.completedTasks.includes('forum-reply'),
      action: () => window.location.hash = '#/ting',
    },
    {
      id: 'forum-useful',
      title: 'Получи признание',
      description: 'Получи 3 «Полезно» в Тинге',
      instruction: 'Пиши полезные ответы → получай реакции от других игроков',
      icon: <BookOpen size={20} />,
      points: 15,
      completed: progress.completedTasks.includes('forum-useful'),
    },
    {
      id: 'forum-guide',
      title: 'Создай гайд',
      description: 'Создай тему с тегом #гайд',
      instruction: 'Открой Тинг → нажми «Создать тему» → добавь тег #гайд',
      icon: <Map size={20} />,
      points: 25,
      completed: progress.completedTasks.includes('forum-guide'),
      action: () => window.location.hash = '#/ting/new',
    },
  ];

  const completedCount = tasks.filter(t => t.completed).length;
  const allCompleted = completedCount === tasks.length;

  const handleComplete = (taskId: string) => {
    completeTask(taskId);
    
    // Конфетти ТОЛЬКО при завершении всех заданий
    if (completedCount + 1 === tasks.length) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C89B3C', '#FFD700', '#FFFFFF'],
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <div className="glass-dark rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-norse-text">Ежедневные Задания</h3>
        <div className="flex items-center gap-2">
          <div className="text-sm text-norse-muted">Прогресс:</div>
          <div className="flex gap-1">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`w-3 h-3 rounded-full transition-colors ${
                  task.completed ? 'bg-green-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-bold text-amber-400 ml-2">
            {completedCount}/{tasks.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
              task.completed
                ? 'bg-green-900/20 border-green-600/30'
                : 'bg-black/30 border-amber-900/20 hover:border-amber-600/40'
            }`}
          >
            {/* Checkbox */}
            <button
              onClick={() => !task.completed && handleComplete(task.id)}
              disabled={task.completed}
              className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center 
                transition-all flex-shrink-0 ${
                task.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-amber-600/50 hover:border-amber-500'
              }`}
              aria-label={task.completed ? 'Выполнено' : 'Отметить как выполненное'}
            >
              {task.completed && <Check size={16} className="text-white" />}
            </button>

            {/* Icon */}
            <div className={`p-2 rounded-lg ${
              task.completed ? 'bg-green-600/20 text-green-400' : 'bg-amber-600/20 text-amber-400'
            }`}>
              {task.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-semibold ${
                  task.completed ? 'text-green-400 line-through' : 'text-norse-text'
                }`}>
                  {task.title}
                </h4>
                <span className="text-xs px-2 py-0.5 bg-amber-600/20 text-amber-400 rounded-full">
                  +{task.points} XP
                </span>
              </div>
              <p className="text-sm text-norse-muted mb-2">{task.description}</p>

              {/* Инструкция */}
              {!task.completed && (
                <div className="text-xs text-amber-400/80 bg-amber-900/20 p-2 rounded flex items-start gap-2">
                  <span className="text-amber-400 font-serif text-base leading-none">ᚨ</span>
                  <span>{task.instruction}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            {!task.completed && task.action && (
              <button
                onClick={task.action}
                className="px-3 py-1.5 bg-amber-600/20 text-amber-400 text-sm rounded-lg 
                  hover:bg-amber-600/30 transition-colors flex-shrink-0"
              >
                Выполнить
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* All completed message */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 p-4 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 
              border border-amber-500/50 rounded-lg text-center"
          >
            <div className="text-3xl mb-2 text-amber-400 font-serif animate-pulse">ᛋ</div>
            <div className="font-bold text-amber-400">Все задания выполнены!</div>
            <div className="text-sm text-norse-muted mt-1">
              Ты получил {tasks.reduce((sum, t) => sum + t.points, 0)} XP
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
