import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import BackgroundMusic from '@/components/BackgroundMusic';
import { ConfigProvider } from '@/contexts/ConfigContext';

const pageConfig = {
  "page": "/pagina2",
  "title": "Halloween Night 2025 - O Desafio Oculto",
  "description": "Uma nova experiência interativa. Resolva o enigma e descubra o convite secreto da festa mais sombria da cidade.",
  "sections": [
    {
      "id": "intro",
      "type": "hero",
      "headline": "⚰️ O Convite Oculto ⚰️",
      "subheadline": "Você encontrou a segunda porta... mas tem coragem de entrar?",
      "cta": {
        "text": "Descobrir o Segredo",
        "link": "#riddle"
      },
      "background": {
        "type": "image",
        "url": "/assets/haunted-door.jpg",
        "overlay": "dark"
      }
    },
    {
      "id": "riddle",
      "type": "quiz",
      "question": "Sou visto apenas na noite mais sombria, ilumino o medo com minha face fria. O que sou?",
      "hint": "Olhe para o céu...",
      "answer": "lua",
      "success": {
        "message": "🎉 Você resolveu o enigma! O segredo foi revelado.",
        "redirect": "#offer"
      },
      "failure": {
        "message": "❌ Ainda não é a resposta correta... tente novamente."
      }
    },
    {
      "id": "offer",
      "type": "offer",
      "title": "Convite Secreto",
      "description": "Agora que você provou sua coragem, receba seu convite especial para o Halloween Night 2025.",
      "cta": {
        "text": "Seguir no Instagram",
        "link": "https://instagram.com/seuevento"
      }
    }
  ],
  "settings": {
    "theme": {
      "colors": {
        "primary": "#ff7518",
        "secondary": "#3b0764",
        "background": "#000000",
        "text": "#ffffff"
      },
      "fonts": {
        "headline": "Creepster",
        "body": "Roboto"
      }
    },
    "music": {
      "enabled": true,
      "url": "/assets/spooky-music.mp3"
    }
  }
};

const Pagina2: React.FC = () => {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [riddleSolved, setRiddleSolved] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === pageConfig.sections[1].answer) {
      setRiddleSolved(true);
      setShowError(false);
      setTimeout(() => {
        document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ConfigProvider>
      <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* SEO Meta Tags */}
      <title>{pageConfig.title}</title>
      <meta name="description" content={pageConfig.description} />
      
      {/* Background Music */}
      {pageConfig.settings.music.enabled && <BackgroundMusic />}
      
      {/* Hero Section */}
      <section 
        id="intro"
        className="min-h-screen flex items-center justify-center px-4 relative"
        style={{ 
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('${pageConfig.sections[0].background.url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center max-w-4xl mx-auto z-10">
          <h1 
            className="text-6xl md:text-8xl mb-6 animate-float"
            style={{ 
              fontFamily: pageConfig.settings.theme.fonts.headline,
              color: pageConfig.settings.theme.colors.primary
            }}
          >
            {pageConfig.sections[0].headline}
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-300">
            {pageConfig.sections[0].subheadline}
          </p>
          <button
            onClick={() => scrollToSection(pageConfig.sections[0].cta.link)}
            className="px-8 py-4 rounded-full transition-all duration-300 text-lg font-semibold hover:scale-105 animate-pulse-spooky"
            style={{
              backgroundColor: pageConfig.settings.theme.colors.primary,
              color: pageConfig.settings.theme.colors.background
            }}
          >
            {pageConfig.sections[0].cta.text}
          </button>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown size={32} className="text-orange-400" />
          </div>
        </div>
      </section>

      {/* Riddle Section */}
      <section id="riddle" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {!riddleSolved ? (
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-8 border border-orange-500/30">
              <h2 
                className="text-3xl mb-6 text-center"
                style={{ 
                  fontFamily: pageConfig.settings.theme.fonts.headline,
                  color: pageConfig.settings.theme.colors.primary
                }}
              >
                🧩 Enigma Secreto
              </h2>
              
              <div className="mb-6">
                <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                  {pageConfig.sections[1].question}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Digite sua resposta..."
                  className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                
                {showError && (
                  <div className="p-3 rounded-lg bg-red-900/50 border border-red-500/50 text-red-200 text-center">
                    {pageConfig.sections[1].failure.message}
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    {showHint ? 'Ocultar Dica' : 'Ver Dica'}
                  </button>
                  
                  <button
                    type="submit"
                    disabled={!answer.trim()}
                    className="flex-1 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: answer.trim() ? pageConfig.settings.theme.colors.primary : '#6b7280',
                      color: pageConfig.settings.theme.colors.background
                    }}
                  >
                    Verificar Resposta
                  </button>
                </div>

                {showHint && (
                  <div className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/30 text-blue-200">
                    <p className="text-sm">💡 Dica: {pageConfig.sections[1].hint}</p>
                  </div>
                )}
              </form>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-green-900/50 backdrop-blur-sm rounded-lg p-8 border border-green-500/30">
                <h3 
                  className="text-2xl mb-4"
                  style={{ color: pageConfig.settings.theme.colors.primary }}
                >
                  {pageConfig.sections[1].success.message}
                </h3>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Offer Section */}
      {riddleSolved && (
        <section id="offer" className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-8 border border-orange-500/30">
              <h2 
                className="text-4xl mb-4"
                style={{ 
                  fontFamily: pageConfig.settings.theme.fonts.headline,
                  color: pageConfig.settings.theme.colors.primary
                }}
              >
                {pageConfig.sections[2].title}
              </h2>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {pageConfig.sections[2].description}
              </p>
              
              <a
                href={pageConfig.sections[2].cta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 animate-pulse-spooky"
                style={{
                  backgroundColor: pageConfig.settings.theme.colors.primary,
                  color: pageConfig.settings.theme.colors.background
                }}
              >
                {pageConfig.sections[2].cta.text}
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Floating Halloween Elements */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="absolute top-1/4 left-1/4 text-4xl animate-float opacity-20">🌙</div>
        <div className="absolute top-3/4 right-1/4 text-3xl animate-float opacity-20" style={{ animationDelay: '1s' }}>🦇</div>
        <div className="absolute top-1/2 left-1/6 text-5xl animate-float opacity-20" style={{ animationDelay: '2s' }}>⚰️</div>
        <div className="absolute top-1/3 right-1/6 text-4xl animate-float opacity-20" style={{ animationDelay: '0.5s' }}>🔮</div>
      </div>
      </div>
    </ConfigProvider>
  );
};

export default Pagina2;