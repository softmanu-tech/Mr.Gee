
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Music, ArrowLeft, Disc } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/90 via-background to-black/90 p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 0.4, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="text-center max-w-md relative z-10 glass-effect p-10 rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <div className="relative mb-10 inline-block">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-accent opacity-75 blur-lg"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
              rotate: 360
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="relative"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Disc className="h-20 w-20 text-primary mx-auto" />
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <Music className="h-10 w-10 text-white mx-auto" />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.h1 
            className="text-6xl font-bold font-cinzen mb-2 bg-gradient-to-r from-purple-300 to-accent bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            404
          </motion.h1>
          <motion.h2 
            className="text-3xl font-cinzen mb-6 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Lost in the Beat
          </motion.h2>
          <motion.p 
            className="text-foreground/80 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            The track you're looking for has moved to another venue. Let's get you back to the main stage.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button 
            asChild
            className="bg-gradient-to-r from-purple-500 to-accent hover:opacity-90 transition-all duration-300 text-white font-medium px-6 py-3 rounded-full shadow-lg shadow-purple-500/20"
          >
            <Link to="/" className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to the Music
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default NotFound;
