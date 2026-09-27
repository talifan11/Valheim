import React from 'react';

interface ShopItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: 'cosmetic' | 'comfort' | 'title' | 'event';
  rune: string;
  popular?: boolean;
}

const shopItems: ShopItem[] = [
  { id: '1', name: 'Скины и плащи', price: '100–500 ₽', description: 'Визуальная кастомизация персонажа', category: 'cosmetic', rune: 'ᚨ' },
  { id: '2', name: 'Расширенный участок', price: '300 ₽/мес', description: 'Увеличенная территория для строительства', category: 'comfort', rune: 'ᛟ' },
  { id: '3', name: 'Приоритетный вход', price: '200 ₽/мес', description: 'Вход без очереди при полном сервере', category: 'comfort', rune: 'ᛏ' },
  { id: '4', name: 'Титул «Барон»', price: '500 ₽', description: 'Уникальный титул над головой', category: 'title', rune: 'ᛁ', popular: true },
  { id: '5', name: 'NPC-торговец', price: '1000 ₽', description: 'Персональный торговец в вашем доме', category: 'comfort', rune: 'ᚠ' },
  { id: '6', name: 'Спонсор ивента', price: '2000 ₽', description: 'Организуй свой праздник для сервера', category: 'event', rune: 'ᛊ' },
];

export function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="font-[Cinzel] text-3xl md:text-5xl font-bold mb-4">
          <span className="text-norse-gold">Лавка Комфорта</span>
        </h1>
        <p className="text-norse-muted max-w-2xl mx-auto">
          Платишь за понты и комфорт, а не за силу. Вход — бесплатный.
        </p>
      </div>

      {/* Anti P2W Banner */}
      <div className="glass-dark rounded-lg p-4 mb-8 border border-green-500/15">
        <div className="flex items-center gap-3">
          <span className="text-green-500/80 text-xl font-serif">ᛟ</span>
          <div>
            <div className="text-green-500/80 text-sm font-semibold">Никакого Pay-to-Win</div>
            <p className="text-norse-muted/70 text-xs">Ресурсы, оружие, земля, победа — не продаются. Только косметика и удобства.</p>
          </div>
        </div>
      </div>

      {/* Shop Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {shopItems.map(item => (
          <div key={item.id} className="card-hover card-wood rounded-lg p-5 card-corner relative">
            {item.popular && (
              <div className="absolute -top-2 -right-2 bg-norse-gold text-norse-dark text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Популярно
              </div>
            )}
            
            <div className="flex items-start gap-3 mb-3">
              <div className="rune-icon shrink-0 text-lg font-serif">
                {item.rune}
              </div>
              <div className="flex-1">
                <h3 className="font-[Cinzel] font-bold text-norse-text text-sm">{item.name}</h3>
                <div className="text-norse-gold font-semibold text-sm">{item.price}</div>
              </div>
            </div>
            
            <p className="text-norse-muted text-xs mb-4">{item.description}</p>
            
            <button className="w-full btn-viking btn-viking-secondary !py-1.5 !text-[10px]">
              Приобрести
            </button>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mt-12 glass-dark rounded-lg p-6">
        <h2 className="font-[Cinzel] text-xl font-bold text-norse-gold mb-4">Как это работает</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-norse-gold font-serif">ᚠ</span>
              <span className="text-norse-text font-semibold">1. Выбираешь</span>
            </div>
            <p className="text-norse-muted/70 text-xs">Выбери предмет из каталога. Все цены прозрачны.</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-norse-gold font-serif">ᛏ</span>
              <span className="text-norse-text font-semibold">2. Оплачиваешь</span>
            </div>
            <p className="text-norse-muted/70 text-xs">Безопасная оплата. Поддержка карт и крипто.</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-norse-gold font-serif">ᛟ</span>
              <span className="text-norse-text font-semibold">3. Получаешь</span>
            </div>
            <p className="text-norse-muted/70 text-xs">Предмет мгновенно появляется в игре.</p>
          </div>
        </div>
      </div>

      {/* Support the server */}
      <div className="mt-8 text-center glass-dark rounded-lg p-6">
        <span className="text-norse-gold text-2xl font-serif mb-2 block">ᛊ</span>
        <h3 className="font-[Cinzel] text-lg font-bold text-norse-text mb-2">Поддержать сервер</h3>
        <p className="text-norse-muted text-sm mb-4">
          Все средства идут на оплату серверов и развитие проекта.
        </p>
        <button className="btn-viking btn-viking-primary">
          Поддержать
        </button>
      </div>
    </div>
  );
}
