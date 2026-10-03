import React from 'react';

interface DiscordMessage {
  user: string;
  message: string;
  channel: string;
  time: string;
}

const recentMessages: DiscordMessage[] = [
  {
    user: 'Ульф-Мэр',
    message: 'Собираем группу на рейд в Болото завтра в 20:00 МСК',
    channel: '#общий',
    time: '5 мин назад',
  },
  {
    user: 'Свен-Восьмирукий',
    message: 'Кто-нибудь знает где найти троллиную кожу?',
    channel: '#торговля',
    time: '12 мин назад',
  },
  {
    user: 'Хильдир-Целитель',
    message: 'Нужен танк для подземелья! Хилер есть',
    channel: '#поиск-группы',
    time: '23 мин назад',
  },
  {
    user: 'Бьорн-Строитель',
    message: 'Завершил строительство новой таверны, заходите!',
    channel: '#город',
    time: '45 мин назад',
  },
];

export function DiscordWidget() {
  return (
    <div className="glass-dark rounded-lg p-4 border border-[#5865F2]/20">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#5865F2] text-lg font-serif">ᛊ</span>
        <h3 className="text-norse-text font-[Cinzel] font-bold text-sm">Discord Активность</h3>
        <span className="ml-auto flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-norse-muted text-[10px]">47 онлайн</span>
        </span>
      </div>
      
      <div className="space-y-2">
        {recentMessages.map((msg, i) => (
          <div key={i} className="glass rounded p-2 hover:bg-norse-gold/5 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-norse-text text-xs font-semibold">{msg.user}</span>
              <span className="text-[#5865F2] text-[10px]">{msg.channel}</span>
              <span className="text-norse-muted/50 text-[10px] ml-auto">{msg.time}</span>
            </div>
            <p className="text-norse-muted/70 text-xs">{msg.message}</p>
          </div>
        ))}
      </div>

      <a 
        href="https://discord.gg/valheim"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-3 btn-viking btn-viking-secondary !py-2 !text-xs flex items-center justify-center gap-2"
      >
        <span className="font-serif">ᛊ</span>
        Присоединиться к Discord
      </a>
    </div>
  );
}
