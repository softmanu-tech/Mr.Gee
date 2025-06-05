
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Music, Coins, User, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  // Track scrolling to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Music", path: "/music" },
    { title: "Coins", path: "/coins" }, // Changed from "Buy Coins"
    { title: "About", path: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
        ? "bg-background/95 backdrop-blur-lg shadow-lg shadow-purple-900/5" 
        : "bg-background/80 backdrop-blur-md"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Music className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.span 
            className="font-cinzen text-2xl font-bold bg-gradient-to-r from-purple-300 to-accent bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Mr.Gee
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.div
              key={link.title}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={link.path}
                className={`relative px-2 py-1 ${
                  isActive(link.path) 
                    ? "text-primary" 
                    : "text-foreground/80 hover:text-primary"
                } transition-colors duration-200`}
              >
                {link.title}
                {isActive(link.path) && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    layoutId="navbar-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="border-purple-500 text-purple-300"
                asChild
              >
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" /> Login
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="default"
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-accent hover:opacity-90"
                asChild
              >
                <Link to="/signup">
                  <User className="h-4 w-4 mr-2" /> Sign Up
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l border-purple-900/50 w-[280px]">
            <div className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.title}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    className={`text-lg font-medium ${
                      isActive(link.path) 
                        ? "text-primary" 
                        : "text-foreground/80 hover:text-primary"
                    } transition-colors duration-200 flex items-center`}
                    onClick={closeMenu}
                  >
                    {link.title === "Home" && <Music className="h-5 w-5 mr-2" />}
                    {link.title === "Music" && <Music className="h-5 w-5 mr-2" />}
                    {link.title === "Buy Coins" && <Coins className="h-5 w-5 mr-2" />}
                    {link.title === "About" && <User className="h-5 w-5 mr-2" />}
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-purple-500 text-purple-300 w-full justify-start"
                    asChild
                  >
                    <Link to="/login" onClick={closeMenu}>
                      <LogIn className="h-4 w-4 mr-2" /> Login
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button 
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-accent hover:opacity-90 w-full justify-start"
                    asChild
                  >
                    <Link to="/signup" onClick={closeMenu}>
                      <User className="h-4 w-4 mr-2" /> Sign Up
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  );
};

export default Navbar;
