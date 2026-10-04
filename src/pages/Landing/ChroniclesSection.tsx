import React from 'react';
import { motion } from 'framer-motion';
import { chronicles } from '../../data/landingData';

export function ChroniclesSection() {
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
          Записки Хранителя
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {chronicles.map((chronicle, i) => (
            <motion.div
              key={i}
              className="card-wood rounded-lg p-6 card-corner"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="text-xs text-norse-muted uppercase tracking-wider mb-2">
                {chronicle.date}
              </div>
              <h3 className="font-[Cormorant] text-xl font-bold text-norse-text mb-2">
                {chronicle.title}
              </h3>
              <p className="text-norse-muted text-sm leading-relaxed line-clamp-2">
                {chronicle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
