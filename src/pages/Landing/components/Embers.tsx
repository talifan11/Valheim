import React from 'react';

export function Embers() {
  // 8-10 частиц с разными параметрами
  const embers = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 2 + Math.random() * 2,
  }));

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {embers.map((ember) => (
        <div
          key={ember.id}
          className="absolute bottom-0 rounded-full bg-amber-500/80"
          style={{
            left: `${ember.left}%`,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            animation: `ember ${ember.duration}s ease-out ${ember.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
