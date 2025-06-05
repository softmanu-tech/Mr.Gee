
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import CoinsPurchase from '@/components/CoinsPurchase';
import ReferralSystem from '@/components/ReferralSystem';
import Footer from '@/components/Footer';
import { Coins, Shield, Award, CreditCard } from 'lucide-react';
import { useCoinBalance } from '@/hooks/use-coin-balance';

const CoinsPage = () => {
  const { coinBalance } = useCoinBalance();

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

  const features = [
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: "Secure Transactions",
      description: "All payments are processed securely through MPesa's trusted platform."
    },
    {
      icon: <Coins className="w-12 h-12 text-primary" />,
      title: "Instant Delivery",
      description: "Coins are credited to your account immediately after successful payment."
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: "Premium Access",
      description: "Use coins to unlock exclusive tracks and special content from Mr.Gee."
    },
    {
      icon: <CreditCard className="w-12 h-12 text-primary" />,
      title: "Flexible Options",
      description: "Choose from various coin packages that suit your needs and budget."
    }
  ];

  // Background floating circles
  const particles = Array.from({ length: 12 });

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
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: 0
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}

      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold font-cinzen mb-4 bg-gradient-to-r from-purple-300 via-primary to-accent bg-clip-text text-transparent">
            Coins
          </h1>
          <p className="text-foreground/70 text-center max-w-2xl mx-auto">
            Purchase coins to unlock premium content and support Mr.Gee's music.
          </p>
          <div className="mt-4 inline-flex items-center justify-center px-5 py-2 bg-muted/50 rounded-full">
            <Coins className="mr-2 h-5 w-5 text-primary" />
            <span className="text-lg font-bold">{coinBalance}</span>
            <span className="ml-2 text-sm text-muted-foreground">coins available</span>
          </div>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-effect p-6 rounded-xl hover:border-purple-500/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)" }}
            >
              <motion.div 
                className="mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <CoinsPurchase />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        >
          <ReferralSystem />
        </motion.div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default CoinsPage;
