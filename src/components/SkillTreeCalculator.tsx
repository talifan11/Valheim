import React, { useState } from 'react';
import { allSkillTrees, SkillTree, SkillNode } from '../data/skillTreeData';

export function SkillTreeCalculator() {
  const [selectedTree, setSelectedTree] = useState<SkillTree>(allSkillTrees[0]);
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);
  const [skillStates, setSkillStates] = useState<Record<string, number>>({});
  const [availablePoints, setAvailablePoints] = useState(50);

  // Debug log
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
    if (points === 0) return 'border-gray-600 bg-gray-800/50';
    return 'border-2';
  };

  const getSkillStyle = (skill: SkillNode) => {
    const points = getSkillPoints(skill.id);
    const isMaxed = points === skill.maxPoints;
    return {
      borderColor: points > 0 ? selectedTree.color : undefined,
      backgroundColor: points > 0 ? `${selectedTree.color}20` : undefined,
      boxShadow: isMaxed ? `0 0 20px ${selectedTree.color}40` : undefined,
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
          <div className="glass-dark rounded-lg p-6 relative min-h-[600px]">
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
                    className={`absolute cursor-pointer transition-transform hover:scale-110 ${getSkillOpacity(skill)}`}
                    style={{
                      left: `${skill.position.x}%`,
                      top: `${skill.position.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                    }}
                    onClick={() => handleSkillClick(skill)}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div
                      className={`relative w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-all ${getSkillColor(skill)} ${
                        canUnlock ? 'cursor-pointer' : 'cursor-not-allowed'
                      } ${isMaxed ? 'shadow-lg' : ''}`}
                      style={getSkillStyle(skill)}
                    >
                      <span className="text-3xl">{skill.icon}</span>
                      
                      {/* Points Counter */}
                      <div className="absolute -bottom-2 -right-2 bg-gray-900 border border-norse-gold/30 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-norse-gold">
                        {points}/{skill.maxPoints}
                      </div>

                      {/* Active Skill Indicator */}
                      {skill.type === 'active' && (
                        <div className="absolute -top-2 -left-2 bg-norse-blue text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                          {skill.keybind}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Skill Tooltip */}
            {hoveredSkill && (
              <div className="absolute bottom-4 left-4 right-4 glass rounded-lg p-4 border border-norse-gold/20">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{hoveredSkill.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-norse-text">{hoveredSkill.name}</h3>
                      {hoveredSkill.type === 'active' && (
                        <span className="bg-norse-blue text-white text-xs px-2 py-0.5 rounded font-bold">
                          Активная [{hoveredSkill.keybind}]
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-norse-muted mb-2">{hoveredSkill.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-norse-gold">
                        Очки: {getSkillPoints(hoveredSkill.id)} / {hoveredSkill.maxPoints}
                      </span>
                      {hoveredSkill.requires && (
                        <span className="text-norse-muted">
                          Требует: {hoveredSkill.requires.map(reqId => {
                            const req = selectedTree.skills.find(s => s.id === reqId);
                            return req?.name;
                          }).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
