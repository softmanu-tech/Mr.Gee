
import React from 'react';
import { motion } from 'framer-motion';
import VideoCard from './VideoCard';
import { Video } from '@/data/videos';

interface FeaturedVideosProps {
  title: string;
  videos: Video[];
  onPlayVideo: (video: Video) => void;
}

const FeaturedVideos: React.FC<FeaturedVideosProps> = ({ title, videos, onPlayVideo }) => {
  return (
    <motion.div 
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold font-cinzen text-gradient">{title}</h2>
        <motion.a 
          href="#" 
          className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All
        </motion.a>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <VideoCard video={video} onPlay={onPlayVideo} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturedVideos;
