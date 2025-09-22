import React from 'react';
import { ExternalLink, Clock, MapPin, Users } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

const TicketOffer: React.FC = () => {
  const { config, riddleSolved } = useConfig();

  const handlePurchase = () => {
    window.open(config.offer.paymentLink, '_blank');
  };

  if (!riddleSolved) {
    return (
      <div className="backdrop-blur-sm bg-gradient-to-br from-gray-900/40 to-black/60 rounded-2xl p-8 text-center border border-gray-600/30 shadow-2xl">
        <div className="filter blur-[2px] opacity-60">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-6 border border-orange-500/40">
            <span className="text-3xl">🎃</span>
          </div>
          <h3 className="text-3xl font-creepster text-spooky mb-4">
            Oferta Secreta
          </h3>
          <p className="text-gray-400 mb-6 text-lg">
            Resolva o enigma ancestral para revelar nosso convite especial
          </p>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl p-8 mb-6 border border-gray-600/30">
            <p className="text-6xl font-bold text-spooky mb-2">???</p>
            <p className="text-gray-500">Conteúdo Bloqueado</p>
          </div>
          <div className="px-8 py-4 bg-gray-700/50 rounded-xl cursor-not-allowed border border-gray-600/30">
            <span className="text-gray-400 text-lg font-medium">🔒 Acesso Negado</span>
          </div>
        </div>
        <div className="mt-6 text-orange-400 font-medium animate-pulse-spooky">
          ⚠️ Complete o enigma acima para desbloquear
        </div>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm bg-gradient-to-br from-orange-900/20 to-red-900/30 rounded-2xl p-8 text-center border border-orange-500/40 shadow-2xl animate-glow">
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/30 rounded-full mb-6 border border-orange-500/50">
          <span className="text-4xl animate-float">🎫</span>
        </div>
        <h3 className="text-4xl md:text-5xl font-creepster text-spooky mb-4 animate-float leading-tight">
          {config.offer.title}
        </h3>
        <p className="text-lg md:text-xl text-ghost leading-relaxed max-w-2xl mx-auto">
          {config.offer.description}
        </p>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30 hover:border-orange-400/50 transition-colors duration-300">
          <Clock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
          <p className="text-gray-300 text-sm mb-1">Data Maldita</p>
          <p className="text-orange-300 font-bold text-lg">31 de Outubro</p>
          <p className="text-orange-400 font-semibold">22:00 - 06:00</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-colors duration-300">
          <MapPin className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <p className="text-gray-300 text-sm mb-1">Local Secreto</p>
          <p className="text-purple-300 font-bold text-lg">Barueri/SP</p>
          <p className="text-purple-400 font-semibold">Será revelado</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl p-6 border border-red-500/30 hover:border-red-400/50 transition-colors duration-300">
          <Users className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-gray-300 text-sm mb-1">Vagas Limitadas</p>
          <p className="text-red-300 font-bold text-lg">Apenas 60</p>
          <p className="text-red-400 font-semibold">ingressos</p>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="bg-gradient-to-br from-orange-600/30 to-red-600/30 rounded-2xl p-8 mb-8 border border-orange-500/40 shadow-inner">
        <div className="text-center">
          <p className="text-gray-300 text-lg mb-3">Oferta Exclusiva por apenas</p>
          <p className="text-6xl md:text-7xl font-bold text-spooky mb-3 animate-pulse-spooky">
            {config.offer.price}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            💳 Pix, cartão ou boleto<br/>
            📅 Parcelamento em até 12x sem juros
          </p>
        </div>
      </div>

      <button
        onClick={handlePurchase}
        className="w-full sm:w-auto px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold text-xl rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse-spooky flex items-center justify-center gap-3 mx-auto mb-6"
      >
        <ExternalLink className="w-6 h-6" />
        🎃 Quero Entrar na Noite Assombrada
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
        <div className="flex items-center justify-center gap-2 text-green-400">
          <span className="text-lg">👻</span>
          <span>Noite Inesquecível</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-green-400">
          <span className="text-lg">🍹</span>
          <span>Open Bar Incluso</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-green-400">
          <span className="text-lg">🔥</span>
          <span>Gincanas Malditas</span>
        </div>
      </div>

      <div className="bg-red-900/30 rounded-xl p-4 border border-red-500/40">
        <p className="text-red-300 text-lg font-semibold animate-pulse-spooky">
          ⚠️ Restam poucos ingressos! A maldição expira à meia-noite... ⚠️
        </p>
      </div>
    </div>
  );
};

export default TicketOffer;