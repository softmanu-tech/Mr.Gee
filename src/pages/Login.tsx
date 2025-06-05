
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Music, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "Welcome back to Mr.Gee Music!",
        duration: 5000,
      });
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        duration: 0.5
      } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  // Background elements
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
      
      <div className="container mx-auto px-4 pt-28 pb-16 flex justify-center items-center">
        <motion.div 
          className="w-full max-w-md bg-card border border-purple-500/20 rounded-2xl shadow-xl shadow-purple-900/10 overflow-hidden relative"
          variants={itemVariants}
        >
          <motion.div
            className="absolute inset-0 overflow-hidden opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1.5 }}
          >
            <motion.div 
              className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl"
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </motion.div>
          
          <div className="p-8 relative">
            <div className="flex justify-center mb-6">
              <motion.div 
                className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Music className="h-8 w-8 text-primary" />
              </motion.div>
            </div>
            
            <motion.h2 
              className="text-2xl font-bold text-center mb-2 font-cinzen"
              variants={itemVariants}
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-center mb-8"
              variants={itemVariants}
            >
              Sign in to access your account
            </motion.p>
            
            <motion.form onSubmit={handleLogin} variants={containerVariants}>
              <motion.div className="space-y-4" variants={containerVariants}>
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 border-purple-500/30 focus:border-purple-500"
                  />
                </motion.div>
                
                <motion.div className="space-y-2" variants={itemVariants}>
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background/50 border-purple-500/30 focus:border-purple-500"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-accent hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div 
                        className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" /> Sign In
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>
            
            <motion.div 
              className="mt-6 text-center text-sm"
              variants={itemVariants}
            >
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign Up
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
