import React from 'react';
import { motion } from 'framer-motion';
import { pillars } from '../../data/landingData';

export function PillarsSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-[Cormorant] text-4xl md:text-5xl font-bold text-center mb-16 text-norse-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Здесь всё честно
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="card-wood rounded-lg p-8 card-corner text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 0 30px rgba(200, 155, 60, 0.3)' }}
            >
              <div className="text-6xl text-norse-gold font-serif mb-4">
                {pillar.rune}
              </div>
              <h3 className="font-[Cormorant] text-2xl font-bold text-norse-text mb-3">
                {pillar.title}
              </h3>
              <p className="text-norse-muted leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
