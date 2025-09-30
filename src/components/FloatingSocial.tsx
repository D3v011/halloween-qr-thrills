import React from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

const FloatingSocial: React.FC = () => {
  const { config } = useConfig();

  const socialLinks = [
    {
      name: 'WhatsApp',
      url: config.social.whatsapp,
      icon: MessageCircle,
      bgColor: 'bg-green-500 hover:bg-green-600',
      label: 'Fale Conosco no WhatsApp',
    },
    {
      name: 'Instagram',
      url: config.social.instagram,
      icon: Instagram,
      bgColor: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600',
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
            className={`${social.bgColor} p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse-spooky group`}
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