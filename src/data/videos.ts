
export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  duration: string;
  coinCost: number;
  isPremium: boolean;
  views?: number;
  releaseDate?: string;
  uploadDate?: string;
  category?: string;
  isFeatured?: boolean;
}

// Sample data
export const allVideos: Video[] = [
  {
    id: "v1",
    title: "Nairobi Flow - Official Music Video",
    description: "The official music video for Mr.Gee's hit single 'Nairobi Flow'",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/video1.jpg",
    duration: "4:32",
    coinCost: 25,
    isPremium: true,
    views: 187000,
    releaseDate: "2023-11-10",
    uploadDate: "2023-11-10",
    category: "Music Video",
    isFeatured: true
  },
  {
    id: "v2",
    title: "Behind the Scenes - East African Tour",
    description: "Go behind the scenes of Mr.Gee's East African Tour",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/video2.jpg",
    duration: "10:15",
    coinCost: 0,
    isPremium: false,
    views: 95000,
    releaseDate: "2023-09-22",
    uploadDate: "2023-09-25",
    category: "Behind the Scenes",
    isFeatured: false
  },
  {
    id: "v3",
    title: "Kenya United - Documentary",
    description: "A documentary about the power of music in bringing Kenya together",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/video3.jpg",
    duration: "25:40",
    coinCost: 40,
    isPremium: true,
    views: 120000,
    releaseDate: "2023-12-15",
    uploadDate: "2023-12-16",
    category: "Documentary",
    isFeatured: true
  },
  {
    id: "v4",
    title: "Live at Nairobi Stadium",
    description: "Full concert recording of Mr.Gee's sold-out show at Nairobi Stadium",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/video4.jpg",
    duration: "1:30:20",
    coinCost: 50,
    isPremium: true,
    views: 203000,
    releaseDate: "2024-01-05",
    uploadDate: "2024-01-08",
    category: "Concert",
    isFeatured: true
  },
  {
    id: "v5",
    title: "Serengeti - Lyric Video",
    description: "Official lyric video for 'Serengeti'",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/video5.jpg",
    duration: "4:05",
    coinCost: 0,
    isPremium: false,
    views: 88000,
    releaseDate: "2023-10-30",
    uploadDate: "2023-10-31",
    category: "Lyric Video",
    isFeatured: false
  },
  {
    id: "v6",
    title: "Interview with African Voices",
    description: "Mr.Gee speaks about his journey in music and his inspirations",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnailUrl: "/images/video6.jpg",
    duration: "18:45",
    coinCost: 0,
    isPremium: false,
    views: 75000,
    releaseDate: "2023-08-15",
    uploadDate: "2023-08-17",
    category: "Interview",
    isFeatured: false
  }
];

// Filtered lists for different sections
export const featuredVideos = allVideos.filter(video => video.isFeatured);
export const latestVideos = [...allVideos].sort((a, b) => 
  new Date(b.releaseDate || "").getTime() - new Date(a.releaseDate || "").getTime()
).slice(0, 4);
