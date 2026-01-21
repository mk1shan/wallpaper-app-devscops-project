
import { Artwork } from '../types';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1';

// Helper to clean up titles from Pexels (they often use photo descriptions)
const cleanTitle = (alt: string, query: string): string => {
  if (!alt || alt.length < 3) return `${query.charAt(0).toUpperCase() + query.slice(1)} Composition`;
  return alt.split('·')[0].split(' - ')[0].trim();
};

const fetchFromPexels = async (endpoint: string, queryFallback: string): Promise<Artwork[]> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });
    const data = await response.json();
    
    if (!data.photos) return [];

    return data.photos.map((photo: any) => ({
      id: photo.id.toString(),
      title: cleanTitle(photo.alt, queryFallback),
      artist: photo.photographer,
      url: photo.src.large2x,
      thumbnail: photo.src.large,
      description: `A stunning curated piece by ${photo.photographer}. This work captures the intersection of light, form, and modern aesthetic sentiment.`,
      tags: [queryFallback, 'Aesthetic', 'Fine Art'],
      dimensions: `${photo.width} x ${photo.height}`
    }));
  } catch (error) {
    console.error('Pexels API Error:', error);
    return [];
  }
};

export const fetchArtByCategory = async (category: string, count = 15): Promise<Artwork[]> => {
  let endpoint = '';
  let queryLabel = '';

  switch (category) {
    case 'trending':
      // Using "abstract wallpaper" for trending to get a premium Spotify-vibe look
      endpoint = `search?query=abstract+wallpaper+4k&per_page=${count}&sort=popular`;
      queryLabel = 'Abstract';
      break;
    case 'minimal':
      // Using specific interior and architecture terms for a clean look
      endpoint = `search?query=minimalist+aesthetic+architecture&per_page=${count}`;
      queryLabel = 'Minimal';
      break;
    case 'classical':
      // Forcing painting and museum vibes
      endpoint = `search?query=fine+art+oil+painting&per_page=${count}`;
      queryLabel = 'Classical';
      break;
    default:
      endpoint = `search?query=aesthetic+digital+art&per_page=${count}`;
      queryLabel = 'Digital';
  }
  
  return fetchFromPexels(endpoint, queryLabel);
};

export const searchArt = async (query: string): Promise<Artwork[]> => {
  if (!query) return [];
  // Appending "aesthetic" to user queries to filter out boring stock photos
  const optimizedQuery = `${query} aesthetic wallpaper`;
  return fetchFromPexels(`search?query=${encodeURIComponent(optimizedQuery)}&per_page=25`, query);
};
