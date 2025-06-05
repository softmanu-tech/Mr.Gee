
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, Clock, Eye } from 'lucide-react';
import { Video } from '@/data/videos';
import { useToast } from "@/hooks/use-toast";

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  const { toast } = useToast();

  const handleClick = () => {
    if (video.isPremium) {
      toast({
        title: "Premium Video",
        description: "This video requires coins to play. Purchase coins to access premium content.",
        variant: "destructive",
      });
    } else {
      onPlay(video);
    }
  };

  return (
    <motion.div 
      className="video-card relative overflow-hidden rounded-xl bg-card"
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.3)",
        transition: { duration: 0.3 } 
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-video relative overflow-hidden rounded-t-xl">
        <img 
          src={video.thumbnailUrl} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-70 hover:opacity-90 transition-opacity">
          <motion.button
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-accent flex items-center justify-center text-white"
            onClick={handleClick}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 0 20px rgba(124, 58, 237, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 ml-1" />
          </motion.button>
        </div>
        {video.isPremium && (
          <motion.div 
            className="premium-badge"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30, 
              delay: 0.2 
            }}
          >
            <Lock className="w-3 h-3 mr-1 inline-block" /> Premium
          </motion.div>
        )}
      </div>
      
      <div className="p-4">
        <motion.h3 
          className="text-lg font-bold line-clamp-1 mb-1 group-hover:text-primary transition-colors"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {video.title}
        </motion.h3>
        
        <motion.p 
          className="text-sm text-foreground/60 line-clamp-2 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {video.description}
        </motion.p>
        
        <motion.div 
          className="flex items-center justify-between text-xs text-foreground/60"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{video.duration}</span>
          </div>
          <div className="flex items-center">
            <Eye className="w-3 h-3 mr-1" />
            <span>{video.views} views</span>
          </div>
          <div>{video.category}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
