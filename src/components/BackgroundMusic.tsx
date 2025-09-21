import React, { useRef, useState, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

const BackgroundMusic: React.FC = () => {
  const { config } = useConfig();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      if (config.music.enabled && audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [config.music.enabled, isPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(console.error);
      }
    }
  };

  if (!config.music.enabled) return null;

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src={config.music.url}
      />
      
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 btn-ghost p-3 rounded-full animate-pulse-spooky"
        aria-label={isPlaying ? "Desativar música" : "Ativar música"}
      >
        {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
};

export default BackgroundMusic;