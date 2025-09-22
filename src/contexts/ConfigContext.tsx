import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SiteConfig {
  video: {
    url: string;
    hasSound: boolean;
  };
  music: {
    url: string;
    enabled: boolean;
  };
  riddle: {
    question: string;
    hint: string;
    answer: string;
  };
  offer: {
    title: string;
    description: string;
    price: string;
    paymentLink: string;
  };
  social: {
    instagram: string;
    tiktok: string;
  };
  theme: {
    primaryColor: string;
    fontFamily: string;
  };
}

const defaultConfig: SiteConfig = {
  video: {
    url: "./videos/apresenta.mp4",
    hasSound: true,
  },
  music: {
    url: "./videos/msc.mp3",
    enabled: true,
  },
  riddle: {
    question: "Eu sou negro como a noite, mas brilho na escuridão. Danço no vento e assusto o coração. O que sou eu?",
    hint: "Sou feito de tecido e tenho uma forma assombrada...",
    answer: "fantasma",
  },
  offer: {
    title: "🎃 Ingresso VIP Halloween Night",
    description: "Ingresso para a festa de Halloween mais assombrada da cidade! Inclui entrada, drink de boas-vindas e acesso à área VIP.",
    price: "R$ 89,90",
    paymentLink: "https://pay.example.com/halloween-ticket",
  },
  social: {
    instagram: "https://instagram.com/halloween_party",
    tiktok: "https://tiktok.com/@halloween_party",
  },
  theme: {
    primaryColor: "#ff6b35",
    fontFamily: "Creepster",
  },
};

interface ConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  riddleSolved: boolean;
  solveRiddle: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [riddleSolved, setRiddleSolved] = useState(false);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('halloween-site-config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsedConfig });
      } catch (error) {
        console.error('Error loading config:', error);
      }
    }
  }, []);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    localStorage.setItem('halloween-site-config', JSON.stringify(updatedConfig));
  };

  const solveRiddle = () => {
    setRiddleSolved(true);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, riddleSolved, solveRiddle }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};