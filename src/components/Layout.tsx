import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { BiomeSelector } from './BiomeSelector';

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
    { path: '/community', label: 'Сообщество', rune: 'ᛏ' },
    { path: '/shop', label: 'Магазин', rune: 'ᛊ' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--biome-background, #141c17)' }}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'glass-dark py-2 shadow-lg shadow-black/20' : 'py-4 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo + Server Status */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-norse-gold text-xl font-serif animate-rune-glow">{theme.rune}</span>
                <span className="font-[Cormorant] font-bold text-norse-gold text-lg hidden sm:block">Хроники Города</span>
              </Link>
              
              {/* Live Status */}
              <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-norse-gold/15">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-norse-muted">Онлайн: <span className="text-norse-gold font-medium">47</span></span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all ${
                    location.pathname === item.path
                      ? 'bg-norse-gold/10 text-norse-gold border border-norse-gold/20'
                      : 'text-norse-muted hover:text-norse-text hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs font-serif">{item.rune}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <BiomeSelector />
              
              {isLoggedIn ? (
                <Link to="/profile" className="hidden sm:flex items-center gap-2 glass-dark rounded-lg px-2 py-1.5 hover:border-norse-gold/30 transition-colors">
                  <span className="text-norse-gold text-xs font-serif">{progress.rank === 'legend' ? 'ᛟ' : progress.rank === 'jarl' ? 'ᛏ' : progress.rank === 'viking' ? 'ᚱ' : 'ᚠ'}</span>
                  <span className="text-norse-text text-[10px]">{getRankName(progress.rank)}</span>
                </Link>
              ) : (
                <Link to="/profile" className="btn-viking btn-viking-secondary !py-1.5 !px-3 !text-[10px] hidden sm:block">
                  Войти
                </Link>
              )}

              <button
                className="md:hidden text-norse-gold text-xl"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden glass-dark mt-2 rounded-lg p-4 space-y-2 animate-scale-in">
              {navItems.map(item => (
                <Link
                  key={item.path}
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
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 md:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-norse-gold/8 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-norse-gold text-sm font-serif">{theme.rune}</span>
                <span className="font-[Cinzel] text-norse-gold/60 text-xs">Хроники Города</span>
              </div>
              <p className="text-norse-muted/40 text-xs">
                Социальная RPG-песочница на движке Valheim.
              </p>
            </div>
            <div>
              <h4 className="text-norse-gold/60 text-xs font-semibold mb-3 uppercase tracking-wider">Сообщество</h4>
              <div className="flex gap-3">
                <a href="https://discord.gg/valheim" target="_blank" rel="noopener noreferrer" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-sm">
                  Discord
                </a>
                <a href="https://t.me/valheim" target="_blank" rel="noopener noreferrer" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-sm">
                  Telegram
                </a>
                <a href="#" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-sm">
                  VK
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-norse-gold/60 text-xs font-semibold mb-3 uppercase tracking-wider">Навигация</h4>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <Link to="/" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">Главная</Link>
                <Link to="/servers" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">Серверы</Link>
                <Link to="/wiki" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">Вики</Link>
                <Link to="/community" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">Сообщество</Link>
                <Link to="/shop" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">Магазин</Link>
                <Link to="/profile" className="text-norse-muted/50 hover:text-norse-gold transition-colors text-xs">Профиль</Link>
              </div>
            </div>
          </div>
          <div className="section-divider mb-4" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-norse-muted/30 text-[10px]">
              © 2026 Valheim MMO Portal
            </p>
            <p className="text-norse-gold/20 text-[10px] font-serif tracking-[0.3em]">
              ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
