
export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  coverImage: string;
  previewUrl: string;
  duration: string;
  coinCost: number;
  isPremium: boolean;
  plays?: number;
  releaseDate?: string;
  featured?: boolean;
}

// Sample data for the application
export const allTracks: Track[] = [
  {
    id: "t1",
    title: "African Queen",
    artist: "Mr.Gee",
    genre: "Afrobeat",
    coverImage: "/images/track1.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: "3:45",
    coinCost: 15,
    isPremium: true,
    plays: 12500,
    releaseDate: "2023-10-15",
    featured: true
  },
  {
    id: "t2",
    title: "Nairobi Nights",
    artist: "Mr.Gee",
    genre: "Bongo Flava",
    coverImage: "/images/track2.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: "4:20",
    coinCost: 0,
    isPremium: false,
    plays: 8700,
    releaseDate: "2023-08-22"
  },
  {
    id: "t3",
    title: "East African Flow",
    artist: "Mr.Gee ft. Diamond",
    genre: "Hip Hop",
    coverImage: "/images/track3.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: "3:55",
    coinCost: 20,
    isPremium: true,
    plays: 15200,
    releaseDate: "2023-12-05",
    featured: true
  },
  {
    id: "t4",
    title: "Kenyan Pride",
    artist: "Mr.Gee",
    genre: "Afrobeat",
    coverImage: "/images/track4.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: "3:30",
    coinCost: 0,
    isPremium: false,
    plays: 10300,
    releaseDate: "2023-07-18"
  },
  {
    id: "t5",
    title: "Serengeti Dreams",
    artist: "Mr.Gee",
    genre: "Afro Soul",
    coverImage: "/images/track5.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: "4:15",
    coinCost: 15,
    isPremium: true,
    plays: 9800,
    releaseDate: "2024-01-10",
    featured: true
  },
  {
    id: "t6",
    title: "Mombasa Sunrise",
    artist: "Mr.Gee ft. Sauti Sol",
    genre: "Benga",
    coverImage: "/images/track6.jpg",
    previewUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: "3:50",
    coinCost: 0,
    isPremium: false,
    plays: 7500,
    releaseDate: "2023-09-30"
  }
];

// Filtered lists for different sections
export const featuredTracks = allTracks.filter(track => track.featured);
export const latestReleases = [...allTracks].sort((a, b) => 
  new Date(b.releaseDate || "").getTime() - new Date(a.releaseDate || "").getTime()
).slice(0, 4);
