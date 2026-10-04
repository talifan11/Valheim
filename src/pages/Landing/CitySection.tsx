import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function CitySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка — текст */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-[Cormorant] text-4xl md:text-5xl font-bold mb-6 text-norse-text">
              Твой город.
              <br />
              <span className="text-norse-gold">Твои правила.</span>
            </h2>
            <div className="space-y-4 text-norse-muted leading-relaxed">
              <p>
                Строй, торгуй, воюй. Фракции решают всё — от налогов до границ.
              </p>
              <p>
                Здесь нет привилегированных зон. Каждый дом — крепость, которую нужно защищать.
                Каждый союз — договор, который нужно соблюдать.
              </p>
              <p>
                Мэры избираются голосованием. Гильдии воюют за ресурсы. Караваны ходят между городами.
                Это не игра — это общество.
              </p>
            </div>
            <Link
              to="/wiki"
              className="inline-flex items-center gap-2 mt-6 text-norse-gold hover:text-norse-amber transition-colors"
            >
              <span>Читать про фракции</span>
              <span>→</span>
            </Link>
          </motion.div>

          {/* Правая колонка — SVG силуэт города */}
          <motion.div
            className="relative h-80 lg:h-96"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-600/10 rounded-lg border border-amber-900/30">
              {/* SVG силуэт города */}
              <svg
                className="w-full h-full"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Горы на заднем плане */}
                <path
                  d="M0 200 L100 100 L200 180 L300 120 L400 200 L400 300 L0 300 Z"
                  fill="url(#mountainGradient)"
                  opacity="0.3"
                />
                
                {/* Здания */}
                <rect x="50" y="180" width="40" height="80" fill="#C89B3C" opacity="0.6" />
                <rect x="100" y="160" width="50" height="100" fill="#C89B3C" opacity="0.7" />
                <rect x="160" y="170" width="45" height="90" fill="#C89B3C" opacity="0.6" />
                <rect x="215" y="150" width="55" height="110" fill="#C89B3C" opacity="0.8" />
                <rect x="280" y="165" width="40" height="95" fill="#C89B3C" opacity="0.6" />
                <rect x="330" y="175" width="35" height="85" fill="#C89B3C" opacity="0.5" />
                
                {/* Башни */}
                <rect x="115" y="140" width="20" height="20" fill="#C89B3C" opacity="0.9" />
                <rect x="230" y="130" width="25" height="20" fill="#C89B3C" opacity="0.9" />
                
                {/* Окна */}
                <rect x="60" y="200" width="8" height="8" fill="#FFD700" opacity="0.8" />
                <rect x="75" y="200" width="8" height="8" fill="#FFD700" opacity="0.8" />
                <rect x="115" y="180" width="8" height="8" fill="#FFD700" opacity="0.8" />
                <rect x="130" y="180" width="8" height="8" fill="#FFD700" opacity="0.8" />
                <rect x="230" y="170" width="8" height="8" fill="#FFD700" opacity="0.8" />
                <rect x="245" y="170" width="8" height="8" fill="#FFD700" opacity="0.8" />
                
                <defs>
                  <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#C89B3C" />
                    <stop offset="100%" stopColor="#0B0E14" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
