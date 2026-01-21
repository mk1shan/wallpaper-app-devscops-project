
import React from 'react';
import { Artwork } from '../types';

interface ArtCardProps {
  art: Artwork;
  onClick: (art: Artwork) => void;
}

const ArtCard: React.FC<ArtCardProps> = ({ art, onClick }) => {
  return (
    <div 
      onClick={() => onClick(art)}
      className="flex-none w-44 md:w-64 group cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] transform hover:scale-[1.02] relative"
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-xl shadow-2xl bg-[#1a1d24] border border-white/5 group-hover:border-indigo-500/50">
        <img 
          src={art.thumbnail} 
          alt={art.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Hover Overlay - Pinterest Style */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
          <div className="flex justify-end">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg hover:bg-indigo-500 transform transition-transform hover:scale-110">
              Save
            </button>
          </div>
          <div className="space-y-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
             <h4 className="text-white text-sm font-bold truncate">{art.title}</h4>
             <p className="text-gray-300 text-[10px] font-medium tracking-wide">
                {art.artist}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
