import React from 'react';
import { motion } from 'framer-motion';
import { bosses } from '../../data/landingData';

export function BossesSection() {
  return (
    <section className="py-24 px-6 bg-[#10080A] relative">
      {/* Виньетка */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#10080A]/50 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
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
                <motion.div
                  className="card-wood rounded-lg overflow-hidden card-corner h-full"
                  whileHover={{ y: -4, rotate: 0.5, boxShadow: '0 0 30px rgba(200, 155, 60, 0.3)' }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Портрет босса */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={boss.image}
                      alt={boss.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-5xl text-norse-gold font-serif">
                      {boss.rune}
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Имя босса */}
                    <h3 className="font-[Cormorant] text-2xl font-bold text-norse-text mb-2">
                      {boss.name}
                    </h3>

                    {/* Описание */}
                    <p className="text-norse-muted text-sm mb-4 leading-relaxed line-clamp-2">
                      {boss.description}
                    </p>

                    {/* Уровень сложности */}
                    <div className="text-xs text-norse-gold uppercase tracking-wider">
                      {boss.level}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
