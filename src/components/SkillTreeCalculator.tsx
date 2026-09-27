import React, { useState } from 'react';
import { allSkillTrees, SkillTree, SkillNode } from '../data/skillTreeData';
import { TalentIcons, TalentIconKey } from './TalentIcons';

export function SkillTreeCalculator() {
  const [selectedTree, setSelectedTree] = useState<SkillTree>(allSkillTrees[0]);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [skillStates, setSkillStates] = useState<Record<string, number>>({});
  const [availablePoints, setAvailablePoints] = useState(50);

  console.log('SkillTreeCalculator rendered', { selectedTree: selectedTree.name, skillsCount: selectedTree.skills.length });

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
    const tooltipWidth = 320;
    const tooltipHeight = 300;
    
    // Calculate position to avoid going off-screen
    let x = rect.right + 10;
    let y = rect.top;
    
    // If tooltip would go off right edge, show on left side
    if (x + tooltipWidth > window.innerWidth) {
      x = rect.left - tooltipWidth - 10;
    }
    
    // If tooltip would go off bottom edge, move up
    if (y + tooltipHeight > window.innerHeight) {
      y = window.innerHeight - tooltipHeight - 20;
    }
    
    // If tooltip would go off top edge, move down
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

  const getSkillColor = (skill: SkillNode) => {
    const points = getSkillPoints(skill.id);
    const isMaxed = points === skill.maxPoints;
    
    if (points === 0) {
      return 'border-gray-700 bg-gray-900/80';
    }
    if (isMaxed) {
      return 'border-4 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]';
    }
    return 'border-3';
  };

  const getSkillStyle = (skill: SkillNode) => {
    const points = getSkillPoints(skill.id);
    const isMaxed = points === skill.maxPoints;
    
    return {
      borderColor: points > 0 && !isMaxed ? selectedTree.color : undefined,
      borderWidth: points > 0 && !isMaxed ? '3px' : undefined,
      boxShadow: isMaxed ? `0 0 20px ${selectedTree.color}60, inset 0 0 10px ${selectedTree.color}30` : points > 0 ? `0 0 10px ${selectedTree.color}30` : undefined,
    };
  };

  const getSkillOpacity = (skill: SkillNode) => {
    const points = getSkillPoints(skill.id);
    if (points === 0 && !canUnlockSkill(skill)) return 'opacity-40';
    return 'opacity-100';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-[Cormorant] text-4xl md:text-5xl font-bold mb-4">
          <span className="text-norse-gold">Калькулятор Талантов</span>
        </h1>
        <p className="text-norse-muted">
          Распредели очки навыков и создай свой идеальный билд
        </p>
      </div>

      {/* Points Counter */}
      <div className="glass-dark rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-3xl">✨</div>
          <div>
            <div className="text-xs text-norse-muted uppercase tracking-wider">Доступные очки</div>
            <div className="text-2xl font-bold text-norse-gold">{availablePoints}</div>
          </div>
        </div>
        <button
          onClick={resetTree}
          className="btn-viking btn-viking-secondary !py-2 !px-4 !text-xs"
        >
          Сбросить дерево
        </button>
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
                {allSkillTrees.filter(t => ['attack', 'speed', 'defense', 'production'].includes(t.id)).map(tree => (
                  <button
                    key={tree.id}
                    onClick={() => setSelectedTree(tree)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      selectedTree.id === tree.id
                        ? 'bg-norse-gold/10 border border-norse-gold/30'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="text-2xl">{tree.icon}</span>
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-norse-text">{tree.name}</div>
                      <div className="text-xs text-norse-muted">{tree.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Weapon Trees */}
            <div className="mb-4">
              <div className="text-xs text-norse-muted mb-2 uppercase tracking-wider">Оружейные</div>
              <div className="space-y-2">
                {allSkillTrees.filter(t => ['bow', 'sword', 'staff'].includes(t.id)).map(tree => (
                  <button
                    key={tree.id}
                    onClick={() => setSelectedTree(tree)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      selectedTree.id === tree.id
                        ? 'bg-norse-gold/10 border border-norse-gold/30'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="text-2xl">{tree.icon}</span>
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-norse-text">{tree.name}</div>
                      <div className="text-xs text-norse-muted">{tree.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Job Trees */}
            <div>
              <div className="text-xs text-norse-muted mb-2 uppercase tracking-wider">Профессии</div>
              <div className="space-y-2">
                {allSkillTrees.filter(t => ['archer', 'mage', 'tanker'].includes(t.id)).map(tree => (
                  <button
                    key={tree.id}
                    onClick={() => setSelectedTree(tree)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      selectedTree.id === tree.id
                        ? 'bg-norse-gold/10 border border-norse-gold/30'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="text-2xl">{tree.icon}</span>
                    <div className="text-left flex-1">
                      <div className="text-sm font-semibold text-norse-text">{tree.name}</div>
                      <div className="text-xs text-norse-muted">{tree.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skill Tree Visualization */}
        <div className="lg:col-span-3">
          <div 
            className="glass-dark rounded-lg p-6 relative min-h-[600px] overflow-hidden"
            style={{
              backgroundImage: selectedTree.background ? `url(${selectedTree.background})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Tree Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-norse-gold/10">
                <div className="text-5xl">{selectedTree.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-norse-text">{selectedTree.name}</h2>
                  <p className="text-sm text-norse-muted">{selectedTree.description}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-xs text-norse-muted">Вложено очков</div>
                  <div className="text-xl font-bold" style={{ color: selectedTree.color }}>
                    {selectedTree.skills.reduce((sum, skill) => sum + getSkillPoints(skill.id), 0)} / {selectedTree.maxPoints}
                  </div>
                </div>
              </div>

              {/* Skill Tree Grid */}
              <div className="relative" style={{ height: '500px' }}>
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  {selectedTree.skills.map(skill => {
                    if (!skill.requires) return null;
                    return skill.requires.map(reqId => {
                      const reqSkill = selectedTree.skills.find(s => s.id === reqId);
                      if (!reqSkill) return null;
                      
                      const isActive = getSkillPoints(reqId) === reqSkill.maxPoints;
                      
                      return (
                        <line
                          key={`${skill.id}-${reqId}`}
                          x1={`${reqSkill.position.x}%`}
                          y1={`${reqSkill.position.y}%`}
                          x2={`${skill.position.x}%`}
                          y2={`${skill.position.y}%`}
                          stroke={isActive ? selectedTree.color : '#4b5563'}
                          strokeWidth="2"
                          strokeDasharray={isActive ? '0' : '5,5'}
                          opacity={isActive ? 0.8 : 0.3}
                          style={{ transition: 'all 0.3s ease' }}
                        />
                      );
                    });
                  })}
                </svg>

                {/* Skill Nodes */}
                {selectedTree.skills.map(skill => {
                  const points = getSkillPoints(skill.id);
                  const isMaxed = points === skill.maxPoints;
                  const canUnlock = canUnlockSkill(skill);
                  
                  return (
                  <div
                    key={skill.id}
                    className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 hover:z-20 ${getSkillOpacity(skill)}`}
                    style={{
                      left: `${skill.position.x}%`,
                      top: `${skill.position.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                    }}
                    onClick={() => handleSkillClick(skill)}
                    onMouseEnter={(e) => handleSkillHover(skill, e)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div
                      className={`relative w-16 h-16 rounded-md flex items-center justify-center transition-all overflow-hidden ${getSkillColor(skill)} ${
                        canUnlock ? 'cursor-pointer' : 'cursor-not-allowed'
                      }`}
                      style={{
                        ...getSkillStyle(skill),
                        background: points > 0 ? `linear-gradient(135deg, ${selectedTree.color}40 0%, ${selectedTree.color}20 100%)` : 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
                      }}
                    >
                      <div className="w-full h-full relative">
                        {TalentIcons[skill.icon as TalentIconKey] || <div className="w-full h-full bg-gray-700" />}
                        {/* Overlay for unlearned skills */}
                        {points === 0 && !canUnlock && (
                          <div className="absolute inset-0 bg-black/60" />
                        )}
                      </div>                        
                        {/* Points Counter - WoW Style */}
                        <div 
                          className="absolute -bottom-1 -right-1 bg-black/90 border-2 rounded-sm w-7 h-7 flex items-center justify-center text-xs font-bold"
                          style={{ 
                            borderColor: points > 0 ? selectedTree.color : '#4a5568',
                            color: points > 0 ? '#fff' : '#a0aec0'
                          }}
                        >
                          {points}/{skill.maxPoints}
                        </div>

                        {/* Active Skill Indicator - WoW Style */}
                        {skill.type === 'active' && (
                          <div 
                            className="absolute -top-1 -left-1 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold border-2 shadow-lg"
                            style={{ 
                              backgroundColor: '#3b82f6',
                              borderColor: '#60a5fa'
                            }}
                          >
                            {skill.keybind}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WoW-style Tooltip */}
      {hoveredSkill && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            maxWidth: '320px',
          }}
        >
          <div 
            className="rounded-lg border-2 p-4 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(11, 14, 20, 0.98) 0%, rgba(20, 25, 34, 0.98) 100%)',
              borderColor: selectedTree.color,
              boxShadow: `0 0 30px ${selectedTree.color}40`,
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-norse-gold/20">
              <div className="w-12 h-12 rounded overflow-hidden border-2" style={{ borderColor: selectedTree.color }}>
                {TalentIcons[hoveredSkill.icon as TalentIconKey] || <div className="w-full h-full bg-gray-700" />}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-norse-text">{hoveredSkill.name}</h3>
                <div className="flex items-center gap-2">
                  {hoveredSkill.type === 'active' && (
                    <span 
                      className="text-xs px-2 py-0.5 rounded font-bold text-white"
                      style={{ backgroundColor: '#3b82f6' }}
                    >
                      Активная [{hoveredSkill.keybind}]
                    </span>
                  )}
                  {hoveredSkill.type === 'passive' && (
                    <span className="text-xs px-2 py-0.5 rounded font-bold bg-green-600 text-white">
                      Пассивная
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-norse-muted mb-3 leading-relaxed">{hoveredSkill.description}</p>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-norse-muted">Очки:</span>
                <span className="font-bold" style={{ color: selectedTree.color }}>
                  {getSkillPoints(hoveredSkill.id)} / {hoveredSkill.maxPoints}
                </span>
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

            {/* Click hint */}
            <div className="mt-3 pt-3 border-t border-norse-gold/20 text-xs text-norse-muted text-center">
              {getSkillPoints(hoveredSkill.id) < hoveredSkill.maxPoints && canUnlockSkill(hoveredSkill) && availablePoints > 0 ? (
                <span className="text-green-400">Клик для улучшения</span>
              ) : getSkillPoints(hoveredSkill.id) > 0 ? (
                <span className="text-yellow-400">Клик для сброса</span>
              ) : (
                <span className="text-red-400">Недоступно</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
