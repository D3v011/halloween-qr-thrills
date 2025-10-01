import React from 'react';

const SocialFooter: React.FC = () => {
  return (
    <footer className="bg-black/60 backdrop-blur-sm border-t border-orange-500/20 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2 text-gray-400 text-sm">
          <p>🎃 Halloween Night 2025 - O Convite Proibido!</p>
          <p>🕷️ Entrada só para os corajosos  </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <span>🩸 Mistérios e surpresas a cada canto</span>
            <span>🏚️ Local secreto revelado</span>
            <span>🔒 Site Seguro</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;
