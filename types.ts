
export interface Friend {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  tags: string[];
  description: string;
  connectionLevel: number;
}

export interface SearchState {
  query: string;
  selectedTags: string[];
}

export interface SimilarityResult extends Friend {
  score: number;
}
