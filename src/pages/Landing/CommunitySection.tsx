import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { communityStats } from '../../data/landingData';

export function CommunitySection() {
  const tiles = [
    {
      title: 'Discord',
      description: `Живой чат, голосовые, ивенты. ${communityStats.discord} участников онлайн.`,
      rune: 'ᛊ',
      link: 'https://discord.gg/valheim',
      buttonText: 'Присоединиться',
      isExternal: true,
    },
    {
      title: 'Тинг',
      description: `Форум для обстоятельных разговоров. Гайды, походы, торговля. ${communityStats.ting} тем.`,
      rune: 'ᛏ',
      link: '/ting',
      buttonText: 'Открыть Тинг',
      isExternal: false,
    },
    {
      title: 'Вики',
      description: `Всё про мир, боссов, крафт, билды. Собрано игроками. ${communityStats.wiki} статей.`,
      rune: 'ᚱ',
      link: '/wiki',
      buttonText: 'Читать Вики',
      isExternal: false,
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
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
          {tiles.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {tile.isExternal ? (
                <a
                  href={tile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-wood rounded-lg p-6 card-corner h-full block hover:border-norse-gold/40 transition-all"
                >
                  <div className="text-5xl text-norse-gold font-serif mb-4">
                    {tile.rune}
                  </div>
                  <h3 className="font-[Cormorant] text-2xl font-bold text-norse-text mb-2">
                    {tile.title}
                  </h3>
                  <p className="text-norse-muted text-sm mb-4 leading-relaxed">
                    {tile.description}
                  </p>
                  <div className="text-norse-gold text-sm font-semibold">
                    {tile.buttonText} →
                  </div>
                </a>
              ) : (
                <Link
                  to={tile.link}
                  className="card-wood rounded-lg p-6 card-corner h-full block hover:border-norse-gold/40 transition-all"
                >
                  <div className="text-5xl text-norse-gold font-serif mb-4">
                    {tile.rune}
                  </div>
                  <h3 className="font-[Cormorant] text-2xl font-bold text-norse-text mb-2">
                    {tile.title}
                  </h3>
                  <p className="text-norse-muted text-sm mb-4 leading-relaxed">
                    {tile.description}
                  </p>
                  <div className="text-norse-gold text-sm font-semibold">
                    {tile.buttonText} →
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
