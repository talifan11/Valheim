import { useState, useEffect, useRef } from 'react';

// ============ PARTICLES COMPONENT ============
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 10 + Math.random() * 20,
    size: 2 + Math.random() * 4,
    opacity: 0.2 + Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ============ AUTH MODAL ============
function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative glass-dark rounded-2xl p-8 w-full max-w-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-norse-gold/60 hover:text-norse-gold transition-colors text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">⚔️</div>
          <h2 className="font-[Cinzel] text-2xl font-bold text-norse-gold">
            {mode === 'login' ? 'Войти в Хроники' : 'Присоединиться к Городу'}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {mode === 'login' ? 'Вернись к своим легендам' : 'Начни свой путь с нуля'}
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4 animate-float">🏰</div>
            <p className="text-norse-gold font-[Cinzel] text-lg">
              {mode === 'login' ? 'Добро пожаловать обратно, воин!' : 'Город ждёт тебя!'}
            </p>
            <p className="text-gray-400 mt-2 text-sm">Скачивай лаунчер и начинай...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Имя воина</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-norse-gold/20 rounded-lg px-4 py-3 text-white focus:border-norse-gold/60 focus:outline-none transition-colors placeholder-gray-600"
                  placeholder="Ульф Бессмертный"
                  required
                />
              </div>
            )}
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-norse-gold/20 rounded-lg px-4 py-3 text-white focus:border-norse-gold/60 focus:outline-none transition-colors placeholder-gray-600"
                placeholder="warrior@valheim.gg"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-norse-gold/20 rounded-lg px-4 py-3 text-white focus:border-norse-gold/60 focus:outline-none transition-colors placeholder-gray-600"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-norse bg-gradient-to-r from-norse-gold/90 to-yellow-600/90 text-norse-dark font-bold py-3 rounded-lg mt-6 hover:from-norse-gold hover:to-yellow-500 transition-all"
            >
              {mode === 'login' ? '⚔️ Войти' : '🏰 Создать персонажа'}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-norse-gold/60 hover:text-norse-gold text-sm transition-colors"
          >
            {mode === 'login' ? 'Нет аккаунта? Создать →' : 'Уже есть аккаунт? Войти →'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ NAVBAR ============
function Navbar({ onAuth }: { onAuth: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-dark py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <span className="text-2xl">🏰</span>
          <span className="font-[Cinzel] font-bold text-norse-gold text-lg hidden sm:block">
            Хроники Города
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#pillars" className="text-gray-300 hover:text-norse-gold transition-colors text-sm">
            О сервере
          </a>
          <a href="#phases" className="text-gray-300 hover:text-norse-gold transition-colors text-sm">
            Фазы
          </a>
          <a href="#guilds" className="text-gray-300 hover:text-norse-gold transition-colors text-sm">
            Гильдии
          </a>
          <a href="#classes" className="text-gray-300 hover:text-norse-gold transition-colors text-sm">
            Классы
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-norse-gold transition-colors text-sm">
            Магазин
          </a>
          <a href="#download" className="text-gray-300 hover:text-norse-gold transition-colors text-sm">
            Лаунчер
          </a>
          <button
            onClick={onAuth}
            className="btn-norse bg-norse-gold/10 border border-norse-gold/40 text-norse-gold px-5 py-2 rounded-lg text-sm font-medium hover:bg-norse-gold/20 transition-all"
          >
            Войти
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-norse-gold text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-dark mt-2 mx-4 rounded-xl p-6 space-y-4 animate-scale-in">
          <a href="#pillars" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-norse-gold">О сервере</a>
          <a href="#phases" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-norse-gold">Фазы</a>
          <a href="#guilds" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-norse-gold">Гильдии</a>
          <a href="#classes" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-norse-gold">Классы</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-norse-gold">Магазин</a>
          <a href="#download" onClick={() => setMobileOpen(false)} className="block text-gray-300 hover:text-norse-gold">Лаунчер</a>
          <button onClick={() => { onAuth(); setMobileOpen(false); }} className="w-full btn-norse bg-norse-gold/10 border border-norse-gold/40 text-norse-gold px-5 py-2 rounded-lg text-sm font-medium">
            Войти
          </button>
        </div>
      )}
    </nav>
  );
}

// ============ HERO SECTION ============
function HeroSection({ onAuth }: { onAuth: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 50;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          return target;
        }
        return Math.min(prev + step, target);
      });
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(https://image.qwenlm.ai/generated-images/47ad5ec6-3bbb-4186-b94c-55e833b8b635/_result.png)' }}
      />
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-norse-purple/30 via-norse-dark/80 to-norse-darker" />
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated portal effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
        <div className="absolute inset-0 rounded-full border-2 border-norse-gold/30 animate-portal-spin" />
        <div className="absolute inset-8 rounded-full border border-norse-gold/20 animate-portal-spin" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
        <div className="absolute inset-16 rounded-full border border-norse-purple/40 animate-portal-spin" style={{ animationDuration: '25s' }} />
      </div>

      <Particles />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <div className="inline-flex items-center gap-2 bg-norse-gold/10 border border-norse-gold/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-norse-gold">Сервер онлайн • {Math.floor(count)}+ воинов</span>
          </div>
        </div>

        <h1 className="animate-fade-in-up font-[Cinzel] text-5xl md:text-7xl lg:text-8xl font-black mb-6" style={{ animationDelay: '0.4s', opacity: 0 }}>
          <span className="animate-shimmer">Хроники</span>
          <br />
          <span className="text-white">Города</span>
        </h1>

        <p className="animate-fade-in-up text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '0.6s', opacity: 0 }}>
          Это не игра про выживание.
          <br />
          <span className="text-norse-gold font-semibold">Это игра про людей.</span>
        </p>

        <p className="animate-fade-in-up text-gray-400 mb-10 max-w-2xl mx-auto" style={{ animationDelay: '0.8s', opacity: 0 }}>
          Социальная RPG-песочница на движке Valheim. 50+ игроков строят живое общество с нуля. 
          Лидеры рождаются из хаоса. Гильдии формируются стихийно. Легенды создаются вместе.
        </p>

        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '1s', opacity: 0 }}>
          <a
            href="#download"
            className="btn-norse animate-pulse-glow bg-gradient-to-r from-norse-gold to-yellow-600 text-norse-dark font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-transform"
          >
            ⬇ Скачать Лаунчер
          </a>
          <button
            onClick={onAuth}
            className="btn-norse border-2 border-norse-gold/40 text-norse-gold px-8 py-4 rounded-xl text-lg hover:bg-norse-gold/10 transition-all"
          >
            🏰 Создать Аккаунт
          </button>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto" style={{ animationDelay: '1.2s', opacity: 0 }}>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-norse-gold">50+</div>
            <div className="text-xs text-gray-500 mt-1">Игроков онлайн</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-norse-gold">6</div>
            <div className="text-xs text-gray-500 mt-1">Классов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-norse-gold">∞</div>
            <div className="text-xs text-gray-500 mt-1">Историй</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-norse-gold/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-norse-gold/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// ============ PILLARS SECTION ============
function PillarsSection() {
  const pillars = [
    {
      icon: '🗡️',
      title: 'Свобода Роли',
      desc: 'Нет классов на бумаге — есть пути через поступки. Стал кузнецом? Ты кузнец. Спас город? Ты герой. Решаешь ты, не система.',
      color: 'from-red-900/20 to-transparent',
    },
    {
      icon: '🏝️',
      title: 'Ограниченный Старт',
      desc: 'Тесный остров. Конечные ресурсы. Голые руки. Единственный выход — договариваться. Так рождаются союзы и торговля.',
      color: 'from-norse-blue/20 to-transparent',
    },
    {
      icon: '🏰',
      title: 'Живой Социум',
      desc: 'Город строится сам. Лидеры рождаются из хаоса. Мэры избираются голосованием. Гильдии воюют и торгуют.',
      color: 'from-norse-purple/20 to-transparent',
    },
  ];

  return (
    <section id="pillars" className="relative py-32 px-6">
      <div className="rune-decoration top-10 left-10">ᚠ</div>
      <div className="rune-decoration bottom-10 right-10">ᚦ</div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[Cinzel] text-4xl md:text-5xl font-bold mb-4">
            <span className="text-norse-gold">Три Столпа</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы не просто ставим моды. Мы создаём условия, в которых рождаются истории.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className={`card-hover glass rounded-2xl p-8 bg-gradient-to-b ${pillar.color}`}
            >
              <div className="text-5xl mb-6">{pillar.icon}</div>
              <h3 className="font-[Cinzel] text-xl font-bold text-white mb-4">{pillar.title}</h3>
              <p className="text-gray-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="mt-20 text-center">
          <blockquote className="font-[Cinzel] text-2xl md:text-3xl text-norse-gold/80 italic max-w-3xl mx-auto">
            «Мы начали голыми на пляже. Закончим богами за горами.»
          </blockquote>
        </div>
      </div>
    </section>
  );
}

// ============ PHASES SECTION ============
function PhasesSection() {
  const phases = [
    {
      phase: 'Фаза 1',
      title: 'Пустошь и Город',
      period: 'Дни 1–14',
      icon: '🏚️',
      description: '50 игроков просыпаются на пустом острове без ничего. Первые часы — хаос. Кто-то строит верстак — становится кузнецом. Кто-то убивает кабана — становится охотником. Роли рождаются из потребностей.',
      highlights: ['Первый рейд в 20:00', 'Выборы Мэра', 'Открытие Храма', '6 классов'],
      color: 'border-norse-gold/40',
    },
    {
      phase: 'Фаза 2',
      title: 'Экспансия',
      period: 'Недели 3–8',
      icon: '🌀',
      description: 'Великий Портал открывается. Ресурсные миры: Чёрный Лес, Горы, Болото, Равнины. Караваны ходят за ресурсами. Гильдии воюют за жилы. PvP за стенами.',
      highlights: ['4 ресурсных мира', 'PvP-зоны', 'Гильдейские войны', 'Караваны'],
      color: 'border-norse-blue/40',
    },
    {
      phase: 'Фаза 3',
      title: 'Война и Легенды',
      period: 'Месяц 3+',
      icon: '⚔️',
      description: 'Вторые города. Фракции: Старая Гвардия vs Новые. Осады крепостей. Легендарные игроки становятся мифами сервера. Совет Гильдий управляет вместе с Мэром.',
      highlights: ['Осады', 'Легенды', 'Совет Гильдий', 'Турниры'],
      color: 'border-norse-red/40',
    },
  ];

  return (
    <section id="phases" className="relative py-32 px-6">
      <div className="section-divider mb-20" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[Cinzel] text-4xl md:text-5xl font-bold mb-4">
            <span className="text-norse-gold">Эволюция Города</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Сервер развивается вместе с игроками. Каждая фаза — новая глава истории.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 timeline-line hidden md:block" />

          <div className="space-y-16">
            {phases.map((phase, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-norse-gold rounded-full border-4 border-norse-dark z-10 hidden md:block" />

                {/* Content card */}
                <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                  <div className={`glass rounded-2xl p-8 border-l-4 ${phase.color} card-hover`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl">{phase.icon}</span>
                      <div>
                        <span className="text-xs text-norse-gold uppercase tracking-wider">{phase.phase} • {phase.period}</span>
                        <h3 className="font-[Cinzel] text-xl font-bold text-white">{phase.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4 leading-relaxed">{phase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {phase.highlights.map((h, j) => (
                        <span key={j} className="text-xs bg-norse-gold/10 text-norse-gold px-3 py-1 rounded-full border border-norse-gold/20">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ GUILDS SECTION ============
function GuildsSection() {
  const guilds = [
    { icon: '🔨', name: 'Ремесленная', role: 'Экономический хребет', desc: 'Крафт, торговля, снабжение города' },
    { icon: '⚔️', name: 'Боевая', role: 'Военная сила', desc: 'Рейды, зачистка данжей, охрана' },
    { icon: '🐎', name: 'Торговая', role: 'Связь городов', desc: 'Караваны, бартер, логистика' },
    { icon: '🏗️', name: 'Строительная', role: 'Развитие', desc: 'Возведение зданий, стен, инфраструктуры' },
    { icon: '🗡️', name: 'Воровская', role: 'Антагонисты', desc: 'Кражи, контрабанда, тёмные сделки' },
  ];

  return (
    <section id="guilds" className="relative py-32 px-6">
      <div className="section-divider mb-20" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[Cinzel] text-4xl md:text-5xl font-bold mb-4">
            <span className="text-norse-gold">Система Гильдий</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Гильдии не создаются администрацией. Они рождаются стихийно — из групп, которые вместе ходят в рейды.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guilds.map((guild, i) => (
            <div key={i} className="card-hover glass rounded-xl p-6 group">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform">{guild.icon}</span>
                <div>
                  <h3 className="font-[Cinzel] font-bold text-white">{guild.name}</h3>
                  <p className="text-xs text-norse-gold">{guild.role}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">{guild.desc}</p>
            </div>
          ))}

          {/* Extra card - guild structure */}
          <div className="card-hover glass rounded-xl p-6 border border-norse-gold/20">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">👑</span>
              <div>
                <h3 className="font-[Cinzel] font-bold text-white">Структура</h3>
                <p className="text-xs text-norse-gold">Иерархия</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2"><span className="text-norse-gold">◆</span> Гильдмастер — лидер</div>
              <div className="flex items-center gap-2"><span className="text-norse-gold/70">◆</span> Офицеры — заместители</div>
              <div className="flex items-center gap-2"><span className="text-norse-gold/50">◆</span> Рядовые — участники</div>
              <div className="flex items-center gap-2"><span className="text-norse-gold/30">◆</span> Ученики — новички</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CLASSES SECTION ============
function ClassesSection() {
  const classes = [
    { icon: '⚔️', name: 'Воин', desc: 'Мастер ближнего боя. Урон, скорость, combos.', color: 'text-red-400' },
    { icon: '🛡️', name: 'Танк', desc: 'Непробиваемая стена. Защита союзников.', color: 'text-blue-400' },
    { icon: '💚', name: 'Целитель', desc: 'Самый дефицитный. Без него в данж не сунешься.', color: 'text-green-400' },
    { icon: '🔮', name: 'Маг', desc: 'Стихии и проклятия. Контроль поля боя.', color: 'text-purple-400' },
    { icon: '🏹', name: 'Стрелок', desc: 'Смертельная точность. Урон из тени.', color: 'text-yellow-400' },
    { icon: '🌿', name: 'Друид', desc: 'Сила природы. Призыв зверей, лечение.', color: 'text-emerald-400' },
  ];

  return (
    <section id="classes" className="relative py-32 px-6">
      <div className="section-divider mb-20" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[Cinzel] text-4xl md:text-5xl font-bold mb-4">
            <span className="text-norse-gold">Пути Богов</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            6 классов через Храм. Присягаешь пути — получаешь способности. Прокачка через действия, не уровни.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls, i) => (
            <div key={i} className="card-hover glass rounded-xl p-6 text-center group">
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{cls.icon}</div>
              <h3 className={`font-[Cinzel] text-lg font-bold ${cls.color} mb-2`}>{cls.name}</h3>
              <p className="text-gray-400 text-sm">{cls.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 glass rounded-xl p-6 text-center">
          <p className="text-gray-300">
            <span className="text-norse-gold font-semibold">💡 Смена класса</span> возможна, но ты теряешь весь прогресс. 
            Выбирай путь мудро — или стань мастером на все руки.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============ PORTALS SECTION ============
function PortalsSection() {
  const portals = [
    { biome: 'Чёрный Лес', icon: '🌲', resources: 'Бронза, троллиная кожа', danger: 'Средняя', dangerColor: 'text-yellow-400' },
    { biome: 'Горы', icon: '🏔️', resources: 'Серебро, волчья шкура', danger: 'Высокая', dangerColor: 'text-orange-400' },
    { biome: 'Болото', icon: '🌫️', resources: 'Железо, древняя кора', danger: 'Очень высокая', dangerColor: 'text-red-400' },
    { biome: 'Равнины', icon: '🌾', resources: 'Чёрный металл, лён', danger: 'Смертельная', dangerColor: 'text-red-600' },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="section-divider mb-20" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[Cinzel] text-4xl md:text-5xl font-bold mb-4">
            <span className="text-norse-gold">Великие Порталы</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ресурсные миры за стенами города. Вайп раз в сутки. PvP разрешён. Заходи — или погибни.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal, i) => (
            <div key={i} className="card-hover glass rounded-xl p-6 text-center relative overflow-hidden group">
              {/* Portal glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-norse-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:animate-float">{portal.icon}</div>
                <h3 className="font-[Cinzel] font-bold text-white mb-2">{portal.biome}</h3>
                <p className="text-sm text-gray-400 mb-3">{portal.resources}</p>
                <div className={`text-xs font-medium ${portal.dangerColor}`}>
                  ⚠ {portal.danger}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PRICING SECTION ============
function PricingSection() {
  const items = [
    { icon: '🎨', name: 'Скины и плащи', price: '100–500 ₽', desc: 'Визуальная кастомизация' },
    { icon: '🏠', name: 'Расширенный участок', price: '300 ₽/мес', desc: 'Больше территории для строительства' },
    { icon: '🎫', name: 'Приоритетный вход', price: '200 ₽/мес', desc: 'Без очереди при полном сервере' },
    { icon: '👑', name: 'Титул «Барон»', price: '500 ₽', desc: 'Отображается над головой' },
    { icon: '🤖', name: 'NPC-торговец', price: '1000 ₽', desc: 'Персональный торговец в доме' },
    { icon: '🎉', name: 'Спонсор ивента', price: '2000 ₽', desc: 'Организуй свой праздник' },
  ];

  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="section-divider mb-20" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[Cinzel] text-4xl md:text-5xl font-bold mb-4">
            <span className="text-norse-gold">Лавка Комфорта</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Платишь за понты и комфорт, а не за силу. Вход — бесплатный.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="card-hover glass rounded-xl p-6 flex items-start gap-4">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h3 className="font-bold text-white">{item.name}</h3>
                <p className="text-norse-gold font-semibold text-sm">{item.price}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Anti pay-to-win badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 glass rounded-full px-6 py-3 border border-green-500/20">
            <span className="text-green-400 text-xl">✓</span>
            <span className="text-gray-300 text-sm">
              <span className="text-green-400 font-semibold">Никакого Pay-to-Win.</span> Ресурсы, оружие, земля, победа — не продаются.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ LEGENDS SECTION ============
function LegendsSection() {
  const legends = [
    {
      name: 'Ульф-Мэр',
      title: 'Первый Мэр Города',
      icon: '👑',
      story: 'Победил на выборах не мечом, а рагу. Сварил лучший суп для 50 голодных воинов — и город выбрал его.',
      quote: '«Власть — это не трон. Это доверие.»',
    },
    {
      name: 'Свен-Восьмирукий',
      title: 'Герой Рейда',
      icon: '⚔️',
      story: 'Первым ворвался в Логово Короля Рейдеров. Отгрыз корону зубами, когда сломался топор.',
      quote: '«У меня восемь рук и ноль страхов.»',
    },
    {
      name: 'Хильдир-Целитель',
      title: 'Звезда Города',
      icon: '💚',
      story: 'Вылечила 10 000 HP за одну ночь рейда. Погила у стены, прикрывая отступление. Город поставил статую.',
      quote: '«Пока я стою — никто не упадёт.»',
    },
    {
      name: 'Рагнар-Крыса',
      title: 'Первый Предатель',
      icon: '🗡️',
      story: 'Украл ключ от портала и сбежал за стены. Живёт один в Чёрном Лесу. Никто не знает — жив ли.',
      quote: '«Свобода стоит дороже дружбы.»',
    },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="section-divider mb-20" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[Cinzel] text-4xl md:text-5xl font-bold mb-4">
            <span className="text-norse-gold">Легенды Сервера</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Каждый рейд, каждое подземелье — событие, которое запоминается. 
            Здесь рождаются имена, которые будут помнить поколения.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {legends.map((legend, i) => (
            <div key={i} className="card-hover glass rounded-2xl p-8 relative overflow-hidden group">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-norse-gold/5 rounded-full blur-2xl group-hover:bg-norse-gold/10 transition-colors" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-5xl">{legend.icon}</span>
                  <div>
                    <h3 className="font-[Cinzel] text-xl font-bold text-white">{legend.name}</h3>
                    <p className="text-norse-gold text-sm">{legend.title}</p>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">{legend.story}</p>
                <blockquote className="text-gray-500 italic text-sm border-l-2 border-norse-gold/30 pl-4">
                  {legend.quote}
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center glass rounded-xl p-6">
          <p className="text-gray-300">
            <span className="text-norse-gold font-semibold">Твоя легенда ещё не написана.</span>
            {' '}Присоединяйся — и через месяц о тебе будут рассказывать у костра.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============ WHY US SECTION ============
function WhyUsSection() {
  const reasons = [
    { icon: '🔥', title: 'Общая угроза', desc: 'Рейдеры приходят каждый день. Один — умрёшь. Вместе — выживёте.' },
    { icon: '💰', title: 'Экономическая выгода', desc: 'Специализация эффективнее. Кузнец + охотник + целитель = непобедимая группа.' },
    { icon: '⏳', title: 'Дефицит ресурсов', desc: 'Остров маленький. Ресурсы конечные. Приходится договариваться.' },
    { icon: '⭐', title: 'Социальный статус', desc: 'Быть целителем, мэром, гильдмастером — престижно. Все знают тебя в лицо.' },
    { icon: '📖', title: 'Общая история', desc: 'Каждый рейд — событие. Каждое подземелье — воспоминание на годы.' },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="section-divider mb-20" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-[Cinzel] text-4xl md:text-5xl font-bold mb-4">
            <span className="text-norse-gold">Почему Люди Объединяются</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы не заставляем. Мы создаём условия, в которых дружба — единственный путь к победе.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {reasons.map((reason, i) => (
            <div key={i} className="card-hover glass rounded-xl p-5 text-center">
              <div className="text-3xl mb-3">{reason.icon}</div>
              <h3 className="font-bold text-white text-sm mb-2">{reason.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ DOWNLOAD SECTION ============
function DownloadSection({ onAuth }: { onAuth: () => void }) {
  return (
    <section id="download" className="relative py-32 px-6 overflow-hidden">
      <div className="section-divider mb-20" />
      
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-norse-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="text-6xl mb-8 animate-float">⬇️</div>
        <h2 className="font-[Cinzel] text-4xl md:text-5xl font-bold mb-6">
          <span className="text-white">Готов начать </span>
          <span className="text-norse-gold">легенду?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Скачай кастомный лаунчер — и через 2 минуты ты уже на острове. 
          Бесплатно. Без доната для старта. Только ты, 50 таких же безумцев, и пустой мир.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="btn-norse animate-pulse-glow bg-gradient-to-r from-norse-gold to-yellow-600 text-norse-dark font-bold px-10 py-5 rounded-xl text-lg hover:scale-105 transition-transform flex items-center gap-3"
          >
            <span className="text-2xl">🖥️</span>
            Скачать Лаунчер (Windows)
          </a>
          <button
            onClick={onAuth}
            className="btn-norse border-2 border-norse-gold/40 text-norse-gold px-8 py-5 rounded-xl text-lg hover:bg-norse-gold/10 transition-all"
          >
            Сначала регистрация
          </button>
        </div>

        <p className="text-gray-600 text-sm mt-6">
          Windows 10/11 • 4 GB RAM • 2 GB на диске
        </p>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-norse-gold/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🏰</span>
              <span className="font-[Cinzel] font-bold text-norse-gold">Хроники Города</span>
            </div>
            <p className="text-gray-500 text-sm">
              Социальная RPG-песочница на движке Valheim. 
              Не просто сервер — живое общество.
            </p>
          </div>
          <div>
            <h4 className="font-[Cinzel] text-white font-bold mb-4">Навигация</h4>
            <div className="space-y-2">
              <a href="#pillars" className="block text-gray-500 hover:text-norse-gold text-sm transition-colors">О сервере</a>
              <a href="#phases" className="block text-gray-500 hover:text-norse-gold text-sm transition-colors">Фазы развития</a>
              <a href="#guilds" className="block text-gray-500 hover:text-norse-gold text-sm transition-colors">Гильдии</a>
              <a href="#classes" className="block text-gray-500 hover:text-norse-gold text-sm transition-colors">Классы</a>
            </div>
          </div>
          <div>
            <h4 className="font-[Cinzel] text-white font-bold mb-4">Сообщество</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-500 hover:text-norse-gold text-sm transition-colors">Discord</a>
              <a href="#" className="block text-gray-500 hover:text-norse-gold text-sm transition-colors">VK</a>
              <a href="#" className="block text-gray-500 hover:text-norse-gold text-sm transition-colors">Telegram</a>
              <a href="#download" className="block text-gray-500 hover:text-norse-gold text-sm transition-colors">Скачать лаунчер</a>
            </div>
          </div>
        </div>
        
        <div className="section-divider mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 Valheim: Хроники Города. Все права на моды принадлежат их авторам.
          </p>
          <p className="text-gray-600 text-xs">
            Сделано с ⚔️ для воинов
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-norse-darker text-gray-200 overflow-x-hidden">
      <Navbar onAuth={() => setAuthOpen(true)} />
      <HeroSection onAuth={() => setAuthOpen(true)} />
      <PillarsSection />
      <PhasesSection />
      <GuildsSection />
      <ClassesSection />
      <PortalsSection />
      <LegendsSection />
      <WhyUsSection />
      <PricingSection />
      <DownloadSection onAuth={() => setAuthOpen(true)} />
      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
