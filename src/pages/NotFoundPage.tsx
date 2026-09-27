import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-norse-gold text-8xl font-serif mb-6 animate-rune-glow">ᛗ</div>
        <h1 className="font-[Cinzel] text-4xl md:text-6xl font-bold text-norse-text mb-4">
          Ты заблудился
        </h1>
        <p className="text-norse-muted text-lg mb-2">
          в Туманных землях.
        </p>
        <p className="text-norse-muted/60 text-sm mb-8">
          Страница, которую ты ищешь, скрыта в мгле. Даже Одін не знает, где она.
        </p>
        
        <div className="glass-dark rounded-lg p-6 mb-8 card-corner">
          <div className="text-norse-gold text-sm font-semibold mb-2">Что делать?</div>
          <ul className="text-norse-muted text-sm space-y-1 text-left">
            <li>• Вернись к порталу на главную</li>
            <li>• Проверь статус серверов</li>
            <li>• Изучи Вики хранителя</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-viking btn-viking-primary">
            ᛟ  Вернуться к порталу
          </Link>
          <Link to="/servers" className="btn-viking btn-viking-secondary">
            ᚠ  Статус серверов
          </Link>
        </div>

        <div className="mt-12 text-norse-gold/20 text-xs font-serif tracking-[0.3em]">
          ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ
        </div>
      </div>
    </div>
  );
}
