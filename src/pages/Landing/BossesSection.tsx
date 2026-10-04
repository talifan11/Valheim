import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bosses } from '../../data/landingData';
import { RuneDivider } from './components/RuneDivider';

export function BossesSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setScrollProgress(scrollLeft / (scrollWidth - clientWidth));
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener('scroll', updateScrollState);
    updateScrollState();
    return () => slider.removeEventListener('scroll', updateScrollState);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = 320 + 24; // card width + gap
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-24 px-6 bg-[#10080A] relative">
      {/* Виньетка */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#10080A]/50 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <RuneDivider rune="ᛟ" />
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

        {/* Слайдер с градиентной маской */}
        <div className="relative">
          {/* Градиентная маска слева */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#10080A] to-transparent pointer-events-none z-10" />
          )}
          
          {/* Градиентная маска справа */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#10080A] to-transparent pointer-events-none z-10" />
          )}

          {/* Стрелки навигации (desktop only) */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-norse-gold/30 items-center justify-center text-norse-gold hover:bg-black/80 hover:border-norse-gold/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Предыдущий босс"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-norse-gold/30 items-center justify-center text-norse-gold hover:bg-black/80 hover:border-norse-gold/60 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Следующий босс"
          >
            <ChevronRight size={24} />
          </button>

          {/* Слайдер */}
          <div
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-6 px-6"
          >
            <div className="flex gap-6 min-w-max">
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
                    </div>

                    <div className="p-6">
                      {/* Имя босса с руной */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-norse-gold font-serif text-base">{boss.rune}</span>
                        <h3 className="font-[Cormorant] text-2xl font-bold text-norse-text">
                          {boss.name}
                        </h3>
                      </div>

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

          {/* Прогресс-линия */}
          <div className="mt-6 max-w-xs mx-auto">
            <div className="h-1 bg-norse-muted/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-norse-gold rounded-full"
                style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
