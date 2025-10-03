import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertCircle, Scan, ArrowLeft } from 'lucide-react';
import CheckInList from '@/components/CheckInList';

interface Purchase {
  id: string;
  full_name: string;
  email: string;
  ticket_type: string;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
}

const CheckIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [qrCode, setQrCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentCheckIns, setRecentCheckIns] = useState<Purchase[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    checkedIn: 0,
    vip: 0,
    normal: 0
  });

  useEffect(() => {
    loadStats();
    loadRecentCheckIns();
  }, []);

  const loadStats = async () => {
    const { data, error } = await supabase
      .from('purchases')
      .select('checked_in, ticket_type')
      .eq('payment_status', 'approved');

    if (!error && data) {
      const total = data.length;
      const checkedIn = data.filter(p => p.checked_in).length;
      const vip = data.filter(p => p.ticket_type === 'vip').length;
      const normal = data.filter(p => p.ticket_type === 'normal').length;
      
      setStats({ total, checkedIn, vip, normal });
    }
  };

  const loadRecentCheckIns = async () => {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('checked_in', true)
      .order('checked_in_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setRecentCheckIns(data);
    }
  };

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!qrCode.trim()) {
      toast({
        title: 'Erro',
        description: 'Digite ou escaneie um QR Code',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('check-in', {
        body: { purchaseId: qrCode.trim() }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: '✅ Check-in realizado!',
          description: `${data.purchase.fullName} - ${data.purchase.ticketType === 'vip' ? 'VIP Macabra' : 'Normal'}`,
        });
        
        setQrCode('');
        loadStats();
        loadRecentCheckIns();
      } else {
        let description = data.message;
        if (data.purchase) {
          description += `\n${data.purchase.fullName}`;
        }

        toast({
          title: data.status === 'already_used' ? '⚠️ Já utilizado' : '❌ Erro',
          description,
          variant: 'destructive'
        });
      }
    } catch (error: any) {
      console.error('Error checking in:', error);
      toast({
        title: 'Erro ao processar check-in',
        description: error.message || 'Tente novamente',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-orange-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/admin')}
            variant="outline"
            className="border-orange-500/40 text-white hover:bg-orange-500/20"
          >
            <ArrowLeft className="mr-2" size={20} />
            Voltar
          </Button>
          <h1 className="text-3xl font-creepster text-orange-400">
            🎃 Check-in Halloween Night
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/40 border-orange-500/30 p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Ingressos</div>
          </Card>
          <Card className="bg-black/40 border-green-500/30 p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.checkedIn}</div>
            <div className="text-sm text-gray-400">Presentes</div>
          </Card>
          <Card className="bg-black/40 border-purple-500/30 p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.vip}</div>
            <div className="text-sm text-gray-400">VIP Macabra</div>
          </Card>
          <Card className="bg-black/40 border-blue-500/30 p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.normal}</div>
            <div className="text-sm text-gray-400">Normal</div>
          </Card>
        </div>

        {/* QR Scanner */}
        <Card className="bg-black/40 border-orange-500/30 p-6 mb-8">
          <form onSubmit={handleCheckIn} className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Scan className="text-orange-400" size={24} />
              <h2 className="text-xl font-bold">Escanear ou Digitar QR Code</h2>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="Cole o código do QR aqui..."
                className="bg-black/50 border-orange-500/40 text-white flex-1"
                autoFocus
              />
              <Button
                type="submit"
                disabled={isProcessing}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8"
              >
                {isProcessing ? 'Processando...' : 'Check-in'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Recent Check-ins */}
        <Card className="bg-black/40 border-orange-500/30 p-6">
          <h2 className="text-xl font-bold mb-4">Últimos Check-ins</h2>
          <div className="space-y-3">
            {recentCheckIns.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Nenhum check-in realizado ainda</p>
            ) : (
              recentCheckIns.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-400" size={24} />
                    <div>
                      <div className="font-semibold">{purchase.full_name}</div>
                      <div className="text-sm text-gray-400">
                        {purchase.ticket_type === 'vip' ? '🎃 VIP Macabra' : '🎃 Normal'}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(purchase.checked_in_at!).toLocaleTimeString('pt-BR')}
                  </div>
                </div>
          ))
            )}
          </div>
        </Card>

        {/* Full List */}
        <CheckInList />
      </div>
    </div>
  );
};

export default CheckIn;
