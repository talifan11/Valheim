import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Play } from 'lucide-react';
import { serverStatus } from '../../data/landingData';
import { Embers } from './components/Embers';

export function HeroSection() {
  const totalOnline = serverStatus.reduce((sum, s) => sum + s.online, 0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 300]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновый арт с параллаксом */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://image.qwenlm.ai/generated-images/762c4d38-4ad8-4f0d-964e-10539b3d616d/_result.png)',
          y,
        }}
      />
      
      {/* Оверлей-градиент */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0B0E14]" />

      {/* Угли */}
      <Embers />

      {/* Декоративные руны */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[15%] left-[10%] text-[8rem] text-amber-600/10 font-serif"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ᚠ
        </motion.div>
        <motion.div
          className="absolute top-[25%] right-[12%] text-[7rem] text-amber-600/10 font-serif"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          ᚦ
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] left-[5%] text-[9rem] text-amber-600/10 font-serif"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        >
          ᚱ
        </motion.div>
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Overline */}
        <motion.div
          className="text-xs md:text-sm text-norse-gold uppercase tracking-[0.2em] mb-6 font-medium"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          ᚱ Сезон IV · День 47
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          className="font-[Cormorant] text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-norse-text"
          style={{ textShadow: '0 2px 24px rgba(0,0,0,.8)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Мы начали голыми на пляже.
          <br />
          <span className="text-norse-gold">Закончим богами за горами.</span>
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          className="text-xl md:text-2xl text-norse-muted mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          MMO-сервер по Valheim. Свобода, социум, честный старт.
          <br />
          Без приватов и защищённых зон.
        </motion.p>

        {/* CTA кнопки */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <a
            href="/launcher.exe"
            download
            className="btn-viking btn-viking-primary flex items-center gap-2"
          >
            <Download size={18} />
            <span>Скачать лаунчер (Windows)</span>
          </a>
          <button className="btn-viking btn-viking-secondary flex items-center gap-2">
            <Play size={18} />
            <span>Смотреть трейлер</span>
          </button>
        </motion.div>

        {/* Статус серверов */}
        <motion.div
          className="flex items-center justify-center gap-4 text-sm text-norse-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Онлайн: {totalOnline}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {serverStatus.map((server, i) => (
              <React.Fragment key={server.name}>
                <span>{server.online}/{server.max}</span>
                {i < serverStatus.length - 1 && <span>·</span>}
              </React.Fragment>
            ))}
          </div>
          <span>·</span>
          <span>Обновлено 2 мин назад</span>
        </motion.div>
      </div>

      {/* Скролл-индикатор */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-4xl text-norse-gold font-serif">ᛏ</span>
      </motion.div>
    </section>
  );
}
