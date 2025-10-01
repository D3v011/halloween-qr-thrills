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
                <button
                  onClick={() => handleBuyClick(index === 0 ? 'vip' : 'normal')}
                  className={`block w-full btn-spooky text-center bg-gradient-to-r ${ticket.gradient} hover:shadow-2xl`}
                >
                  Comprar Agora
                </button>
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

      {/* Checkout Form Dialog */}
      <Dialog open={showCheckoutForm} onOpenChange={setShowCheckoutForm}>
        <DialogContent className="bg-background border-spooky">
          <DialogHeader>
            <DialogTitle className="text-2xl font-creepster text-spooky">
              Finalizar Compra 🎃
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-ghost">Nome Completo *</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-background/50 border-spooky/40 text-white"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-ghost">E-mail *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/50 border-spooky/40 text-white"
                placeholder="seu@email.com"
              />
            </div>

            <div className="p-4 bg-spooky/10 border border-spooky/40 rounded-lg">
              <p className="text-ghost mb-2">
                <strong>Tipo de Ingresso:</strong>
              </p>
              <p className="text-white text-lg">
                {selectedTicket === 'vip' ? '🎃 Ingresso Macabra (VIP)' : '🎃 Ingresso Normal'}
              </p>
              <p className="text-2xl font-bold text-spooky mt-2">
                {selectedTicket === 'vip' ? config.tickets.vip.price : config.tickets.normal.price}
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full btn-spooky bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
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