
import React, { useState } from 'react';
import MusicCard, { Track } from './MusicCard';
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturedMusicProps {
  title: string;
  tracks: Track[];
  onPlayTrack: (track: Track) => void;
}

const FeaturedMusic: React.FC<FeaturedMusicProps> = ({ title, tracks, onPlayTrack }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-cinzen font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
          </motion.h2>
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="rounded-md"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="rounded-md"
              >
                <List className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {viewMode === 'grid' ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tracks.map((track, index) => (
              <motion.div key={track.id} variants={itemVariants} custom={index}>
                <MusicCard track={track} onPlay={onPlayTrack} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-3 bg-card rounded-lg overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tracks.map((track, index) => (
              <motion.div 
                key={track.id} 
                className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onPlayTrack(track)}
                variants={itemVariants}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                <div className="w-12 h-12 mr-4">
                  <img 
                    src={track.coverImage} 
                    alt={track.title} 
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{track.title}</h3>
                  <p className="text-sm text-muted-foreground">Mr.Gee</p>
                </div>
                {track.isPremium && (
                  <span className="bg-accent/90 text-accent-foreground text-xs px-2 py-1 rounded-full font-medium mr-3">
                    Premium
                  </span>
                )}
                <span className="text-sm text-muted-foreground">{track.duration}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedMusic;
