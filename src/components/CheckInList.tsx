import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';

interface Purchase {
  id: string;
  full_name: string;
  email: string;
  ticket_type: string;
  checked_in: boolean;
  checked_in_at: string | null;
  payment_status: string;
  created_at: string;
}

const CheckInList = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filter, setFilter] = useState<'all' | 'checked' | 'pending'>('all');
  const [ticketFilter, setTicketFilter] = useState<'all' | 'vip' | 'normal'>('all');

  useEffect(() => {
    loadPurchases();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('purchases-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'purchases'
        },
        () => {
          loadPurchases();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadPurchases = async () => {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('payment_status', 'approved')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPurchases(data);
    }
  };

  const filteredPurchases = purchases.filter(p => {
    if (filter === 'checked' && !p.checked_in) return false;
    if (filter === 'pending' && p.checked_in) return false;
    if (ticketFilter === 'vip' && p.ticket_type !== 'vip') return false;
    if (ticketFilter === 'normal' && p.ticket_type !== 'normal') return false;
    return true;
  });

  return (
    <Card className="bg-black/40 border-orange-500/30 p-6">
      <h2 className="text-xl font-bold mb-4">Lista de Participantes</h2>

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-orange-500 text-white' : 'bg-black/50 text-gray-400'}`}
        >
          Todos ({purchases.length})
        </button>
        <button
          onClick={() => setFilter('checked')}
          className={`px-4 py-2 rounded-lg ${filter === 'checked' ? 'bg-green-500 text-white' : 'bg-black/50 text-gray-400'}`}
        >
          Presentes ({purchases.filter(p => p.checked_in).length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-black/50 text-gray-400'}`}
        >
          Pendentes ({purchases.filter(p => !p.checked_in).length})
        </button>
        
        <div className="border-l border-gray-600 mx-2"></div>
        
        <button
          onClick={() => setTicketFilter('all')}
          className={`px-4 py-2 rounded-lg ${ticketFilter === 'all' ? 'bg-purple-500 text-white' : 'bg-black/50 text-gray-400'}`}
        >
          Todos Tipos
        </button>
        <button
          onClick={() => setTicketFilter('vip')}
          className={`px-4 py-2 rounded-lg ${ticketFilter === 'vip' ? 'bg-purple-500 text-white' : 'bg-black/50 text-gray-400'}`}
        >
          VIP
        </button>
        <button
          onClick={() => setTicketFilter('normal')}
          className={`px-4 py-2 rounded-lg ${ticketFilter === 'normal' ? 'bg-blue-500 text-white' : 'bg-black/50 text-gray-400'}`}
        >
          Normal
        </button>
      </div>

      {/* List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredPurchases.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Nenhum ingresso encontrado</p>
        ) : (
          filteredPurchases.map((purchase) => (
            <div
              key={purchase.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                purchase.checked_in 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-gray-500/10 border-gray-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                {purchase.checked_in ? (
                  <CheckCircle className="text-green-400" size={20} />
                ) : (
                  <XCircle className="text-gray-400" size={20} />
                )}
                <div>
                  <div className="font-semibold">{purchase.full_name}</div>
                  <div className="text-sm text-gray-400">
                    {purchase.ticket_type === 'vip' ? '🎃 VIP Macabra' : '🎃 Normal'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                {purchase.checked_in ? (
                  <div className="text-sm text-green-400">
                    ✓ {new Date(purchase.checked_in_at!).toLocaleString('pt-BR')}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">Aguardando</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default CheckInList;
