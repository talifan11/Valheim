import React from 'react';
import { SkillTreeCalculator } from '../components/SkillTreeCalculator';

export function SkillTreePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <SkillTreeCalculator />
      </div>
    </div>
  );
}
