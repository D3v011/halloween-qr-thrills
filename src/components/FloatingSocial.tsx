import React from 'react';
import { Instagram } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa'; // Ícone oficial do WhatsApp
import { useConfig } from '@/contexts/ConfigContext';

const FloatingSocial: React.FC = () => {
  const { config } = useConfig();

  const socialLinks = [
    {
      name: 'WhatsApp',
      url: config.social.whatsapp,
      icon: FaWhatsapp,
      bgColor: 'bg-orange-500 hover:bg-orange-600 text-white border-2 border-orange-700 hover:border-orange-800',
      label: 'Grupo da Festa',
    },
    {
      name: 'Instagram',
      url: config.social.instagram,
      icon: Instagram,
      bgColor: 'bg-orange-500 hover:bg-orange-600 text-white border-2 border-orange-700 hover:border-orange-800',
      label: 'Siga no Instagram',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        
        return (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.bgColor} p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-spooky group relative`}
            aria-label={social.label}
            title={social.label}
          >
            <Icon className="text-white" size={24} />
            
            {/* Tooltip */}
            <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {social.name}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export default FloatingSocial;
