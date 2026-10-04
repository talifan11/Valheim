import React from 'react';
import { Link } from 'react-router-dom';

export function LandingFooter() {
  return (
    <footer className="border-t border-norse-gold/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Логотип */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-norse-gold text-xl font-serif">ᛟ</span>
              <span className="font-[Cormorant] font-bold text-norse-gold text-sm">
                Хроники Города
              </span>
            </div>
            <p className="text-norse-muted/60 text-xs">
              Социальная RPG-песочница на движке Valheim.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-norse-gold/60 text-xs font-semibold mb-3 uppercase tracking-wider">
              Навигация
            </h4>
            <div className="space-y-2">
              <Link to="/servers" className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors">
                Серверы
              </Link>
              <Link to="/wiki" className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors">
                Вики
              </Link>
              <Link to="/skill-tree" className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors">
                Таланты
              </Link>
              <Link to="/ting" className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors">
                Тинг
              </Link>
              <Link to="/shop" className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors">
                Магазин
              </Link>
            </div>
          </div>

          {/* Сообщество */}
          <div>
            <h4 className="text-norse-gold/60 text-xs font-semibold mb-3 uppercase tracking-wider">
              Сообщество
            </h4>
            <div className="space-y-2">
              <a
                href="https://discord.gg/valheim"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors"
              >
                Discord
              </a>
              <a
                href="https://t.me/valheim"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://github.com/talifan11/Valheim"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Правовая информация */}
          <div>
            <h4 className="text-norse-gold/60 text-xs font-semibold mb-3 uppercase tracking-wider">
              Информация
            </h4>
            <div className="space-y-2">
              <a href="#" className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors">
                Условия использования
              </a>
              <a href="#" className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="block text-norse-muted/50 hover:text-norse-gold text-xs transition-colors">
                Поддержка
              </a>
            </div>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-norse-muted/30 text-xs">
            © 2026 Valheim: Хроники Города. Все права защищены.
          </p>
          <p className="text-norse-gold/20 text-xs font-serif tracking-[0.3em]">
            ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ
          </p>
        </div>
      </div>
    </footer>
  );
}
