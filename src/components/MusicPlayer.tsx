
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Track } from './MusicCard';

interface MusicPlayerProps {
  track: Track | null;
  onClose: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ track, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (track && track.previewUrl) {
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [track]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleProgress = (values: number[]) => {
    if (audioRef.current && values.length) {
      const newTime = (values[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!track) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border p-3 z-40">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        src={track.previewUrl}
      />
      
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-1/4">
            <img 
              src={track.coverImage} 
              alt={track.title}
              className="h-12 w-12 rounded object-cover"
            />
            <div className="truncate">
              <p className="text-sm font-medium truncate">{track.title}</p>
              <p className="text-xs text-muted-foreground">Mr.Gee</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-4">
                <Button size="icon" variant="ghost" className="text-muted-foreground">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  className="bg-primary hover:bg-primary/90 text-white rounded-full"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button size="icon" variant="ghost" className="text-muted-foreground">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="w-full flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[duration ? (currentTime / duration) * 100 : 0]}
                  min={0}
                  max={100}
                  step={0.1}
                  onValueChange={handleProgress}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-8">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-1/4 justify-end">
            <Button size="icon" variant="ghost" onClick={toggleMute}>
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => setVolume(values[0])}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
