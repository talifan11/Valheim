// Модель данных форума «Тинг»

export interface ForumUser {
  id: string;
  username: string;
  rank: 'newcomer' | 'viking' | 'jarl' | 'legend';
  avatarFrame: 'newcomer' | 'viking' | 'jarl' | 'legend';
  banner: string;
  status: 'online' | 'away' | 'offline';
  signature: string;
  about: string;
  reputation: number;
  joinedAt: string;
  achievements: string[];
  activityMap: number[];
  stats: {
    threadsCount: number;
    postsCount: number;
    usefulReceived: number;
    acceptedAnswers: number;
  };
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  rune: string;
  block: 'vesti' | 'game' | 'community';
  threadsCount24h: number;
  totalThreads: number;
  topAuthors?: { username: string; reputation: number }[];
}

export interface Thread {
  id: string;
  categoryId: string;
  authorId: string;
  authorName: string;
  authorRank: 'newcomer' | 'viking' | 'jarl' | 'legend';
  title: string;
  excerpt: string;
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
  isResolved: boolean;
  isHot: boolean;
  viewsCount: number;
  repliesCount: number;
  usefulCount: number;
  followersCount: number;
  readersNow: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorRank: 'newcomer' | 'viking' | 'jarl' | 'legend';
  body: string;
  quotedPostId?: string;
  quotedPostAuthor?: string;
  quotedPostBody?: string;
  usefulCount: number;
  agreedCount: number;
  isAccepted: boolean;
  createdAt: string;
}

export interface ForumStats {
  totalThreads: number;
  totalPosts: number;
  activeUsers: number;
  dau: number;
}

export interface TopAuthor {
  id: string;
  username: string;
  reputation: number;
  rank: 'newcomer' | 'viking' | 'jarl' | 'legend';
}

// Подкатегории
export interface SubCategory {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  rune: string;
}

export const subCategories: SubCategory[] = [
  // Подкатегории для Кузницы
  { id: 'sub-1', categoryId: 'cat-3', title: 'Билды', description: 'Билды персонажей, распределение навыков', rune: 'ᚲ' },
  { id: 'sub-2', categoryId: 'cat-3', title: 'Гайды по боссам', description: 'Тактики против боссов', rune: 'ᛏ' },
  { id: 'sub-3', categoryId: 'cat-3', title: 'Крафт', description: 'Рецепты, материалы, оптимизация', rune: 'ᚠ' },
  
  // Подкатегории для Походов
  { id: 'sub-4', categoryId: 'cat-4', title: 'Поиск группы', description: 'LFG - поиск команды для рейдов', rune: 'ᚱ' },
  { id: 'sub-5', categoryId: 'cat-4', title: 'Рейды', description: 'Организация рейдов на боссов', rune: 'ᛏ' },
  { id: 'sub-6', categoryId: 'cat-4', title: 'Ивенты', description: 'Совместные мероприятия', rune: 'ᛖ' },
  
  // Подкатегории для Тинга
  { id: 'sub-7', categoryId: 'cat-6', title: 'Вопросы новичков', description: 'Помощь начинающим игрокам', rune: 'ᚠ' },
  { id: 'sub-8', categoryId: 'cat-6', title: 'Обсуждения', description: 'Общие темы, дискуссии', rune: 'ᛏ' },
  { id: 'sub-9', categoryId: 'cat-6', title: 'Оффтоп', description: 'Всё что не относится к игре', rune: 'ᛟ' },
];

// Категории форума
export const categories: Category[] = [
  // Блок «Вести»
  {
    id: 'cat-1',
    slug: 'glashatay',
    title: 'Глашатай',
    description: 'Новости сервера, обновления, ивенты от администрации',
    rune: 'ᚨ',
    block: 'vesti',
    threadsCount24h: 1,
    totalThreads: 24,
  },
  {
    id: 'cat-2',
    slug: 'golosovaniya',
    title: 'Голосования',
    description: 'Опросы от админов и игроков',
    rune: 'ᛏ',
    block: 'vesti',
    threadsCount24h: 0,
    totalThreads: 8,
  },
  // Блок «Игра»
  {
    id: 'cat-3',
    slug: 'kuznitsa',
    title: 'Кузница',
    description: 'Гайды, крафт, билды, тактики против боссов',
    rune: 'ᚲ',
    block: 'game',
    threadsCount24h: 3,
    totalThreads: 142,
  },
  {
    id: 'cat-4',
    slug: 'pohody',
    title: 'Походы',
    description: 'Поиск группы (LFG), рейды, совместные вылазки',
    rune: 'ᚱ',
    block: 'game',
    threadsCount24h: 5,
    totalThreads: 89,
  },
  {
    id: 'cat-5',
    slug: 'torgovaya',
    title: 'Торговая площадь',
    description: 'Обмен ресурсами, торговля, услуги',
    rune: 'ᚠ',
    block: 'game',
    threadsCount24h: 2,
    totalThreads: 67,
  },
  // Блок «Сообщество»
  {
    id: 'cat-6',
    slug: 'ting',
    title: 'Тинг',
    description: 'Общее обсуждение, вопросы новичков, оффтоп',
    rune: 'ᛏ',
    block: 'community',
    threadsCount24h: 8,
    totalThreads: 234,
  },
  {
    id: 'cat-7',
    slug: 'skaldy',
    title: 'Скальды',
    description: 'Ролевой отыгрыш, истории, творчество',
    rune: 'ᛒ',
    block: 'community',
    threadsCount24h: 1,
    totalThreads: 45,
  },
  {
    id: 'cat-8',
    slug: 'runicheskie-oshibki',
    title: 'Рунические ошибки',
    description: 'Багрепорты и предложения',
    rune: 'ᛖ',
    block: 'community',
    threadsCount24h: 2,
    totalThreads: 78,
  },
];

// Топ авторов
export const topAuthors: TopAuthor[] = [
  { id: 'user-1', username: 'skald', reputation: 240, rank: 'jarl' },
  { id: 'user-2', username: 'bjorn', reputation: 198, rank: 'viking' },
  { id: 'user-3', username: 'hildir', reputation: 156, rank: 'legend' },
  { id: 'user-4', username: 'ulf', reputation: 134, rank: 'legend' },
  { id: 'user-5', username: 'ragnar', reputation: 89, rank: 'viking' },
];

// Статистика форума
export const forumStats: ForumStats = {
  totalThreads: 1247,
  totalPosts: 8302,
  activeUsers: 412,
  dau: 89,
};

// Моковые пользователи
export const forumUsers: ForumUser[] = [
  {
    id: 'user-1',
    username: 'skald',
    rank: 'jarl',
    avatarFrame: 'jarl',
    banner: 'fjord',
    status: 'online',
    signature: 'ᛏ Ярл из Хельхейма. Ищу народ для походов.\nDiscord: skald#1234',
    about: 'Играю с закрытой беты. Специализация — танк и поддержка. Люблю сложные рейды и помощь новичкам.',
    reputation: 1240,
    joinedAt: '2024-03-15',
    achievements: ['skald', 'glashatay', 'hranitel', 'pervoprokhodets'],
    activityMap: Array.from({ length: 84 }, () => Math.floor(Math.random() * 5)),
    stats: {
      threadsCount: 23,
      postsCount: 342,
      usefulReceived: 342,
      acceptedAnswers: 14,
    },
  },
  {
    id: 'user-2',
    username: 'bjorn',
    rank: 'viking',
    avatarFrame: 'viking',
    banner: 'mountains',
    status: 'online',
    signature: 'ᛏ Берсерк. Двуручный топор — моё всё.',
    about: 'В игре с релиза. Люблю PvP и рейды.',
    reputation: 980,
    joinedAt: '2024-05-20',
    achievements: ['groza-bossov'],
    activityMap: Array.from({ length: 84 }, () => Math.floor(Math.random() * 4)),
    stats: {
      threadsCount: 15,
      postsCount: 289,
      usefulReceived: 156,
      acceptedAnswers: 8,
    },
  },
  {
    id: 'user-3',
    username: 'hildir',
    rank: 'legend',
    avatarFrame: 'legend',
    banner: 'aurora',
    status: 'away',
    signature: 'ᛟ Легенда. Целитель по призванию.',
    about: 'Играю с альфы. Специализация — хилер. Помог более 100 игрокам.',
    reputation: 2450,
    joinedAt: '2023-11-01',
    achievements: ['skald', 'glashatay', 'hranitel', 'legend', 'khranitel-run'],
    activityMap: Array.from({ length: 84 }, () => Math.floor(Math.random() * 5)),
    stats: {
      threadsCount: 45,
      postsCount: 892,
      usefulReceived: 892,
      acceptedAnswers: 67,
    },
  },
  {
    id: 'user-4',
    username: 'ulf',
    rank: 'legend',
    avatarFrame: 'legend',
    banner: 'battlefield',
    status: 'offline',
    signature: 'ᛟ Первый Мэр Города.',
    about: 'Основатель сервера. Строитель и дипломат.',
    reputation: 3120,
    joinedAt: '2023-10-15',
    achievements: ['skald', 'glashatay', 'hranitel', 'pervoprokhodets', 'legend'],
    activityMap: Array.from({ length: 84 }, () => Math.floor(Math.random() * 5)),
    stats: {
      threadsCount: 67,
      postsCount: 1234,
      usefulReceived: 1234,
      acceptedAnswers: 89,
    },
  },
  {
    id: 'user-5',
    username: 'ragnar',
    rank: 'viking',
    avatarFrame: 'viking',
    banner: 'forest',
    status: 'online',
    signature: 'ᚱ Лучник. Точность — моё второе имя.',
    about: 'Предпочитаю дальний бой. Лук и магия.',
    reputation: 870,
    joinedAt: '2024-06-10',
    achievements: ['groza-bossov'],
    activityMap: Array.from({ length: 84 }, () => Math.floor(Math.random() * 4)),
    stats: {
      threadsCount: 12,
      postsCount: 234,
      usefulReceived: 98,
      acceptedAnswers: 5,
    },
  },
];

// Темы форума (примеры)
export const threads: Thread[] = [
  {
    id: 'thread-1',
    categoryId: 'cat-3',
    authorId: 'user-1',
    authorName: 'skald',
    authorRank: 'jarl',
    title: 'Гайд: Как убить Эйктюрнира соло',
    excerpt: 'Пошаговая тактика с фазами, скриншотами и билдом. Проверено на 3 персонажах разного уровня...',
    tags: ['гайд', 'босс'],
    isPinned: true,
    isLocked: false,
    isResolved: true,
    isHot: true,
    viewsCount: 1247,
    repliesCount: 47,
    usefulCount: 89,
    followersCount: 23,
    readersNow: ['bjorn', 'ragnar', 'hildir'],
    createdAt: '2 дня назад',
    updatedAt: '2 часа назад',
  },
  {
    id: 'thread-2',
    categoryId: 'cat-3',
    authorId: 'user-2',
    authorName: 'bjorn',
    authorRank: 'viking',
    title: 'Лучший билд на двуручный топор в 2025',
    excerpt: 'Собрал статистику по 12 билдам, вот что вышло. Топ-3 комбинации навыков для максимального DPS...',
    tags: ['билд', 'крафт'],
    isPinned: false,
    isLocked: false,
    isResolved: false,
    isHot: true,
    viewsCount: 892,
    repliesCount: 23,
    usefulCount: 45,
    followersCount: 15,
    readersNow: ['skald', 'ulf'],
    createdAt: '5 часов назад',
    updatedAt: '1 час назад',
  },
  {
    id: 'thread-3',
    categoryId: 'cat-4',
    authorId: 'user-3',
    authorName: 'hildir',
    authorRank: 'legend',
    title: 'Ищу группу на рейд в Болото, завтра 20:00 МСК',
    excerpt: 'Нужны 2 танка и 1 хилер. Цель — Костяная Масса. У всех должен быть полный железный сет...',
    tags: ['ивент', 'рейды'],
    isPinned: false,
    isLocked: false,
    isResolved: false,
    isHot: false,
    viewsCount: 156,
    repliesCount: 12,
    usefulCount: 8,
    followersCount: 8,
    readersNow: ['bjorn', 'ragnar'],
    createdAt: '3 часа назад',
    updatedAt: '30 минут назад',
  },
  {
    id: 'thread-4',
    categoryId: 'cat-6',
    authorId: 'user-4',
    authorName: 'ulf',
    authorRank: 'legend',
    title: 'Вопрос новичка: как быстро получить бронзу?',
    excerpt: 'Только начал играть, не могу найти медь и олово. Подскажите, где лучше фармить и какие биомы проверять...',
    tags: ['новичок', 'вопрос'],
    isPinned: false,
    isLocked: false,
    isResolved: true,
    isHot: false,
    viewsCount: 234,
    repliesCount: 18,
    usefulCount: 12,
    followersCount: 5,
    readersNow: ['skald'],
    createdAt: '1 день назад',
    updatedAt: '6 часов назад',
  },
  {
    id: 'thread-5',
    categoryId: 'cat-1',
    authorId: 'admin',
    authorName: 'Хранитель',
    authorRank: 'legend',
    title: 'Обновление 1.3: новые данжи и боссы',
    excerpt: 'Добавлены 3 новых подземелья в Чёрном Лесу, 2 новых босса, система гильдий улучшена. Полный патчноут...',
    tags: ['новости'],
    isPinned: true,
    isLocked: false,
    isResolved: false,
    isHot: true,
    viewsCount: 2341,
    repliesCount: 89,
    usefulCount: 156,
    followersCount: 156,
    readersNow: ['skald', 'bjorn', 'hildir', 'ulf', 'ragnar'],
    createdAt: '3 дня назад',
    updatedAt: '1 день назад',
  },
  {
    id: 'thread-6',
    categoryId: 'cat-5',
    authorId: 'user-5',
    authorName: 'ragnar',
    authorRank: 'viking',
    title: 'Продаю железо, 50 стаков, недорого',
    excerpt: 'Фармил на Болоте неделю, теперь продаю. Цена: 1 стак = 10 золотых. Торговля через рыночную площадь...',
    tags: ['торговля'],
    isPinned: false,
    isLocked: false,
    isResolved: false,
    isHot: false,
    viewsCount: 78,
    repliesCount: 5,
    usefulCount: 2,
    followersCount: 3,
    readersNow: ['bjorn'],
    createdAt: '4 часа назад',
    updatedAt: '2 часа назад',
  },
];

// Посты для треда (пример)
export const posts: Post[] = [
  {
    id: 'post-1',
    threadId: 'thread-1',
    authorId: 'user-1',
    authorName: 'skald',
    authorRank: 'jarl',
    body: 'Привет, воины! После 50 попыток наконец убил Эйктюрнира соло. Делюсь тактикой.\n\n**Фаза 1: Подготовка**\n- Полный бронзовый сет\n- 3 блюда: медовуха сопротивления, жареное мясо, грибы\n- Оружие: кремневый топор + щит\n\n**Фаза 2: Бой**\nБосс атакует в 3 паттерна:\n1. Рывок вперед — уклоняемся в сторону\n2. Удар рогами — блокируем щитом\n3. Молния по площади — убегаем на 10 метров\n\n**Фаза 3: Добивание**\nНа 20% HP босс впадает в ярость. Используем медовуху и бьем без остановки.\n\nВопросы?',
    quotedPostId: undefined,
    usefulCount: 42,
    agreedCount: 15,
    isAccepted: false,
    createdAt: '2 дня назад',
  },
  {
    id: 'post-2',
    threadId: 'thread-1',
    authorId: 'user-2',
    authorName: 'bjorn',
    authorRank: 'viking',
    body: 'Отличный гайд! Но есть нюанс: на фазе 3 лучше использовать не медовуху, а зелье скорости. Так проще уклоняться от молний.\n\nЕщё советую взять с собой 5-6 зелий лечения на случай если промахнёшься с уклонением.',
    quotedPostId: 'post-1',
    quotedPostAuthor: 'skald',
    quotedPostBody: 'На 20% HP босс впадает в ярость. Используем медовуху и бьем без остановки.',
    usefulCount: 18,
    agreedCount: 8,
    isAccepted: false,
    createdAt: '1 день назад',
  },
  {
    id: 'post-3',
    threadId: 'thread-1',
    authorId: 'user-4',
    authorName: 'ulf',
    authorRank: 'legend',
    body: 'Спасибо! Убил с третьей попытки благодаря твоему гайду. Ключевой момент — не жадничать с блоком, лучше уклониться.\n\nКстати, на фазе 2 когда босс бьёт рогами, можно контратаковать сразу после блока — он остаётся открытым на 1.5 секунды.',
    quotedPostId: undefined,
    usefulCount: 12,
    agreedCount: 5,
    isAccepted: true,
    createdAt: '6 часов назад',
  },
  {
    id: 'post-4',
    threadId: 'thread-1',
    authorId: 'user-5',
    authorName: 'ragnar',
    authorRank: 'viking',
    body: 'А я использую другой подход — лук + огонь. Стреляю издалека, босс не может достать. Но нужна хорошая позиция, иначе молнии достанут.\n\nКто-нибудь пробовал соло без щита? Интересно насколько это реально.',
    quotedPostId: undefined,
    usefulCount: 3,
    agreedCount: 2,
    isAccepted: false,
    createdAt: '3 часа назад',
  },
  {
    id: 'post-5',
    threadId: 'thread-1',
    authorId: 'user-3',
    authorName: 'hildir',
    authorRank: 'legend',
    body: 'Без щита очень рискованно, но возможно если идеально знать тайминги. Я пробовал — получилось с 10 попытки.\n\nЛучше всё-таки щит, стабильнее. А для speedrun можно попробовать без.',
    quotedPostId: 'post-4',
    quotedPostAuthor: 'ragnar',
    quotedPostBody: 'Кто-нибудь пробовал соло без щита? Интересно насколько это реально.',
    usefulCount: 7,
    agreedCount: 4,
    isAccepted: false,
    createdAt: '1 час назад',
  },
];

// Доступные теги
export const availableTags = [
  'новичок',
  'босс',
  'крафт',
  'билд',
  'мод',
  'ивент',
  'гайд',
  'вопрос',
  'сервер',
  'торговля',
  'рейды',
  'новости',
];

// Блоки категорий
export const categoryBlocks = {
  vesti: {
    title: 'Вести',
    description: 'Официальные новости и голосования',
  },
  game: {
    title: 'Игра',
    description: 'Всё что связано с игровым процессом',
  },
  community: {
    title: 'Сообщество',
    description: 'Общение, творчество и предложения',
  },
};

// Достижения
export interface Achievement {
  id: string;
  rune: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export const achievements: Achievement[] = [
  { id: 'skald', rune: 'ᛋ', title: 'Скальд', description: '10 решённых тем', unlocked: true },
  { id: 'glashatay', rune: 'ᚨ', title: 'Глашатай', description: '100 полученных «Полезно»', unlocked: true },
  { id: 'hranitel', rune: 'ᛏ', title: 'Хранитель', description: 'Роль модератора', unlocked: true },
  { id: 'pervoprokhodets', rune: 'ᚱ', title: 'Первопроходец', description: 'Первый создал тему в новой категории', unlocked: true },
  { id: 'groza-bossov', rune: 'ᚦ', title: 'Гроза боссов', description: '50 постов в Кузнице', unlocked: true },
  { id: 'molchalivy', rune: 'ᛚ', title: 'Молчаливый', description: '10 «Полезно» без единого своего поста', unlocked: false },
  { id: 'skaziteli', rune: 'ᛒ', title: 'Сказитель', description: '5 тем в Скальдах', unlocked: false },
  { id: 'ispytatel', rune: 'ᛖ', title: 'Испытатель', description: '10 багрепортов', unlocked: false },
  { id: 'torgovets', rune: 'ᚠ', title: 'Торговец', description: '20 постов в Торговой площади', unlocked: false },
  { id: 'master', rune: 'ᚲ', title: 'Мастер', description: '25 гайдов', unlocked: false },
  { id: 'legend', rune: 'ᛟ', title: 'Легенда', description: 'Ранг Легенда', unlocked: true },
  { id: 'khranitel-run', rune: 'ᛊ', title: 'Хранитель рун', description: '100 дней подряд онлайн', unlocked: false },
];

// Моковая активность
export interface ForumActivity {
  id: string;
  type: 'reply' | 'new_thread' | 'badge' | 'reaction';
  username: string;
  target: string;
  createdAt: string;
}

export const recentActivity: ForumActivity[] = [
  { id: 'act-1', type: 'reply', username: 'skald', target: 'Гайд: Эйктюрнир', createdAt: '2 мин назад' },
  { id: 'act-2', type: 'new_thread', username: 'bjorn', target: 'Кузница', createdAt: '15 мин назад' },
  { id: 'act-3', type: 'badge', username: 'ragnar', target: 'Скальд', createdAt: '1 час назад' },
  { id: 'act-4', type: 'reaction', username: 'freya', target: 'Билды', createdAt: '2 часа назад' },
  { id: 'act-5', type: 'reply', username: 'odin', target: 'Поход на Модера', createdAt: '3 часа назад' },
];

// Баннеры профиля
export const profileBanners = [
  { id: 'mountains', name: 'Горы в тумане', gradient: 'linear-gradient(135deg, #1e3a5f 0%, #4a5f7f 100%)' },
  { id: 'fjord', name: 'Фьорд на рассвете', gradient: 'linear-gradient(135deg, #0B0E14 0%, #C89B3C 100%)' },
  { id: 'forest', name: 'Тёмный лес', gradient: 'linear-gradient(135deg, #1a3d2e 0%, #0a0a0a 100%)' },
  { id: 'ruins', name: 'Руины храма', gradient: 'linear-gradient(135deg, #5c4033 0%, #2a2a2a 100%)' },
  { id: 'aurora', name: 'Северное сияние', gradient: 'linear-gradient(135deg, #2d1b4e 0%, #1a5f7f 50%, #0B0E14 100%)' },
  { id: 'battlefield', name: 'Поле битвы', gradient: 'linear-gradient(135deg, #8b1a1a 0%, #0a0a0a 100%)' },
];
