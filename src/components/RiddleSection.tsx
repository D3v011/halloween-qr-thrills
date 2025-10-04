import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

const RiddleSection: React.FC = () => {
  const { config, riddleSolved, solveRiddle } = useConfig();
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answer.toLowerCase().trim() === config.riddle.answer.toLowerCase().trim()) {
      solveRiddle();
      setShowError(false);
    } else {
      setAttempts(prev => prev + 1);
      setShowError(true);
      setAnswer('');
      
      // Auto-hide error after 3 seconds
      setTimeout(() => setShowError(false), 3000);
    }
  };

  if (riddleSolved) {
    return (
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 text-center border border-green-500/20 shadow-[var(--shadow-large)] animate-glow">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-500/15 rounded-full mb-5 md:mb-6 border border-green-500/30">
          <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-green-400 animate-pulse-spooky" />
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-creepster text-green-400 mb-3 md:mb-4 animate-float px-4">
          🎉 Enigma Resolvido!
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-green-200/80 leading-relaxed max-w-xl mx-auto px-4">
          Parabéns, corajoso(a) mortal! Você provou ser digno(a) do convite secreto. 
          A oferta especial foi revelada abaixo! 👇
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/15 to-black/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-purple-500/10 shadow-[var(--shadow-large)]">
      <div className="text-center mb-6 md:mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-purple-500/15 rounded-full mb-4 border border-purple-500/30">
          <span className="text-2xl md:text-3xl animate-float">🔮</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-creepster text-mystery mb-3 md:mb-4 animate-float px-4">
          Resolva o Enigma
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
          Prove que você é digno do convite secreto resolvendo nosso enigma ancestral
        </p>
      </div>

      <div className="bg-gradient-to-r from-black/30 to-purple-900/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 md:p-10 mb-6 md:mb-8 border border-purple-500/20 shadow-inner">
        <div className="text-center">
          <div className="text-xl md:text-2xl mb-3 md:mb-4">📜</div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium leading-relaxed italic px-4">
            "{config.riddle.question}"
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="relative">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Digite sua resposta aqui..."
            className="w-full p-4 sm:p-5 md:p-6 text-base sm:text-lg md:text-xl text-center bg-black/30 backdrop-blur-sm border-2 border-purple-500/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/40 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300"
            required
          />
        </div>

        {showError && (
          <div className="flex items-center justify-center gap-2 md:gap-3 text-red-400 animate-shake bg-red-900/15 backdrop-blur-sm rounded-2xl p-4 border border-red-500/20">
            <AlertCircle size={18} className="flex-shrink-0" />
            <span className="text-sm sm:text-base md:text-lg font-medium">
              Resposta incorreta! Tentativa {attempts} - Tente novamente 💀
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center justify-center">
          <button
            type="submit"
            className="px-6 md:px-8 py-3.5 md:py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 text-base md:text-lg shadow-[var(--shadow-medium)] hover:shadow-[var(--glow-purple)] border border-purple-400/10"
            disabled={!answer.trim()}
          >
            ✨ Revelar Segredo
          </button>

          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="px-5 md:px-6 py-3 bg-gray-700/30 backdrop-blur-sm hover:bg-gray-600/40 text-gray-300 hover:text-white font-medium rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-600/20 hover:border-gray-500/30 text-sm md:text-base"
          >
            {showHint ? <EyeOff size={16} /> : <Eye size={16} />}
            {showHint ? 'Ocultar Dica' : 'Precisa de Ajuda?'}
          </button>
        </div>

        {showHint && (
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-5 md:p-6 mt-5 md:mt-6">
            <div className="text-center">
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">💡</div>
              <p className="text-yellow-200/90 text-sm sm:text-base md:text-lg font-medium leading-relaxed px-4">
                {config.riddle.hint}
              </p>
            </div>
          </div>
        )}
      </form>

      {attempts > 2 && (
        <div className="mt-5 md:mt-6 text-center bg-gray-900/20 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/20">
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            🤔 Ainda com dificuldades? A dica pode iluminar seu caminho... 
          </p>
        </div>
      )}
    </div>
  );
};

export default RiddleSection;