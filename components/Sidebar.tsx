
import React from 'react';
import { motion } from 'framer-motion';

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  resetTags: () => void;
  allTags: string[];
}

const Sidebar: React.FC<SidebarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTags,
  toggleTag,
  resetTags,
  allTags
}) => {
  return (
    <motion.nav
      layout
      className="xl:w-[320px] w-full xl:h-screen xl:fixed xl:left-0 xl:top-0 p-10 xl:p-12 flex flex-col z-50 bg-[#1D3557] border-r border-[#243B5A] overflow-y-auto no-scrollbar relative shadow-2xl"
    >
      {/* Title Section */}
      <div className="mb-12 xl:mb-16 relative z-10">
        <h1 className="text-4xl font-light tracking-widest text-[#FAF7F2] flex flex-col">
          <span className="serif italic text-[#928BB2] mb-1">My Friends</span>
          <span className="tracking-[0.1em] font-light text-2xl">Meet in Australia</span>
        </h1>
        <div className="w-12 h-[1px] bg-[#928BB2] mt-6 mb-4"></div>
        <p className="text-[14px] tracking-[0.4em] text-[#B4ADD4]/80 leading-loose jp-serif font-medium">
          220 & 284
        </p>
      </div>

      <div className="flex flex-col md:flex-row xl:flex-col gap-10 xl:gap-12 w-full relative z-10">
        
        {/* Search */}
        <div className="xl:w-full">
          <div className="relative group">
            <input
              type="text"
              placeholder="search for a soul met at the antipodes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-[#243B5A] focus:border-[#928BB2] py-3 text-[13px] tracking-[0.05em] outline-none transition-all duration-700 text-[#FAF7F2] placeholder:text-[#B4ADD4]/30 serif italic"
            />
          </div>
        </div>

        {/* Filters Area */}
        <div className="xl:w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="h-4" />
            {selectedTags.length > 0 && (
              <button
                onClick={resetTags}
                className="text-[9px] text-[#928BB2] hover:text-[#FAF7F2] transition-colors underline underline-offset-4 decoration-[#243B5A] uppercase tracking-widest"
              >
                Clear Filters
              </button>
            )}
          </div>
          
          <div className="flex xl:flex-col flex-row gap-5 xl:gap-6 overflow-x-auto xl:overflow-x-visible no-scrollbar pb-4 xl:pb-0">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`whitespace-nowrap text-[12px] tracking-[0.15em] transition-all duration-700 flex items-center gap-4 group text-left ${
                  selectedTags.includes(tag) ? 'text-[#FAF7F2] font-medium' : 'text-[#B4ADD4]/50 hover:text-[#928BB2]'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 flex-shrink-0 ${
                  selectedTags.includes(tag) ? 'bg-[#928BB2] scale-110' : 'bg-transparent border border-[#243B5A] group-hover:border-[#928BB2]'
                }`} />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
