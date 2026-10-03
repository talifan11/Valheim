// Модель данных галереи скриншотов

export interface Screenshot {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'server' | 'battle' | 'landscape' | 'building' | 'event';
  author: string;
  authorRank: 'newcomer' | 'viking' | 'jarl' | 'legend';
  likes: number;
  createdAt: string;
  tags: string[];
}

export interface ScreenshotCategory {
  id: string;
  title: string;
  description: string;
  rune: string;
  count: number;
}

// Категории галереи
export const screenshotCategories: ScreenshotCategory[] = [
  {
    id: 'all',
    title: 'Все',
    description: 'Все скриншоты',
    rune: 'ᛟ',
    count: 0, // будет вычислено динамически
  },
  {
    id: 'server',
    title: 'Город и поселения',
    description: 'Скриншоты городов, баз и поселений игроков',
    rune: 'ᛒ',
    count: 0,
  },
  {
    id: 'battle',
    title: 'Битвы и рейды',
    description: 'Эпичные сражения, боссы, рейды',
    rune: 'ᛏ',
    count: 0,
  },
  {
    id: 'landscape',
    title: 'Пейзажи',
    description: 'Красивые виды и ландшафты',
    rune: 'ᛚ',
    count: 0,
  },
  {
    id: 'building',
    title: 'Постройки',
    description: 'Крепости, замки, архитектурные шедевры',
    rune: 'ᚱ',
    count: 0,
  },
  {
    id: 'event',
    title: 'События',
    description: 'Ивенты, праздники, собрания',
    rune: 'ᛖ',
    count: 0,
  },
];

// Скриншоты
export const screenshots: Screenshot[] = [
  {
    id: 'ss-1',
    title: 'Закат над городом Хроники',
    description: 'Игроки собираются у костра после долгого дня рейдов. Атмосфера настоящего викингового братства.',
    imageUrl: 'https://image.qwenlm.ai/generated-images/ed0e2397-983e-4f37-a09d-923b494a90c0/_result.png',
    category: 'server',
    author: 'skald',
    authorRank: 'jarl',
    likes: 47,
    createdAt: '2 дня назад',
    tags: ['город', 'закат', 'костёр'],
  },
  {
    id: 'ss-2',
    title: 'Битва с Троллем',
    description: 'Эпичное сражение с каменным троллем в Чёрном Лесу. Команда из 5 человек против гиганта.',
    imageUrl: 'https://image.qwenlm.ai/generated-images/c9030b2d-f011-407f-b5dd-1979a4e0abd6/_result.png',
    category: 'battle',
    author: 'bjorn',
    authorRank: 'viking',
    likes: 89,
    createdAt: '1 день назад',
    tags: ['тролль', 'босс', 'битва'],
  },
  {
    id: 'ss-3',
    title: 'Фьорды на рассвете',
    description: 'Викингский драккар плывёт по фьордам под северным сиянием. Невероятная красота.',
    imageUrl: 'https://image.qwenlm.ai/generated-images/79a44846-9bc8-46b8-8cc8-701797d384cb/_result.png',
    category: 'landscape',
    author: 'hildir',
    authorRank: 'legend',
    likes: 124,
    createdAt: '3 дня назад',
    tags: ['фьорд', 'рассвет', 'корабль'],
  },
  {
    id: 'ss-4',
    title: 'Оборона крепости',
    description: 'Массивная каменная крепость во время рейда. Игроки защищают стены от орды врагов.',
    imageUrl: 'https://image.qwenlm.ai/generated-images/38ad0f65-4b7a-4e13-8ce6-b305c2cce66c/_result.png',
    category: 'building',
    author: 'ulf',
    authorRank: 'legend',
    likes: 67,
    createdAt: '5 часов назад',
    tags: ['крепость', 'оборона', 'рейды'],
  },
  {
    id: 'ss-5',
    title: 'Магический лес',
    description: 'Таинственный лес с светящимися рунами. Воин с магическим посохом исследует древние тайны.',
    imageUrl: 'https://image.qwenlm.ai/generated-images/8bc3243b-6564-4450-bbf8-6e00a0ed438b/_result.png',
    category: 'event',
    author: 'ragnar',
    authorRank: 'viking',
    likes: 56,
    createdAt: '1 неделю назад',
    tags: ['магия', 'руны', 'лес'],
  },
];
