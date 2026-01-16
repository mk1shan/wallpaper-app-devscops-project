
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: 'fa-house', label: 'Discover' },
    { id: 'search', icon: 'fa-magnifying-glass', label: 'Search' },
    { id: 'library', icon: 'fa-heart', label: 'Collection' },
  ];

  const moodboards = [
    'Night Drive Aesthetics',
    'Bauhaus Minimalism',
    'Cyberpunk Tokyo',
    'Cozy Renaissance',
    'Grainy Film Study',
  ];

  return (
    <div className="w-64 bg-black h-full hidden md:flex flex-col p-8 space-y-12 sticky top-0 border-r border-white/5">
      <div className="flex items-center space-x-4 text-white">
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
          <i className="fa-solid fa-eye text-xl"></i>
        </div>
        <h1 className="text-2xl font-black tracking-tighter">MUSE</h1>
      </div>

      <nav className="space-y-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center space-x-5 w-full text-left transition-all duration-300 group ${
              activeTab === item.id ? 'text-white' : 'text-gray-500 hover:text-gray-200'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg group-hover:scale-110 transition-transform ${activeTab === item.id ? 'text-indigo-500' : ''}`}></i>
            <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-10 space-y-6 border-t border-white/5">
        <div className="flex items-center justify-between text-gray-500 hover:text-white cursor-pointer group transition-colors">
          <div className="flex items-center space-x-4">
            <i className="fa-solid fa-square-plus text-xl"></i>
            <span className="font-bold text-xs uppercase tracking-widest">New Board</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-6 scroll-smooth">
        <h3 className="text-[10px] uppercase text-gray-600 font-black mb-6 tracking-[0.3em]">Your Boards</h3>
        <ul className="space-y-4">
          {moodboards.map((board, idx) => (
            <li key={idx} className="text-gray-500 hover:text-indigo-400 cursor-pointer text-[11px] font-bold uppercase tracking-wider truncate transition-colors">
              {board}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
