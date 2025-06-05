
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Music, Video } from "lucide-react";
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  
  // TypeScript animations for the text effect
  interface TextChar {
    char: string;
    key: number;
  }
  
  const nameText = "Mr.Gee";
  const nameChars: TextChar[] = nameText.split('').map((char, index) => ({
    char,
    key: index
  }));
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const nameCharVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        type: "spring", 
        stiffness: 200,
        damping: 10
      }
    })
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -10 },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotateY: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        delay: 0.5 
      }
    },
    float: {
      y: [0, -15, 0],
      rotateZ: [0, 2, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const backgroundElements = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 2 }
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        variants={backgroundElements}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-60"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.6, 0.8, 0.6],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-60 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-50"
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.5, 0.7, 0.5],
            x: [0, -10, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-20 w-72 h-72 bg-purple-700/20 rounded-full blur-3xl opacity-70"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.9, 0.7],
            y: [0, -10, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <div className="container relative px-4 mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between py-12 md:py-24 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <motion.h4 
              className="text-purple-300 font-cinzen tracking-wide"
              variants={itemVariants}
            >
              Kenyan Music Artist
            </motion.h4>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-cinzen"
              variants={itemVariants}
            >
              <div className="flex flex-wrap justify-center md:justify-start">
                {nameChars.map(({char, key}) => (
                  <motion.span
                    key={key}
                    custom={key}
                    variants={nameCharVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block bg-gradient-to-r from-purple-300 via-primary to-accent bg-clip-text text-transparent pb-2"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.5 } 
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <span className="text-2xl md:text-3xl font-medium text-foreground/90">
                Music Verse
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg text-foreground/80 max-w-lg"
              variants={itemVariants}
            >
              Explore the vibrant sounds and rhythms of Kenya's rising star. Listen to exclusive tracks, watch amazing videos, and join the journey of musical innovation.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button asChild className="bg-gradient-to-r from-purple-500 to-accent hover:opacity-90 transition-opacity">
                  <Link to="/music">
                    <Music className="h-4 w-4 mr-2" /> Listen Now
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="outline" className="border-purple-600 text-purple-300">
                  <Link to="/video">
                    <Video className="h-4 w-4 mr-2" /> Watch Videos
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="w-full md:w-1/2 relative"
            variants={imageVariants}
            animate="float"
          >
            <motion.div 
              className="aspect-square max-w-md mx-auto glass-effect p-2 rounded-full"
              whileHover={{ 
                scale: 1.05, 
                rotate: 5,
                boxShadow: "0 0 30px rgba(155, 135, 245, 0.4)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="rounded-full overflow-hidden border-2 border-purple-500/50"
                initial={{ scale: 0.9 }}
                animate={{ 
                  scale: [0.98, 1.02, 0.98],
                  rotateZ: [-1, 1, -1],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src="/gee.png"
                  alt="Mr.Gee Portrait" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/30 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 5, 0],
                y: [0, -5, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-accent/30 rounded-full blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, -5, 0],
                y: [0, 5, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4,
                delay: 1,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
