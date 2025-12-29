
import { Friend } from './types';

export const INITIAL_FRIENDS: Friend[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    location: 'The Whisky Den, Melbourne',
    imageUrl: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?q=80&w=800&auto=format&fit=crop',
    tags: ['Whisky Den'],
    description: 'A master of malts and long conversations under low lighting. We once debated the soul of peat for four hours.',
    connectionLevel: 5
  },
  {
    id: '2',
    name: 'Snake Plant',
    location: 'Kyoto, Japan',
    imageUrl: 'https://images.unsplash.com/photo-1545239351-ef35f43d514d?q=80&w=800&auto=format&fit=crop',
    tags: ['Japan'],
    description: 'A serene soul met near the Fushimi Inari-taisha. His perspective on time is as layered as the temples he preserves.',
    connectionLevel: 4
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    location: 'Seoul, Korea',
    imageUrl: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=800&auto=format&fit=crop',
    tags: ['Korea'],
    description: 'Radiant energy found in the neon heart of Gangnam. She taught me that silence can be the loudest part of a friendship.',
    connectionLevel: 4.5
  },
  {
    id: '4',
    name: 'Pothos Gold',
    location: 'Zen 5, Adelaide',
    imageUrl: 'https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?q=80&w=800&auto=format&fit=crop',
    tags: ['Zen 5'],
    description: 'The calm in the center of the storm. Meeting at Zen 5 felt like reconnecting with a part of myself I had forgotten.',
    connectionLevel: 5
  },
  {
    id: '5',
    name: 'Eucalyptus',
    location: 'Australia',
    imageUrl: 'https://images.unsplash.com/photo-1459156212016-c81b4dd81f9d?q=80&w=800&auto=format&fit=crop',
    tags: ['Whisky Den', 'Zen 5'],
    description: 'A wanderer between worlds. She belongs everywhere and nowhere, always carrying a piece of the southern sun.',
    connectionLevel: 4.8
  }
];

export const ALL_TAGS = ['Whisky Den', 'Japan', 'Korea', 'Zen 5'];
