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

### v2.1.0 (Текущая версия) - Арт-пасс и полировка лендинга

**Реализовано:**

1. ✅ **Арт-пасс — 9 сгенерированных изображений**
   - `hero-shore` (1920×1080) — пустой северный берег на закате с драккаром
   - 6 портретов боссов (512×512): Эйктюрнир, Старейшина, Костяная Масса, Модер, Яглут, Королева
   - `city-panorama` (1600×900) — викингское поселение на утёсе ночью
   - `og-cover` (1200×630) — янтарная эмблема со скрещёнными топорами для OG-превью
   - Все арты в едином style-lock: Dark Norse fantasy, painterly brushwork, desaturated palette

2. ✅ **Фикс двойного футера**
   - На `/` — только футер лендинга (LandingFooter)
   - На остальных роутах — глобальный футер Layout
   - Условный рендеринг через `location.pathname !== '/'`

3. ✅ **TextureOverlay компонент**
   - SVG-текстура шума с настраиваемой прозрачностью
   - Используется в блоках 2, 5, 7 для глубины
   - `aria-hidden="true"` для доступности

4. ✅ **RuneDivider компонент**
   - Рунические разделители между актами
   - Градиентные линии с руной по центру
   - Руны по актам: ᛏ ᛚ ᛟ ᚦ ᛊ ᛒ ᚠ

5. ✅ **Embers компонент (угли в hero)**
   - 10 CSS-частиц с разными параметрами
   - Анимация `ember` — подъём вверх с затуханием
   - Уважает `prefers-reduced-motion`
   - `aria-hidden="true"`

6. ✅ **HeroSection обновлён**
   - Параллакс фона через `useScroll` + `useTransform`
   - Overline: `ᚱ Сезон IV · День 47`
   - Угли (Embers) вместо статичных частиц
   - Сгенерированный hero-арт вместо градиента
   - text-shadow для заголовка
   - Preload hero-арта в index.html

7. ✅ **BossesSection обновлён**
   - Использует сгенерированные портреты боссов
   - Hover-эффект: подъём 4px, наклон 0.5deg, подсветка рамки
   - Виньетка и градиенты для глубины
   - Тёмно-красный фон секции (#10080A)

8. ✅ **CitySection обновлён**
   - Использует сгенерированный city-panorama
   - Виньетка и градиенты для интеграции с фоном
   - `loading="lazy"` для оптимизации

9. ✅ **SkillTreeCalculator обновлён**
   - Заменён эмодзи ✨ на компонент Sparkles из lucide-react
   - Все эмодзи удалены из кода

10. ✅ **CSS-стили для угля**
    - `@keyframes ember` — анимация подъёма частиц
    - `.scrollbar-hide` — скрытие скроллбара для горизонтального скролла
    - Уважает `prefers-reduced-motion`

11. ✅ **OG-теги обновлены**
    - Используется сгенерированный og-cover
    - Preload hero-арта для ускорения загрузки

**Технические детали:**
- Размер бандла: 389KB JS, 86KB CSS
- LandingPage: 36KB (увеличился из-за TextureOverlay и RuneDivider)
- Все изображения lazy-loaded кроме hero (preload)
- Параллакс через Framer Motion `useScroll` + `useTransform`

**Новые файлы:**
- `src/pages/Landing/components/TextureOverlay.tsx`
- `src/pages/Landing/components/RuneDivider.tsx`
- `src/pages/Landing/components/Embers.tsx`

**Обновлённые файлы:**
- `src/components/Layout.tsx` — скрыт футер на лендинге
- `src/pages/Landing/HeroSection.tsx` — параллакс, угли, overline, hero-арт
- `src/pages/Landing/BossesSection.tsx` — сгенерированные портреты боссов
- `src/pages/Landing/CitySection.tsx` — city-panorama
- `src/pages/Landing/LandingPage.tsx` — TextureOverlay и RuneDivider между блоками
- `src/components/SkillTreeCalculator.tsx` — ✨ → Sparkles
- `src/data/landingData.ts` — добавлено поле `image` в Boss
- `src/index.css` — стили для угля и scrollbar-hide
- `index.html` — preload hero-арта, обновлённые OG-теги
- `CONCEPT.md` — документация

### v2.0.0 - Культовый лендинг

**Реализовано:**

Полноценный лендинг из 9 блоков в стиле скандинавской саги:

1. ✅ **Hero — «Зов»**
   - Полноэкранный блок с атмосферным градиентом
   - Заголовок: «Мы начали голыми на пляже. Закончим богами за горами.»
   - Два CTA: «Скачать лаунчер» и «Смотреть трейлер»
   - Строка статуса серверов с пульсирующей точкой
   - Скролл-индикатор с руной ᛏ
   - Декоративные руны с анимацией пульсации

2. ✅ **Берег — «Три столпа сервера»**
   - Заголовок: «Здесь всё честно»
   - Три карточки с рунами: ᛏ Свобода, ᛚ Ограниченный старт, ᛟ Живой социум
   - Stagger-анимация при появлении

3. ✅ **Город — «Что ты построишь»**
   - Заголовок: «Твой город. Твои правила.»
   - Две колонки: текст + SVG силуэт города
   - Описание фракций, торговли, строительства
   - Ссылка на Вики

4. ✅ **Битвы — «С кем сразишься»**
   - Заголовок: «Здесь водится кое-что похуже тебя»
   - Горизонтальный слайдер из 6 боссов
   - Карточки с рунами, именами, описаниями, уровнями сложности
   - Snap-скролл на мобильных

5. ✅ **Путь — «Как растёшь»**
   - Заголовок: «От Новичка до Легенды»
   - Визуальная шкала из 4 рангов с рунами
   - Превью HUD с прогресс-баром
   - Анимация заполнения при появлении
   - Ссылка на калькулятор талантов

6. ✅ **Народ — «С кем идёшь»**
   - Заголовок: «Один выживешь. С другими — станешь легендой.»
   - Три плитки: Discord, Тинг, Вики
   - Статистика сообщества
   - Кнопки с переходами

7. ✅ **Хроники — «Что уже произошло»**
   - Заголовок: «Записки Хранителя»
   - 4 события с датами в стиле саги
   - Карточки с описаниями

8. ✅ **Магазин — «Что можно получить»**
   - Заголовок: «Косметика и удобства»
   - Пояснение про отсутствие pay-to-win
   - 4 превью предметов с рунами и ценами
   - Ссылка на магазин

9. ✅ **Призыв — «Финальный CTA»**
   - Заголовок: «Хватит читать. Пора строить.»
   - Два CTA: «Скачать лаунчер» и «Присоединиться к Discord»
   - Системные требования
   - Декоративные руны с анимацией

10. ✅ **Footer**
    - Навигация по разделам
    - Ссылки на сообщество (Discord, Telegram, GitHub)
    - Правовая информация
    - Руническая строка ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ

**Технические детали:**
- Размер бандла: 389KB JS, 83KB CSS
- LandingPage: 27KB (lazy loaded)
- Все анимации через Framer Motion
- Stagger-эффекты для карточек
- Параллакс-эффекты для рун
- Полная мобильная адаптация
- Accessibility: focus-visible, ARIA-атрибуты

**Новые файлы:**
- `src/data/landingData.ts` — данные лендинга
- `src/pages/Landing/LandingPage.tsx` — главная страница
- `src/pages/Landing/HeroSection.tsx` — блок 1
- `src/pages/Landing/PillarsSection.tsx` — блок 2
- `src/pages/Landing/CitySection.tsx` — блок 3
- `src/pages/Landing/BossesSection.tsx` — блок 4
- `src/pages/Landing/ProgressionSection.tsx` — блок 5
- `src/pages/Landing/CommunitySection.tsx` — блок 6
- `src/pages/Landing/ChroniclesSection.tsx` — блок 7
- `src/pages/Landing/ShopPreviewSection.tsx` — блок 8
- `src/pages/Landing/FinalCTASection.tsx` — блок 9
- `src/pages/Landing/Footer.tsx` — футер

**Обновлённые файлы:**
- `src/App.tsx` — добавлен роут `/` для лендинга, `/home` для старой главной
- `CONCEPT.md` — документация

**Роутинг:**
- `/` — новый лендинг
- `/home` — старая главная (дашборд)
- Все остальные роуты сохранены

### v1.9.0 - Профессиональный редактор тем

**Реализовано:**

1. ✅ **Страница создания темы** `/ting/new`
   - Полноценная форма с валидацией
   - Выбор категории из списка
   - Выбор до 3 тегов
   - Заголовок с счётчиком символов (8-120)
   - Автосохранение черновика каждые 10 секунд
   - Восстановление черновика при возврате

2. ✅ **Профессиональный редактор**
   - Панель инструментов с кнопками:
     - **Жирный** (Ctrl+B)
     - *Курсив* (Ctrl+I)
     - Списки
     - Ссылки
     - Изображения (по URL)
     - HTML код (переключаемый режим)
   - Выбор размера шрифта (14px, 16px, 18px, 20px)
   - Переключатель предпросмотра в реальном времени
   - Поддержка Markdown и HTML
   - Моноширинный шрифт в режиме редактирования

3. ✅ **Предпросмотр Markdown**
   - Рендеринг через react-markdown
   - Поддержка GFM (GitHub Flavored Markdown)
   - Санитизация HTML через rehype-sanitize
   - Стилизованный вывод с скандинавской темой
   - Поддержка заголовков, списков, ссылок, изображений, кода, таблиц

4. ✅ **CSS стили для Markdown**
   - Заголовки с шрифтом Cormorant Garamond
   - Янтарные акценты для ссылок и заголовков
   - Стилизованные блоки кода
   - Таблицы с янтарными заголовками
   - Цитаты с янтарной левой границей
   - Изображения с закруглёнными углами

5. ✅ **Валидация формы**
   - Заголовок: 8-120 символов
   - Категория: обязательна
   - Тело темы: минимум 20 символов
   - Ошибки отображаются под полями
   - Красная подсветка невалидных полей

6. ✅ **Интеграция с форумом**
   - Кнопки "Создать тему" кликабельны
   - Навигация на `/ting/new`
   - Сохранение темы в localStorage
   - Перенаправление на созданную тему
   - Руна ᛏ на кнопке вместо иконки

**Технические детали:**
- Размер бандла: 389KB JS, 79KB CSS
- NewThreadPage: 172KB (markdown рендеринг)
- Новые зависимости: react-markdown, remark-gfm, rehype-sanitize
- Lazy loading для страницы создания темы

**Новые файлы:**
- `src/pages/NewThreadPage.tsx` — страница создания темы

**Обновлённые файлы:**
- `src/App.tsx` — добавлен роут `/ting/new`
- `src/pages/TingPage.tsx` — кнопка "Создать тему" кликабельна
- `src/pages/CategoryPage.tsx` — кнопка "Создать тему" кликабельна
- `src/index.css` — стили для Markdown контента
- `CONCEPT.md` — документация

### v1.8.0 - Полировка социального Тинга (итерация 2)

**High Priority:**

1. ✅ **Усиление кнопки "Создать тему"**
   - Янтарный градиентный фон (from-amber-600 to-amber-500)
   - Тёмный текст для контраста
   - Руна ᛏ вместо иконки Plus
   - Hover-эффект: scale 1.02 + translateY(-1px)
   - Tap-эффект: scale 0.98
   - Тень с янтарным свечением

2. ✅ **Sticky bottom bar на мобильных**
   - Компонент `StickyBottomBar.tsx`
   - 5 табов: Главная, Поиск, Тема (центральная), Уведомления, Профиль
   - Центральная кнопка "Создать тему" приподнята на -mt-6
   - Янтарный градиент для активной кнопки
   - Анимация появления снизу
   - Скрывается на desktop (lg:hidden)
   - Интегрирован в Layout.tsx

3. ✅ **Sticky поле ответа в треде**
   - Компонент `StickyReplyBar.tsx`
   - Компактная полоса внизу на мобильных
   - Полноэкранный composer при клике
   - Анимация slide-up/slide-down
   - Кнопки "Отмена" и "Ответить"
   - Интегрирован в ThreadPage.tsx
   - Скрывается на desktop (lg:hidden)

4. ✅ **Улучшение контраста текста**
   - text-norse-muted: #6B7280 → #9CA3AF (увеличена яркость)
   - text-norse-text: #E5E7EB → #F3F4F6 (увеличена яркость)
   - Улучшена читаемость на тёмном фоне

5. ✅ **Focus-visible кольца**
   - Глобальный стиль для всех интерактивных элементов
   - outline: 2px solid #C89B3C
   - outline-offset: 2px
   - border-radius: inherit

6. ✅ **Форумные ежедневные задания**
   - Добавлены 3 новых задания в DailyTasks.tsx:
     - "Ответь новичку" (+20 XP)
     - "Получи признание" (+15 XP)
     - "Создай гайд" (+25 XP)
   - Интеграция с системой XP портала

**Medium Priority:**

7. ✅ **Усиление активного пункта меню**
   - Добавлен font-bold для активного пункта
   - Усилена граница (border-norse-gold/30)
   - Анимация индикатора через layoutId

8. ✅ **Скелетоны для карточек тем**
   - Компонент `ThreadCardSkeleton.tsx`
   - Компонент `ThreadListSkeleton.tsx`
   - Анимация pulse
   - Интегрирован в TingPage.tsx

9. ✅ **Line-height для постов**
   - Увеличен с leading-relaxed до leading-[1.7]
   - Улучшена читаемость длинных текстов

10. ✅ **Приглушение ActivityFeed**
    - Уменьшена яркость иконок (text-amber-400/60)
    - Уменьшена яркость текста (text-norse-text/80, text-norse-muted/60)
    - Визуально не конкурирует с основным контентом

**Технические детали:**
- Размер бандла: 388KB JS, 76KB CSS
- Новые компоненты: StickyBottomBar, StickyReplyBar, ThreadCardSkeleton, ThreadListSkeleton
- Обновлённые компоненты: TingPage, CategoryPage, ThreadPage, Layout, DailyTasks, ActivityFeed, PostCard
- Все изменения точечные, не ломают существующий функционал

### v1.7.2 - Удаление всех эмодзи

**Изменения:**
- ✅ Заменены все эмодзи на руны в скандинавском стиле
- ✅ DailyTasks: 💡 → ᚨ (Ansuz), 🎉 → ᛋ (Sowilo)
- ✅ DiscordWidget: 💬 → ᛊ (Sowilo)
- ✅ SkillTreeCalculator: ⭐ → ᛟ (Othala), 📋 → ᚱ (Raido), 📊 → ᚠ (Fehu), ⚔️ → ᛏ (Tiwaz), ✨ → ᚨ (Ansuz), 🔒 → ᛚ (Laguz)
- ✅ forumData: ⚔️ → ᛏ (Tiwaz), 🏹 → ᚱ (Raido)

**Технические детали:**
- Все эмодзи заменены на руны Elder Futhark
- Руны выбраны по смыслу: ᛏ (война), ᚱ (путь), ᛋ (победа), ᚠ (богатство), ᛟ (наследие), ᚨ (мудрость), ᛚ (вода/поток), ᛊ (солнце)
- Улучшена консистентность дизайна
- Проект успешно собран (384KB JS)

### v1.7.0 - Социальный слой Тинга

**Реализовано (Волна 1 — База социального слоя):**

1. ✅ **AvatarWithFrame** — аватар с рамкой по рангу
   - 4 варианта рамок: Новичок (серая), Викинг (бронзовая), Ярл (серебряная), Легенда (янтарный градиент + свечение)
   - SVG-декор: ромбы для Викинг, руна ᛏ для Ярл, руна ᛟ для Легенда
   - Размеры: sm (40px), md (48px), lg (120px)
   - Клик по аватару → переход в профиль

2. ✅ **PresenceDot** — статус присутствия
   - 3 состояния: online (зелёная, пульсирует), away (жёлтая), offline (серая)
   - Анимация пульсации для online (2s infinite)

3. ✅ **AuthorCard** — карточка автора в посте
   - Аватар с рамкой, ник, ранг, статус
   - Статистика: репутация, постов, с нами с
   - Десктоп: колонка 200px слева от поста
   - Мобильный: горизонтальная полоса над постом

4. ✅ **ReactionBar** — расширенные реакции
   - Две кнопки: «Полезно» (ᛋ) и «Согласен» (ᚨ)
   - Счётчики с анимацией при клике (scale 1 → 1.1 → 1)
   - Состояние в localStorage
   - Микроанимации через Framer Motion

5. ✅ **ReadersNow** — плашка «Сейчас читают»
   - Отображается над постами в треде
   - Показывает до 3 ников + количество гостей

6. ✅ **FollowButton** — кнопка «Следить»
   - Тоггл с состоянием в localStorage
   - Счётчик подписчиков
   - Руна ᛋ при активном состоянии

7. ✅ **ActivityFeed** — лента последних действий
   - 5 типов событий: reply, new_thread, badge, reaction
   - Рунические иконки для каждого типа
   - Stagger-анимация при загрузке

8. ✅ **CategoryTopAuthors** — топ авторов категории
   - Отображается в сайдбаре категории
   - Клик по нику → переход в профиль

9. ✅ **NotificationsBell** — колокольчик уведомлений
   - Счётчик непрочитанных (янтарный кружок)
   - Dropdown с 4 типами уведомлений
   - Кнопка «Прочитать все»
   - Закрытие по Escape и клику вне dropdown
   - ARIA-атрибуты для доступности

10. ✅ **Расширение модели данных**
    - Добавлен ForumUser с полной информацией о пользователе
    - Расширен Post: agreedCount
    - Расширен Thread: followersCount, readersNow
    - Добавлены моковые данные для 5 пользователей
    - Добавлены достижения (12 бейджей)
    - Добавлены баннеры профиля (6 вариантов)
    - Добавлена лента активности

**Интеграция:**
- PostCard обновлён с AuthorCard и ReactionBar
- ThreadPage обновлён с ReadersNow и FollowButton
- TingPage обновлён с ActivityFeed в сайдбаре
- Layout обновлён с NotificationsBell в шапке

**Размер бандла:**
- index.js: 385KB
- ThreadPage: 14.6KB (увеличился из-за социальных компонентов)

### v1.6.0 - Галерея и подкатегории

**Реализовано:**

1. ✅ **Галерея скриншотов** `/gallery`
   - 5 категорий: Все, Город и поселения, Битвы и рейды, Пейзажи, Постройки, События
   - 5 тестовых скриншотов с AI-генерацией
   - Фильтрация по категориям с счётчиками
   - Модальное окно для просмотра скриншотов
   - Hover-эффекты с информацией
   - Теги и метаданные (автор, ранг, лайки, дата)

2. ✅ **Подкатегории в Тинге**
   - Кузница → Билды, Гайды по боссам, Крафт
   - Походы → Поиск группы, Рейды, Ивенты
   - Тинг → Вопросы новичков, Обсуждения, Оффтоп
   - Отображение подкатегорий на странице категории
   - Рунические символы для каждой подкатегории

3. ✅ **Навигация обновлена**
   - Добавлен пункт «Галерея» (ᛚ) в главное меню
   - Lazy loading для страницы галереи

**Новые файлы:**
- `src/data/galleryData.ts` — данные галереи
- `src/components/gallery/ScreenshotCard.tsx` — карточка скриншота
- `src/components/gallery/ScreenshotModal.tsx` — модальное окно
- `src/pages/GalleryPage.tsx` — страница галереи

**Обновлённые файлы:**
- `src/data/forumData.ts` — добавлены подкатегории
- `src/pages/CategoryPage.tsx` — отображение подкатегорий
- `src/App.tsx` — роут для галереи
- `src/components/Layout.tsx` — навигация
- `CONCEPT.md` — документация

**Размер бандла:**
- index.js: 377KB
- GalleryPage: 10KB (новый чанк)
- CategoryPage: 4.3KB (увеличился из-за подкатегорий)

### v1.5.0 - Форум «Тинг» (MVP)

**Реализовано:**

1. ✅ **Форум «Тинг»** — публичная часть для игроков
   - Главная страница форума `/ting`
   - Страница категории `/ting/:categorySlug`
   - Страница треда `/ting/:categorySlug/:threadId`
   - 8 категорий в 3 блоках (Вести, Игра, Сообщество)
   - Рунические символы для статусов (ᚱ закреплено, ᛚ закрыто, ᛋ решено, ᚦ горячее)

2. ✅ **Компоненты форума**
   - `ThreadCard` — карточка темы с аватаром, метаданными, тегами, статусами
   - `PostCard` — карточка поста с цитатами, кнопками «Полезно», «Ответить», «Жалоба»
   - `RankBadge` — бейдж ранга (Новичок, Викинг, Ярл, Легенда)
   - `ForumSidebar` — правый сайдбар (топ авторов, Discord, статистика)
   - `ForumCategoriesSidebar` — левый сайдбар (категории с счётчиками)

3. ✅ **Фильтрация и сортировка**
   - Фильтры: Все, Новые, Популярные, Без ответа, Мои темы
   - Сортировка закреплённых тем сверху
   - Счётчики новых тем за 24 часа в категориях

4. ✅ **Дизайн в стиле портала**
   - Те же цвета, шрифты, радиусы, тени
   - Янтарные акценты для категорий и CTA
   - Рунические символы вместо эмодзи
   - Фокус-стили для доступности

5. ✅ **Навигация**
   - Пункт «Сообщество» заменён на «Тинг» в главном меню
   - Хлебные крошки для навигации
   - Lazy loading для страниц форума

6. ✅ **Форумные токены**
   - Добавлены CSS-переменные для форума (--forum-bg, --forum-surface, etc.)
   - Контрастность соответствует WCAG AA

**Структура данных:**
- `src/data/forumData.ts` — категории, темы, посты, статистика
- `src/components/forum/` — компоненты форума
- `src/pages/TingPage.tsx` — главная форума
- `src/pages/CategoryPage.tsx` — страница категории
- `src/pages/ThreadPage.tsx` — страница треда

**Размер бандла:**
- index.js: 373KB
- Форумные чанки: CategoryPage (3.4KB), ThreadPage (7.8KB)
- CSS: 69KB

**Что реализовано в MVP:**
- ✅ Просмотр категорий и тем
- ✅ Просмотр постов в треде
- ✅ Фильтрация и сортировка
- ✅ Кнопка «Полезно» с счётчиком
- ✅ Цитирование постов
- ✅ Статусные руны (закреплено, решено, etc.)
- ✅ Бейджи рангов
- ✅ Сайдбары с топ авторов и статистикой
- ✅ **Кликабельные теги** с поиском по ним (`/ting/tag/:tagName`)
- ✅ **Синхронизация профиля с форумом** — вкладка «Тинг» в профиле
- ✅ **Отправка комментариев** в тредах (локально для демонстрации)
- ✅ **Тестовые данные** — 5 постов в треде для демонстрации

**Что отложено в v2:**
- ⏳ Создание тем (форма + валидация)
- ⏳ Ответы в тредах (отправка на сервер — сейчас локально)
- ⏳ Жалобы и модерация
- ⏳ Полнотекстовый поиск по форуму
- ⏳ Интеграция с XP и ежедневными заданиями
- ⏳ CRM админ-панель
- ⏳ Уведомления
- ⏳ Markdown-редактор с предпросмотром
- ⏳ Загрузка изображений
- ⏳ WebSocket для realtime

### v1.4.0 - UX/UI Оптимизация

**Критические улучшения (ТОП-5):**

1. ✅ **CTA в шапке** - кнопки "Скачать" и "Войти/Профиль" всегда видны
   - Добавлены иконки Download, User, LogIn из lucide-react
   - Кнопки видны на всех экранах (desktop + mobile)
   - Обновлён Layout.tsx с новыми CTA элементами

2. ✅ **Focus-visible и Focus Trap**
   - Добавлены глобальные focus-стили в index.css
   - Создан хук useFocusTrap.ts для модальных окон
   - Обновлён ServerModal с aria-атрибутами
   - Добавлен skip-link для клавиатурной навигации

3. ✅ **Замена видео на постер**
   - Видео загружается только по клику на кнопку Play
   - Используется постер-изображение вместо автозапуска
   - Улучшена производительность на мобильных устройствах
   - Добавлена кнопка Play с анимацией

4. ✅ **Улучшенные ежедневные задания**
   - Добавлены конкретные инструкции для каждого задания
   - Добавлены иконки из lucide-react
   - Конфетти только при завершении всех заданий
   - Добавлены кнопки "Выполнить" для действий

5. ✅ **Исправлен контраст цветов**
   - Изменён norse-blue с #3B82F6 на #6BA3FF (5.2:1 вместо 3.9:1)
   - Обновлены все текстовые цвета для WCAG AA
   - Добавлена поддержка prefers-contrast

**Дополнительные улучшения:**

6. ✅ **Хлебные крошки** - компонент Breadcrumbs.tsx
   - Добавлены в ServersPage
   - Показывают путь навигации
   - Поддерживают aria-current

7. ✅ **Скелетоны загрузки** - компонент Skeleton.tsx
   - ServerCardSkeleton, SkillNodeSkeleton, TaskSkeleton
   - Используются для lazy loading

8. ✅ **Lazy Loading** - оптимизация загрузки страниц
   - WikiPage, SkillTreePage, CommunityPage, ShopPage, ProfilePage
   - Используется React.lazy + Suspense
   - Добавлен LoadingSpinner компонент

9. ✅ **Accessibility улучшения**
   - Skip link для клавиатурной навигации
   - Focus trap для модальных окон
   - Escape закрывает модалки
   - aria-labels для всех интерактивных элементов
   - prefers-reduced-motion поддержка

**Размер бандла:**
- index.js: 354KB (было 630KB) - **уменьшен на 44%!**
- Lazy loaded chunks: 6 файлов
- CSS: 62KB + 15KB (WikiPage)

### v1.3.1 - Исправления UI
- ✅ **Добавлены иконки для всех 10 деревьев** (attack, speed, defense, production, bow, sword, staff, archer, mage, tanker)
- ✅ **Увеличены размеры узлов навыков** (w-20 h-20 → w-24 h-24 на десктопе)
- ✅ **Улучшено позиционирование MAX индикатора** (больше отступ сверху)
- ✅ **Улучшено позиционирование счётчика очков** (минимальная ширина, padding)
- ✅ **Исправлены размеры иконок деревьев в сайдбаре** (w-12 h-12 с shrink-0)
- ✅ **Исправлены размеры иконки дерева в шапке** (w-24 h-24)
- ✅ **Исправлены размеры иконки в тултипе** (w-20 h-20)
- ✅ **Добавлены truncate классы** для предотвращения переполнения текста
- ✅ **Улучшены отступы** для элементов MAX и счётчика

### v1.3.0 - Руническое Дерево Навыков
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
