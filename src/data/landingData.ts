// Данные для лендинга
import { serverData } from './serverData';

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
  image: string;
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

export interface CommunityStats {
  discord: number;
  ting: number;
  wiki: number;
}

// Единый источник данных серверов для лендинга
export const serverStatus = serverData.map(s => ({
  name: s.name,
  online: s.players,
  max: s.maxPlayers,
}));

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
    image: 'https://image.qwenlm.ai/generated-images/3aed2245-861a-4584-bcb4-0819f2726622/_result.png',
  },
  {
    name: 'Старейшина',
    description: 'Древнее дерево с красными глазами. Горит, но не сдаётся.',
    level: 'Испытание для Викинга',
    rune: 'ᚦ',
    image: 'https://image.qwenlm.ai/generated-images/b253ca10-7739-4deb-9331-50afc0aa20b3/_result.png',
  },
  {
    name: 'Костяная Масса',
    description: 'Сгусток костей и плоти. Бей дробящим — иначе не возьмёт.',
    level: 'Испытание для Викинга',
    rune: 'ᛗ',
    image: 'https://image.qwenlm.ai/generated-images/2cc1577f-a38c-4bd2-b94f-90c8767ad87b/_result.png',
  },
  {
    name: 'Модер',
    description: 'Ледяной дракон. Летает, плюётся льдом, ненавидит огонь.',
    level: 'Испытание для Ярла',
    rune: 'ᛁ',
    image: 'https://image.qwenlm.ai/generated-images/702d62e5-6d4e-48ab-98e3-19eb7f3bb471/_result.png',
  },
  {
    name: 'Яглут',
    description: 'Король фулингов. Магия, молнии, телепортация.',
    level: 'Испытание для Ярла',
    rune: 'ᛊ',
    image: 'https://image.qwenlm.ai/generated-images/35b92111-2a4e-4fb4-aee0-3dec906c1d9d/_result.png',
  },
  {
    name: 'Королева',
    description: 'Гигантский искатель. Яд, миньоны, смерть с одного удара.',
    level: 'Испытание для Легенды',
    rune: 'ᛟ',
    image: 'https://image.qwenlm.ai/generated-images/930cd06f-c444-4fc6-8647-9203984cd859/_result.png',
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

export const communityStats: CommunityStats = {
  discord: 234,
  ting: 1247,
  wiki: 89,
};
