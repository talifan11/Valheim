# Valheim: Хроники Города — MMO Портал

## 📋 Обзор проекта

Полнофункциональный MMO-портал для сервера Valheim "Хроники Города" с системой геймификации, интерактивной Вики, калькулятором талантов и социальными функциями.

**Технологический стек:**
- React 18 + TypeScript
- Vite (сборщик)
- Tailwind CSS 4
- React Router (HashRouter)
- Framer Motion (анимации)
- Leaflet (интерактивная карта)
- Context API (состояние)

---

## 🎯 Реализованные функции

### 1. Основная структура (6 страниц)

#### Главная (`/`)
- Hero-секция с видео-фоном (YouTube)
- Виджет статуса серверов
- Три столпа сервера
- Записки хранителя (кликабельные)
- Discord виджет активности
- Ежедневные задания

#### Серверы (`/servers`)
- Список всех серверов с live-статусом
- Кликабельные карточки → модальное окно с деталями
- Информация: игроки, TPS, пинг, аптайм, погода
- Список онлайн-игроков
- Последние события
- Ссылка на Discord

#### Вики (`/wiki`)
- **Ctrl+K поиск** по всем разделам
- Интерактивная карта (Leaflet)
- Биомы (6 штук с описаниями)
- Боссы (6 штук с тактиками)
- Существа (8 штук)
- Крафт-рецепты
- Гайды (8 штук)
- Кликабельные модальные окна с детальной информацией

#### Таланты (`/skill-tree`) ⭐ **ПОСЛЕДНЕЕ**
- **Руническое дерево навыков** в скандинавском стиле
- **60 программных SVG иконок** (RunicIcons.tsx) — все в едином стиле
- 10 деревьев навыков:
  - Экспертные: Атака, Скорость, Защита, Производство
  - Оружейные: Лук, Меч, Посох
  - Профессии: Лучник, Маг, Танк
- Интерактивное распределение очков (50 по умолчанию)
- **Рунические соединения** с анимированными частицами
- **Атмосферный фон** с вращающимися рунами по углам
- Система требований (нельзя разблокировать без предварительных)
- **Тултипы в стиле WoW** (появляются рядом с навыком)
- **Фоновые изображения** для каждого класса (меняются при переключении)
- **Система престижа** — перерождение с бонусами
- **Рекомендуемые билды** — загрузка в один клик
- **Экспорт билдов** в буфер обмена
- **Конфетти эффекты** при разблокировке и престиже
- Кнопка сброса дерева

#### Сообщество (`/community`)
- Таблица славы (топ игроков)
- Список гильдий
- Личный кабинет (после входа)

#### Магазин (`/shop`)
- Лавка комфорта (не P2W)
- Косметика и удобства
- Прозрачная экономика

#### Профиль (`/profile`)
- Ранг и прогресс
- Статистика (XP, руны, гильдия)
- Ежедневные задания
- Привязка Steam/Discord (UI готов)

---

### 2. Система геймификации

#### Ранги
- **Новичок** (0 XP): базовые задания
- **Викинг** (200 XP): закрытый Discord, косметический тег
- **Ярл** (500 XP): право голоса на выборах, приоритетный вход
- **Легенда** (1000 XP): легендарный плащ, статуя в городе

#### Ежедневные задания
- Изучи свитки (прочитать гайд)
- Разведка (проверить серверы)
- Тайная руна (найти скрытую руну)
- Зал Славы (посетить сообщество)

#### HUD
- Полоска опыта в стиле стамины
- Анимация при получении XP
- Клик → переход в профиль

---

### 3. Дизайн-система "Золотой стандарт"

#### Цветовая палитра
```css
--color-bg-deep: #0B0E14          /* Основной фон */
--color-amber: #C89B3C            /* Янтарный акцент */
--color-rune-blue: #3B82F6        /* Рунная синь */
--color-text-primary: #E8E4DC     /* Основной текст */
```

#### Шрифты
- **Cormorant Garamond** — заголовки (элегантный, поддерживает кириллицу)
- **Manrope** — основной текст (современный, читаемый)

#### Текстуры
- SVG-шум (feTurbulence) с opacity: 0.03
- Убирает "пластиковость" тёмного фона

#### Компоненты
- `glass-dark` — стеклянные карточки с backdrop-filter
- `card-wood` — деревянные карточки с градиентом
- `card-inventory` — карточки в стиле инвентаря
- `card-corner` — угловые орнаменты
- `btn-viking` — кнопки со скошенными углами (clip-path)

---

## 🏗️ Архитектура проекта

```
src/
├── App.tsx                      # Главный роутер
├── main.tsx                     # Точка входа
├── index.css                    # Глобальные стили + дизайн-система
├── icons.tsx                    # SVG иконки в скандинавском стиле
│
├── components/
│   ├── Layout.tsx               # Навигация + футер
│   ├── HUD.tsx                  # Полоска опыта (нижний левый угол)
│   ├── BiomeSelector.tsx        # Выбор биома темы
│   ├── SearchModal.tsx          # Ctrl+K поиск для Вики
│   ├── WorldMap.tsx             # Интерактивная карта (Leaflet)
│   ├── WikiModal.tsx            # Модальное окно для Вики
│   ├── ServerModal.tsx          # Модальное окно для серверов
│   ├── SkillTreeCalculator.tsx  # ⭐ Калькулятор талантов
│   ├── ChroniclesWidget.tsx     # Записки хранителя
│   ├── DiscordWidget.tsx        # Discord активность
│   └── DailyTasks.tsx           # Ежедневные задания
│
├── pages/
│   ├── HomePage.tsx             # Главная
│   ├── ServersPage.tsx          # Серверы
│   ├── WikiPage.tsx             # Вики
│   ├── SkillTreePage.tsx        # Таланты
│   ├── CommunityPage.tsx        # Сообщество
│   ├── ShopPage.tsx             # Магазин
│   ├── ProfilePage.tsx          # Профиль
│   └── NotFoundPage.tsx         # 404 в лоре
│
├── context/
│   ├── ThemeContext.tsx         # Тема (выбор биома)
│   └── UserContext.tsx          # Пользователь + геймификация
│
├── data/
│   ├── wikiData.ts              # Данные Вики (боссы, биомы, гайды)
│   └── skillTreeData.ts         # ⭐ Данные деревьев навыков
│
└── hooks/
    └── useServerStatus.ts       # Live-статус серверов
```

---

## ⭐ Калькулятор талантов — Детальная реализация

### Структура данных (`skillTreeData.ts`)

```typescript
interface SkillTree {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;              // Цвет дерева (для рамок, линий)
  background?: string;        // ⭐ URL фонового изображения
  skills: SkillNode[];
  maxPoints: number;
}

interface SkillNode {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  currentPoints: number;
  position: { x: number; y: number };  // Позиция в %
  requires?: string[];        // ID требуемых навыков
  tier: number;
  icon: string;
  type: 'passive' | 'active';
  keybind?: string;           // Клавиша для активных (Z, G, H, Y)
}
```

### Фоновые изображения

Для каждого дерева навыков сгенерированы уникальные фоны в тёмно-фэнтези стиле:

| Дерево | Фон | Описание |
|--------|-----|----------|
| Атака | `8c499ede...` | Оружие, огонь, красная энергия |
| Скорость | `53a39bbb...` | Молнии, ветер, тень |
| Защита | `8f6df151...` | Крепость, зелёные щиты |
| Производство | `54cceac5...` | Кузница, золото, искры |
| Лук | `1291770f...` | Мистический лес, природа |
| Меч | `8e1a89fd...` | Магический клинок, фиолетовый |
| Посох | `c86ca992...` | Лава, огненная магия |
| Лучник | `d5272ec6...` | Эльфийский лес, зелёный |
| Маг | `8098c7c2...` | Огонь, магическая энергия |
| Танк | `b144bdc6...` | Каменная крепость, щиты |

### Профессиональные иконки (WoW Style)

**Файл:** `src/components/TalentIcons.tsx`

Все эмодзи заменены на профессиональные SVG иконки в стиле World of Warcraft:

**Особенности дизайна:**
- Квадратные иконки 64x64px с градиентными фонами
- Уникальные SVG для каждого навыка (40+ иконок)
- Толстые рамки с цветовым кодированием:
  - Серая рамка — навык недоступен
  - Цветная рамка (цвет дерева) — навык изучен
  - Золотая рамка с свечением — навык максимального уровня
- Счётчик очков в правом нижнем углу (стиль WoW)
- Индикатор клавиши для активных навыков (синий бейдж)

**Список иконок по деревьям:**

| Дерево | Иконки |
|--------|--------|
| Атака | `powerStrike`, `critStrike`, `critPower`, `berserkerRage`, `mortalStrike` |
| Скорость | `swiftFeet`, `quickHands`, `cooldownReduce`, `whirlwind` |
| Защита | `toughBody`, `toughArmor`, `dodge`, `regeneration`, `blockTraining` |
| Производство | `efficientGather`, `craftMaster`, `durability`, `farmGrid`, `enchant` |
| Лук | `preciseShot`, `quickReload`, `piercingArrow`, `explosiveArrow`, `arrowRain` |
| Меч | `swordMastery`, `quickStrikes`, `parry`, `rushSlash`, `whirlwindSlash` |
| Посох | `magicPower`, `manaFlow`, `quickCast`, `doubleCast`, `fireRain` |
| Лучник | `highJump`, `softLanding`, `arrowSave`, `multishot` |
| Маг | `elementalMaster`, `energyFlow`, `manaRegen`, `magicBurst` |
| Танк | `livingWall`, `ironSkin`, `provoke`, `warCry` |

**Как использовать:**
```typescript
import { TalentIcons, TalentIconKey } from './TalentIcons';

// В компоненте
<div className="w-16 h-16">
  {TalentIcons[skill.icon as TalentIconKey]}
</div>
```

**Добавление новой иконки:**
1. Откройте `src/components/TalentIcons.tsx`
2. Добавьте новый SVG в объект `TalentIcons`:
```typescript
newIcon: (
  <svg viewBox="0 0 64 64" className="w-full h-full">
    <defs>
      <linearGradient id="newGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#color1" />
        <stop offset="100%" stopColor="#color2" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" fill="url(#newGrad)" />
    {/* Ваш дизайн */}
  </svg>
),
```
3. Используйте название иконки в `skillTreeData.ts`

### Логика работы

```typescript
// Проверка доступности навыка
const canUnlockSkill = (skill: SkillNode) => {
  if (!skill.requires) return true;
  return skill.requires.every(reqId => {
    const reqSkill = selectedTree.skills.find(s => s.id === reqId);
    if (!reqSkill) return false;
    return getSkillPoints(reqId) >= reqSkill.maxPoints;
  });
};

// Клик по навыку
const handleSkillClick = (skill: SkillNode) => {
  const currentPoints = getSkillPoints(skill.id);
  
  if (currentPoints < skill.maxPoints && availablePoints > 0 && canUnlockSkill(skill)) {
    // Добавить очко
    setSkillStates(prev => ({ ...prev, [skill.id]: currentPoints + 1 }));
    setAvailablePoints(prev => prev - 1);
  } else if (currentPoints > 0) {
    // Убрать очко
    setSkillStates(prev => ({ ...prev, [skill.id]: currentPoints - 1 }));
    setAvailablePoints(prev => prev + 1);
  }
};
```

### Тултипы в стиле WoW

**Проблема, которую решили:**
- Изначально тултип появлялся внизу экрана (как обычный tooltip)
- Это было неудобно — глаз перемещался далеко от навыка

**Решение:**
```typescript
const handleSkillHover = (skill: SkillNode, event: React.MouseEvent) => {
  setHoveredSkill(skill);
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  const tooltipWidth = 320;
  const tooltipHeight = 300;
  
  // Позиция справа от навыка
  let x = rect.right + 10;
  let y = rect.top;
  
  // Если выходит за правый край → показать слева
  if (x + tooltipWidth > window.innerWidth) {
    x = rect.left - tooltipWidth - 10;
  }
  
  // Если выходит за нижний край → поднять вверх
  if (y + tooltipHeight > window.innerHeight) {
    y = window.innerHeight - tooltipHeight - 20;
  }
  
  // Если выходит за верхний край → опустить вниз
  if (y < 0) {
    y = 20;
  }
  
  setTooltipPosition({ x, y });
};
```

**Дизайн тултипа:**
- Полупрозрачный тёмный фон с градиентом
- Цветная рамка под цвет дерева навыков
- Свечение (box-shadow) в цвет дерева
- Заголовок + иконка + тип (активная/пассивная)
- Описание
- Очки и требования
- Подсказка (клик для улучшения/сброса)

### Рендеринг дерева

```tsx
<div 
  className="glass-dark rounded-lg p-6 relative min-h-[600px] overflow-hidden"
  style={{
    backgroundImage: selectedTree.background ? `url(${selectedTree.background})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Тёмный оверлей для читаемости */}
  <div className="absolute inset-0 bg-black/70" />
  
  {/* SVG линии связей */}
  <svg className="absolute inset-0 w-full h-full pointer-events-none">
    {selectedTree.skills.map(skill => {
      if (!skill.requires) return null;
      return skill.requires.map(reqId => {
        const reqSkill = selectedTree.skills.find(s => s.id === reqId);
        const isActive = getSkillPoints(reqId) === reqSkill.maxPoints;
        
        return (
          <line
            x1={`${reqSkill.position.x}%`}
            y1={`${reqSkill.position.y}%`}
            x2={`${skill.position.x}%`}
            y2={`${skill.position.y}%`}
            stroke={isActive ? selectedTree.color : '#4b5563'}
            strokeDasharray={isActive ? '0' : '5,5'}
          />
        );
      });
    })}
  </svg>
  
  {/* Узлы навыков */}
  {selectedTree.skills.map(skill => (
    <div
      style={{
        left: `${skill.position.x}%`,
        top: `${skill.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={(e) => handleSkillHover(skill, e)}
      onMouseLeave={() => setHoveredSkill(null)}
    >
      {/* Узел с иконкой и счётчиком очков */}
    </div>
  ))}
</div>
```

---

## 🗡️ Руническое Дерево Навыков (v1.3.0)

### Сгенерированные иконки

**Основные ветки (Expert Trees):**
| Ветка | Иконка | Описание |
|-------|--------|----------|
| Атака | `fbc9b439...` | Скрещенные топоры с огненными рунами |
| Скорость | `ee04fcae...` | Крылатый шлем с молниями |
| Защита | `2a6761ca...` | Рунический щит с защитной аурой |
| Производство | `86da56db...` | Молот кузнеца с искрами |

**Оружейные ветки (Weapon Trees):**
| Ветка | Иконка | Описание |
|-------|--------|----------|
| Лук | `e7116af4...` | Викингский длинный лук с руническими стрелами |
| Меч | `3fa38a07...` | Орнаментированный меч с руническим лезвием |

**Ключевые навыки (Attack Tree):**
| Навык | Иконка | Описание |
|-------|--------|----------|
| Сила удара | `6f83a45b...` | Кулак викинга с горящими рунами |
| Критический удар | `8f9ebca6...` | Стрела с сияющим наконечником |
| Ярость берсерка | `3c58902c...` | Лицо воина с огненными глазами |
| Смертельный удар | `6ab56a33...` | Череп с энергией и кинжалами |

### Компонент SkillNode.tsx

**Особенности:**
- Круглые узлы с градиентным фоном
- Внешнее свечение при доступности (пульсирующая анимация)
- Рунический круг вокруг tier 4 навыков (вращающаяся пунктирная рамка)
- Счётчик очков с цветовой индикацией
- MAX индикатор для максимальных навыков
- Индикатор клавиши для активных способностей
- Hover-эффект с увеличением (scale: 1.15)

**Код:**
```tsx
<SkillNodeComponent
  skill={skill}
  tree={selectedTree}
  points={getSkillPoints(skill.id)}
  canUnlock={canUnlockSkill(skill)}
  isMaxed={getSkillPoints(skill.id) === skill.maxPoints}
  onHover={(e) => handleSkillHover(skill, e)}
  onLeave={() => setHoveredSkill(null)}
  onClick={() => handleSkillClick(skill)}
/>
```

### Рунические соединения

**SVG линии с градиентами и свечением:**
- Активные соединения: градиент цвета дерева с фильтром свечения
- Неактивные соединения: пунктирные серые линии
- Анимированные частицы на активных путях (2 частицы с задержкой)

**Код:**
```tsx
<line
  stroke={isActive ? `url(#activePath-${selectedTree.id})` : '#4b5563'}
  strokeWidth={isActive ? '3' : '2'}
  strokeDasharray={isActive ? '0' : '5,5'}
  filter={isActive ? 'url(#glow)' : undefined}
/>
<circle r="3" fill={selectedTree.color}>
  <animateMotion dur="2s" repeatCount="indefinite" path="..." />
</circle>
```

### Атмосферный фон

**Элементы:**
- Фоновое изображение дерева навыков
- Тёмный оверлей (bg-black/70)
- Вращающийся радиальный градиент (60s анимация)
- Декоративные руны по углам (ᚱ, ᚠ, ᛟ, ᛏ)

### Система престижа

**Функционал:**
- Доступна когда все навыки дерева максимальны
- Сбрасывает все очки
- Даёт +10 бонусных очков
- Увеличивает счётчик престижа
- Особый конфетти эффект (200 частиц, 4 цвета)

**Код:**
```tsx
const handlePrestige = () => {
  if (isTreeMaxed) {
    setPrestigeCount(prev => prev + 1);
    resetTree();
    setAvailablePoints(prev => prev + 10);
    confetti({ particleCount: 200, spread: 120, ... });
  }
};
```

### Рекомендуемые билды

**Предустановленные билды:**
- Берсерк (89% популярности)
- Критический снайпер (72% популярности)
- Вампир (65% популярности)

**Загрузка билда:**
```tsx
const loadBuild = (buildPath: string[]) => {
  resetTree();
  buildPath.forEach((skillId, index) => {
    setTimeout(() => {
      const skill = selectedTree.skills.find(s => s.id === skillId);
      if (skill && canUnlockSkill(skill)) {
        handleSkillClick(skill);
      }
    }, index * 200);
  });
};
```

### Экспорт билдов

**Функционал:**
- Сериализация состояния в JSON
- Кодирование в Base64
- Копирование в буфер обмена

**Код:**
```tsx
const exportBuild = () => {
  const buildData = {
    tree: selectedTree.id,
    skills: skillStates,
    prestige: prestigeCount,
  };
  const encoded = btoa(JSON.stringify(buildData));
  navigator.clipboard.writeText(encoded);
};
```

### Конфетти эффекты

**Триггеры:**
- Первая разблокировка навыка: 50 частиц
- Разблокировка tier 4 навыка: 150 частиц (4 цвета)
- Престиж: 200 частиц (4 цвета)

**Цвета:** Цвет дерева + золотой + дополнительные цвета

### Улучшенные тултипы

**Особенности:**
- Иконка навыка с свечением
- MAX индикатор
- Тип навыка (активная/пассивная)
- Tier навыка
- Визуальное отображение очков (кружки)
- Требования
- Подсказка действия

---

## 🎨 UI/UX Улучшения (v1.2.0)

### Framer Motion анимации

**Layout.tsx:**
- Плавное появление навигации при загрузке
- Анимация логотипа при наведении (поворот на 360°)
- Stagger-анимация для пунктов меню
- Плавные переходы между страницами (AnimatePresence)
- Анимированное мобильное меню (slide-down)

**ServersPage.tsx:**
- Stagger-анимация для карточек серверов
- Hover-эффекты с увеличением и золотым свечением
- Прогресс-бары для игроков, TPS и пинга
- Цветовые индикаторы статуса

**HomePage.tsx:**
- Scroll-анимации для секций (whileInView)
- Hover-эффекты для карточек "Три Столпа"
- Поворот рун при наведении
- Прогресс-бары в виджете серверов

**DailyTasks.tsx:**
- Stagger-анимация для списка заданий
- Поворот руны при наведении
- Конфетти при выполнении задания
- Анимация XP при получении
- Прогресс-бар общего выполнения

**HUD.tsx:**
- Анимация заполнения полосы опыта
- Конфетти при получении XP
- Поворот руны при получении опыта
- Анимированный текст "+XP!"

**BiomeSelector.tsx:**
- Анимация открытия/закрытия меню
- Поворот руны при открытии
- Stagger-анимация для пунктов списка
- Hover-эффект сдвигом вправо

**SearchModal.tsx:**
- Плавное появление с масштабированием
- Анимация фона (fade-in)
- Stagger-анимация для результатов поиска

### Прогресс-бары

**Компонент ProgressBar (`src/components/ui/ProgressBar.tsx`):**
```typescript
interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  color?: 'green' | 'yellow' | 'red' | 'amber' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}
```

**Использование:**
- Серверы: игроки, TPS, пинг
- Задания: общий прогресс
- Опыт: полоска в HUD
- Цветовая кодировка по статусу

### Конфетти

**Библиотека:** `canvas-confetti`

**Триггеры:**
- Выполнение задания (100 частиц, золотые цвета)
- Получение опыта (50 частиц, снизу)
- Все задания выполнены (200 частиц)

**Цвета:** Золотая палитра (#d4af37, #ffd700, #c9952c)

### Hover-эффекты

**Карточки:**
```typescript
whileHover={{
  scale: 1.05,
  boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
}}
transition={{ type: 'spring', stiffness: 300 }}
```

**Руны:**
```typescript
whileHover={{ rotate: 360 }}
transition={{ duration: 0.6 }}
```

**Кнопки:**
```typescript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Мобильная адаптация

**Layout.tsx:**
- Бургер-меню с анимацией
- Stagger-анимация для пунктов
- Плавное открытие/закрытие
- Touch-friendly элементы (44x44px минимум)

**Responsive компоненты:**
- Грид на десктопе, список на мобильных
- Адаптивные размеры шрифтов
- Оптимизированные отступы

---

## 🐛 Известные проблемы и ограничения

### 1. Производительность
- **Проблема:** Бандл > 450KB (предупреждение Vite)
- **Причина:** Leaflet + все данные Вики + калькулятор талантов
- **Решение:** Использовать dynamic import() для code-splitting
  ```typescript
  const SkillTreeCalculator = lazy(() => import('./components/SkillTreeCalculator'));
  ```

### 2. LocalStorage для геймификации
- **Проблема:** Прогресс хранится в localStorage, легко подделать
- **Причина:** Нет бэкенда
- **Решение:** Подключить Supabase + серверную проверку заданий

### 3. Статические данные серверов
- **Проблема:** Статус серверов обновляется по таймеру (имитация)
- **Причина:** Нет реального WebSocket API
- **Решение:** Подключить Socket.io к реальному серверу Valheim

### 4. Тултипы на мобильных устройствах
- **Проблема:** Hover не работает на touch-устройствах
- **Причина:** Нет touch-событий
- **Решение:** Добавить onClick для показа тултипа на мобильных

### 5. Фоновые изображения
- **Проблема:** Изображения загружаются с внешнего CDN (qwenlm.ai)
- **Причина:** Временное решение для прототипа
- **Решение:** Загрузить изображения в `public/images/` и использовать локальные пути

### 6. HashRouter
- **Проблема:** Некоторые среды предпросмотра не поддерживают HashRouter
- **Причина:** Ограничения iframe
- **Решение:** Использовать BrowserRouter для production

---

## ✅ Что уже готово

### Функционал
- [x] 6 страниц с полной навигацией
- [x] Система геймификации (ранги, XP, задания)
- [x] Интерактивная Вики с поиском (Ctrl+K)
- [x] Калькулятор талантов (10 деревьев)
- [x] **Профессиональные SVG иконки в стиле WoW** (40+ уникальных иконок)
- [x] Тултипы в стиле WoW с умным позиционированием
- [x] Фоновые изображения для классов
- [x] Кликабельные модальные окна
- [x] Live-статус серверов (имитация)
- [x] Личный кабинет
- [x] Адаптивный дизайн
- [x] SVG-иконки в скандинавском стиле
- [x] Руны Elder Futhark как декор
- [x] Open Graph мета-теги
- [x] 404 страница в лоре
- [x] Убраны все эмодзи из калькулятора талантов

### Дизайн
- [x] Цветовая палитра "Золотой стандарт"
- [x] Шрифты Cormorant Garamond + Manrope
- [x] SVG-шум для текстуры
- [x] Glassmorphism карточки
- [x] Деревянные карточки
- [x] Угловые орнаменты
- [x] Анимации (fade-in, hover, glow)
- [x] prefers-reduced-motion поддержка

---

## 🔧 Что нужно допилить (Приоритеты)

### 🔴 Критично (Сделать в первую очередь)

#### 1. Оптимизация производительности
```typescript
// Lazy loading для тяжёлых компонентов
const SkillTreeCalculator = lazy(() => import('./components/SkillTreeCalculator'));
const WorldMap = lazy(() => import('./components/WorldMap'));

// В App.tsx
<Suspense fallback={<div>Загрузка...</div>}>
  <SkillTreeCalculator />
</Suspense>
```

#### 2. Локальные изображения
```bash
# Скачать все фоновые изображения
mkdir -p public/images/skill-trees

# Заменить URL на локальные пути
background: '/images/skill-trees/attack.png'
```

#### 3. Touch-события для тултипов
```typescript
// В SkillTreeCalculator.tsx
<div
  onMouseEnter={(e) => handleSkillHover(skill, e)}
  onMouseLeave={() => setHoveredSkill(null)}
  onTouchStart={(e) => {
    e.preventDefault();
    handleSkillHover(skill, e as any);
  }}
  onTouchEnd={() => setTimeout(() => setHoveredSkill(null), 2000)}
>
```

#### 4. WebSocket для серверов
```typescript
// hooks/useServerStatus.ts
import { io } from 'socket.io-client';

useEffect(() => {
  const socket = io('wss://your-server.com');
  
  socket.on('server-status', (data) => {
    setServers(data);
  });
  
  return () => socket.disconnect();
}, []);
```

### 🟡 Важно (Сделать во вторую очередь)

#### 5. Supabase для геймификации
```typescript
// context/UserContext.tsx
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(URL, ANON_KEY);

// Сохранение прогресса на сервере
const saveProgress = async (userId: string, progress: UserProgress) => {
  await supabase
    .from('user_progress')
    .upsert({ user_id: userId, ...progress });
};
```

#### 6. OAuth2 через Steam/Discord
```typescript
// Компонент для авторизации
<button onClick={() => signInWithOAuth({ provider: 'steam' })}>
  Войти через Steam
</button>
```

#### 7. SSR для Вики (SEO)
- Перейти на Next.js или Astro
- Генерировать статические страницы для гайдов
- Добавить sitemap.xml

#### 8. Реальные данные Discord виджета
```typescript
// Discord API для получения активности
const fetchDiscordActivity = async () => {
  const response = await fetch('https://discord.com/api/v10/...');
  return response.json();
};
```

### 🟢 Желательно (Сделать в третью очередь)

#### 9. Анимации Framer Motion
```typescript
// Вернуть Framer Motion для плавных анимаций
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
>
  {/* Узел навыка */}
</motion.div>
```

#### 10. Code-splitting по роутам
```typescript
// В App.tsx
const HomePage = lazy(() => import('./pages/HomePage'));
const WikiPage = lazy(() => import('./pages/WikiPage'));
const SkillTreePage = lazy(() => import('./pages/SkillTreePage'));
```

#### 11. Аналитика и мониторинг
- Добавить Google Analytics
- Мониторинг LCP, FID, CLS
- Error tracking (Sentry)

#### 12. PWA (Progressive Web App)
- manifest.json
- Service Worker
- Offline support

---

## 🚀 Инструкция для нового разработчика

### Установка
```bash
# Клонировать репозиторий
git clone <repo-url>
cd valheim-mmo-portal

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev

# Собрать production-версию
npm run build
```

### Структура данных

#### Добавление нового дерева навыков
```typescript
// В data/skillTreeData.ts
export const newTree: SkillTree = {
  id: 'new-tree',
  name: 'Новое дерево',
  description: 'Описание',
  icon: '🆕',
  color: '#ff00ff',
  background: '/images/skill-trees/new-tree.png',
  maxPoints: 25,
  skills: [
    {
      id: 'new-1',
      name: 'Навык 1',
      description: 'Описание навыка',
      maxPoints: 5,
      currentPoints: 0,
      position: { x: 50, y: 10 },
      tier: 1,
      icon: '✨',
      type: 'passive',
    },
    // ... остальные навыки
  ],
};

// Добавить в массив
export const allSkillTrees = [...expertTrees, ...weaponTrees, ...jobTrees, newTree];
```

#### Добавление нового босса в Вики
```typescript
// В data/wikiData.ts
export const bosses: Boss[] = [
  // ... существующие боссы
  {
    id: 'new-boss',
    name: 'Новый Босс',
    biome: 'Биом',
    health: 10000,
    damage: 150,
    weakness: 'Слабость',
    drops: ['Дроп 1', 'Дроп 2'],
    rune: 'ᚠ',
    summoning: 'Как призвать',
    strategy: 'Стратегия боя',
    image: '/images/bosses/new-boss.png',
    description: 'Полное описание',
    attacks: ['Атака 1', 'Атака 2'],
    tips: ['Совет 1', 'Совет 2'],
    power: 'Сила павшего',
  },
];
```

### Использование анимаций

#### Framer Motion паттерны

**Stagger-анимация для списков:**
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300 },
  },
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Scroll-анимации:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Контент
</motion.div>
```

**Hover-эффекты:**
```typescript
<motion.div
  whileHover={{
    scale: 1.05,
    boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)'
  }}
  transition={{ type: 'spring', stiffness: 300 }}
>
  Карточка
</motion.div>
```

**Переходы между страницами:**
```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

#### Конфетти

```typescript
import confetti from 'canvas-confetti';

// При выполнении задания
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#d4af37', '#ffd700', '#c9952c'],
});

// При получении XP
confetti({
  particleCount: 50,
  spread: 60,
  origin: { y: 0.9 },
  colors: ['#d4af37', '#ffd700', '#c9952c'],
});
```

#### Прогресс-бары

```typescript
import { ProgressBar } from '../components/ui/ProgressBar';

<ProgressBar
  value={75}
  max={100}
  label="Прогресс"
  color="green" // green | yellow | red | amber | blue
  size="md" // sm | md | lg
  showValue={true}
  animated={true}
/>
```

### Стили

#### Добавление нового цвета
```css
/* В index.css */
:root {
  --color-new-color: #ff00ff;
}

@theme {
  --color-norse-new: #ff00ff;
}
```

#### Использование в компонентах
```tsx
<div className="text-norse-new">Текст</div>
<div style={{ color: 'var(--color-new-color)' }}>Текст</div>
```

### Деплой

#### Vercel
```bash
# Установить Vercel CLI
npm i -g vercel

# Деплой
vercel
```

#### Netlify
```bash
# Установить Netlify CLI
npm i -g netlify-cli

# Деплой
netlify deploy --prod
```

---

## 📚 Полезные ссылки

- [Valheim Fandom Wiki](https://valheim.fandom.com/ru/wiki/Valheim_%D0%92%D0%B8%D0%BA%D0%B8)
- [CaptainSkillTree Mod](https://thunderstore.io/c/valheim/p/korCaptain/CaptainSkillTree/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Leaflet Docs](https://leafletjs.com/)

---

## 🎨 Дизайн-ресурсы

### Сгенерированные изображения
Все фоновые изображения для калькулятора талантов находятся в:
- `https://image.qwenlm.ai/generated-images/` (временные URL)
- Нужно скачать и переместить в `public/images/skill-trees/`

### SVG иконки
Все иконки находятся в `src/icons.tsx`:
- SwordIcon, ShieldIcon, HealIcon, MagicIcon, BowIcon, DruidIcon
- PortalIcon, CrownIcon, CastleIcon, HammerIcon, HorseIcon, BuildIcon, DaggerIcon
- DownloadIcon, NorseKnot, RuneDecor

### Руны Elder Futhark
Используются как декоративные элементы:
- ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ

---

## 🤝 Вклад в проект

### Код-стайл
- Использовать TypeScript strict mode
- Именовать компоненты в PascalCase
- Именовать файлы в kebab-case
- Добавлять комментарии для сложной логики
- Использовать ESLint + Prettier

### Git workflow
```bash
# Создать ветку
git checkout -b feature/new-skill-tree

# Коммиты
git commit -m "feat: добавить новое дерево навыков"
git commit -m "fix: исправить позиционирование тултипов"
git commit -m "docs: обновить документацию"

# Pull request
git push origin feature/new-skill-tree
```

---

## 📝 Changelog

### v1.3.0 (Текущая версия) - Руническое Дерево Навыков
- ✅ **60 программных SVG иконок** в скандинавском стиле (RunicIcons.tsx)
- ✅ **Исправлен баг со сдвигом иконок** через motion.div
- ✅ **Убраны все эмодзи** из кода калькулятора
- ✅ **Рунические соединения** с анимированными частицами
- ✅ **Атмосферный фон** с вращающимися рунами по углам
- ✅ **Система престижа** с бонусами за перерождение
- ✅ **Рекомендуемые билды** с загрузкой в один клик
- ✅ **Экспорт билдов** в буфер обмена (Base64)
- ✅ **Конфетти эффекты** при разблокировке и престиже
- ✅ **Улучшенные тултипы** с иконками и индикаторами
- ✅ **Рунические узлы** с внешним свечением и анимациями
- ✅ **MAX индикатор** для максимальных навыков
- ✅ **Framer Motion анимации** для всех страниц и компонентов
- ✅ **Прогресс-бары** для серверов, заданий и опыта
- ✅ **Hover-эффекты** с подсветкой и увеличением
- ✅ **Плавные переходы** между страницами
- ✅ **Анимированное мобильное меню**
- ✅ **Цветовые индикаторы** TPS и пинга

### v1.2.0 - Полное улучшение UI/UX
- ✅ Framer Motion анимации для всех страниц
- ✅ Прогресс-бары для серверов, заданий и опыта
- ✅ Конфетти при выполнении заданий и получении XP
- ✅ Hover-эффекты с подсветкой и увеличением
- ✅ Плавные переходы между страницами
- ✅ Анимированное мобильное меню
- ✅ Цветовые индикаторы TPS и пинга

### v1.1.0 - Профессиональные иконки
- ✅ Профессиональные SVG иконки в стиле WoW (40+ уникальных иконок)
- ✅ Убраны все эмодзи из калькулятора талантов

### v1.0.0
- ✅ Полная структура портала (6 страниц)
- ✅ Система геймификации
- ✅ Интерактивная Вика с поиском
- ✅ Калькулятор талантов (10 деревьев)
- ✅ Тултипы в стиле WoW
- ✅ Фоновые изображения для классов
- ✅ Дизайн-система "Золотой стандарт"
- ✅ Адаптивный дизайн

### v0.9.0
- Добавлены кликабельные модальные окна
- Реализован Ctrl+K поиск
- Добавлены записки хранителя
- Интеграция Discord виджета

### v0.8.0
- Создана система рангов
- Добавлены ежедневные задания
- Реализован HUD с анимацией XP

### v0.7.0
- Базовая структура проекта
- Навигация и роутинг
- Главная страница с Hero-секцией

---

## 📞 Контакты

Если есть вопросы или предложения:
- GitHub Issues
- Discord: [ссылка]
- Email: [email]

---

## 📄 Лицензия

MIT License

---

**Создано с ⚔️ для воинов Valheim**

*Последнее обновление: 2026*
