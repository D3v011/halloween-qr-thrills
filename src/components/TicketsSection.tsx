import React, { useState } from 'react';
import { Check, X, Sparkles, Crown } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const TicketsSection: React.FC = () => {
  const { config } = useConfig();
  const { toast } = useToast();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<'vip' | 'normal' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });

  const handleBuyClick = (ticketType: 'vip' | 'normal') => {
    if (config.checkout.enabled) {
      setSelectedTicket(ticketType);
      setShowCheckoutForm(true);
    } else {
      // Use old method - direct link
      const ticket = ticketType === 'vip' ? config.tickets.vip : config.tickets.normal;
      window.open(ticket.purchaseLink, '_blank');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !selectedTicket) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      const ticketConfig = selectedTicket === 'vip' ? config.tickets.vip : config.tickets.normal;
      const price = parseFloat(ticketConfig.price.replace('R$ ', '').replace(',', '.'));

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: {
          fullName: formData.fullName,
          email: formData.email,
          ticketType: selectedTicket,
          price: price
        }
      });

      if (error) throw error;

      // Redirect to Mercado Pago
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error: any) {
      console.error('Error creating payment:', error);
      toast({
        title: 'Erro ao processar pagamento',
        description: error.message || 'Tente novamente mais tarde',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

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
    <div>
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-creepster text-spooky mb-3 md:mb-4 animate-float px-4">
          🎟️ Garanta Seu Ingresso
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
          Escolha sua experiência na festa mais assombrada de Barueri
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
        {ticketData.map((ticket, index) => {
          const Icon = ticket.icon;
          
          return (
            <div
              key={index}
              className={`bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-xl border rounded-3xl shadow-[var(--shadow-large)] transition-all duration-500 ${
                ticket.available 
                  ? `${ticket.borderColor} ${ticket.hoverBorder} hover:shadow-[var(--glow-subtle)] hover:-translate-y-1` 
                  : 'border-gray-700/30 opacity-80'
              }`}
            >
              <div className="p-5 sm:p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 md:mb-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Icon className="text-orange-400 flex-shrink-0" size={28} />
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-creepster text-white">
                      {ticket.title}
                    </h3>
                  </div>
                  
                  {!ticket.available && (
                    <span className="bg-red-500/15 text-red-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-red-500/20">
                      Esgotado
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-5 md:mb-6 text-sm md:text-base leading-relaxed">
                  {ticket.description}
                </p>

                {/* Price */}
                <div className="mb-5 md:mb-6">
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${ticket.gradient} bg-clip-text text-transparent`}>
                    {ticket.price}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm mt-1">por pessoa</div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                  {ticket.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2.5 md:gap-3">
                      <Check className="text-green-400 flex-shrink-0 mt-0.5 md:mt-1" size={16} />
                      <span className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                {ticket.available && config.sales.enabled ? (
                  <button
                    onClick={() => handleBuyClick(index === 0 ? 'vip' : 'normal')}
                    className={`w-full py-3.5 md:py-4 px-6 md:px-8 rounded-2xl font-semibold text-sm md:text-base bg-gradient-to-r ${ticket.gradient} text-white shadow-[var(--shadow-medium)] hover:shadow-[var(--glow-orange)] transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 border border-orange-400/10`}
                  >
                    Comprar Ingresso
                  </button>
                ) : !config.sales.enabled ? (
                  <button
                    disabled
                    className="w-full py-3.5 md:py-4 px-6 bg-gray-700/30 text-gray-400 font-semibold text-sm md:text-base rounded-2xl border border-gray-600/20 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Vendas Desativadas
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 md:py-4 px-6 bg-gray-700/30 text-gray-400 font-semibold text-sm md:text-base rounded-2xl border border-gray-600/20 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Ingressos Esgotados
                  </button>
                )}

                {/* Limited Badge */}
                {ticket.available && index === 0 && (
                  <div className="mt-4 text-center">
                    <span className="inline-block bg-red-500/15 text-red-400 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs font-semibold animate-pulse-spooky border border-red-500/20">
                      ⚡ Últimas Unidades Disponíveis ⚡
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Form Dialog */}
      <Dialog open={showCheckoutForm} onOpenChange={setShowCheckoutForm}>
        <DialogContent className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border-orange-500/20 rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-creepster text-spooky">
              Finalizar Compra 🎃
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCheckout} className="space-y-4 md:space-y-5">
            <div>
              <Label htmlFor="fullName" className="text-white/80 text-sm mb-2">Nome Completo *</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-black/30 backdrop-blur-sm border-orange-500/20 text-white rounded-2xl h-12 focus:border-orange-500/40 transition-all"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white/80 text-sm mb-2">E-mail *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-black/30 backdrop-blur-sm border-orange-500/20 text-white rounded-2xl h-12 focus:border-orange-500/40 transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div className="p-4 md:p-5 bg-gradient-to-br from-orange-500/10 to-red-500/5 backdrop-blur-sm border border-orange-500/20 rounded-2xl">
              <p className="text-white/70 mb-2 text-sm">
                <strong>Tipo de Ingresso:</strong>
              </p>
              <p className="text-white text-base md:text-lg font-medium">
                {selectedTicket === 'vip' ? '🎃 Ingresso Macabra (VIP)' : '🎃 Ingresso Normal'}
              </p>
              <p className="text-xl md:text-2xl font-bold text-spooky mt-2">
                {selectedTicket === 'vip' ? config.tickets.vip.price : config.tickets.normal.price}
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-8 rounded-2xl font-semibold text-base bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-[var(--shadow-medium)] hover:shadow-[var(--glow-orange)] transform hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 border border-orange-400/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0"
            >
              {isProcessing ? 'Processando...' : 'Ir para Pagamento'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketsSection;