import React from 'react';
import { Link } from 'react-router-dom';
import { useServerStatus } from '../hooks/useServerStatus';
import { useUser } from '../context/UserContext';
import { DailyTasks } from '../components/DailyTasks';

export function HomePage() {
  const { servers, totalPlayers, onlineServers } = useServerStatus();
  const { isLoggedIn } = useUser();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/N2rwO0ET8G4?autoplay=1&mute=1&loop=1&playlist=N2rwO0ET8G4&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
            title="Valheim Cinematic"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 0 }}
          />
        </div>
        <div className="absolute inset-0 video-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--biome-background)] via-transparent to-[var(--biome-background)]/60" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="animate-fade-in-up font-[Cinzel] text-5xl md:text-7xl lg:text-8xl font-black mb-6" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <span className="animate-shimmer">Хроники</span>
            <br />
            <span className="text-norse-text">Города</span>
          </h1>

          <p className="animate-fade-in-up text-xl md:text-2xl text-norse-muted mb-4" style={{ animationDelay: '0.4s', opacity: 0 }}>
            Это не игра про выживание.
            <br />
            <span className="text-norse-gold font-semibold">Это игра про людей.</span>
          </p>

          <p className="animate-fade-in-up text-norse-muted/80 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '0.6s', opacity: 0 }}>
            Социальная RPG-песочница. 50+ игроков строят живое общество с нуля.
          </p>

          <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.8s', opacity: 0 }}>
            <a href="#download" className="btn-viking btn-viking-primary animate-pulse-glow flex items-center gap-2">
              <span>⬇</span> Скачать Лаунчер
            </a>
            <Link to="/servers" className="btn-viking btn-viking-secondary">
              Статус Серверов
            </Link>
          </div>
        </div>
      </section>

      {/* Server Status Bar */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-dark rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-norse-text text-sm font-semibold">Статус Серверов</span>
              </div>
              <Link to="/servers" className="text-norse-gold text-xs hover:underline">Подробнее →</Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {servers.slice(0, 5).map((server, i) => (
                <div key={i} className="text-center">
                  <div className="text-norse-text text-xs font-medium truncate mb-1">{server.name}</div>
                  <div className={`text-lg font-bold ${server.status === 'online' ? 'text-green-500' : server.status === 'maintenance' ? 'text-yellow-500' : 'text-red-500'}`}>
                    {server.status === 'online' ? `${server.players}/${server.maxPlayers}` : server.status === 'maintenance' ? 'Ремонт' : 'Оффлайн'}
                  </div>
                  {server.status === 'online' && (
                    <div className="text-[9px] text-norse-muted">TPS: {server.tps.toFixed(1)}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-[Cinzel] text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="text-norse-gold">Три Столпа</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-hover card-wood rounded-lg p-6 card-corner">
              <div className="rune-icon mb-4">
                <span className="text-xl font-serif">ᛏ</span>
              </div>
              <h3 className="font-[Cinzel] text-lg font-bold text-norse-text mb-2">Свобода Роли</h3>
              <p className="text-norse-muted text-sm">Нет классов на бумаге — есть пути через поступки.</p>
            </div>
            <div className="card-hover card-wood rounded-lg p-6 card-corner">
              <div className="rune-icon mb-4">
                <span className="text-xl font-serif">ᛚ</span>
              </div>
              <h3 className="font-[Cinzel] text-lg font-bold text-norse-text mb-2">Ограниченный Старт</h3>
              <p className="text-norse-muted text-sm">Тесный остров. Конечные ресурсы. Единственный выход — договариваться.</p>
            </div>
            <div className="card-hover card-wood rounded-lg p-6 card-corner">
              <div className="rune-icon mb-4">
                <span className="text-xl font-serif">ᛟ</span>
              </div>
              <h3 className="font-[Cinzel] text-lg font-bold text-norse-text mb-2">Живой Социум</h3>
              <p className="text-norse-muted text-sm">Город строится сам. Лидеры рождаются из хаоса.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Tasks + Info */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <DailyTasks />
          
          <div className="glass-dark rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-norse-gold text-lg font-serif">ᚠ</span>
              <h3 className="text-norse-text font-[Cinzel] font-bold text-sm">Записки Хранителя</h3>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded bg-norse-gold/5 border border-norse-gold/10">
                <div className="text-norse-gold text-xs font-semibold mb-1">День 47: Открытие Портала</div>
                <p className="text-norse-muted/70 text-xs">Великий Портал в Чёрный Лес активирован. Первая экспедиция уже собрана.</p>
              </div>
              <div className="p-3 rounded bg-norse-gold/5 border border-norse-gold/10">
                <div className="text-norse-gold text-xs font-semibold mb-1">День 45: Выборы Мэра</div>
                <p className="text-norse-muted/70 text-xs">Ульф переизбран на второй срок. Обещал расширить рынок.</p>
              </div>
              <div className="p-3 rounded bg-norse-gold/5 border border-norse-gold/10">
                <div className="text-norse-gold text-xs font-semibold mb-1">День 42: Первая Гильдия</div>
                <p className="text-norse-muted/70 text-xs">«Железный Кулак» официально зарегистрирована. 12 членов.</p>
              </div>
            </div>
          </div>
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
