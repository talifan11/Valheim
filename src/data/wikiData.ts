export interface Monster {
  id: string;
  name: string;
  biome: string;
  health: number;
  damage: number;
  weakness: string;
  drops: string[];
  rune: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'boss';
  description?: string;
}

export interface Biome {
  id: string;
  name: string;
  rune: string;
  description: string;
  difficulty: string;
  resources: string[];
  bosses: string[];
  creatures: string[];
}

export interface Boss {
  id: string;
  name: string;
  biome: string;
  health: number;
  damage: number;
  weakness: string;
  drops: string[];
  rune: string;
  summoning: string;
  strategy: string;
}

export interface CraftRecipe {
  id: string;
  name: string;
  station: string;
  materials: { name: string; amount: number }[];
  category: 'weapon' | 'armor' | 'building' | 'food';
  rune: string;
}

export interface Guide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  rune: string;
  excerpt: string;
}

// Биомы из Valheim Fandom
export const biomes: Biome[] = [
  {
    id: 'meadows',
    name: 'Луга',
    rune: 'ᚠ',
    description: 'Первый биом, с которого начинается путешествие. Зелёные поля, мирные существа, базовые ресурсы. Относительно безопасен днём, но ночью появляются серые дварфы.',
    difficulty: 'Лёгкий',
    resources: ['Дерево', 'Камень', 'Кремень', 'Кожа', 'Мёд', 'Малина', 'Грибы'],
    bosses: ['Элдэрь (Древний)'],
    creatures: ['Кабан', 'Серый дварф', 'Шейк'],
  },
  {
    id: 'blackforest',
    name: 'Чёрный Лес',
    rune: 'ᚦ',
    description: 'Тёмный лес с высокими соснами. Здесь обитают тролли и скелеты. Можно найти бронзу и медь. Опасен ночью из-за скелетов-лучников.',
    difficulty: 'Средний',
    resources: ['Медь', 'Олово', 'Бронза', 'Тонкое дерево', 'Троллиная шкура', 'Резной блок'],
    bosses: ['Старейшина (The Elder)'],
    creatures: ['Тролль', 'Скелет', 'Серый дварф-шаман', 'Серый дварф-бригадир'],
  },
  {
    id: 'swamp',
    name: 'Болото',
    rune: 'ᛗ',
    description: 'Тёмные, туманные болота с ядовитой водой. Здесь можно добыть железо. Очень опасно из-за драугров и скелетов. Ночью появляются болотные мерзости.',
    difficulty: 'Сложный',
    resources: ['Железо', 'Глина', 'Тина', 'Кровь', 'Древний семя', 'Гнилое дерево'],
    bosses: ['Костяная Масса (Bonemass)'],
    creatures: ['Драугр', 'Скелет', 'Лич', 'Болотная мерзость', 'Летающая мерзость'],
  },
  {
    id: 'mountains',
    name: 'Горы',
    rune: 'ᛁ',
    description: 'Заснеженные вершины с экстремальным холодом. Без защиты от холода игрок получает урон от заморозки. Здесь добывается серебро.',
    difficulty: 'Сложный',
    resources: ['Серебро', 'Обсидиан', 'Волчья шкура', 'Снежная буря', 'Кристалл'],
    bosses: ['Модер (Moder)'],
    creatures: ['Фенринг', 'Волк', 'Драк', 'Каменный голем', 'Горный ворон'],
  },
  {
    id: 'plains',
    name: 'Равнины',
    rune: 'ᛊ',
    description: 'Засушливые равнины с высокими травами. Здесь обитают смертоносные фуларинги и гигантские жуки. Можно найти чёрный металл и лён.',
    difficulty: 'Очень сложный',
    resources: ['Чёрный металл', 'Лён', 'Ячмень', 'Молния', 'Шкура фуларинга'],
    bosses: ['Яглут (Yagluth)'],
    creatures: ['Фуларинг', 'Смерть-жук', 'Пустынный хищник', 'Лоокс', 'Гигантский ворон'],
  },
  {
    id: 'mistlands',
    name: 'Туманные земли',
    rune: 'ᛟ',
    description: 'Самый опасный биом, покрытый густым туманом. Видимость сильно ограничена. Здесь обитают поисковики и другие смертоносные существа.',
    difficulty: 'Экстремальный',
    resources: ['Исталль', 'Череп поисковика', 'Мясо поисковика', 'Туманный марафон'],
    bosses: ['Королева (The Queen)'],
    creatures: ['Поисковик', 'Туманный мародёр', 'Летучий поисковик', 'Мора'],
  },
];

// Боссы из Valheim Fandom
export const bosses: Boss[] = [
  {
    id: 'eikthyr',
    name: 'Эйктюр (Eikthyr)',
    biome: 'Луга',
    health: 500,
    damage: 30,
    weakness: 'Кремневое оружие',
    drops: ['Оленьи рога', 'Мясо'],
    rune: 'ᚠ',
    summoning: '2 оленьих трофея на алтаре в Лугах',
    strategy: 'Держись на расстоянии, уклоняйся от рывков. Бей кремневым топором или луком.',
  },
  {
    id: 'elder',
    name: 'Старейшина (The Elder)',
    biome: 'Чёрный Лес',
    health: 2500,
    damage: 55,
    weakness: 'Огонь, стрелы',
    drops: ['Мегингьярд (пояс силы)', 'Сердце Старейшины'],
    rune: 'ᚦ',
    summoning: '3 древних семени на алтаре в Чёрном Лесу',
    strategy: 'Сожги его корни огненными стрелами. Держись подальше от его ударов руками.',
  },
  {
    id: 'bonemass',
    name: 'Костяная Масса (Bonemass)',
    biome: 'Болото',
    health: 3500,
    damage: 70,
    weakness: 'Дробящий урон (булавы)',
    drops: ['Хоткэйр (Wishbone)', 'Визгун'],
    rune: 'ᛗ',
    summoning: '10 тинных черепов на алтаре на Болоте',
    strategy: 'Используй только дробящее оружие (булава). Держись на расстоянии, уклоняйся от ядовитых облаков.',
  },
  {
    id: 'moder',
    name: 'Модер (Moder)',
    biome: 'Горы',
    health: 5000,
    damage: 90,
    weakness: 'Стрелы, огонь',
    drops: ['Драконий слёз', 'Модер-чешуя'],
    rune: 'ᛁ',
    summoning: '3 драконьих яйца на алтаре в Горах',
    strategy: 'Стреляй огненными стрелами. Уклоняйся от ледяных атак. Используй укрытия.',
  },
  {
    id: 'yagluth',
    name: 'Яглут (Yagluth)',
    biome: 'Равнины',
    health: 12000,
    damage: 120,
    weakness: 'Серебряное оружие, огонь',
    drops: ['Яглут-клинок', 'Тор-обломок'],
    rune: 'ᛊ',
    summoning: '5 яглут-идолов на алтаре на Равнинах',
    strategy: 'Серебряный меч очень эффективен. Уклоняйся от его магических атак. Используй зелья сопротивления магии.',
  },
  {
    id: 'queen',
    name: 'Королева (The Queen)',
    biome: 'Туманные земли',
    health: 25000,
    damage: 180,
    weakness: 'Исталль-оружие',
    drops: ['Королевский трофей', 'Мясорубка'],
    rune: 'ᛟ',
    summoning: '3 семя искателя на алтаре в Туманных землях',
    strategy: 'Самый сложный босс. Нужна полная исталль-броня. Уклоняйся от её ядовитых атак и призыва миньонов.',
  },
];

// Существа из Valheim Fandom
export const monsters: Monster[] = [
  { id: 'boar', name: 'Кабан', biome: 'Луга', health: 20, damage: 5, weakness: '—', drops: ['Сырое мясо', 'Кожа'], rune: 'ᚠ', difficulty: 'easy', description: 'Мирное животное. Агрессивно только если ранено.' },
  { id: 'greydwarf', name: 'Серый Дварф', biome: 'Чёрный Лес', health: 40, damage: 8, weakness: 'Огонь', drops: ['Серое мясо', 'Камень', 'Глаз'], rune: 'ᛞ', difficulty: 'easy', description: 'Маленький злобный дух леса. Боится огня.' },
  { id: 'skeleton', name: 'Скелет', biome: 'Чёрный Лес', health: 60, damage: 15, weakness: 'Дробящий', drops: ['Кость', 'Ржавый меч'], rune: 'ᛊ', difficulty: 'medium', description: 'Оживший мертвец. Ломается от ударов булавой.' },
  { id: 'troll', name: 'Тролль', biome: 'Чёрный Лес', health: 800, damage: 45, weakness: 'Стрелы', drops: ['Камень тролля', 'Шкура тролля'], rune: 'ᛏ', difficulty: 'hard', description: 'Огромный каменный великан. Очень медленный, но смертоносный.' },
  { id: 'draugr', name: 'Драугр', biome: 'Болото', health: 120, damage: 28, weakness: 'Огонь, Дробящий', drops: ['Железо', 'Древний семя', 'Ржавый меч'], rune: 'ᛗ', difficulty: 'hard', description: 'Проклятый воин. Очень опасен в группе.' },
  { id: 'fenring', name: 'Фенринг', biome: 'Горы', health: 200, damage: 40, weakness: 'Огонь, Серебро', drops: ['Серебро', 'Шкура волка'], rune: 'ᚠ', difficulty: 'hard', description: 'Быстрый оборотень. Прыгает и кусает.' },
  { id: 'fuling', name: 'Фуларинг', biome: 'Равнины', health: 300, damage: 55, weakness: 'Серебро', drops: ['Чёрный металл', 'Шкура фуларинга'], rune: 'ᛊ', difficulty: 'hard', description: 'Зеленокожий воин. Агрессивен и быстр.' },
  { id: 'seeker', name: 'Поисковик', biome: 'Туманные земли', health: 500, damage: 80, weakness: 'Исталль', drops: ['Исталль', 'Череп поисковика'], rune: 'ᛟ', difficulty: 'hard', description: 'Смертоносное насекомое из Туманных земель.' },
];

export const recipes: CraftRecipe[] = [
  { id: 'flint_axe', name: 'Кремневый топор', station: 'Верстак 1', materials: [{ name: 'Кремень', amount: 5 }, { name: 'Дерево', amount: 3 }], category: 'weapon', rune: 'ᛏ' },
  { id: 'bronze_sword', name: 'Бронзовый меч', station: 'Горн', materials: [{ name: 'Бронза', amount: 8 }, { name: 'Дерево', amount: 2 }], category: 'weapon', rune: 'ᛏ' },
  { id: 'iron_armor', name: 'Железная броня', station: 'Горн 2', materials: [{ name: 'Железо', amount: 20 }, { name: 'Кожа', amount: 5 }], category: 'armor', rune: 'ᛁ' },
  { id: 'mead_base', name: 'Основа медовухи', station: 'Котёл', materials: [{ name: 'Мёд', amount: 10 }, { name: 'Грибы', amount: 1 }], category: 'food', rune: 'ᚠ' },
  { id: 'stone_wall', name: 'Каменная стена', station: 'Верстак 2', materials: [{ name: 'Камень', amount: 4 }], category: 'building', rune: 'ᛒ' },
  { id: 'finewood_bow', name: 'Лук из тонкого дерева', station: 'Верстак 3', materials: [{ name: 'Тонкое дерево', amount: 10 }, { name: 'Жила', amount: 4 }], category: 'weapon', rune: 'ᚱ' },
  { id: 'silver_sword', name: 'Серебряный меч', station: 'Горн 3', materials: [{ name: 'Серебро', amount: 15 }, { name: 'Дерево', amount: 3 }], category: 'weapon', rune: 'ᛏ' },
  { id: 'blackmetal_armor', name: 'Чернометаллическая броня', station: 'Горн 4', materials: [{ name: 'Чёрный металл', amount: 30 }, { name: 'Кожа', amount: 10 }], category: 'armor', rune: 'ᛁ' },
];

export const guides: Guide[] = [
  { id: 'first-day', title: 'Первый день: выжить любой ценой', category: 'Начало', readTime: '5 мин', rune: 'ᚠ', excerpt: 'Как пережить первую ночь без инструментов и в одиночку.' },
  { id: 'first-boss', title: 'Гайд по первому боссу — Эйктюр', category: 'Боссы', readTime: '8 мин', rune: 'ᛏ', excerpt: 'Тактика, снаряжение, состав группы для победы над Эйктюром.' },
  { id: 'base-building', title: 'Идеальная база: от хижины до крепости', category: 'Строительство', readTime: '12 мин', rune: 'ᛒ', excerpt: 'Планировка, структурная целостность, оборона от рейдеров.' },
  { id: 'sailing', title: 'Мореплавание: первый корабль', category: 'Транспорт', readTime: '6 мин', rune: 'ᚱ', excerpt: 'Как построить драккар и не утонуть в первом шторме.' },
  { id: 'guild-tactics', title: 'Тактика гильдейских рейдов', category: 'PvE', readTime: '10 мин', rune: 'ᛊ', excerpt: 'Координация группы, роли, распределение лута.' },
  { id: 'economy', title: 'Экономика города: от бартера до золота', category: 'Торговля', readTime: '7 мин', rune: 'ᚠ', excerpt: 'Как работает валюта, рыночная площадь, караваны.' },
  { id: 'biomes-guide', title: 'Полный гайд по биомам', category: 'Исследование', readTime: '15 мин', rune: 'ᛟ', excerpt: 'Все 6 биомов: ресурсы, опасности, боссы, стратегии.' },
  { id: 'boss-order', title: 'Порядок убийства боссов', category: 'Боссы', readTime: '10 мин', rune: 'ᛏ', excerpt: 'В каком порядке убивать боссов для оптимальной прогрессии.' },
];
