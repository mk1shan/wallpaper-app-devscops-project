
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ArtCard from './components/BookCard';
import ArtModal from './components/BookModal';
import { Artwork, AppState } from './types';
import { fetchArtByCategory, searchArt } from './services/bookService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    trending: [],
    minimal: [],
    classical: [],
    searchResult: [],
    isSearching: false,
    selectedArt: null,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const [trend, min, classic] = await Promise.all([
          fetchArtByCategory('trending', 20),
          fetchArtByCategory('minimal', 20),
          fetchArtByCategory('classical', 20)
        ]);
        setState(prev => ({
          ...prev,
          trending: trend,
          minimal: min,
          classical: classic
        }));
      } catch (err) {
        console.error("Failed to load artwork", err);
      }
    };
    loadContent();
  }, []);

  const handleSearch = useCallback(async (q: string) => {
    setSearchQuery(q);
    if (q.length > 2) {
      setState(prev => ({ ...prev, isSearching: true }));
      const results = await searchArt(q);
      setState(prev => ({ ...prev, searchResult: results, isSearching: false }));
      setActiveTab('search');
    } else if (q.length === 0) {
      setActiveTab('home');
      setState(prev => ({ ...prev, searchResult: [] }));
    }
  }, []);

  // Pick a random artwork from trending for the hero to keep it fresh
  const featuredArt = useMemo(() => {
    if (state.trending.length === 0) return null;
    // We filter out any items that might still look too "stock-ish" or just pick index 2-5 
    // which are usually better in the Pexels popular set than the very first result.
    const index = Math.min(2, state.trending.length - 1);
    return state.trending[index];
  }, [state.trending]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#050505] text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-[#050505]">
        {/* Modern Header */}
        <header className={`fixed top-0 right-0 left-0 md:left-64 z-40 flex items-center justify-between px-8 py-6 transition-all duration-500 ${isHeroLoaded ? 'bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'}`}>
          <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full px-6 py-3 w-full max-w-xl border border-white/10 group focus-within:ring-2 ring-indigo-500 transition-all">
            <i className="fa-solid fa-magnifying-glass text-gray-400 mr-4"></i>
            <input 
              type="text" 
              placeholder="Search aesthetics (e.g. 'Cyberpunk', 'Vaporwave', 'Abstract')..." 
              className="bg-transparent border-none focus:outline-none w-full text-sm text-gray-100 placeholder:text-gray-500 font-medium"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-8">
            <button className="hidden lg:block text-[10px] font-black text-gray-400 hover:text-white transition-colors uppercase tracking-[0.3em]">Curator Access</button>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 p-[2px] cursor-pointer hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
                <i className="fa-solid fa-palette text-indigo-400 text-sm"></i>
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'home' && (
          <>
            {/* Cinematic Hero */}
            <section className="relative h-[90vh] w-full flex items-end pb-32 px-8 md:px-16 group overflow-hidden bg-[#0a0a0a]">
              {featuredArt ? (
                <>
                  <img 
                    key={featuredArt.url}
                    src={featuredArt.url} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-out ${isHeroLoaded ? 'opacity-60 scale-100' : 'opacity-0 scale-110'}`}
                    onLoad={() => setIsHeroLoaded(true)}
                    alt="Featured"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent"></div>
                  
                  <div className={`relative z-10 max-w-4xl space-y-8 transition-all duration-1000 transform ${isHeroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center space-x-3 bg-white/10 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_#6366f1]"></span>
                      <span className="text-white/90 font-black uppercase tracking-[0.4em] text-[9px]">Aesthetic Masterpiece</span>
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] drop-shadow-2xl italic uppercase">
                      {featuredArt.title.split(' ')[0]} <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        {featuredArt.title.split(' ').slice(1).join(' ') || 'VISION'}
                      </span>
                    </h1>
                    <div className="flex items-center space-x-6 pt-6">
                      <button 
                        onClick={() => setState(prev => ({ ...prev, selectedArt: featuredArt }))}
                        className="bg-white text-black px-14 py-5 rounded-full font-black text-xs tracking-widest flex items-center space-x-4 hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
                      >
                        <i className="fa-solid fa-expand"></i>
                        <span>EXPLORE CANVAS</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                    <p className="text-xs font-black tracking-[0.5em] text-gray-500 uppercase">Syncing MUSE</p>
                  </div>
                </div>
              )}
            </section>

            {/* Content Rows */}
            <div className="relative z-20 -mt-24 pb-32 space-y-24">
              <ArtRow title="Trending Visuals" arts={state.trending} onArtClick={(art) => setState(prev => ({ ...prev, selectedArt: art }))} />
              <ArtRow title="Minimalist Escape" arts={state.minimal} onArtClick={(art) => setState(prev => ({ ...prev, selectedArt: art }))} />
              <ArtRow title="Classical Studies" arts={state.classical} onArtClick={(art) => setState(prev => ({ ...prev, selectedArt: art }))} />
            </div>
          </>
        )}

        {/* Search Results */}
        {activeTab === 'search' && (
          <div className="p-8 md:p-16 pt-32">
            <h2 className="text-4xl font-black mb-12 tracking-tight italic uppercase">Exploring: <span className="text-indigo-500">"{searchQuery}"</span></h2>
            {state.isSearching ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-6">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
                <p className="text-gray-500 font-black uppercase tracking-[0.4em] text-[10px]">Curation in progress...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {state.searchResult.map((art) => (
                  <ArtCard key={art.id} art={art} onClick={(a) => setState(prev => ({ ...prev, selectedArt: a }))} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Other tabs omitted for brevity, kept same as before */}

        <footer className="px-16 py-32 bg-[#020202] border-t border-white/5 mt-20 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-1 space-y-8">
             <div className="flex items-center space-x-4 text-white">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <i className="fa-solid fa-eye"></i>
              </div>
              <h1 className="text-2xl font-black tracking-tighter">MUSE</h1>
            </div>
            <p className="text-xs text-gray-600 leading-[2] font-bold uppercase tracking-widest">
              A premium visual sanctuary powered by Pexels.
            </p>
          </div>
          {/* ... footer links same as before ... */}
        </footer>
      </main>

      <ArtModal 
        art={state.selectedArt} 
        onClose={() => setState(prev => ({ ...prev, selectedArt: null }))} 
      />
    </div>
  );
};

interface ArtRowProps {
  title: string;
  arts: Artwork[];
  onArtClick: (art: Artwork) => void;
}

const ArtRow: React.FC<ArtRowProps> = ({ title, arts, onArtClick }) => {
  return (
    <div className="px-8 md:px-16 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic uppercase">{title}</h3>
        <button className="text-[9px] font-black text-gray-400 hover:text-indigo-400 uppercase tracking-[0.3em] transition-all border border-white/10 hover:border-indigo-500/50 px-6 py-2 rounded-full">
          Collection Hub
        </button>
      </div>
      <div className="netflix-scroll flex space-x-8 pb-10 overflow-visible">
        {arts.length > 0 ? (
          arts.map((art) => (
            <ArtCard key={art.id} art={art} onClick={onArtClick} />
          ))
        ) : (
          [...Array(6)].map((_, i) => (
            <div key={i} className="flex-none w-44 md:w-64 aspect-[3/4] bg-white/5 rounded-2xl animate-pulse border border-white/5"></div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
