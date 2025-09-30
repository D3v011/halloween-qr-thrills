import React from 'react';
import { Check, X, Sparkles, Crown } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

const TicketsSection: React.FC = () => {
  const { config } = useConfig();

  const ticketData = [
    {
      ...config.tickets.vip,
      icon: Crown,
      gradient: 'from-orange-500 to-red-600',
      borderColor: 'border-orange-500/40',
      hoverBorder: 'hover:border-orange-500/60',
      glowColor: 'shadow-orange-500/20',
    },
    {
      ...config.tickets.normal,
      icon: Sparkles,
      gradient: 'from-purple-600 to-purple-800',
      borderColor: 'border-purple-500/40',
      hoverBorder: 'hover:border-purple-500/60',
      glowColor: 'shadow-purple-500/20',
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-creepster text-spooky mb-4 animate-float">
          🎟️ Garanta Seu Ingresso
        </h2>
        <p className="text-lg md:text-xl text-ghost max-w-2xl mx-auto">
          Escolha sua experiência na festa mais assombrada de Barueri
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {ticketData.map((ticket, index) => {
          const Icon = ticket.icon;
          
          return (
            <div
              key={index}
              className={`card-spooky p-6 md:p-8 border-2 ${ticket.borderColor} ${ticket.hoverBorder} transition-all duration-300 hover:shadow-2xl ${ticket.glowColor} ${
                ticket.available ? 'transform hover:scale-105' : 'opacity-90'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Icon className="text-orange-400" size={32} />
                  <h3 className="text-2xl md:text-3xl font-creepster text-white">
                    {ticket.title}
                  </h3>
                </div>
                
                {!ticket.available && (
                  <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-red-500/30">
                    Esgotado
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 text-sm md:text-base">
                {ticket.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${ticket.gradient} bg-clip-text text-transparent`}>
                  {ticket.price}
                </div>
                <div className="text-gray-400 text-sm mt-1">por pessoa</div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {ticket.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="text-green-400 flex-shrink-0 mt-1" size={18} />
                    <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              {ticket.available ? (
                <a
                  href={ticket.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full btn-spooky text-center bg-gradient-to-r ${ticket.gradient} hover:shadow-2xl`}
                >
                  Comprar Agora
                </a>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-700/50 text-gray-400 font-semibold py-3 px-6 rounded-xl border border-gray-600/30 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  Ingressos Esgotados
                </button>
              )}

              {/* Limited Badge for Available */}
              {ticket.available && index === 0 && (
                <div className="mt-4 text-center">
                  <span className="inline-block bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-xs font-semibold animate-pulse-spooky border border-red-500/30">
                    ⚡ Últimas Unidades Disponíveis ⚡
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketsSection;