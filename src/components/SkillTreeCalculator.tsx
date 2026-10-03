import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { allSkillTrees, SkillTree, SkillNode } from '../data/skillTreeData';
import { iconMap } from './RunicIcons';

export function SkillTreeCalculator() {
  const [selectedTree, setSelectedTree] = useState<SkillTree>(allSkillTrees[0]);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [skillStates, setSkillStates] = useState<Record<string, number>>({});
  const [availablePoints, setAvailablePoints] = useState(50);
  const [prestigeCount, setPrestigeCount] = useState(0);

  const getSkillPoints = (skillId: string) => skillStates[skillId] || 0;

  const canUnlockSkill = (skill: SkillNode) => {
    if (!skill.requires) return true;
    return skill.requires.every(reqId => {
      const reqSkill = selectedTree.skills.find(s => s.id === reqId);
      if (!reqSkill) return false;
      return getSkillPoints(reqId) >= reqSkill.maxPoints;
    });
  };

  const handleSkillClick = (skill: SkillNode) => {
    const currentPoints = getSkillPoints(skill.id);

    if (currentPoints < skill.maxPoints && availablePoints > 0 && canUnlockSkill(skill)) {
      setSkillStates(prev => ({
        ...prev,
        [skill.id]: currentPoints + 1,
      }));
      setAvailablePoints(prev => prev - 1);

      // Конфетти при разблокировке
      if (currentPoints === 0) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: 0.5, y: 0.5 },
          colors: [selectedTree.color, '#ffd700', '#ffffff'],
        });
      }

      // Особый эффект для tier 4 навыков
      if (skill.tier === 4 && currentPoints === 0) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { x: 0.5, y: 0.5 },
          colors: [selectedTree.color, '#ffd700', '#ff00ff', '#ffffff'],
        });
      }
    } else if (currentPoints > 0) {
      setSkillStates(prev => ({
        ...prev,
        [skill.id]: currentPoints - 1,
      }));
      setAvailablePoints(prev => prev + 1);
    }
  };

  const handleSkillHover = (skill: SkillNode, event: React.MouseEvent) => {
    setHoveredSkill(skill);
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const tooltipWidth = 360;
    const tooltipHeight = 400;

    let x = rect.right + 15;
    let y = rect.top;

    if (x + tooltipWidth > window.innerWidth) {
      x = rect.left - tooltipWidth - 15;
    }
    if (y + tooltipHeight > window.innerHeight) {
      y = window.innerHeight - tooltipHeight - 20;
    }
    if (y < 0) {
      y = 20;
    }

    setTooltipPosition({ x, y });
  };

  const resetTree = () => {
    const treeSkills = selectedTree.skills.reduce((acc, skill) => {
      acc[skill.id] = 0;
      return acc;
    }, {} as Record<string, number>);

    const spentPoints = Object.values(skillStates).reduce((sum, points) => sum + points, 0);
    setSkillStates(prev => ({ ...prev, ...treeSkills }));
    setAvailablePoints(prev => prev + spentPoints);
  };

  const handlePrestige = () => {
    if (selectedTree.skills.every(s => getSkillPoints(s.id) === s.maxPoints)) {
      setPrestigeCount(prev => prev + 1);
      resetTree();
      setAvailablePoints(prev => prev + 10);
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ffd700', '#ff00ff', '#00ffff', '#ffffff'],
      });
    }
  };

  const isTreeMaxed = selectedTree.skills.every(s => getSkillPoints(s.id) === s.maxPoints);

  const recommendedBuilds = [
    { name: 'Берсерк', description: 'Максимальный урон', path: ['atk-1', 'atk-2', 'atk-4', 'atk-5'], popularity: 89, treeId: 'attack' },
    { name: 'Критический снайпер', description: 'Максимальный крит', path: ['atk-1', 'atk-3', 'atk-5'], popularity: 72, treeId: 'attack' },
    { name: 'Вампир', description: 'Урон + выживание', path: ['atk-2', 'atk-3', 'atk-4'], popularity: 65, treeId: 'attack' },
  ];

  const loadBuild = (buildPath: string[]) => {
    resetTree();
    setTimeout(() => {
      buildPath.forEach((skillId, index) => {
        setTimeout(() => {
          const skill = selectedTree.skills.find(s => s.id === skillId);
          if (skill && canUnlockSkill(skill) && availablePoints > 0) {
            handleSkillClick(skill);
          }
        }, index * 200);
      });
    }, 100);
  };

  const exportBuild = () => {
    const buildData = {
      tree: selectedTree.id,
      skills: skillStates,
      prestige: prestigeCount,
    };
    const encoded = btoa(JSON.stringify(buildData));
    navigator.clipboard.writeText(encoded);
    alert('Билд скопирован в буфер обмена!');
  };

  const totalSpent = selectedTree.skills.reduce((sum, skill) => sum + getSkillPoints(skill.id), 0);

  // Получение иконки для дерева
  const TreeIcon = iconMap[selectedTree.icon];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-[Cormorant] text-4xl md:text-5xl font-bold mb-4">
          <span className="text-norse-gold">Руническое Дерево Талантов</span>
        </h1>
        <p className="text-norse-muted">
          Распредели очки навыков и создай свой идеальный билд
        </p>
      </div>

      {/* Points Counter + Actions */}
      <div className="glass-dark rounded-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 text-amber-400">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8Z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-norse-muted uppercase tracking-wider">Доступные очки</div>
            <div className="text-2xl font-bold text-norse-gold">{availablePoints}</div>
          </div>
          {prestigeCount > 0 && (
            <div className="ml-4 px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg">
              <div className="text-xs text-purple-300">Престиж</div>
              <div className="text-lg font-bold text-purple-200">⭐ {prestigeCount}</div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportBuild}
            className="btn-viking btn-viking-secondary !py-2 !px-4 !text-xs"
          >
            📋 Экспорт
          </button>
          <button
            onClick={resetTree}
            className="btn-viking btn-viking-secondary !py-2 !px-4 !text-xs"
          >
            ↺ Сбросить
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tree Selection Tabs */}
        <div className="lg:col-span-1">
          <div className="glass-dark rounded-lg p-4 sticky top-24">
            <h3 className="text-norse-gold font-semibold mb-4 text-sm uppercase tracking-wider">
              Деревья навыков
            </h3>

            {/* Expert Trees */}
            <div className="mb-4">
              <div className="text-xs text-norse-muted mb-2 uppercase tracking-wider">Экспертные</div>
              <div className="space-y-2">
                {allSkillTrees.filter(t => ['attack', 'speed', 'defense', 'production'].includes(t.id)).map(tree => {
                  const Icon = iconMap[tree.icon];
                  return (
                    <motion.button
                      key={tree.id}
                      onClick={() => setSelectedTree(tree)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedTree.id === tree.id
                          ? 'bg-norse-gold/10 border border-norse-gold/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-10 h-10">
                        {Icon && <Icon color={tree.color} />}
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-semibold text-norse-text">{tree.name}</div>
                        <div className="text-xs text-norse-muted">{tree.description}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Weapon Trees */}
            <div className="mb-4">
              <div className="text-xs text-norse-muted mb-2 uppercase tracking-wider">Оружейные</div>
              <div className="space-y-2">
                {allSkillTrees.filter(t => ['bow', 'sword', 'staff'].includes(t.id)).map(tree => {
                  const Icon = iconMap[tree.icon];
                  return (
                    <motion.button
                      key={tree.id}
                      onClick={() => setSelectedTree(tree)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedTree.id === tree.id
                          ? 'bg-norse-gold/10 border border-norse-gold/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-10 h-10">
                        {Icon && <Icon color={tree.color} />}
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-semibold text-norse-text">{tree.name}</div>
                        <div className="text-xs text-norse-muted">{tree.description}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Job Trees */}
            <div>
              <div className="text-xs text-norse-muted mb-2 uppercase tracking-wider">Профессии</div>
              <div className="space-y-2">
                {allSkillTrees.filter(t => ['archer', 'mage', 'tanker'].includes(t.id)).map(tree => {
                  const Icon = iconMap[tree.icon];
                  return (
                    <motion.button
                      key={tree.id}
                      onClick={() => setSelectedTree(tree)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                        selectedTree.id === tree.id
                          ? 'bg-norse-gold/10 border border-norse-gold/30'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-10 h-10">
                        {Icon && <Icon color={tree.color} />}
                      </div>
                      <div className="text-left flex-1">
                        <div className="text-sm font-semibold text-norse-text">{tree.name}</div>
                        <div className="text-xs text-norse-muted">{tree.description}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Skill Tree Visualization */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTree.id}
              className="glass-dark rounded-lg p-6 relative min-h-[600px] overflow-hidden"
              style={{
                backgroundImage: selectedTree.background ? `url(${selectedTree.background})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70" />

              {/* Атмосферный рунический фон */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at center, ${selectedTree.color}20 0%, transparent 70%)`,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              {/* Декоративные руны по углам */}
              <div className="absolute top-4 left-4 text-6xl opacity-20 pointer-events-none" style={{ color: selectedTree.color }}>ᚱ</div>
              <div className="absolute top-4 right-4 text-6xl opacity-20 pointer-events-none" style={{ color: selectedTree.color }}>ᚠ</div>
              <div className="absolute bottom-4 left-4 text-6xl opacity-20 pointer-events-none" style={{ color: selectedTree.color }}>ᛟ</div>
              <div className="absolute bottom-4 right-4 text-6xl opacity-20 pointer-events-none" style={{ color: selectedTree.color }}>ᛏ</div>

              {/* Content */}
              <div className="relative z-10">
                {/* Tree Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-norse-gold/10">
                  <motion.div
                    className="w-20 h-20"
                    style={{
                      filter: `drop-shadow(0 0 15px ${selectedTree.color})`,
                    }}
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    {TreeIcon && <TreeIcon color={selectedTree.color} />}
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-norse-text">{selectedTree.name}</h2>
                    <p className="text-sm text-norse-muted">{selectedTree.description}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs text-norse-muted">Вложено очков</div>
                    <div className="text-xl font-bold" style={{ color: selectedTree.color }}>
                      {totalSpent} / {selectedTree.maxPoints}
                    </div>
                  </div>
                </div>

                {/* Skill Tree Grid */}
                <div className="relative" style={{ height: '500px' }}>
                  {/* Connection Lines с руническими путями */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <defs>
                      <linearGradient id={`activePath-${selectedTree.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={selectedTree.color} stopOpacity="0.8" />
                        <stop offset="50%" stopColor={selectedTree.color} stopOpacity="1" />
                        <stop offset="100%" stopColor={selectedTree.color} stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {selectedTree.skills.map(skill => {
                      if (!skill.requires) return null;
                      return skill.requires.map(reqId => {
                        const reqSkill = selectedTree.skills.find(s => s.id === reqId);
                        if (!reqSkill) return null;

                        const isActive = getSkillPoints(reqId) === reqSkill.maxPoints;

                        return (
                          <g key={`${skill.id}-${reqId}`}>
                            <line
                              x1={`${reqSkill.position.x}%`}
                              y1={`${reqSkill.position.y}%`}
                              x2={`${skill.position.x}%`}
                              y2={`${skill.position.y}%`}
                              stroke={isActive ? `url(#activePath-${selectedTree.id})` : '#4b5563'}
                              strokeWidth={isActive ? '3' : '2'}
                              strokeDasharray={isActive ? '0' : '5,5'}
                              filter={isActive ? 'url(#glow)' : undefined}
                              style={{ transition: 'all 0.3s ease' }}
                            />

                            {/* Анимированные частицы на активных путях */}
                            {isActive && (
                              <>
                                <circle r="3" fill={selectedTree.color}>
                                  <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path={`M${reqSkill.position.x * 5},${reqSkill.position.y * 5} L${skill.position.x * 5},${skill.position.y * 5}`}
                                  />
                                </circle>
                                <circle r="2" fill={selectedTree.color} opacity="0.6">
                                  <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    begin="0.5s"
                                    path={`M${reqSkill.position.x * 5},${reqSkill.position.y * 5} L${skill.position.x * 5},${skill.position.y * 5}`}
                                  />
                                </circle>
                              </>
                            )}
                          </g>
                        );
                      });
                    })}
                  </svg>

                  {/* Skill Nodes */}
                  {selectedTree.skills.map(skill => {
                    const points = getSkillPoints(skill.id);
                    const canUnlock = canUnlockSkill(skill);
                    const isMaxed = points === skill.maxPoints;
                    const SkillIcon = iconMap[skill.icon];

                    return (
                      <motion.div
                        key={skill.id}
                        className="absolute cursor-pointer"
                        style={{
                          left: `${skill.position.x}%`,
                          top: `${skill.position.y}%`,
                        }}
                        initial={{ x: '-50%', y: '-50%', opacity: 0 }}
                        animate={{ x: '-50%', y: '-50%', opacity: 1 }}
                        whileHover={{ 
                          x: '-50%', 
                          y: '-50%', 
                          scale: 1.15 
                        }}
                        whileTap={{ 
                          x: '-50%', 
                          y: '-50%', 
                          scale: 0.95 
                        }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        onClick={() => handleSkillClick(skill)}
                        onMouseEnter={(e) => handleSkillHover(skill, e)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="relative">
                          {/* Внешнее свечение при доступности */}
                          {canUnlock && points === 0 && (
                            <motion.div
                              className="absolute inset-0 rounded-full blur-xl"
                              style={{
                                background: `radial-gradient(circle, ${selectedTree.color}40 0%, transparent 70%)`,
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

                          {/* Рунический круг вокруг tier 4 */}
                          {skill.tier === 4 && (
                            <motion.div
                              className="absolute inset-[-20px] border-2 border-dashed rounded-full"
                              style={{
                                borderColor: `${selectedTree.color}60`,
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
                            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center overflow-hidden transition-all duration-300 ${
                              canUnlock ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
                            }`}
                            style={{
                              borderColor: isMaxed ? selectedTree.color : points > 0 ? `${selectedTree.color}80` : '#374151',
                              background: `linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(0, 0, 0, 0.95) 100%)`,
                              boxShadow: isMaxed
                                ? `0 0 30px ${selectedTree.color}80, inset 0 0 20px ${selectedTree.color}40`
                                : points > 0
                                ? `0 0 10px ${selectedTree.color}30`
                                : undefined,
                            }}
                          >
                            {/* Фоновое свечение */}
                            <div
                              className="absolute inset-0 opacity-30"
                              style={{
                                background: `radial-gradient(circle, ${selectedTree.color} 0%, transparent 70%)`,
                              }}
                            />

                            {/* Иконка */}
                            <div className="w-10 h-10 md:w-12 md:h-12 z-10">
                              {SkillIcon && <SkillIcon color={selectedTree.color} />}
                            </div>

                            {/* Счётчик очков */}
                            <div
                              className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-black border-2 flex items-center justify-center text-xs font-bold z-20"
                              style={{
                                borderColor: isMaxed ? '#fbbf24' : selectedTree.color,
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
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prestige Button */}
          {isTreeMaxed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-6 glass-dark rounded-lg border-2 border-amber-500/50"
              style={{
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)',
              }}
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-amber-400 mb-2">
                    ⭐ Престиж: Перерождение
                  </h3>
                  <p className="text-norse-muted">
                    Сбрось все очки и получи перманентный бонус +5% ко всем навыкам + 10 бонусных очков
                  </p>
                </div>
                <motion.button
                  onClick={handlePrestige}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-lg font-bold text-black hover:from-amber-500 hover:to-yellow-400 transition-all shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
                  }}
                >
                  Переродиться
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Recommended Builds */}
          <div className="mt-6 p-6 glass-dark rounded-lg">
            <h3 className="text-lg font-bold text-norse-text mb-4">
              📊 Популярные билды
            </h3>
            <div className="space-y-3">
              {recommendedBuilds.map(build => (
                <motion.div
                  key={build.name}
                  className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/50 transition-colors cursor-pointer"
                  whileHover={{ x: 5 }}
                  onClick={() => loadBuild(build.path)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">⚔️</div>
                    <div>
                      <div className="font-semibold text-norse-text">{build.name}</div>
                      <div className="text-xs text-norse-muted">{build.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-norse-muted">
                      {build.popularity}% игроков
                    </div>
                    <button className="px-3 py-1 bg-amber-600/20 text-amber-400 rounded hover:bg-amber-600/30 transition-colors text-sm">
                      Загрузить
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skill Tooltip */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              maxWidth: '360px',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="rounded-lg border-2 p-5 shadow-2xl backdrop-blur-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(11, 14, 20, 0.98) 0%, rgba(20, 25, 34, 0.98) 100%)',
                borderColor: selectedTree.color,
                boxShadow: `0 0 40px ${selectedTree.color}40`,
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-norse-gold/20">
                <div className="relative w-16 h-16">
                  {(() => {
                    const HoverIcon = iconMap[hoveredSkill.icon];
                    return HoverIcon ? <HoverIcon color={selectedTree.color} /> : null;
                  })()}
                  {getSkillPoints(hoveredSkill.id) === hoveredSkill.maxPoints && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                      MAX
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-norse-text mb-1">{hoveredSkill.name}</h3>
                  <div className="flex items-center gap-2">
                    {hoveredSkill.type === 'active' ? (
                      <span className="text-xs px-2 py-1 rounded font-bold text-white bg-blue-600">
                        Активная [{hoveredSkill.keybind}]
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded font-bold bg-green-600 text-white">
                        Пассивная
                      </span>
                    )}
                    <span className="text-xs text-norse-muted">Tier {hoveredSkill.tier}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-norse-muted mb-4 leading-relaxed">{hoveredSkill.description}</p>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-norse-muted">Очки:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: hoveredSkill.maxPoints }).map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: i < getSkillPoints(hoveredSkill.id) ? selectedTree.color : '#374151',
                            boxShadow: i < getSkillPoints(hoveredSkill.id) ? `0 0 5px ${selectedTree.color}` : undefined,
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-sm" style={{ color: selectedTree.color }}>
                      {getSkillPoints(hoveredSkill.id)} / {hoveredSkill.maxPoints}
                    </span>
                  </div>
                </div>

                {hoveredSkill.requires && (
                  <div className="text-xs">
                    <span className="text-norse-muted">Требует: </span>
                    <span className="text-norse-text">
                      {hoveredSkill.requires.map(reqId => {
                        const req = selectedTree.skills.find(s => s.id === reqId);
                        return req?.name;
                      }).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Action hint */}
              <div className="mt-4 pt-4 border-t border-norse-gold/20 text-xs text-center">
                {getSkillPoints(hoveredSkill.id) < hoveredSkill.maxPoints && canUnlockSkill(hoveredSkill) && availablePoints > 0 ? (
                  <span className="text-green-400 font-semibold">✨ Клик для улучшения</span>
                ) : getSkillPoints(hoveredSkill.id) > 0 ? (
                  <span className="text-yellow-400 font-semibold">↺ Клик для сброса</span>
                ) : (
                  <span className="text-red-400">🔒 Недоступно</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
