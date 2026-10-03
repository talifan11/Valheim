import React from 'react';
import { motion } from 'framer-motion';
import { SkillNode as SkillNodeType, SkillTree } from '../data/skillTreeData';

interface SkillNodeProps {
  skill: SkillNodeType;
  tree: SkillTree;
  points: number;
  canUnlock: boolean;
  isMaxed: boolean;
  onHover: (e: React.MouseEvent) => void;
  onLeave: () => void;
  onClick: () => void;
}

export function SkillNodeComponent({
  skill,
  tree,
  points,
  canUnlock,
  isMaxed,
  onHover,
  onLeave,
  onClick,
}: SkillNodeProps) {
  // Проверяем, является ли иконка URL или именем из TalentIcons
  const isUrl = skill.icon.startsWith('http');

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${skill.position.x}%`,
        top: `${skill.position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 400 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="relative group">
        {/* Внешнее свечение при доступности */}
        {canUnlock && points === 0 && (
          <motion.div
            className="absolute inset-0 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${tree.color}40 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Рунический круг вокруг важных навыков (tier 4) */}
        {skill.tier === 4 && (
          <motion.div
            className="absolute inset-[-20px] border-2 border-dashed rounded-full"
            style={{
              borderColor: `${tree.color}60`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Основная иконка */}
        <div
          className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full border-4 
            flex items-center justify-center overflow-hidden
            transition-all duration-300
            ${isMaxed ? 'shadow-2xl' : ''}
            ${canUnlock ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
          style={{
            borderColor: isMaxed ? tree.color : points > 0 ? `${tree.color}80` : '#374151',
            background: `linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(0, 0, 0, 0.95) 100%)`,
            boxShadow: isMaxed ? `0 0 30px ${tree.color}80, inset 0 0 20px ${tree.color}40` : undefined,
          }}
        >
          {/* Фоновое свечение */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle, ${tree.color} 0%, transparent 70%)`,
            }}
          />

          {/* Иконка */}
          {isUrl ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-14 h-14 md:w-16 md:h-16 z-10 object-cover rounded-full"
              style={{
                filter: isMaxed
                  ? `drop-shadow(0 0 15px ${tree.color}) brightness(1.2)`
                  : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
              }}
            />
          ) : (
            <div className="w-14 h-14 md:w-16 md:h-16 z-10 flex items-center justify-center">
              {/* Fallback для старых иконок из TalentIcons */}
              <div className="text-4xl">{skill.icon}</div>
            </div>
          )}

          {/* Счётчик очков */}
          <div
            className="absolute -bottom-2 -right-2 w-9 h-9 
              rounded-full bg-black border-2 
              flex items-center justify-center text-xs font-bold z-20"
            style={{
              borderColor: isMaxed ? '#fbbf24' : tree.color,
              color: isMaxed ? '#fbbf24' : points > 0 ? '#fff' : '#9ca3af',
              boxShadow: isMaxed ? '0 0 10px rgba(251, 191, 36, 0.5)' : undefined,
            }}
          >
            {points}/{skill.maxPoints}
          </div>

          {/* Индикатор активной способности */}
          {skill.type === 'active' && (
            <div
              className="absolute -top-2 -left-2 text-white text-[10px] px-2 py-1 rounded-full font-bold z-20 border-2"
              style={{
                backgroundColor: '#3b82f6',
                borderColor: '#60a5fa',
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
              }}
            >
              {skill.keybind}
            </div>
          )}

          {/* MAX индикатор */}
          {isMaxed && (
            <motion.div
              className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[9px] px-2 py-0.5 rounded-full font-bold z-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              MAX
            </motion.div>
          )}

          {/* Эффект при наведении */}
          {canUnlock && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
