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
      <div className="backdrop-blur-sm bg-gradient-to-br from-green-900/30 to-emerald-900/20 rounded-2xl p-8 mb-8 text-center border border-green-500/30 shadow-2xl animate-glow">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6 border border-green-500/40">
          <CheckCircle2 className="w-10 h-10 text-green-400 animate-pulse-spooky" />
        </div>
        <h3 className="text-4xl font-creepster text-green-400 mb-4 animate-float">
          🎉 Enigma Resolvido!
        </h3>
        <p className="text-lg text-green-200 leading-relaxed max-w-xl mx-auto">
          Parabéns, corajoso(a) mortal! Você provou ser digno(a) do convite secreto. 
          A oferta especial foi revelada abaixo! 👇
        </p>
      </div>
    );
  }

  return (
    <div className="backdrop-blur-sm bg-gradient-to-br from-purple-900/20 to-black/40 rounded-2xl p-8 mb-8 border border-purple-500/30 shadow-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4 border border-purple-500/40">
          <span className="text-3xl animate-float">🔮</span>
        </div>
        <h2 className="text-4xl font-creepster text-mystery mb-4 animate-float">
          Resolva o Enigma
        </h2>
        <p className="text-ghost text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
          Prove que você é digno do convite secreto resolvendo nosso enigma ancestral
        </p>
      </div>

      <div className="bg-gradient-to-r from-black/50 to-purple-900/30 rounded-xl p-8 mb-8 border border-purple-500/30 shadow-inner">
        <div className="text-center">
          <div className="text-2xl mb-4">📜</div>
          <p className="text-xl md:text-2xl text-white font-medium leading-relaxed italic">
            "{config.riddle.question}"
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Digite sua resposta aqui..."
            className="w-full p-6 text-xl text-center bg-black/40 border-2 border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300"
            required
          />
        </div>

        {showError && (
          <div className="flex items-center justify-center gap-3 text-red-400 animate-shake bg-red-900/20 rounded-lg p-4 border border-red-500/30">
            <AlertCircle size={20} />
            <span className="text-lg font-medium">
              Resposta incorreta! Tentativa {attempts} - Tente novamente 💀
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg min-w-[200px] shadow-lg"
            disabled={!answer.trim()}
          >
            ✨ Revelar Segredo
          </button>

          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2 border border-gray-600/30"
          >
            {showHint ? <EyeOff size={18} /> : <Eye size={18} />}
            {showHint ? 'Ocultar Dica' : 'Precisa de Ajuda?'}
          </button>
        </div>

        {showHint && (
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/40 rounded-xl p-6 mt-6 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <p className="text-yellow-200 text-lg font-medium leading-relaxed">
                {config.riddle.hint}
              </p>
            </div>
          </div>
        )}
      </form>

      {attempts > 2 && (
        <div className="mt-6 text-center bg-gray-900/30 rounded-lg p-4 border border-gray-600/30">
          <p className="text-gray-300 text-lg">
            🤔 Ainda com dificuldades? A dica pode iluminar seu caminho... 
          </p>
        </div>
      )}
    </div>
  );
};

export default RiddleSection;