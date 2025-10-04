import React from 'react';
import VideoBackground from './VideoBackground';
import HalloweenBackground from './HalloweenBackground';
import BackgroundMusic from './BackgroundMusic';
import CountdownTimer from './CountdownTimer';
import TicketsSection from './TicketsSection';
import RiddleSection from './RiddleSection';
import FloatingSocial from './FloatingSocial';
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
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50"></div>
          
          <div className="section-container text-center relative z-10 animate-fade-in">
            {/* Title */}
            <div className="mb-8 md:mb-12 space-y-4 md:space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-creepster text-spooky mb-4 md:mb-6 leading-tight animate-float px-4">
                {config.hero.title}
              </h1>
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-creepster text-mystery animate-float px-4" style={{ animationDelay: '0.2s' }}>
                {config.hero.subtitle}
              </div>
            </div>
            
            {/* Content Card */}
            <div className="backdrop-blur-xl bg-black/20 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-orange-500/10 shadow-[var(--shadow-large)] max-w-5xl mx-auto animate-slide-up">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 mb-6 md:mb-8 leading-relaxed font-light">
                A maior e mais sombria festa de Halloween de Barueri está chegando.
              </p>
              <p className="text-xl sm:text-2xl md:text-3xl text-mystery mb-8 md:mb-10 font-semibold">
                <span className="inline-block animate-pulse-spooky">💀 Você tem coragem? 💀</span>
              </p>
              
              {/* Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-orange-500/20 hover:border-orange-500/30 transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">🎃</div>
                  <div className="text-orange-300 font-semibold text-sm md:text-base mb-1">Data Maldita</div>
                  <div className="text-white text-sm md:text-base">{config.hero.eventDate}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">🕘</div>
                  <div className="text-purple-300 font-semibold text-sm md:text-base mb-1">Hora Sombria</div>
                  <div className="text-white text-sm md:text-base">{config.hero.eventTime}</div>
                </div>
                <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-red-500/20 hover:border-red-500/30 transition-all duration-300 hover:scale-[1.02] sm:col-span-1 col-span-1">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">📍</div>
                  <div className="text-red-300 font-semibold text-sm md:text-base mb-1">Local</div>
                  <div className="text-white text-sm md:text-base">{config.hero.eventLocation}</div>
                </div>
              </div>
              
              {/* CTA */}
              <div className="animate-pulse-spooky">
                <p className="text-base sm:text-lg md:text-xl text-orange-400 font-medium">
                  ⬇️ Ingressos Limitados - Garanta o seu! ⬇️
                </p>
              </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
            <div className="w-6 h-10 border-2 border-orange-400/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-spacing relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
          <div className="section-container space-y-12 md:space-y-16 lg:space-y-20 relative z-10">
            {/* Countdown */}
            {config.countdown.enabled && (
              <div className="animate-fade-in">
                <CountdownTimer targetDate={config.countdown.targetDate} />
              </div>
            )}
            
            {/* Tickets Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <TicketsSection />
            </div>
            
            {/* Riddle (Optional) */}
            {config.riddle.enabled && (
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <RiddleSection />
              </div>
            )}
          </div>
        </section>

        {/* Floating Social Links */}
        <FloatingSocial />

        {/* Footer */}
        <SocialFooter />
      </div>
      
      {/* Floating Halloween Elements - Hidden on Mobile */}
      <div className="fixed inset-0 pointer-events-none z-5 hidden md:block">
        <div className="absolute top-1/4 left-1/4 text-4xl lg:text-5xl animate-float opacity-20 transition-opacity duration-500">👻</div>
        <div className="absolute top-3/4 right-1/4 text-3xl lg:text-4xl animate-float opacity-20 transition-opacity duration-500" style={{ animationDelay: '1s' }}>🦇</div>
        <div className="absolute top-1/2 left-1/6 text-5xl lg:text-6xl animate-float opacity-15 transition-opacity duration-500" style={{ animationDelay: '2s' }}>🕷️</div>
        <div className="absolute top-1/3 right-1/6 text-4xl lg:text-5xl animate-float opacity-20 transition-opacity duration-500" style={{ animationDelay: '0.5s' }}>🎃</div>
        <div className="absolute top-2/3 left-1/3 text-2xl lg:text-3xl animate-float opacity-15 transition-opacity duration-500" style={{ animationDelay: '1.5s' }}>⚰️</div>
        <div className="absolute top-1/6 right-2/3 text-3xl lg:text-4xl animate-float opacity-15 transition-opacity duration-500" style={{ animationDelay: '0.8s' }}>🔮</div>
      </div>
    </div>
  );
};

export default HalloweenLanding;