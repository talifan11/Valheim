import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { communityStats } from '../../data/landingData';
import { RuneDivider } from './components/RuneDivider';

// Хук для count-up анимации
function useCountUp(target: number, duration = 600, shouldStart = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, shouldStart]);
  
  return count;
}

// Аватарки для Discord
const discordAvatars = ['У', 'Б', 'Х', 'Р', 'Ф'];

export function CommunitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const discordCount = useCountUp(communityStats.discord, 600, isInView);
  const tingCount = useCountUp(communityStats.ting, 600, isInView);
  const wikiCount = useCountUp(communityStats.wiki, 600, isInView);

  return (
    <section className="py-24 px-6">
      <RuneDivider rune="ᛊ" />
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          className="font-[Cormorant] text-4xl md:text-5xl font-bold text-center mb-4 text-norse-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Один выживешь.
          <br />
          <span className="text-norse-gold">С другими — станешь легендой.</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* Discord */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <a
              href="https://discord.gg/valheim"
              target="_blank"
              rel="noopener noreferrer"
              className="card-wood rounded-lg p-6 card-corner h-full block hover:border-norse-gold/40 transition-all"
            >
              {/* Крупная цифра */}
              <div className="font-[Cormorant] text-5xl md:text-6xl font-bold text-norse-gold mb-2">
                {discordCount}
              </div>
              <div className="text-xs text-norse-muted uppercase tracking-wider mb-4">
                участников онлайн
              </div>

              {/* Заголовок */}
              <h3 className="font-[Cormorant] text-2xl font-bold text-norse-text mb-2">
                Discord
              </h3>
              <p className="text-norse-muted text-sm mb-4 leading-relaxed">
                Живой чат, голосовые, ивенты.
              </p>

              {/* Аватарки */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  {discordAvatars.map((avatar, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600/40 to-amber-900/40 border-2 border-black flex items-center justify-center text-xs font-bold text-norse-text"
                    >
                      {avatar}
                    </div>
                  ))}
                </div>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>

              <div className="text-norse-gold text-sm font-semibold">
                Присоединиться →
              </div>
            </a>
          </motion.div>

          {/* Тинг */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link
              to="/ting"
              className="card-wood rounded-lg p-6 card-corner h-full block hover:border-norse-gold/40 transition-all"
            >
              {/* Крупная цифра */}
              <div className="font-[Cormorant] text-5xl md:text-6xl font-bold text-norse-gold mb-2">
                {tingCount}
              </div>
              <div className="text-xs text-norse-muted uppercase tracking-wider mb-4">
                тем в форуме
              </div>

              {/* Заголовок */}
              <h3 className="font-[Cormorant] text-2xl font-bold text-norse-text mb-2">
                Тинг
              </h3>
              <p className="text-norse-muted text-sm mb-4 leading-relaxed">
                Форум для обстоятельных разговоров. Гайды, походы, торговля.
              </p>

              {/* Последняя тема */}
              <div className="bg-black/30 rounded p-3 mb-4 border border-amber-900/20">
                <div className="text-xs text-norse-muted mb-1">Последняя тема:</div>
                <div className="text-sm text-norse-text font-medium line-clamp-1">
                  Гайд: Как убить Эйктюрнира соло
                </div>
                <div className="text-xs text-norse-muted mt-1">2 часа назад</div>
              </div>

              <div className="text-norse-gold text-sm font-semibold">
                Открыть Тинг →
              </div>
            </Link>
          </motion.div>

          {/* Вики */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              to="/wiki"
              className="card-wood rounded-lg p-6 card-corner h-full block hover:border-norse-gold/40 transition-all"
            >
              {/* Крупная цифра */}
              <div className="font-[Cormorant] text-5xl md:text-6xl font-bold text-norse-gold mb-2">
                {wikiCount}
              </div>
              <div className="text-xs text-norse-muted uppercase tracking-wider mb-4">
                статей в вики
              </div>

              {/* Заголовок */}
              <h3 className="font-[Cormorant] text-2xl font-bold text-norse-text mb-2">
                Вики
              </h3>
              <p className="text-norse-muted text-sm mb-4 leading-relaxed">
                Всё про мир, боссов, крафт, билды. Собрано игроками.
              </p>

              {/* Последняя статья */}
              <div className="bg-black/30 rounded p-3 mb-4 border border-amber-900/20">
                <div className="text-xs text-norse-muted mb-1">Последняя статья:</div>
                <div className="text-sm text-norse-text font-medium line-clamp-1">
                  Полный гайд по биомам
                </div>
                <div className="text-xs text-norse-muted mt-1">1 день назад</div>
              </div>

              <div className="text-norse-gold text-sm font-semibold">
                Читать Вики →
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
