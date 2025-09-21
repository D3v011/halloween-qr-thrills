import React, { useState } from 'react';
import { 
  Settings, 
  Video, 
  Music, 
  HelpCircle, 
  DollarSign, 
  Instagram, 
  Palette,
  Save,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';
import { toast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { config, updateConfig } = useConfig();
  const [activeTab, setActiveTab] = useState('video');
  const [formData, setFormData] = useState(config);

  const handleSave = () => {
    updateConfig(formData);
    toast({
      title: "✅ Configurações salvas!",
      description: "As alterações foram aplicadas com sucesso.",
    });
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'video', label: 'Vídeo', icon: Video },
    { id: 'music', label: 'Música', icon: Music },
    { id: 'riddle', label: 'Enigma', icon: HelpCircle },
    { id: 'offer', label: 'Oferta', icon: DollarSign },
    { id: 'social', label: 'Redes Sociais', icon: Instagram },
    { id: 'theme', label: 'Tema', icon: Palette },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="card-spooky p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="btn-ghost p-2 rounded-lg"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h1 className="text-3xl font-creepster text-spooky">
                    🎃 Dashboard Administrativo
                  </h1>
                  <p className="text-ghost">Gerencie todo o conteúdo do site</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => window.open('/', '_blank')}
                  className="btn-ghost flex items-center gap-2"
                >
                  <Eye size={16} />
                  Visualizar Site
                </button>
                <button
                  onClick={handleSave}
                  className="btn-spooky flex items-center gap-2"
                >
                  <Save size={16} />
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-mystery p-4 sticky top-4">
                <nav className="space-y-2">
                  {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                          activeTab === tab.id
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            : 'hover:bg-white/10 text-gray-300 hover:text-white'
                        }`}
                      >
                        <Icon size={18} />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="card-spooky p-6">
                {/* Video Settings */}
                {activeTab === 'video' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      📹 Configurações de Vídeo
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        URL do Vídeo
                      </label>
                      <input
                        type="url"
                        value={formData.video.url}
                        onChange={(e) => handleInputChange('video', 'url', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="https://..."
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Cole a URL de um vídeo (MP4, WebM, etc.)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="hasSound"
                        checked={formData.video.hasSound}
                        onChange={(e) => handleInputChange('video', 'hasSound', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange-500"
                      />
                      <label htmlFor="hasSound" className="text-gray-300">
                        O vídeo possui áudio (mostrar controle de som)
                      </label>
                    </div>
                  </div>
                )}

                {/* Music Settings */}
                {activeTab === 'music' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      🎵 Configurações de Música
                    </h2>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id="musicEnabled"
                        checked={formData.music.enabled}
                        onChange={(e) => handleInputChange('music', 'enabled', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange-500"
                      />
                      <label htmlFor="musicEnabled" className="text-gray-300">
                        Ativar música de fundo
                      </label>
                    </div>

                    {formData.music.enabled && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          URL da Música
                        </label>
                        <input
                          type="url"
                          value={formData.music.url}
                          onChange={(e) => handleInputChange('music', 'url', e.target.value)}
                          className="input-spooky w-full"
                          placeholder="https://..."
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Cole a URL de um arquivo de áudio (MP3, WAV, etc.)
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Riddle Settings */}
                {activeTab === 'riddle' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      🔮 Configurações do Enigma
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Pergunta do Enigma
                      </label>
                      <textarea
                        value={formData.riddle.question}
                        onChange={(e) => handleInputChange('riddle', 'question', e.target.value)}
                        className="input-spooky w-full h-24"
                        placeholder="Digite o enigma..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Dica (opcional)
                      </label>
                      <input
                        type="text"
                        value={formData.riddle.hint}
                        onChange={(e) => handleInputChange('riddle', 'hint', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="Digite uma dica..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Resposta Correta
                      </label>
                      <input
                        type="text"
                        value={formData.riddle.answer}
                        onChange={(e) => handleInputChange('riddle', 'answer', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="Resposta..."
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        A comparação será feita ignorando maiúsculas/minúsculas
                      </p>
                    </div>
                  </div>
                )}

                {/* Offer Settings */}
                {activeTab === 'offer' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      🎫 Configurações da Oferta
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Título da Oferta
                      </label>
                      <input
                        type="text"
                        value={formData.offer.title}
                        onChange={(e) => handleInputChange('offer', 'title', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="🎃 Ingresso VIP Halloween Night"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Descrição
                      </label>
                      <textarea
                        value={formData.offer.description}
                        onChange={(e) => handleInputChange('offer', 'description', e.target.value)}
                        className="input-spooky w-full h-24"
                        placeholder="Descrição da oferta..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preço
                      </label>
                      <input
                        type="text"
                        value={formData.offer.price}
                        onChange={(e) => handleInputChange('offer', 'price', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="R$ 89,90"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Link de Pagamento
                      </label>
                      <input
                        type="url"
                        value={formData.offer.paymentLink}
                        onChange={(e) => handleInputChange('offer', 'paymentLink', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="https://pay.example.com/..."
                      />
                    </div>
                  </div>
                )}

                {/* Social Settings */}
                {activeTab === 'social' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      📱 Redes Sociais
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Instagram
                      </label>
                      <input
                        type="url"
                        value={formData.social.instagram}
                        onChange={(e) => handleInputChange('social', 'instagram', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="https://instagram.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        TikTok
                      </label>
                      <input
                        type="url"
                        value={formData.social.tiktok}
                        onChange={(e) => handleInputChange('social', 'tiktok', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="https://tiktok.com/@..."
                      />
                    </div>
                  </div>
                )}

                {/* Theme Settings */}
                {activeTab === 'theme' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      🎨 Personalização do Tema
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Cor Primária
                      </label>
                      <input
                        type="color"
                        value={formData.theme.primaryColor}
                        onChange={(e) => handleInputChange('theme', 'primaryColor', e.target.value)}
                        className="w-20 h-12 rounded-lg border border-gray-600 bg-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Fonte dos Títulos
                      </label>
                      <select
                        value={formData.theme.fontFamily}
                        onChange={(e) => handleInputChange('theme', 'fontFamily', e.target.value)}
                        className="input-spooky w-full"
                      >
                        <option value="Creepster">Creepster (Halloween)</option>
                        <option value="Butcherman">Butcherman (Terror)</option>
                        <option value="Nosifer">Nosifer (Gótico)</option>
                        <option value="Eater">Eater (Monstro)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;