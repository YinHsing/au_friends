
import { Friend, SimilarityResult } from '../types';

export function calculateSimilarity(query: string, friend: Friend): number {
  if (!query) return 1;
  
  const searchTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
  const friendText = `${friend.name} ${friend.location} ${friend.tags.join(' ')} ${friend.description}`.toLowerCase();
  
  let score = 0;
  
  searchTerms.forEach(term => {
    if (friend.name.toLowerCase().includes(term)) score += 10;
    if (friend.location.toLowerCase().includes(term)) score += 8;
    
    friend.tags.forEach(tag => {
      if (tag.toLowerCase() === term) score += 5;
      else if (tag.toLowerCase().includes(term)) score += 2;
    });

    const regex = new RegExp(term, 'g');
    const matches = friendText.match(regex);
    if (matches) score += matches.length;
  });

  return score;
}

export function sortAndFilterFriends(friends: Friend[], query: string, selectedTags: string[]): Friend[] {
  let filtered = friends;
  
  if (selectedTags.length > 0) {
    filtered = filtered.filter(friend => 
      selectedTags.every(tag => friend.tags.includes(tag))
    );
  }

  if (query.trim()) {
    return filtered
      .map(friend => ({
        ...friend,
        score: calculateSimilarity(query, friend)
      }))
      .filter(friend => (friend as any).score > 0)
      .sort((a, b) => (b as any).score - (a as any).score);
  }

  return filtered;
}
