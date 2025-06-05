
import React from 'react';
import { Play, Lock, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

export interface Track {
  id: string;
  title: string;
  coverImage: string;
  duration: string;
  isPremium: boolean;
  previewUrl?: string;
}

interface MusicCardProps {
  track: Track;
  onPlay: (track: Track) => void;
}

const MusicCard: React.FC<MusicCardProps> = ({ track, onPlay }) => {
  return (
    <div className="music-card group">
      <div className="relative">
        <img 
          src={track.coverImage} 
          alt={track.title} 
          className="w-full aspect-square object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-primary/90 text-white hover:bg-primary hover:scale-110 transition-all" 
            onClick={() => onPlay(track)}
          >
            {track.isPremium ? <Lock className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
        </div>
        {track.isPremium && (
          <span className="premium-badge">Premium</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-cinzen text-lg font-medium truncate">{track.title}</h3>
        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
          <span>Mr.Gee</span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{track.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
