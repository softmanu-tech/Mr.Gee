
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video as VideoType } from '@/data/videos';
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  SkipBack, SkipForward, RotateCcw, Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoPlayerProps {
  video: VideoType;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  
  useEffect(() => {
    // Simulate video progress
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            clearInterval(interval);
            return 100;
          }
          return prev + 0.5;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isPlaying]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(true);
  };
  
  const formatTime = (seconds: number) => {
    const totalSeconds = Math.floor((parseInt(video.duration.split(':')[0]) * 60 + parseInt(video.duration.split(':')[1])) * (progress / 100));
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="relative w-full max-w-5xl rounded-xl overflow-hidden bg-card shadow-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="aspect-video bg-black relative">
            {/* Video Placeholder - In a real app this would be a video element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay for controls visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              {!isPlaying && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.button
                    className="w-20 h-20 rounded-full bg-primary/80 flex items-center justify-center"
                    onClick={handlePlayPause}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(155, 135, 245, 0.9)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-8 h-8 text-white ml-1" />
                  </motion.button>
                </motion.div>
              )}
            </div>
            
            {/* Top bar with title and close button */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
              <h3 className="text-white text-lg font-bold">{video.title}</h3>
              <motion.button
                className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white/90"
                onClick={onClose}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            
            {/* Controls bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              {/* Progress bar */}
              <div className="flex items-center gap-2">
                <span className="text-white/90 text-xs">{formatTime(progress)}</span>
                <Slider
                  value={[progress]}
                  max={100}
                  step={0.1}
                  className="flex-1"
                  onValueChange={(value) => setProgress(value[0])}
                />
                <span className="text-white/90 text-xs">{video.duration}</span>
              </div>
              
              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.button
                    className="text-white/90 hover:text-white"
                    onClick={handlePlayPause}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </motion.button>
                  
                  <motion.button
                    className="text-white/90 hover:text-white"
                    onClick={handleRestart}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    className="text-white/90 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipBack className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    className="text-white/90 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SkipForward className="w-4 h-4" />
                  </motion.button>
                  
                  <div className="flex items-center gap-1 ml-2">
                    <motion.button
                      className="text-white/90 hover:text-white"
                      onClick={handleMute}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </motion.button>
                    
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      className="w-20"
                      onValueChange={(value) => {
                        setVolume(value[0]);
                        if (value[0] > 0 && isMuted) setIsMuted(false);
                        if (value[0] === 0 && !isMuted) setIsMuted(true);
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    className="text-white/90 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                  
                  <motion.button
                    className="text-white/90 hover:text-white"
                    onClick={handleFullscreen}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video info */}
          <div className="p-4 bg-card">
            <h2 className="text-xl font-bold mb-2">{video.title}</h2>
            <p className="text-sm text-foreground/70 mb-4">{video.description}</p>
            <div className="flex items-center justify-between text-sm text-foreground/60">
              <div>{video.views} views</div>
              <div>Uploaded on {video.uploadDate}</div>
              <div>{video.category}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPlayer;
