
import React, { useState } from 'react';
import { Artwork } from '../types';

interface ArtModalProps {
  art: Artwork | null;
  onClose: () => void;
}

const ArtModal: React.FC<ArtModalProps> = ({ art, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!art) return null;

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      // We fetch the image and convert it to a blob to force a direct download
      const response = await fetch(art.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Creating a clean filename
      const fileName = `${art.title.replace(/\s+/g, '_').toLowerCase()}_muse.jpg`;
      link.setAttribute('download', fileName);
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: Open in new tab if blob fetch fails
      window.open(art.url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onClose}></div>
      
      <div className="relative bg-[#0b0c10] w-full max-w-6xl h-full max-h-[90vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row border border-white/10">
        
        {/* Controls */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 bg-white/10 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/20 backdrop-blur-md transition-all border border-white/10"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        {/* Image Display */}
        <div className="w-full md:w-3/5 h-1/2 md:h-full bg-black relative flex items-center justify-center overflow-hidden group">
          <img 
            src={art.url} 
            alt={art.title}
            className="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg text-[10px] font-bold text-gray-400 border border-white/5 uppercase tracking-widest">
            {art.dimensions ? `HQ CANVAS • ${art.dimensions}` : 'HIGH RESOLUTION CANVAS'}
          </div>
        </div>

        {/* Art Details */}
        <div className="flex-1 p-8 md:p-12 space-y-8 flex flex-col justify-center bg-gradient-to-b from-[#0b0c10] to-[#12141a]">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold uppercase tracking-[0.3em] text-[10px]">
              <i className="fa-solid fa-paintbrush"></i>
              <span>Original Artwork</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter uppercase italic">{art.title}</h2>
            <div className="flex items-center space-x-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
               <p className="text-xl text-gray-300 font-semibold italic">
                {art.artist}
              </p>
            </div>
          </div>

          <p className="text-gray-400 leading-relaxed text-lg font-medium">
            {art.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={handleDownload}
              disabled={isDownloading}
              className={`bg-white text-black px-10 py-4 rounded-full font-black text-sm flex items-center space-x-3 hover:bg-indigo-500 hover:text-white transition-all transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-wait`}
            >
              {isDownloading ? (
                <i className="fa-solid fa-circle-notch animate-spin"></i>
              ) : (
                <i className="fa-solid fa-download"></i>
              )}
              <span>{isDownloading ? 'PREPARING...' : 'DOWNLOAD AS WALLPAPER'}</span>
            </button>
            <button className="bg-white/5 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10">
              <i className="fa-solid fa-heart text-xl"></i>
            </button>
          </div>

          <div className="pt-8 border-t border-white/5">
            <h4 className="text-gray-600 font-bold uppercase text-[10px] tracking-widest mb-4">Related Themes</h4>
            <div className="flex flex-wrap gap-2">
              {art.tags?.map((tag, i) => (
                <span key={i} className="text-[10px] bg-white/5 text-gray-300 px-4 py-2 rounded-full border border-white/10 hover:border-indigo-500/50 cursor-pointer transition-colors uppercase tracking-wider">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtModal;
