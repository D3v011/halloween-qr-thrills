import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

const SocialFooter: React.FC = () => {
  const { config } = useConfig();

  return (
    <footer className="bg-black/60 backdrop-blur-sm border-t border-orange-500/20 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h4 className="text-xl font-creepster text-mystery mb-4 animate-float">
            👻 Siga-nos nas Redes Sociais
          </h4>
          
          <div className="flex justify-center gap-6 mb-6">
            <a
              href={config.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost p-4 rounded-full hover:text-pink-400 transition-colors duration-300"
              aria-label="Seguir no Instagram"
            >
              <Instagram size={28} />
            </a>
            
            <a
              href={config.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost p-4 rounded-full hover:text-purple-400 transition-colors duration-300"
              aria-label="Seguir no TikTok"
            >
              <MessageCircle size={28} />
            </a>
          </div>
          
          <div className="text-center space-y-2 text-gray-400 text-sm">
            <p>🎃 Halloween Night 2024 - A festa mais assombrada da cidade!</p>
            <p>👻 Produzido com 💀 e muito mistério</p>
            <div className="flex justify-center items-center gap-4 mt-4">
              <span>📱 Acesso via QR Code</span>
              <span>🔒 Site Seguro</span>
              <span>⚡ Tempo Real</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;