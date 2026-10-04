import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { shopItems } from '../../data/landingData';
import { RuneDivider } from './components/RuneDivider';

export function ShopPreviewSection() {
  return (
    <section className="py-24 px-6">
      <RuneDivider rune="ᚠ" />
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-[Cormorant] text-4xl md:text-5xl font-bold text-center mb-4 text-norse-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Косметика и удобства
        </motion.h2>
        <motion.p
          className="text-center text-norse-muted mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Игра не платная. Магазин — для тех, кто хочет поддержать проект.
          Никаких pay-to-win.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {shopItems.map((item, i) => (
            <motion.div
              key={i}
              className="card-wood rounded-lg p-4 card-corner text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="text-3xl text-norse-gold font-serif mb-2">
                {item.rune}
              </div>
              <div className="text-sm font-semibold text-norse-text mb-1">
                {item.name}
              </div>
              <div className="text-xs text-norse-muted mb-2">
                {item.type}
              </div>
              <div className="text-norse-gold font-bold">
                {item.price}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-norse-gold hover:text-norse-amber transition-colors"
          >
            <span>Открыть магазин</span>
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
