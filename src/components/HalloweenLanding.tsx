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
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-creepster text-spooky mb-6 animate-float">
              Halloween Night 2025 - O Convite Proibido
            </h1>
            <p className="text-xl md:text-2xl text-ghost mb-8 leading-relaxed">
              Você recebeu o acesso proibido... A maior e mais sombria festa de Halloween de Barueri está chegando.
              <br />
              <span className="text-mystery">Você tem coragem?</span>
            </p>
            
            <div className="animate-pulse-spooky">
              <p className="text-lg text-orange-400 mb-4">
                ⬇️ Role para baixo e descubra como garantir seu ingresso
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <RiddleSection />
            <TicketOffer />
          </div>
        </section>

        {/* Footer */}
        <SocialFooter />
      </div>
      
      {/* Floating Halloween Elements */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-1/4 text-4xl animate-float opacity-20">👻</div>
        <div className="absolute top-3/4 right-1/4 text-3xl animate-float opacity-20" style={{ animationDelay: '1s' }}>🦇</div>
        <div className="absolute top-1/2 left-1/6 text-5xl animate-float opacity-20" style={{ animationDelay: '2s' }}>🕷️</div>
        <div className="absolute top-1/3 right-1/6 text-4xl animate-float opacity-20" style={{ animationDelay: '0.5s' }}>🎃</div>
      </div>
    </div>
  );
};

export default HalloweenLanding;