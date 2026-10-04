import React from 'react';
import { motion } from 'framer-motion';
import { bosses } from '../../data/landingData';

export function BossesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-[Cormorant] text-4xl md:text-5xl font-bold text-center mb-4 text-norse-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Здесь водится кое-что похуже тебя
        </motion.h2>
        <motion.p
          className="text-center text-norse-muted mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Шесть боссов. Три ивента. Бесконечные осады.
        </motion.p>

        {/* Горизонтальный слайдер */}
        <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
          <div className="flex gap-6 snap-x snap-mandatory min-w-max">
            {bosses.map((boss, i) => (
              <motion.div
                key={i}
                className="w-80 snap-center flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div className="card-wood rounded-lg p-6 card-corner h-full">
                  {/* Руническая иконка */}
                  <div className="text-5xl text-norse-gold font-serif mb-4">
                    {boss.rune}
                  </div>

                  {/* Имя босса */}
                  <h3 className="font-[Cormorant] text-2xl font-bold text-norse-text mb-2">
                    {boss.name}
                  </h3>

                  {/* Описание */}
                  <p className="text-norse-muted text-sm mb-4 leading-relaxed">
                    {boss.description}
                  </p>

                  {/* Уровень сложности */}
                  <div className="text-xs text-norse-gold uppercase tracking-wider">
                    {boss.level}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
