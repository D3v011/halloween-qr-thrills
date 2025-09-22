import React from 'react';
import VideoBackground from './VideoBackground';
import HalloweenBackground from './HalloweenBackground';
import BackgroundMusic from './BackgroundMusic';
import RiddleSection from './RiddleSection';
import TicketOffer from './TicketOffer';
import SocialFooter from './SocialFooter';
import { useConfig } from '@/contexts/ConfigContext';

const HalloweenLanding: React.FC = () => {
  const { config } = useConfig();
  
  return (
    <div className="min-h-screen bg-halloween text-white relative overflow-x-hidden">
      {/* Background - Video or Image fallback */}
      {config.video.url ? <VideoBackground /> : <HalloweenBackground />}
      
      {/* Background Music */}
      <BackgroundMusic />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
          <div className="text-center max-w-5xl mx-auto relative z-10">
            <div className="mb-8 animate-float">
              <h1 className="text-7xl md:text-9xl font-creepster text-spooky mb-6 leading-tight">
                Halloween Night 2025
              </h1>
              <div className="text-3xl md:text-4xl font-creepster text-mystery mb-4">
                O Convite Proibido
              </div>
            </div>
            
            <div className="backdrop-blur-sm bg-black/30 rounded-2xl p-8 border border-orange-500/30 shadow-2xl">
              <p className="text-xl md:text-3xl text-ghost mb-6 leading-relaxed font-light">
                A maior e mais sombria festa de Halloween de Barueri está chegando.
              </p>
              <p className="text-2xl md:text-3xl text-mystery mb-8 font-semibold">
                <span className="inline-block animate-pulse-spooky">💀 Você tem coragem? 💀</span>
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8 text-center">
                <div className="bg-orange-500/20 rounded-xl p-4 border border-orange-500/40">
                  <div className="text-3xl mb-2">🎃</div>
                  <div className="text-orange-300 font-semibold">Data Maldita</div>
                  <div className="text-white">31 de Outubro</div>
                </div>
                <div className="bg-purple-500/20 rounded-xl p-4 border border-purple-500/40">
                  <div className="text-3xl mb-2">🕘</div>
                  <div className="text-purple-300 font-semibold">Hora Sombria</div>
                  <div className="text-white">22:00h</div>
                </div>
                <div className="bg-red-500/20 rounded-xl p-4 border border-red-500/40">
                  <div className="text-3xl mb-2">📍</div>
                  <div className="text-red-300 font-semibold">Local Secreto</div>
                  <div className="text-white">Barueri/SP</div>
                </div>
              </div>
              
              <div className="animate-pulse-spooky">
                <p className="text-lg md:text-xl text-orange-400 mb-4 font-medium">
                  ⬇️ Role para baixo e descubra como garantir seu ingresso ⬇️
                </p>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent pointer-events-none"></div>
          <div className="max-w-3xl mx-auto space-y-12 relative z-10">
            <RiddleSection />
            <TicketOffer />
          </div>
        </section>

        {/* Footer */}
        <SocialFooter />
      </div>
      
      {/* Floating Halloween Elements */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-1/4 text-5xl animate-float opacity-30 hover:opacity-60 transition-opacity">👻</div>
        <div className="absolute top-3/4 right-1/4 text-4xl animate-float opacity-30 hover:opacity-60 transition-opacity" style={{ animationDelay: '1s' }}>🦇</div>
        <div className="absolute top-1/2 left-1/6 text-6xl animate-float opacity-30 hover:opacity-60 transition-opacity" style={{ animationDelay: '2s' }}>🕷️</div>
        <div className="absolute top-1/3 right-1/6 text-5xl animate-float opacity-30 hover:opacity-60 transition-opacity" style={{ animationDelay: '0.5s' }}>🎃</div>
        <div className="absolute top-2/3 left-1/3 text-3xl animate-float opacity-20 hover:opacity-50 transition-opacity" style={{ animationDelay: '1.5s' }}>⚰️</div>
        <div className="absolute top-1/6 right-2/3 text-4xl animate-float opacity-20 hover:opacity-50 transition-opacity" style={{ animationDelay: '0.8s' }}>🔮</div>
      </div>
    </div>
  );
};

export default HalloweenLanding;