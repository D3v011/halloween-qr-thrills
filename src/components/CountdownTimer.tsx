import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-900/15 to-black/60 backdrop-blur-xl rounded-3xl shadow-[var(--shadow-large)] border border-purple-500/10 hover:border-purple-500/20 transition-all duration-500 p-6 sm:p-8 md:p-10">
      <div className="flex items-center justify-center gap-2 md:gap-3 mb-6 md:mb-8">
        <Clock className="text-purple-400 flex-shrink-0" size={24} />
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-creepster text-mystery text-center">
          Contagem Regressiva
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {timeUnits.map((unit, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-black/40 to-purple-900/20 backdrop-blur-sm rounded-2xl p-4 md:p-5 lg:p-6 border border-purple-500/20 hover:border-purple-500/30 hover:shadow-[var(--glow-purple)] transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-purple-400 mb-1 md:mb-2 font-mono">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-purple-300/80 uppercase tracking-wider font-medium">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 md:mt-8 text-center">
        <p className="text-sm md:text-base lg:text-lg text-purple-300/70 font-light">
          ⚡ Prepare-se para a noite mais assombrada do ano! ⚡
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;