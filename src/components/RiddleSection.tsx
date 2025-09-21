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
      <div className="card-spooky p-8 mb-8 text-center animate-glow">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4 animate-pulse-spooky" />
        <h3 className="text-2xl font-creepster text-green-400 mb-2">
          🎉 Enigma Resolvido!
        </h3>
        <p className="text-ghost">
          Parabéns! Você desbloqueou a oferta especial abaixo.
        </p>
      </div>
    );
  }

  return (
    <div className="card-mystery p-8 mb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-creepster text-mystery mb-4 animate-float">
          🔮 Resolva o Enigma
        </h2>
        <p className="text-ghost text-sm mb-4">
          Resolva o enigma abaixo para desbloquear nossa oferta especial
        </p>
      </div>

      <div className="bg-black/30 rounded-lg p-6 mb-6 border border-purple-500/20">
        <p className="text-lg text-white font-medium leading-relaxed text-center">
          {config.riddle.question}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Digite sua resposta..."
            className="input-spooky w-full text-center text-lg"
            required
          />
        </div>

        {showError && (
          <div className="flex items-center justify-center gap-2 text-red-400 animate-shake">
            <AlertCircle size={16} />
            <span className="text-sm">
              Resposta incorreta. Tentativa {attempts} - Tente novamente!
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            type="submit"
            className="btn-mystery min-w-[150px]"
            disabled={!answer.trim()}
          >
            ✨ Verificar Resposta
          </button>

          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="btn-ghost flex items-center gap-2 min-w-[120px]"
          >
            {showHint ? <EyeOff size={16} /> : <Eye size={16} />}
            {showHint ? 'Ocultar Dica' : 'Ver Dica'}
          </button>
        </div>

        {showHint && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
            <p className="text-yellow-200 text-center font-medium">
              💡 {config.riddle.hint}
            </p>
          </div>
        )}
      </form>

      {attempts > 2 && (
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Dificuldades? A dica pode ajudar! 
          </p>
        </div>
      )}
    </div>
  );
};

export default RiddleSection;