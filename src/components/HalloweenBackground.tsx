import React from 'react';
import halloweenHero from '@/assets/halloween-hero.jpg';

const HalloweenBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Fallback Halloween Image Background */}
      <div 
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${halloweenHero})`,
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40" />
    </div>
  );
};

export default HalloweenBackground;