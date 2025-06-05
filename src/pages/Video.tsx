import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import FeaturedVideos from '@/components/FeaturedVideos';
import VideoPlayer from '@/components/VideoPlayer';
import { Video as VideoType } from '@/data/videos';
import { featuredVideos, latestVideos } from '@/data/videos';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilmIcon, TrendingUp, Clock, Star, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

const Video: React.FC = () => {
  const [currentVideo, setCurrentVideo] = useState<VideoType | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredVideos, setFilteredVideos] = useState<{
    featured: VideoType[],
    latest: VideoType[],
    behindTheScenes: VideoType[]
  }>({
    featured: featuredVideos,
    latest: latestVideos,
    behindTheScenes: [...featuredVideos].reverse().slice(0, 4)
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<VideoType[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    const filterVideosByCategory = (videos: VideoType[]) => {
      if (activeCategory === "All") return videos;
      if (activeCategory === "Popular") return videos.filter(v => v.views > 10000);
      if (activeCategory === "New") return videos.filter(v => {
        const releaseDate = new Date(v.releaseDate);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        return releaseDate > threeMonthsAgo;
      });
      if (activeCategory === "Featured") return videos.filter(v => v.isFeatured);
      return videos;
    };

    const filterVideosBySearch = (videos: VideoType[]) => {
      if (!searchQuery.trim()) return videos;
      return videos.filter(v => 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        v.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    };

    const applyFilters = (videos: VideoType[]) => {
      return filterVideosBySearch(filterVideosByCategory(videos));
    };

    setFilteredVideos({
      featured: applyFilters(featuredVideos),
      latest: applyFilters(latestVideos),
      behindTheScenes: applyFilters([...featuredVideos].reverse().slice(0, 4))
    });

    const allVideos = [...featuredVideos, ...latestVideos];
    const uniqueVideos = allVideos.filter((v, i, self) => 
      i === self.findIndex(t => t.id === v.id)
    );
    
    setSearchResults(
      searchQuery ? filterVideosBySearch(uniqueVideos) : []
    );
  }, [activeCategory, searchQuery]);

  const handlePlayVideo = (video: VideoType) => {
    if (video.isPremium) {
      toast({
        title: "Premium Video",
        description: "This video requires coins to play. Purchase coins to access premium content.",
        variant: "destructive",
      });
    } else {
      setCurrentVideo(video);
    }
  };

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
      transition: { 
        duration: 0.5 
      }
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

  const particles = Array.from({ length: 20 });

  const categories = [
    { name: "All", icon: <FilmIcon className="w-4 h-4" /> },
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
              Video Gallery
            </h1>
            <p className="text-foreground/70 text-center max-w-2xl mx-auto mb-8">
              Watch exclusive videos from Mr.Gee - behind the scenes, music videos, live performances, and more.
            </p>
            
            <div className="max-w-md mx-auto relative mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search videos..."
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
                    <CommandInput placeholder="Search videos..." value={searchQuery} onValueChange={setSearchQuery} className="h-9" />
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {searchResults.map((video) => (
                        <CommandItem 
                          key={video.id}
                          onSelect={() => {
                            setCurrentVideo(video);
                            setIsSearchOpen(false);
                          }}
                          className="flex items-center gap-2 py-2 cursor-pointer"
                        >
                          <div className="h-8 w-12 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{video.title}</span>
                            <span className="text-xs text-muted-foreground">{video.duration}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </div>
              )}
            </div>
          </motion.div>
          
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
          
          {filteredVideos.featured.length > 0 && (
            <motion.div variants={itemVariants}>
              <FeaturedVideos 
                title="Featured Videos" 
                videos={filteredVideos.featured} 
                onPlayVideo={handlePlayVideo} 
              />
            </motion.div>
          )}
          
          {filteredVideos.latest.length > 0 && (
            <motion.div variants={itemVariants}>
              <FeaturedVideos 
                title="Latest Releases" 
                videos={filteredVideos.latest} 
                onPlayVideo={handlePlayVideo} 
              />
            </motion.div>
          )}
          
          {filteredVideos.behindTheScenes.length > 0 && (
            <motion.div variants={itemVariants}>
              <FeaturedVideos 
                title="Behind The Scenes" 
                videos={filteredVideos.behindTheScenes} 
                onPlayVideo={handlePlayVideo} 
              />
            </motion.div>
          )}
          
          {!filteredVideos.featured.length && !filteredVideos.latest.length && !filteredVideos.behindTheScenes.length && (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <h3 className="text-xl font-medium mb-2">No videos match your criteria</h3>
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
      
      {currentVideo && (
        <VideoPlayer 
          video={currentVideo} 
          onClose={() => setCurrentVideo(null)} 
        />
      )}
    </motion.div>
  );
};

export default Video;
