import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Атмосферный градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-[#0B0E14] to-amber-600/10" />

      {/* Декоративные руны */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-[20%] text-[12rem] text-amber-600/5 font-serif"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ᛊ
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-[20%] text-[10rem] text-amber-600/5 font-serif"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          ᚹ
        </motion.div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          className="font-[Cormorant] text-4xl md:text-6xl font-bold mb-6 text-norse-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Хватит читать.
          <br />
          <span className="text-norse-gold">Пора строить.</span>
        </motion.h2>

        <motion.p
          className="text-xl text-norse-muted mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Лаунчер скачивается за 2 минуты. Первый вход — бесплатно.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a
            href="/launcher.exe"
            download
            className="btn-viking btn-viking-primary flex items-center gap-2 animate-pulse-glow"
          >
            <Download size={18} />
            <span>Скачать лаунчер (Windows)</span>
          </a>
          <a
            href="https://discord.gg/valheim"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-viking btn-viking-secondary"
          >
            Присоединиться к Discord
          </a>
        </motion.div>

        <motion.p
          className="text-norse-muted/50 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          Windows 10+ · 4 GB RAM · 3 GB на диске
        </motion.p>
      </div>
    </section>
  );
}
