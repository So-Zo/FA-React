// Mock data for FanArcs React application
// This simulates data that would typically come from a backend API

// Media types
export const mediaTypes = [
  {
    id: 'anime',
    name: 'Anime',
    icon: '🌸',
    description: 'Japanese animation featuring colorful artwork and fantastical themes',
    gradient: 'var(--anime-gradient)'
  },
  {
    id: 'manga',
    name: 'Manga',
    icon: '📖',
    description: 'Japanese comics and graphic novels with unique art styles and storytelling',
    gradient: 'var(--manga-gradient)'
  },
  {
    id: 'comics',
    name: 'Comics',
    icon: '💥',
    description: 'Sequential art storytelling including superhero comics, graphic novels, and indie publications',
    gradient: 'var(--comics-gradient)'
  },
  {
    id: 'tv',
    name: 'Television',
    icon: '📺',
    description: 'TV shows spanning various genres from drama to sci-fi to animation',
    gradient: 'var(--tv-gradient)'
  },
  {
    id: 'video-games',
    name: 'Video Games',
    icon: '🎮',
    description: 'Interactive entertainment spanning consoles, PC, mobile, and VR platforms',
    gradient: 'var(--video-games-gradient)'
  },
  {
    id: 'worlds-universes',
    name: 'Worlds & Universes',
    icon: '🌌',
    description: 'Fictional worlds, universes, and settings that span multiple media types',
    gradient: 'var(--worlds-gradient)'
  }
];

// Featured content for homepage
export const featuredContent = [
  {
    id: 1,
    title: 'Naruto Character Analysis',
    type: 'anime',
    author: 'NinjaFan22',
    excerpt: 'An in-depth look at Naruto Uzumaki\'s character development throughout the series...',
    imageUrl: '/naruto-character.jpg'
  },
  {
    id: 2,
    title: 'Marvel vs DC: Universe Comparison',
    type: 'comics',
    author: 'ComicBookGuru',
    excerpt: 'Comparing the storytelling approaches and universe building between Marvel and DC...',
    imageUrl: '/marvel-dc.jpg'
  },
  {
    id: 3,
    title: 'Attack on Titan: Themes of Freedom',
    type: 'manga',
    author: 'TitanTheory',
    excerpt: 'Exploring the central themes of freedom and oppression in Attack on Titan...',
    imageUrl: '/aot-themes.jpg'
  }
];

// Popular characters for Power Room
export const popularCharacters = [
  {
    id: 1,
    name: 'Naruto Uzumaki',
    series: 'Naruto',
    type: 'anime',
    powers: ['Shadow Clone Jutsu', 'Rasengan', 'Nine-Tails Chakra Mode'],
    stats: {
      strength: 90,
      speed: 85,
      intelligence: 70,
      durability: 95,
      technique: 85
    },
    imageUrl: '/naruto.jpg'
  },
  {
    id: 2,
    name: 'Superman',
    series: 'DC Comics',
    type: 'comics',
    powers: ['Super Strength', 'Flight', 'Heat Vision', 'Invulnerability'],
    stats: {
      strength: 100,
      speed: 95,
      intelligence: 80,
      durability: 98,
      technique: 75
    },
    imageUrl: '/superman.jpg'
  },
  {
    id: 3,
    name: 'Goku',
    series: 'Dragon Ball',
    type: 'anime',
    powers: ['Super Saiyan', 'Kamehameha', 'Instant Transmission'],
    stats: {
      strength: 98,
      speed: 90,
      intelligence: 65,
      durability: 95,
      technique: 90
    },
    imageUrl: '/goku.jpg'
  },
  {
    id: 4,
    name: 'Iron Man',
    series: 'Marvel Comics',
    type: 'comics',
    powers: ['Powered Armor', 'Genius Intellect', 'Repulsor Technology'],
    stats: {
      strength: 85,
      speed: 80,
      intelligence: 100,
      durability: 85,
      technique: 95
    },
    imageUrl: '/ironman.jpg'
  }
];

// Community posts
export const communityPosts = [
  {
    id: 1,
    title: 'My Hero Academia Season 6 Theory',
    content: 'After watching the latest episodes, I think that Deku will...',
    author: 'HeroFan123',
    likes: 45,
    comments: 12,
    date: '2025-04-15T10:30:00Z',
    tags: ['anime', 'my hero academia', 'theory']
  },
  {
    id: 2,
    title: 'Underrated Comics You Should Read',
    content: 'Here are five indie comics that deserve more attention...',
    author: 'ComicCollector',
    likes: 32,
    comments: 8,
    date: '2025-04-12T14:45:00Z',
    tags: ['comics', 'indie', 'recommendations']
  },
  {
    id: 3,
    title: 'Power Analysis: Goku vs Superman',
    content: 'Let\'s break down this classic matchup with actual evidence...',
    author: 'PowerScaler',
    likes: 78,
    comments: 35,
    date: '2025-04-10T09:15:00Z',
    tags: ['power room', 'versus', 'dragon ball', 'dc comics']
  }
];

// User profile mock data
export const userProfile = {
  id: 1,
  username: 'FanArcsUser',
  displayName: 'Anime Enthusiast',
  bio: 'Passionate about anime, manga, and all things fantasy. Love discussing character development and plot theories!',
  joinDate: '2024-01-15T00:00:00Z',
  avatar: '/user-avatar.jpg',
  favoriteMedia: ['anime', 'manga', 'video-games'],
  stats: {
    posts: 12,
    comments: 48,
    likes: 156
  },
  recentActivity: [
    {
      type: 'post',
      title: 'Chainsaw Man Analysis',
      date: '2025-04-14T11:20:00Z'
    },
    {
      type: 'comment',
      title: 'Re: One Piece Theory',
      date: '2025-04-13T16:45:00Z'
    },
    {
      type: 'like',
      title: 'Batman vs Iron Man',
      date: '2025-04-12T09:30:00Z'
    }
  ]
};
