
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedMusic from '@/components/FeaturedMusic';
import CoinsPurchase from '@/components/CoinsPurchase';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import { Track } from '@/components/MusicCard';
import { featuredTracks, latestReleases } from '@/data/tracks';
import { useToast } from "@/components/ui/use-toast";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const { toast } = useToast();

  const handlePlayTrack = (track: Track) => {
    if (track.isPremium) {
      // In a real application, you would check if the user has coins
      // For now, just show a toast
      toast({
        title: "Premium Track",
        description: "This track requires coins to play. Purchase coins to access premium content.",
        variant: "destructive",
      });
    } else {
      setCurrentTrack(track);
    }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      className="min-h-screen"
    >
      <Navbar />
      <HeroSection />
      <motion.div
        variants={fadeIn}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <FeaturedMusic 
          title="Featured Tracks" 
          tracks={featuredTracks} 
          onPlayTrack={handlePlayTrack} 
        />
      </motion.div>
      <motion.div
        variants={fadeIn}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <FeaturedMusic 
          title="Latest Releases" 
          tracks={latestReleases} 
          onPlayTrack={handlePlayTrack} 
        />
      </motion.div>
      <motion.div
        variants={fadeIn}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <CoinsPurchase />
      </motion.div>
      <Footer />
      {currentTrack && (
        <MusicPlayer 
          track={currentTrack} 
          onClose={() => setCurrentTrack(null)} 
        />
      )}
    </motion.div>
  );
};

export default Index;
