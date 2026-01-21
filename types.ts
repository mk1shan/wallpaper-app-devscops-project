
export interface Artwork {
  id: string;
  title: string;
  artist: string;
  description?: string;
  url: string;
  thumbnail: string;
  tags?: string[];
  dimensions?: string;
}

export interface AppState {
  trending: Artwork[];
  minimal: Artwork[];
  classical: Artwork[];
  searchResult: Artwork[];
  isSearching: boolean;
  selectedArt: Artwork | null;
}
