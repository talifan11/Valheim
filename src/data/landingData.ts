// Данные для лендинга

export interface Pillar {
  rune: string;
  title: string;
  description: string;
}

export interface Boss {
  name: string;
  description: string;
  level: string;
  rune: string;
}

export interface Rank {
  name: string;
  rune: string;
  xpThreshold: number;
  color: string;
}

export interface Chronicle {
  date: string;
  title: string;
  description: string;
}

export interface ShopItem {
  name: string;
  type: string;
  price: string;
  rune: string;
}

export interface ServerStatus {
  name: string;
  online: number;
  max: number;
}

export interface CommunityStats {
  discord: number;
  ting: number;
  wiki: number;
}

export const pillars: Pillar[] = [
  {
    rune: 'ᛏ',
    title: 'Свобода',
    description: 'Никаких приватов и защищённых зон. Всё, что построил — защищай сам.',
  },
  {
    rune: 'ᛚ',
    title: 'Ограниченный старт',
    description: 'Начинаешь голым на пляже. Без ресов, без оружия, без подсказок.',
  },
  {
    rune: 'ᛟ',
    title: 'Живой социум',
    description: 'Города, фракции, торговля. Политика решается игроками, не админами.',
  },
];

export const bosses: Boss[] = [
  {
    name: 'Эйктюрнир',
    description: 'Олень с молниями в рогах. Первый, кого ты встретишь.',
    level: 'Испытание для Новичка',
    rune: 'ᚠ',
  },
  {
    name: 'Старейшина',
    description: 'Древнее дерево с красными глазами. Горит, но не сдаётся.',
    level: 'Испытание для Викинга',
    rune: 'ᚦ',
  },
  {
    name: 'Костяная Масса',
    description: 'Сгусток костей и плоти. Бей дробящим — иначе не возьмёт.',
    level: 'Испытание для Викинга',
    rune: 'ᛗ',
  },
  {
    name: 'Модер',
    description: 'Ледяной дракон. Летает, плюётся льдом, ненавидит огонь.',
    level: 'Испытание для Ярла',
    rune: 'ᛁ',
  },
  {
    name: 'Яглут',
    description: 'Король фулингов. Магия, молнии, телепортация.',
    level: 'Испытание для Ярла',
    rune: 'ᛊ',
  },
  {
    name: 'Королева',
    description: 'Гигантский искатель. Яд, миньоны, смерть с одного удара.',
    level: 'Испытание для Легенды',
    rune: 'ᛟ',
  },
];

export const ranks: Rank[] = [
  {
    name: 'Новичок',
    rune: 'ᚠ',
    xpThreshold: 0,
    color: '#6B7280',
  },
  {
    name: 'Викинг',
    rune: 'ᚱ',
    xpThreshold: 200,
    color: '#8B6F47',
  },
  {
    name: 'Ярл',
    rune: 'ᛏ',
    xpThreshold: 500,
    color: '#B8B8B8',
  },
  {
    name: 'Легенда',
    rune: 'ᛟ',
    xpThreshold: 1000,
    color: '#C89B3C',
  },
];

export const chronicles: Chronicle[] = [
  {
    date: '17 день весны',
    title: 'Осада Хеймдалля',
    description: 'Фракция «Северный Ветер» взяла крепость. Трофеи поделены, пленные освобождены.',
  },
  {
    date: '23 день зимы',
    title: 'Пробуждение Модера',
    description: 'Кто-то разбудил древнее. Пока живы не все.',
  },
  {
    date: '5 день осени',
    title: 'Первый Мэр',
    description: 'Ульф избран главой города. Обещал снизить налоги на торговлю.',
  },
  {
    date: '12 день лета',
    title: 'Открытие Портала',
    description: 'Великий Портал в Чёрный Лес активирован. Первая экспедиция уже собрана.',
  },
];

export const shopItems: ShopItem[] = [
  {
    name: 'Скины и плащи',
    type: 'Косметика',
    price: '100–500 ₽',
    rune: 'ᚨ',
  },
  {
    name: 'Титул «Барон»',
    type: 'Статус',
    price: '500 ₽',
    rune: 'ᛏ',
  },
  {
    name: 'Расширенный участок',
    type: 'Удобство',
    price: '300 ₽/мес',
    rune: 'ᛒ',
  },
  {
    name: 'NPC-торговец',
    type: 'Удобство',
    price: '1000 ₽',
    rune: 'ᚠ',
  },
];

export const serverStatus: ServerStatus[] = [
  { name: 'Городской', online: 47, max: 50 },
  { name: 'Чёрный Лес', online: 12, max: 20 },
  { name: 'Горы', online: 8, max: 20 },
];

export const communityStats: CommunityStats = {
  discord: 234,
  ting: 1247,
  wiki: 89,
};
