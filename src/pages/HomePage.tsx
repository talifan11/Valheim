import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useServerStatus } from '../hooks/useServerStatus';
import { useUser } from '../context/UserContext';
import { DailyTasks } from '../components/DailyTasks';
import { ChroniclesWidget } from '../components/ChroniclesWidget';
import { DiscordWidget } from '../components/DiscordWidget';
import { ProgressBar } from '../components/ui/ProgressBar';

export function HomePage() {
  const { servers, totalPlayers, onlineServers } = useServerStatus();
  const { isLoggedIn } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300 },
    },
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Poster image for performance */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1605000797499-95a51c526dae?w=1920&q=75)' }}
        />
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/N2rwO0ET8G4?autoplay=1&mute=1&loop=1&playlist=N2rwO0ET8G4&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
            title="Valheim Cinematic"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 0 }}
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 video-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--biome-background)] via-transparent to-[var(--biome-background)]/60" />

        <div className="relative z-10 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Main Content */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <h1 className="animate-fade-in-up font-[Cormorant] text-5xl md:text-7xl lg:text-8xl font-bold mb-6" style={{ animationDelay: '0.2s', opacity: 0 }}>
                <span className="animate-shimmer">Хроники</span>
                <br />
                <span className="text-norse-text">Города</span>
              </h1>

              <p className="animate-fade-in-up text-xl md:text-2xl text-norse-muted mb-4 font-[Cormorant] italic" style={{ animationDelay: '0.4s', opacity: 0 }}>
                «Мы начали голыми на пляже.
                <br />
                <span className="text-norse-gold font-semibold not-italic">Закончим богами за горами.»</span>
              </p>

              <p className="animate-fade-in-up text-norse-muted/80 mb-10 max-w-2xl mx-auto lg:mx-0" style={{ animationDelay: '0.6s', opacity: 0 }}>
                Социальная RPG-песочница на движке Valheim. 50+ игроков строят живое общество с нуля. Лидеры рождаются из хаоса. Гильдии формируются стихийно.
              </p>

              <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" style={{ animationDelay: '0.8s', opacity: 0 }}>
                <a href="#download" className="btn-viking btn-viking-primary animate-pulse-glow flex items-center gap-2">
                  <span>⬇</span> Скачать Лаунчер
                </a>
                <Link to="/servers" className="btn-viking btn-viking-secondary">
                  Статус Серверов
                </Link>
              </div>
            </div>

            {/* Server Status Widget */}
            <div className="animate-fade-in-up lg:col-span-1" style={{ animationDelay: '1s', opacity: 0 }}>
              <div className="glass-dark rounded-lg p-4 card-corner">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-norse-text text-sm font-semibold">Серверы онлайн</span>
                </div>
                <div className="space-y-2">
                  {servers.slice(0, 3).map((server, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <span className="text-norse-muted truncate">{server.name}</span>
                      <span className="text-norse-gold font-semibold">{server.players}/{server.maxPlayers}</span>
                    </div>
                  ))}
                </div>
                <Link to="/servers" className="block mt-3 text-center text-norse-gold text-xs hover:underline">
                  Подробнее →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Server Status Bar */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="glass-dark rounded-lg p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-norse-text text-sm font-semibold">Статус Серверов</span>
              </div>
              <Link to="/servers" className="text-norse-gold text-xs hover:underline">
                Подробнее →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {servers.slice(0, 5).map((server, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-norse-text text-xs font-medium truncate mb-1">{server.name}</div>
                  <div
                    className={`text-lg font-bold ${
                      server.status === 'online'
                        ? 'text-green-500'
                        : server.status === 'maintenance'
                        ? 'text-yellow-500'
                        : 'text-red-500'
                    }`}
                  >
                    {server.status === 'online'
                      ? `${server.players}/${server.maxPlayers}`
                      : server.status === 'maintenance'
                      ? 'Ремонт'
                      : 'Оффлайн'}
                  </div>
                  {server.status === 'online' && (
                    <>
                      <ProgressBar
                        value={server.players}
                        max={server.maxPlayers}
                        showValue={false}
                        color={server.players >= server.maxPlayers * 0.9 ? 'red' : 'green'}
                        size="sm"
                      />
                      <div className="text-[9px] text-norse-muted mt-1">TPS: {server.tps.toFixed(1)}</div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-[Cinzel] text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-norse-gold">Три Столпа</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="card-hover card-wood rounded-lg p-6 card-corner"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="rune-icon mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xl font-serif">ᛏ</span>
              </motion.div>
              <h3 className="font-[Cinzel] text-lg font-bold text-norse-text mb-2">Свобода Роли</h3>
              <p className="text-norse-muted text-sm">Нет классов на бумаге — есть пути через поступки.</p>
            </motion.div>
            <motion.div
              className="card-hover card-wood rounded-lg p-6 card-corner"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="rune-icon mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xl font-serif">ᛚ</span>
              </motion.div>
              <h3 className="font-[Cinzel] text-lg font-bold text-norse-text mb-2">Ограниченный Старт</h3>
              <p className="text-norse-muted text-sm">
                Тесный остров. Конечные ресурсы. Единственный выход — договариваться.
              </p>
            </motion.div>
            <motion.div
              className="card-hover card-wood rounded-lg p-6 card-corner"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)',
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="rune-icon mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-xl font-serif">ᛟ</span>
              </motion.div>
              <h3 className="font-[Cinzel] text-lg font-bold text-norse-text mb-2">Живой Социум</h3>
              <p className="text-norse-muted text-sm">Город строится сам. Лидеры рождаются из хаоса.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Daily Tasks + Chronicles + Discord */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <DailyTasks />
            <ChroniclesWidget />
          </div>
          <DiscordWidget />
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-[Cinzel] text-3xl md:text-4xl font-bold mb-6">
            <span className="text-norse-text">Готов начать </span>
            <span className="text-norse-gold">легенду?</span>
          </h2>
          <p className="text-norse-muted mb-8">
            Скачай лаунчер — и через 2 минуты ты уже на острове.
          </p>
          <a href="#" className="btn-viking btn-viking-primary animate-pulse-glow inline-flex items-center gap-2">
            <span>⬇</span> Скачать Лаунчер (Windows)
          </a>
          <p className="text-norse-muted/40 text-xs mt-4">Windows 10/11 • 4 GB RAM • 2 GB на диске</p>
        </div>
      </section>
    </div>
  );
}
