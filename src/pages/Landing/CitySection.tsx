import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function CitySection() {
  return (
    <section className="py-24 px-6 bg-[#0B0E14]">
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

          {/* Правая колонка — city-panorama */}
          <motion.div
            className="relative h-80 lg:h-96"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <img
                src="https://image.qwenlm.ai/generated-images/bf7a5499-1488-4602-9672-b456daa264a7/_result.png"
                alt="Викингское поселение на утёсе"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Виньетка */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E14]/50 via-transparent to-[#0B0E14]/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
