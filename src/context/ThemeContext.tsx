import React, { createContext, useContext, useState, useEffect } from 'react';

export type Biome = 'meadows' | 'blackforest' | 'swamp' | 'mountains' | 'plains';

interface BiomeTheme {
  name: string;
  nameRu: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  rune: string;
}

const biomeThemes: Record<Biome, BiomeTheme> = {
  meadows: {
    name: 'Meadows',
    nameRu: 'Луга',
    primary: '#4a6b4d',
    secondary: '#2c3e2d',
    accent: '#d4af37',
    background: '#141c17',
    card: '#1a231d',
    rune: 'ᚠ',
  },
  blackforest: {
    name: 'Black Forest',
    nameRu: 'Чёрный Лес',
    primary: '#2d4a3e',
    secondary: '#1a2f28',
    accent: '#8b5a2b',
    background: '#0f1612',
    card: '#151e19',
    rune: 'ᚦ',
  },
  swamp: {
    name: 'Swamp',
    nameRu: 'Болото',
    primary: '#3d4a2d',
    secondary: '#2a3320',
    accent: '#6b8e23',
    background: '#121810',
    card: '#1a2116',
    rune: 'ᛗ',
  },
  mountains: {
    name: 'Mountains',
    nameRu: 'Горы',
    primary: '#4a5a6b',
    secondary: '#2d3a4a',
    accent: '#b8c5d4',
    background: '#14181e',
    card: '#1a2028',
    rune: 'ᛁ',
  },
  plains: {
    name: 'Plains',
    nameRu: 'Равнины',
    primary: '#6b5a3d',
    secondary: '#4a3d2a',
    accent: '#daa520',
    background: '#1a1610',
    card: '#221e16',
    rune: 'ᛊ',
  },
};

interface ThemeContextType {
  biome: Biome;
  theme: BiomeTheme;
  setBiome: (biome: Biome) => void;
  allBiomes: Record<Biome, BiomeTheme>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [biome, setBiomeState] = useState<Biome>(() => {
    const saved = localStorage.getItem('valheim-biome');
    return (saved as Biome) || 'meadows';
  });

  const setBiome = (newBiome: Biome) => {
    setBiomeState(newBiome);
    localStorage.setItem('valheim-biome', newBiome);
  };

  useEffect(() => {
    const theme = biomeThemes[biome];
    document.documentElement.style.setProperty('--biome-primary', theme.primary);
    document.documentElement.style.setProperty('--biome-secondary', theme.secondary);
    document.documentElement.style.setProperty('--biome-accent', theme.accent);
    document.documentElement.style.setProperty('--biome-background', theme.background);
    document.documentElement.style.setProperty('--biome-card', theme.card);
  }, [biome]);

  return (
    <ThemeContext.Provider value={{ biome, theme: biomeThemes[biome], setBiome, allBiomes: biomeThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
