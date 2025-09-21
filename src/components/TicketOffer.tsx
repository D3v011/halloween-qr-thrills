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
      <div className="card-spooky p-8 text-center opacity-50">
        <div className="filter blur-sm">
          <h3 className="text-2xl font-creepster text-spooky mb-4">
            🎃 Oferta Especial
          </h3>
          <p className="text-gray-400 mb-4">
            Resolva o enigma para ver nossa oferta exclusiva
          </p>
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <p className="text-4xl font-bold text-spooky">???</p>
          </div>
          <button className="btn-spooky opacity-50 cursor-not-allowed" disabled>
            🔒 Bloqueado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-spooky p-8 text-center animate-glow">
      <div className="mb-6">
        <h3 className="text-3xl font-creepster text-spooky mb-2 animate-float">
          {config.offer.title}
        </h3>
        <p className="text-ghost leading-relaxed">
          {config.offer.description}
        </p>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
        <div className="bg-black/30 rounded-lg p-3 border border-orange-500/20">
          <Clock className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <p className="text-gray-300">31 de Outubro</p>
          <p className="text-orange-400 font-semibold">22:00 - 06:00</p>
        </div>
        
        <div className="bg-black/30 rounded-lg p-3 border border-orange-500/20">
          <MapPin className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <p className="text-gray-300">Local Secreto</p>
          <p className="text-orange-400 font-semibold">Será revelado</p>
        </div>
        
        <div className="bg-black/30 rounded-lg p-3 border border-orange-500/20">
          <Users className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <p className="text-gray-300">Vagas Limitadas</p>
          <p className="text-orange-400 font-semibold">Apenas 100 ingressos</p>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-6 mb-6 border border-orange-500/30">
        <div className="text-center">
          <p className="text-gray-300 text-sm mb-2">Por apenas</p>
          <p className="text-5xl font-bold text-spooky mb-2">
            {config.offer.price}
          </p>
          <p className="text-gray-400 text-xs">
            Pix, cartão ou boleto • Parcelamento em até 12x
          </p>
        </div>
      </div>

      <button
        onClick={handlePurchase}
        className="btn-spooky text-xl px-8 py-4 w-full sm:w-auto animate-pulse-spooky"
      >
        <ExternalLink className="w-5 h-5 mr-2" />
        🎫 Garantir Meu Ingresso
      </button>

      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
        <span>✅ Pagamento Seguro</span>
        <span>✅ Confirmação Imediata</span>
        <span>✅ Suporte 24h</span>
      </div>

      <p className="text-red-400 text-sm mt-4 animate-pulse-spooky">
        ⚠️ Oferta por tempo limitado - últimas 24 horas!
      </p>
    </div>
  );
};

export default TicketOffer;