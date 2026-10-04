import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ranks } from '../../data/landingData';

export function ProgressionSection() {
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
          От Новичка до Легенды
        </motion.h2>

        {/* Шкала рангов */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between gap-4">
            {ranks.map((rank, i) => (
              <React.Fragment key={rank.name}>
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-serif mb-2 border-2"
                    style={{
                      borderColor: rank.color,
                      color: rank.color,
                      boxShadow: `0 0 20px ${rank.color}40`,
                    }}
                  >
                    {rank.rune}
                  </div>
                  <div className="text-sm font-semibold text-norse-text">{rank.name}</div>
                  <div className="text-xs text-norse-muted">{rank.xpThreshold} XP</div>
                </motion.div>
                {i < ranks.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-norse-muted/20 to-norse-muted/20" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Описание */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p className="text-norse-muted leading-relaxed mb-4">
            XP за игру. Задания каждый день. Таланты в стиле WoW.
          </p>
          <p className="text-norse-muted/70 text-sm">
            Каждое действие в мире — шаг к легенде. Создай тему, помоги новичку, победи босса.
            Система знает всё.
          </p>
        </motion.div>

        {/* Превью HUD */}
        <motion.div
          className="max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="glass-dark rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-norse-gold text-sm font-serif">ᚱ</span>
              <span className="text-norse-text text-xs font-semibold">Викинг</span>
            </div>
            <div className="mb-1">
              <div className="flex justify-between text-[10px] text-norse-muted mb-0.5">
                <span>Опыт</span>
                <span>342 XP</span>
              </div>
              <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-norse-gold/60 to-norse-gold rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '70%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </div>
            </div>
            <div className="text-[9px] text-norse-muted/60">
              До «Ярл»: 158 XP
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Link
            to="/skill-tree"
            className="inline-flex items-center gap-2 text-norse-gold hover:text-norse-amber transition-colors"
          >
            <span>Открыть калькулятор талантов</span>
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
