import React, { useState } from 'react';
import { 
  Settings, 
  Video, 
  Music, 
  HelpCircle, 
  Ticket,
  Instagram, 
  Palette,
  Save,
  Eye,
  ArrowLeft,
  Clock,
  Type,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';
import { toast } from '@/hooks/use-toast';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { config, updateConfig, restoreDefault, hasBackup } = useConfig();
  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState(config);

  const handleSave = () => {
    updateConfig(formData);
    toast({
      title: "✅ Configurações salvas!",
      description: "As alterações foram aplicadas com sucesso.",
    });
  };

  const handleRestore = () => {
    if (confirm('Tem certeza que deseja restaurar a versão original? Todas as alterações serão perdidas.')) {
      restoreDefault();
      window.location.reload();
      toast({
        title: "🔄 Versão original restaurada!",
        description: "A página foi restaurada para o estado original.",
      });
    }
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

  const handleNestedInputChange = (section: string, subsection: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [subsection]: {
          ...(prev[section as keyof typeof prev] as any)[subsection],
          [field]: value
        }
      }
    }));
  };

  const handleArrayInputChange = (section: string, subsection: string, field: string, index: number, value: string) => {
    setFormData(prev => {
      const newFeatures = [...((prev[section as keyof typeof prev] as any)[subsection][field])];
      newFeatures[index] = value;
      return {
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [subsection]: {
            ...(prev[section as keyof typeof prev] as any)[subsection],
            [field]: newFeatures
          }
        }
      };
    });
  };

  const tabs = [
    { id: 'hero', label: 'Hero', icon: Type },
    { id: 'countdown', label: 'Contagem', icon: Clock },
    { id: 'video', label: 'Vídeo', icon: Video },
    { id: 'music', label: 'Música', icon: Music },
    { id: 'tickets', label: 'Ingressos', icon: Ticket },
    { id: 'riddle', label: 'Enigma', icon: HelpCircle },
    { id: 'social', label: 'Redes Sociais', icon: Instagram },
    { id: 'theme', label: 'Tema', icon: Palette },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="card-spooky p-6 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
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
              
              <div className="flex gap-3 flex-wrap">
                {hasBackup && (
                  <button
                    onClick={handleRestore}
                    className="btn-ghost flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border-red-500/30"
                  >
                    <RotateCcw size={16} />
                    Restaurar Original
                  </button>
                )}
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

            {hasBackup && (
              <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex items-start gap-3">
                <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-blue-300">
                  <strong>Backup Disponível:</strong> A versão original está salva. Você pode restaurá-la a qualquer momento clicando em "Restaurar Original".
                </p>
              </div>
            )}
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
                {/* Hero Settings */}
                {activeTab === 'hero' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      🎭 Configurações do Hero
                    </h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Título Principal
                      </label>
                      <input
                        type="text"
                        value={formData.hero.title}
                        onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="Halloween Night 2025"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Subtítulo
                      </label>
                      <input
                        type="text"
                        value={formData.hero.subtitle}
                        onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="O Convite Proibido"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Data do Evento
                        </label>
                        <input
                          type="text"
                          value={formData.hero.eventDate}
                          onChange={(e) => handleInputChange('hero', 'eventDate', e.target.value)}
                          className="input-spooky w-full"
                          placeholder="31 de Outubro"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Horário
                        </label>
                        <input
                          type="text"
                          value={formData.hero.eventTime}
                          onChange={(e) => handleInputChange('hero', 'eventTime', e.target.value)}
                          className="input-spooky w-full"
                          placeholder="22:00h"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Local
                        </label>
                        <input
                          type="text"
                          value={formData.hero.eventLocation}
                          onChange={(e) => handleInputChange('hero', 'eventLocation', e.target.value)}
                          className="input-spooky w-full"
                          placeholder="Barueri/SP"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Countdown Settings */}
                {activeTab === 'countdown' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      ⏰ Contagem Regressiva
                    </h2>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id="countdownEnabled"
                        checked={formData.countdown.enabled}
                        onChange={(e) => handleInputChange('countdown', 'enabled', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange-500"
                      />
                      <label htmlFor="countdownEnabled" className="text-gray-300">
                        Ativar contagem regressiva
                      </label>
                    </div>

                    {formData.countdown.enabled && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Data e Hora Alvo
                        </label>
                        <input
                          type="datetime-local"
                          value={formData.countdown.targetDate}
                          onChange={(e) => handleInputChange('countdown', 'targetDate', e.target.value)}
                          className="input-spooky w-full"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Formato: YYYY-MM-DDTHH:mm:ss
                        </p>
                      </div>
                    )}
                  </div>
                )}

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
                        placeholder="./videos/apresenta.mp4"
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
                          placeholder="./videos/msc.mp3"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                          Cole a URL de um arquivo de áudio (MP3, WAV, etc.)
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tickets Settings */}
                {activeTab === 'tickets' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      🎫 Configurações de Ingressos
                    </h2>
                    
                    {/* VIP Ticket */}
                    <div className="border border-orange-500/30 rounded-xl p-6 bg-orange-500/5">
                      <h3 className="text-xl font-creepster text-orange-400 mb-4">Ingresso VIP</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Título
                          </label>
                          <input
                            type="text"
                            value={formData.tickets.vip.title}
                            onChange={(e) => handleNestedInputChange('tickets', 'vip', 'title', e.target.value)}
                            className="input-spooky w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Descrição
                          </label>
                          <textarea
                            value={formData.tickets.vip.description}
                            onChange={(e) => handleNestedInputChange('tickets', 'vip', 'description', e.target.value)}
                            className="input-spooky w-full h-20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Preço
                          </label>
                          <input
                            type="text"
                            value={formData.tickets.vip.price}
                            onChange={(e) => handleNestedInputChange('tickets', 'vip', 'price', e.target.value)}
                            className="input-spooky w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Benefícios
                          </label>
                          {formData.tickets.vip.features.map((feature, index) => (
                            <input
                              key={index}
                              type="text"
                              value={feature}
                              onChange={(e) => handleArrayInputChange('tickets', 'vip', 'features', index, e.target.value)}
                              className="input-spooky w-full mb-2"
                            />
                          ))}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Link de Compra
                          </label>
                          <input
                            type="url"
                            value={formData.tickets.vip.purchaseLink}
                            onChange={(e) => handleNestedInputChange('tickets', 'vip', 'purchaseLink', e.target.value)}
                            className="input-spooky w-full"
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="vipAvailable"
                            checked={formData.tickets.vip.available}
                            onChange={(e) => handleNestedInputChange('tickets', 'vip', 'available', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange-500"
                          />
                          <label htmlFor="vipAvailable" className="text-gray-300">
                            Ingressos disponíveis
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Normal Ticket */}
                    <div className="border border-purple-500/30 rounded-xl p-6 bg-purple-500/5">
                      <h3 className="text-xl font-creepster text-purple-400 mb-4">Ingresso Normal</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Título
                          </label>
                          <input
                            type="text"
                            value={formData.tickets.normal.title}
                            onChange={(e) => handleNestedInputChange('tickets', 'normal', 'title', e.target.value)}
                            className="input-spooky w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Descrição
                          </label>
                          <textarea
                            value={formData.tickets.normal.description}
                            onChange={(e) => handleNestedInputChange('tickets', 'normal', 'description', e.target.value)}
                            className="input-spooky w-full h-20"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Preço
                          </label>
                          <input
                            type="text"
                            value={formData.tickets.normal.price}
                            onChange={(e) => handleNestedInputChange('tickets', 'normal', 'price', e.target.value)}
                            className="input-spooky w-full"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Benefícios
                          </label>
                          {formData.tickets.normal.features.map((feature, index) => (
                            <input
                              key={index}
                              type="text"
                              value={feature}
                              onChange={(e) => handleArrayInputChange('tickets', 'normal', 'features', index, e.target.value)}
                              className="input-spooky w-full mb-2"
                            />
                          ))}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Link de Compra
                          </label>
                          <input
                            type="url"
                            value={formData.tickets.normal.purchaseLink}
                            onChange={(e) => handleNestedInputChange('tickets', 'normal', 'purchaseLink', e.target.value)}
                            className="input-spooky w-full"
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="normalAvailable"
                            checked={formData.tickets.normal.available}
                            onChange={(e) => handleNestedInputChange('tickets', 'normal', 'available', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange-500"
                          />
                          <label htmlFor="normalAvailable" className="text-gray-300">
                            Ingressos disponíveis
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Riddle Settings */}
                {activeTab === 'riddle' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-creepster text-spooky mb-4">
                      🔮 Configurações do Enigma
                    </h2>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id="riddleEnabled"
                        checked={formData.riddle.enabled}
                        onChange={(e) => handleInputChange('riddle', 'enabled', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange-500"
                      />
                      <label htmlFor="riddleEnabled" className="text-gray-300">
                        Ativar seção de enigma
                      </label>
                    </div>

                    {formData.riddle.enabled && (
                      <>
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
                      </>
                    )}
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
                        WhatsApp
                      </label>
                      <input
                        type="url"
                        value={formData.social.whatsapp}
                        onChange={(e) => handleInputChange('social', 'whatsapp', e.target.value)}
                        className="input-spooky w-full"
                        placeholder="https://wa.me/5511999999999"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Formato: https://wa.me/[código do país][número]?text=[mensagem]
                      </p>
                    </div>

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