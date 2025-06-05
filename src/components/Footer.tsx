
import React from 'react';
import { Music, Instagram, Twitter, Youtube, Facebook, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Music className="h-8 w-8 text-primary mr-2" />
              <span className="font-cinzen text-2xl font-bold bg-gradient-to-r from-purple-300 to-accent bg-clip-text text-transparent">
                Mr.Gee
              </span>
            </div>
            <p className="text-foreground/70 mb-6 max-w-md">
              Experience the unique sound of Kenya's rising star. Mr.Gee blends traditional African rhythms with contemporary beats to create a truly immersive musical experience.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="outline" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-cinzen text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/music" className="text-foreground/70 hover:text-primary transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link to="/buy-coins" className="text-foreground/70 hover:text-primary transition-colors">
                  Buy Coins
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-cinzen text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-foreground/70">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>contact@mrgee.com</span>
              </li>
              <li className="flex items-center text-foreground/70">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>+254 123 456 789</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 mt-8 text-center text-sm text-foreground/50">
          <p>&copy; {new Date().getFullYear()} Mr.Gee Music. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
