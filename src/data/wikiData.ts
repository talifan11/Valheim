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

export const monsters: Monster[] = [
  { id: 'greydwarf', name: 'Серый Дварф', biome: 'Чёрный Лес', health: 40, damage: 8, weakness: 'Огонь', drops: ['Серое мясо', 'Камень'], rune: 'ᛞ', difficulty: 'easy' },
  { id: 'troll', name: 'Тролль', biome: 'Чёрный Лес', health: 800, damage: 45, weakness: 'Стрелы', drops: ['Камень тролля', 'Шкура тролля'], rune: 'ᛏ', difficulty: 'hard' },
  { id: 'skeleton', name: 'Скелет', biome: 'Болото', health: 60, damage: 15, weakness: 'Дробящий', drops: ['Кость', 'Древний семя'], rune: 'ᛊ', difficulty: 'medium' },
  { id: 'draugr', name: 'Драугр', biome: 'Болото', health: 120, damage: 28, weakness: 'Огонь, Дробящий', drops: ['Железо', 'Древний семя', 'Ржавый меч'], rune: 'ᛗ', difficulty: 'hard' },
  { id: 'fenring', name: 'Фенринг', biome: 'Горы', health: 200, damage: 40, weakness: 'Огонь, Серебро', drops: ['Серебро', 'Шкура волка'], rune: 'ᚠ', difficulty: 'hard' },
  { id: 'gd_king', name: 'Король Серых Дварфов', biome: 'Чёрный Лес', health: 2500, damage: 60, weakness: 'Огонь', drops: ['Ключ Чёрного Леса', 'Мегингьярд'], rune: 'ᚱ', difficulty: 'boss' },
  { id: 'elder', name: 'Древний', biome: 'Чёрный Лес', health: 2500, damage: 55, weakness: 'Огонь', drops: ['Мегингьярд', 'Сердце Древнего'], rune: 'ᛒ', difficulty: 'boss' },
  { id: 'bonemass', name: 'Костяная Масса', biome: 'Болото', health: 3500, damage: 70, weakness: 'Дробящий', drops: ['Хоткэйр', 'Визгун'], rune: 'ᛁ', difficulty: 'boss' },
];

export const recipes: CraftRecipe[] = [
  { id: 'flint_axe', name: 'Кремневый топор', station: 'Верстак 1', materials: [{ name: 'Кремень', amount: 5 }, { name: 'Дерево', amount: 3 }], category: 'weapon', rune: 'ᛏ' },
  { id: 'bronze_sword', name: 'Бронзовый меч', station: 'Горн', materials: [{ name: 'Бронза', amount: 8 }, { name: 'Дерево', amount: 2 }], category: 'weapon', rune: 'ᛏ' },
  { id: 'iron_armor', name: 'Железная броня', station: 'Горн 2', materials: [{ name: 'Железо', amount: 20 }, { name: 'Кожа', amount: 5 }], category: 'armor', rune: 'ᛁ' },
  { id: 'mead_base', name: 'Основа медовухи', station: 'Котёл', materials: [{ name: 'Мёд', amount: 10 }, { name: 'Грибы', amount: 1 }], category: 'food', rune: 'ᚠ' },
  { id: 'stone_wall', name: 'Каменная стена', station: 'Верстак 2', materials: [{ name: 'Камень', amount: 4 }], category: 'building', rune: 'ᛒ' },
  { id: 'finewood_bow', name: 'Лук из тонкого дерева', station: 'Верстак 3', materials: [{ name: 'Тонкое дерево', amount: 10 }, { name: 'Жила', amount: 4 }], category: 'weapon', rune: 'ᚱ' },
];

export const guides: Guide[] = [
  { id: 'first-day', title: 'Первый день: выжить любой ценой', category: 'Начало', readTime: '5 мин', rune: 'ᚠ', excerpt: 'Как пережить первую ночь без инструментов и в одиночку.' },
  { id: 'first-boss', title: 'Гайд по первому боссу — Древний', category: 'Боссы', readTime: '8 мин', rune: 'ᛏ', excerpt: 'Тактика, снаряжение, состав группы для победы над Элдэром.' },
  { id: 'base-building', title: 'Идеальная база: от хижины до крепости', category: 'Строительство', readTime: '12 мин', rune: 'ᛒ', excerpt: 'Планировка, структурная целостность, оборона от рейдеров.' },
  { id: 'sailing', title: 'Мореплавание: первый корабль', category: 'Транспорт', readTime: '6 мин', rune: 'ᚱ', excerpt: 'Как построить драккар и не утонуть в первом шторме.' },
  { id: 'guild-tactics', title: 'Тактика гильдейских рейдов', category: 'PvE', readTime: '10 мин', rune: 'ᛊ', excerpt: 'Координация группы, роли, распределение лута.' },
  { id: 'economy', title: 'Экономика города: от бартера до золота', category: 'Торговля', readTime: '7 мин', rune: 'ᚠ', excerpt: 'Как работает валюта, рыночная площадь, караваны.' },
];
