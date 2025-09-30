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
    <div className="card-mystery p-6 md:p-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Clock className="text-purple-400" size={28} />
        <h3 className="text-2xl md:text-3xl font-creepster text-mystery">
          Contagem Regressiva
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => (
          <div 
            key={index}
            className="bg-black/50 rounded-xl p-4 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1 font-mono">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-purple-300 uppercase tracking-wider">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm md:text-base text-purple-300/80">
          ⚡ Prepare-se para a noite mais assombrada do ano! ⚡
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;