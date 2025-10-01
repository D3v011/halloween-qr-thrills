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
  hero: {
    title: string;
    subtitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
  };
  countdown: {
    enabled: boolean;
    targetDate: string;
  };
  tickets: {
    vip: {
      title: string;
      description: string;
      price: string;
      features: string[];
      available: boolean;
      purchaseLink: string;
    };
    normal: {
      title: string;
      description: string;
      price: string;
      features: string[];
      available: boolean;
      purchaseLink: string;
    };
  };
  checkout: {
    enabled: boolean;
  };
  riddle: {
    enabled: boolean;
    question: string;
    hint: string;
    answer: string;
  };
  social: {
    instagram: string;
    tiktok: string;
    whatsapp: string;
  };
  theme: {
    primaryColor: string;
    fontFamily: string;
  };
}

const defaultConfig: SiteConfig = {
  video: {
    url: "./videos/apresenta2.mp4",
    hasSound: true,
  },
  music: {
    url: "./videos/msc3.mp3",
    enabled: true,
  },
  hero: {
    title: "Halloween Night 2025",
    subtitle: "O Convite Proibido",
    eventDate: "01 de Novembro",
    eventTime: "19h ás 01h",
    eventLocation: "Barueri/SP",
  },
  countdown: {
    enabled: true,
    targetDate: "2025-11-01T19:00:00",
  },
  tickets: {
    vip: {
      title: "🎃 Ingresso Macabra",
      description: "Experiência completa com Open Bar e área VIP exclusiva",
      price: "R$ 2",
      features: [
        "Open Bar Premium",
        "Área VIP Exclusiva",
        "Entrada Prioritária",
        "Drink de Boas-vindas",
        "Acesso a Todas as Atrações"
      ],
      available: true,
      purchaseLink: "https://mpago.li/2dMEezd",
    },
    normal: {
      title: "🎟️ Ingresso Normal",
      description: "Acesso completo à festa mais assombrada",
      price: "R$ 19,90",
      features: [
        "Entrada para o Evento",
        "Acesso a Todas as Atrações",
        "Entrada até 21h"
      ],
      available: false,
      purchaseLink: "",
    },
  },
  checkout: {
    enabled: true,
  },
  riddle: {
    enabled: false,
    question: "Posso atravessar paredes, mas não posso ser tocado. Quem sou?",
    hint: "Invisível, mas assustador.",
    answer: "fantasma",
  },
  social: {
    instagram: "https://www.instagram.com/halloweenrb_",
    tiktok: "https://tiktok.com/",
    whatsapp: "https://chat.whatsapp.com/HKsys1UVeTaKNAp3iZbshl",
  },
  theme: {
    primaryColor: "#ff3535ff",
    fontFamily: "Creepster",
  },
};

interface ConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  riddleSolved: boolean;
  solveRiddle: () => void;
  restoreDefault: () => void;
  hasBackup: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [riddleSolved, setRiddleSolved] = useState(false);
  const [hasBackup, setHasBackup] = useState(false);

  // Load config from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('halloween-site-config');
    const backupExists = localStorage.getItem('halloween-site-config-backup');
    
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsedConfig });
      } catch (error) {
        console.error('Error loading config:', error);
      }
    }
    
    // Check if backup exists
    if (backupExists) {
      setHasBackup(true);
    } else {
      // Create initial backup
      localStorage.setItem('halloween-site-config-backup', JSON.stringify(defaultConfig));
      setHasBackup(true);
    }
  }, []);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);
    localStorage.setItem('halloween-site-config', JSON.stringify(updatedConfig));
  };

  const restoreDefault = () => {
    const backup = localStorage.getItem('halloween-site-config-backup');
    if (backup) {
      try {
        const backupConfig = JSON.parse(backup);
        setConfig(backupConfig);
        localStorage.setItem('halloween-site-config', backup);
      } catch (error) {
        console.error('Error restoring backup:', error);
      }
    }
  };

  const solveRiddle = () => {
    setRiddleSolved(true);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, riddleSolved, solveRiddle, restoreDefault, hasBackup }}>
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