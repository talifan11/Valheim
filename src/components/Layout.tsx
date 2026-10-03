import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, User, LogIn, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { BiomeSelector } from './BiomeSelector';

// Компонент для навигации с активным состоянием
function NavLink({ to, children, rune }: { to: string; children: React.ReactNode; rune: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all relative ${
        isActive
          ? 'bg-norse-gold/10 text-norse-gold border border-norse-gold/20'
          : 'text-norse-muted hover:text-norse-text hover:bg-white/5'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="text-xs font-serif">{rune}</span>
      <span>{children}</span>
      {isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
      )}
    </Link>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const { isLoggedIn, progress, getRankName } = useUser();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: 'Главная', rune: 'ᛟ' },
    { path: '/servers', label: 'Серверы', rune: 'ᚠ' },
    { path: '/wiki', label: 'Вики', rune: 'ᚱ' },
    { path: '/skill-tree', label: 'Таланты', rune: 'ᛏ' },
    { path: '/ting', label: 'Тинг', rune: 'ᛏ' },
    { path: '/gallery', label: 'Галерея', rune: 'ᛚ' },
    { path: '/shop', label: 'Магазин', rune: 'ᚦ' },
  ];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--biome-background, #141c17)' }}>
      {/* Skip Link для клавиатурной навигации */}
      <a href="#main-content" className="skip-link">
        Перейти к основному контенту
      </a>

      {/* Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass-dark py-2 shadow-lg shadow-black/20' : 'py-4 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo + Server Status */}
            <div className="flex items-center gap-4 shrink-0">
              <Link to="/" className="flex items-center gap-2">
                <motion.span
                  className="text-norse-gold text-xl font-serif animate-rune-glow"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {theme.rune}
                </motion.span>
                <span className="font-[Cormorant] font-bold text-norse-gold text-lg hidden sm:block">
                  Хроники Города
                </span>
              </Link>

              {/* Live Status */}
              <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-norse-gold/15">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-norse-muted">
                  Онлайн: <span className="text-norse-gold font-medium">47</span>
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink to={item.path} rune={item.rune}>
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* CTA Buttons - ВСЕГДА ВИДНЫ */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Скачать лаунчер - главный CTA */}
              <a
                href="/launcher.exe"
                download
                className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 
                  text-black font-bold rounded-lg hover:from-amber-500 hover:to-amber-400 
                  transition-all shadow-lg hover:shadow-amber-500/50 text-sm"
              >
                <Download size={16} />
                <span className="hidden md:inline">Скачать</span>
              </a>

              {/* Войти / Профиль */}
              {isLoggedIn ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-amber-900/30 
                    rounded-lg hover:bg-white/10 transition-colors"
                >
                  <User size={16} className="text-amber-400" />
                  <span className="text-sm text-norse-text hidden sm:inline">
                    {getRankName(progress.rank)}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-amber-900/30 
                    rounded-lg hover:bg-white/10 transition-colors"
                >
                  <LogIn size={16} className="text-amber-400" />
                  <span className="text-sm text-norse-text hidden sm:inline">Войти</span>
                </Link>
              )}

              {/* Mobile burger */}
              <button
                className="lg:hidden p-2 text-amber-400 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                className="lg:hidden glass-dark mt-2 rounded-lg p-4 space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 px-3 py-2 rounded text-sm ${
                        location.pathname === item.path
                          ? 'bg-norse-gold/10 text-norse-gold'
                          : 'text-norse-muted hover:text-norse-text'
                      }`}
                    >
                      <span className="font-serif">{item.rune}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <div className="pt-3 border-t border-norse-gold/10 space-y-2">
                  <a
                    href="/launcher.exe"
                    download
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 
                      text-black font-bold rounded-lg hover:from-amber-500 hover:to-amber-400 
                      transition-all shadow-lg"
                  >
                    <Download size={16} />
                    <span>Скачать Лаунчер</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Main Content */}
      <main id="main-content" className="pt-16 md:pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-norse-gold/8 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-norse-gold text-sm font-serif">{theme.rune}</span>
                <span className="font-[Cormorant] text-norse-gold/60 text-xs">Хроники Города</span>
              </div>
              <p className="text-norse-muted/40 text-xs">
                Социальная RPG-песочница на движке Valheim.
              </p>
            </div>
            <div>
              <h4 className="text-norse-gold/60 text-xs font-semibold mb-3 uppercase tracking-wider">
                Сообщество
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://discord.gg/valheim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-norse-muted/50 hover:text-norse-gold transition-colors text-sm"
                >
                  Discord
                </a>
                <a
                  href="https://t.me/valheim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-norse-muted/50 hover:text-norse-gold transition-colors text-sm"
                >
                  Telegram
                </a>
                <a href="#" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-sm">
                  VK
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-norse-gold/60 text-xs font-semibold mb-3 uppercase tracking-wider">
                Навигация
              </h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <Link to="/" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">
                  Главная
                </Link>
                <Link to="/servers" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">
                  Серверы
                </Link>
                <Link to="/wiki" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">
                  Вики
                </Link>
                <Link to="/skill-tree" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">
                  Таланты
                </Link>
                <Link to="/community" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">
                  Сообщество
                </Link>
                <Link to="/shop" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">
                  Магазин
                </Link>
                <Link to="/profile" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">
                  Профиль
                </Link>
              </div>
            </div>
          </div>
          <div className="section-divider mb-4" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-norse-muted/30 text-[10px]">© 2026 Valheim MMO Portal</p>
            <p className="text-norse-gold/20 text-[10px] font-serif tracking-[0.3em]">
              ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
