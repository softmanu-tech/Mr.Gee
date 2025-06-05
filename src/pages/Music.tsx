
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import FeaturedMusic from '@/components/FeaturedMusic';
import MusicPlayer from '@/components/MusicPlayer';
import { Track } from '@/components/MusicCard';
import { featuredTracks, latestReleases } from '@/data/tracks';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Music2, TrendingUp, Clock, Star } from 'lucide-react';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

const Music = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  
  const [filteredTracks, setFilteredTracks] = useState<{
    featured: Track[],
    latest: Track[],
    popular: Track[]
  }>({
    featured: featuredTracks,
    latest: latestReleases.concat(featuredTracks.slice(0, 4)),
    popular: [...featuredTracks].reverse()
  });
  
  const { toast } = useToast();

  // Filter tracks based on category and search query
  useEffect(() => {
    const filterTracksByCategory = (tracks: Track[]) => {
      if (activeCategory === "All") return tracks;
      if (activeCategory === "Popular") return tracks.filter(t => t.plays > 10000);
      if (activeCategory === "New") return tracks.filter(t => {
        const releaseDate = new Date(t.releaseDate);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        return releaseDate > threeMonthsAgo;
      });
      if (activeCategory === "Featured") return tracks.filter(t => t.featured);
      return tracks;
    };

    const filterTracksBySearch = (tracks: Track[]) => {
      if (!searchQuery.trim()) return tracks;
      return tracks.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        t.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    const applyFilters = (tracks: Track[]) => {
      return filterTracksBySearch(filterTracksByCategory(tracks));
    };

    setFilteredTracks({
      featured: applyFilters(featuredTracks),
      latest: applyFilters(latestReleases.concat(featuredTracks.slice(0, 4))),
      popular: applyFilters([...featuredTracks].reverse())
    });

    // Generate search results from all tracks
    const allTracks = [...featuredTracks, ...latestReleases];
    const uniqueTracks = allTracks.filter((t, i, self) => 
      i === self.findIndex(track => track.id === t.id)
    );
    
    setSearchResults(
      searchQuery ? filterTracksBySearch(uniqueTracks) : []
    );
  }, [activeCategory, searchQuery]);

  const handlePlayTrack = (track: Track) => {
    if (track.isPremium) {
      toast({
        title: "Premium Track",
        description: "This track requires coins to play. Purchase coins to access premium content.",
        variant: "destructive",
      });
    } else {
      setCurrentTrack(track);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2,
        duration: 0.8
      } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      } 
    }
  };

  // Background floating particles
  const particles = Array.from({ length: 15 });

  // Categories for filtering tracks
  const categories = [
    { name: "All", icon: <Music2 className="w-4 h-4" /> },
    { name: "Popular", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "New", icon: <Clock className="w-4 h-4" /> },
    { name: "Featured", icon: <Star className="w-4 h-4" /> }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-background relative overflow-hidden"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Animated background particles */}
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-purple-500/5"
          style={{
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: 0
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}

      <Navbar />
      
      <ScrollArea className="h-[calc(100vh-80px)] mt-16 pt-8">
        <div className="container mx-auto px-4 pb-24">
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold font-cinzen mb-4 text-gradient text-center">
              Music Collection
            </h1>
            <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-8">
              Browse through Mr.Gee's catalog of tracks. Unlock premium content with coins and experience high-quality audio.
            </p>
            
            {/* Search bar */}
            <div className="max-w-md mx-auto relative mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search tracks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-purple-500/20 focus-visible:ring-purple-500/30"
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
              
              {isSearchOpen && searchQuery && (
                <div className="absolute w-full mt-1 z-50">
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="Search tracks..." value={searchQuery} onValueChange={setSearchQuery} className="h-9" />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {searchResults.map((track) => (
                        <CommandItem 
                          key={track.id}
                          onSelect={() => {
                            setCurrentTrack(track);
                            setIsSearchOpen(false);
                          }}
                          className="flex items-center gap-2 py-2 cursor-pointer"
                        >
                          <div className="h-10 w-10 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={track.coverArt} 
                              alt={track.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{track.title}</span>
                            <span className="text-xs text-muted-foreground">{track.artist} • {track.genre}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Categories filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category.name 
                    ? 'bg-gradient-to-r from-purple-500 to-accent text-white' 
                    : 'bg-card text-foreground/70 hover:text-white'
                } flex items-center gap-2 transition-all`}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 10px 15px -3px rgba(124, 58, 237, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </motion.div>
          
          {filteredTracks.featured.length > 0 && (
            <motion.div variants={itemVariants}>
              <FeaturedMusic 
                title="Featured Tracks" 
                tracks={filteredTracks.featured} 
                onPlayTrack={handlePlayTrack} 
              />
            </motion.div>
          )}
          
          {filteredTracks.latest.length > 0 && (
            <motion.div variants={itemVariants}>
              <FeaturedMusic 
                title="Latest Releases" 
                tracks={filteredTracks.latest} 
                onPlayTrack={handlePlayTrack} 
              />
            </motion.div>
          )}
          
          {filteredTracks.popular.length > 0 && (
            <motion.div variants={itemVariants}>
              <FeaturedMusic 
                title="Popular Hits" 
                tracks={filteredTracks.popular} 
                onPlayTrack={handlePlayTrack} 
              />
            </motion.div>
          )}
          
          {/* Show message if no tracks match filters */}
          {!filteredTracks.featured.length && !filteredTracks.latest.length && !filteredTracks.popular.length && (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <h3 className="text-xl font-medium mb-2">No tracks match your criteria</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter settings</p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-6 bg-gradient-to-r from-purple-500 to-accent"
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </div>
        
        <Footer />
      </ScrollArea>
      
      {currentTrack && (
        <MusicPlayer 
          track={currentTrack} 
          onClose={() => setCurrentTrack(null)} 
        />
      )}
    </motion.div>
  );
};

export default Music;
