import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';

const VideoBackground: React.FC = () => {
  const { config } = useConfig();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  }, [config.video.url]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        autoPlay
        muted
        playsInline
        src={config.video.url}
      />
      
      {/* Video overlay for darkening */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Video controls */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <button
          onClick={togglePlay}
          className="btn-ghost p-3 rounded-full"
          aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        {config.video.hasSound && (
          <button
            onClick={toggleMute}
            className="btn-ghost p-3 rounded-full"
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoBackground;