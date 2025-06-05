
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Disc, Music, Award, Headphones, Calendar, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
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

  const achievements = [
    { 
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Best New Artist",
      year: "2023"
    },
    { 
      icon: <Music className="w-6 h-6 text-primary" />,
      title: "Album of the Year",
      year: "2024"
    },
    { 
      icon: <Headphones className="w-6 h-6 text-primary" />,
      title: "1M+ Streams",
      year: "2023-2024"
    },
  ];

  const upcomingEvents = [
    {
      title: "Summer Tour",
      date: "June 15, 2025",
      location: "Nairobi, Kenya"
    },
    {
      title: "Album Release Party",
      date: "July 30, 2025",
      location: "Mombasa, Kenya"
    },
    {
      title: "International Tour",
      date: "August 10, 2025",
      location: "Multiple Locations"
    }
  ];

  // Background floating elements
  const particles = Array.from({ length: 15 });

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
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: 0
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.1, 0.2, 0.1],
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
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-cinzen mb-4 bg-gradient-to-r from-purple-300 via-primary to-accent bg-clip-text text-transparent">
            About Mr.Gee
          </h1>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto">
            Kenyan music artist bringing fresh sounds and authentic vibes to the global stage.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <motion.div 
              className="absolute -top-10 -left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <div className="relative bg-card border border-purple-500/20 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/10">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Mr.Gee" 
                  className="w-full h-full object-cover object-center transition-transform hover:scale-105"
                />
              </div>
              <motion.div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-1 font-cinzen">Mr.Gee</h3>
                <p className="text-white/80">Music Artist & Producer</p>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 font-cinzen">The Journey</h2>
            <p className="text-foreground/80 mb-4">
              Mr.Gee is a Kenyan music artist with a passion for creating authentic and innovative sounds that bridge traditional Kenyan music with modern production techniques.
            </p>
            <p className="text-foreground/80 mb-6">
              With roots deeply embedded in Kenya's rich musical culture, Mr.Gee has been pushing boundaries and exploring new sonic territories since beginning his musical journey in 2018. His unique blend of Afrobeats, hip-hop, and traditional Kenyan sounds has earned him a growing fanbase both locally and internationally.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={index}
                  className="bg-secondary/50 rounded-lg p-4 border border-purple-500/20"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center mb-2">
                    {achievement.icon}
                    <span className="text-xs text-foreground/60 ml-2">{achievement.year}</span>
                  </div>
                  <h4 className="text-sm font-semibold">{achievement.title}</h4>
                </motion.div>
              ))}
            </div>
            
            <Button asChild className="bg-gradient-to-r from-purple-500 to-accent w-fit hover:opacity-90">
              <Link to="/music">Explore Music</Link>
            </Button>
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants} className="mb-24">
          <h2 className="text-3xl font-bold mb-8 font-cinzen text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={index}
                className="bg-card border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.2)" }}
              >
                <Calendar className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-foreground/60 text-sm mb-1">{event.date}</p>
                <p className="text-foreground/80">{event.location}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-purple-900/30 to-accent/30 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-purple-500/20 text-center"
        >
          <Mic className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 font-cinzen">Join the Journey</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
            Support Mr.Gee by purchasing his music, attending events, and sharing his content with friends. Your support helps in creating more amazing music.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-gradient-to-r from-purple-500 to-accent hover:opacity-90">
              <Link to="/buy-coins">Support Now</Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-500/50">
              <Link to="/music">Latest Releases</Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default About;
