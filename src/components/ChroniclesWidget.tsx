import React, { useState } from 'react';

interface Chronicle {
  id: string;
  title: string;
  date: string;
  content: string;
  author: string;
  comments: number;
}

const chronicles: Chronicle[] = [
  {
    id: '1',
    title: 'День 47: Открытие Портала',
    date: '2 дня назад',
    content: `Великий Портал в Чёрный Лес активирован. Первая экспедиция уже собрана.

После долгих недель подготовки, когда лучшие кузнецы города ковали бронзовые доспехи, а охотники добывали троллиную кожу, мы наконец-то готовы. Мэр Ульф лично вставил ключ в алтарь, и портал засиял фиолетовым светом.

Первыми вошли десять воинов во главе со Свеном-Восьмируким. Они вернулись через три часа с трофеями: бронзовые слитки, троллиная кожа и... голова Серого Дварфа.

Город ликует! Теперь у нас есть доступ к новым ресурсам. Но Чёрный Лес таит опасности — тролли и скелеты не дремлют.

Следующая экспедиция запланирована на завтра. Кто хочет присоединиться?`,
    author: 'Хранитель Портала',
    comments: 23,
  },
  {
    id: '2',
    title: 'День 45: Выборы Мэра',
    date: '4 дня назад',
    content: `Ульф переизбран на второй срок. Обещал расширить рынок.

Выборы прошли мирно, несмотря на напряжённость между фракциями. Ульф-Мэр получил 68% голосов, победив своего соперника Рагнара-Крысу.

Основные обещания нового срока:
• Расширение рыночной площади в два раза
• Строительство второго портаала (в Горы)
• Создание гвардии для защиты караванов
• Снижение налогов для новых гильдий

Рагнар-Крыса, несмотря на поражение, получил место в Совете Гильдий. "Оппозиция нужна городу", — сказал Ульф на инаугурации.

Поздравляем Мэра и желаем мудрого правления!`,
    author: 'Городской Глашатай',
    comments: 45,
  },
  {
    id: '3',
    title: 'День 42: Первая Гильдия',
    date: '1 неделю назад',
    content: `"Железный Кулак" официально зарегистрирована. 12 членов.

Исторический момент! Первая гильдия нашего сервера получила официальный статус. "Железный Кулак" под предводительством Ульфа-Мэра объединил лучших воинов города.

Состав гильдии:
• Гильдмастер: Ульф-Мэр
• Офицеры: Свен-Восьмирукий, Хильдир-Целитель
• Рядовые: 9 опытных воинов

Гильдия получила собственный зал с верстаками, алтарём и общим сундуком. Теперь они могут участвовать в гильдейских войнах и контролировать территории.

Следом за "Железным Кулаком" регистрируются ещё три гильдии: "Серебряная Нить" (ремесленники), "Каменный Круг" (строители) и "Теневой Путь" (торговцы).

Эра гильдий началась!`,
    author: 'Регистратор Гильдий',
    comments: 31,
  },
];

export function ChroniclesWidget() {
  const [selectedChronicle, setSelectedChronicle] = useState<Chronicle | null>(null);

  return (
    <>
      <div className="glass-dark rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-norse-gold text-lg font-serif">ᚠ</span>
          <h3 className="text-norse-text font-[Cinzel] font-bold text-sm">Записки Хранителя</h3>
        </div>
        
        <div className="space-y-2">
          {chronicles.map(ch => (
            <div
              key={ch.id}
              className="p-3 rounded bg-norse-gold/5 border border-norse-gold/10 cursor-pointer hover:bg-norse-gold/10 transition-colors"
              onClick={() => setSelectedChronicle(ch)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="text-norse-gold text-xs font-semibold">{ch.title}</div>
                <span className="text-norse-muted/50 text-[10px]">{ch.date}</span>
              </div>
              <p className="text-norse-muted/60 text-xs line-clamp-2">{ch.content.split('\n')[0]}</p>
              <div className="flex items-center gap-2 mt-2 text-[10px] text-norse-muted/50">
                <span>{ch.author}</span>
                <span>•</span>
                <span>{ch.comments} комментариев</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chronicle Modal */}
      {selectedChronicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedChronicle(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div 
            className="relative glass-dark rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto animate-scale-in card-corner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedChronicle(null)}
              className="absolute top-4 right-4 text-norse-gold/60 hover:text-norse-gold transition-colors text-xl"
            >
              ✕
            </button>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-norse-gold text-lg font-serif">ᚠ</span>
                <h2 className="font-[Cinzel] text-xl font-bold text-norse-text">{selectedChronicle.title}</h2>
              </div>
              <div className="flex items-center gap-3 text-xs text-norse-muted">
                <span>{selectedChronicle.author}</span>
                <span>•</span>
                <span>{selectedChronicle.date}</span>
                <span>•</span>
                <span>{selectedChronicle.comments} комментариев</span>
              </div>
            </div>

            <div className="text-norse-muted text-sm leading-relaxed whitespace-pre-line mb-6">
              {selectedChronicle.content}
            </div>

            <div className="border-t border-norse-gold/10 pt-4">
              <h3 className="text-norse-gold text-sm font-semibold mb-3">Комментарии ({selectedChronicle.comments})</h3>
              <div className="space-y-3">
                <div className="glass rounded p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-norse-text text-xs font-semibold">Свен-Восьмирукий</span>
                    <span className="text-norse-muted/50 text-[10px]">1 день назад</span>
                  </div>
                  <p className="text-norse-muted/70 text-xs">Отличная была экспедиция! Тролль чуть не убил, но мы справились.</p>
                </div>
                <div className="glass rounded p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-norse-text text-xs font-semibold">Хильдир-Целитель</span>
                    <span className="text-norse-muted/50 text-[10px]">1 день назад</span>
                  </div>
                  <p className="text-norse-muted/70 text-xs">Вылечила всех 15 раз. Мои руки болят, но город горд!</p>
                </div>
              </div>
              <button className="w-full mt-3 btn-viking btn-viking-secondary !py-2 !text-xs">
                Написать комментарий
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
