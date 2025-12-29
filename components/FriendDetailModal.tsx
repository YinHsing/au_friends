
import React from 'react';
import { motion } from 'framer-motion';
import { Friend } from '../types';

interface FriendDetailModalProps {
  friend: Friend | null;
  onClose: () => void;
}

const FriendDetailModal: React.FC<FriendDetailModalProps> = ({ friend, onClose }) => {
  if (!friend) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 lg:p-24 bg-[#2C2A29]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="max-w-6xl w-full bg-[#FAF7F2] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] relative"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Image area */}
        <div className="w-full md:w-[45%] h-[40vh] md:h-auto bg-[#E8E6F0] flex-shrink-0 relative">
          <img 
            src={friend.imageUrl} 
            alt={friend.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#928BB2]/10 mix-blend-multiply pointer-events-none"></div>
        </div>

        {/* Right: Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto p-12 md:p-20 xl:p-24 space-y-12 no-scrollbar">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl serif italic text-[#2C2A29] font-light leading-tight">
                {friend.name}
              </h2>
              <div className="flex items-center gap-6">
                <div className="h-[1px] w-10 bg-[#928BB2]"></div>
                <p className="text-[12px] text-[#A69B92] tracking-[0.3em] font-bold uppercase leading-none">
                  Met at {friend.location}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {friend.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-[11px] tracking-[0.2em] text-[#928BB2] italic lowercase leading-none"
                >
                  #{tag.replace(/\s+/g, '').toLowerCase()}
                </span>
              ))}
            </div>

            <div className="space-y-10 pt-10 border-t border-[#F0EDEA]">
              <p className="text-[20px] md:text-2xl leading-relaxed text-[#2C2A29] font-light italic serif">
                “{friend.description}”
              </p>
              
              <div className="text-[15px] leading-loose text-[#544238]/80 font-light space-y-8 jp-serif">
                <p>
                  Every soul encountered in the archive leaves a distinct mark. 
                  This connection, forged under the southern sun, represents a fragment of a larger journey.
                </p>
                <p>
                  Friendship here is measured not in time, but in the depth of the moments shared 
                  amidst the landscapes of Australia and beyond.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-10 md:p-14 border-t border-[#F0EDEA] flex justify-end items-center bg-[#FAF7F2]/50">
            <button
              onClick={onClose}
              className="text-[12px] tracking-[0.4em] text-[#928BB2] hover:text-[#FAF7F2] hover:bg-[#928BB2] border border-[#928BB2] px-10 py-3 transition-all duration-300 font-light lowercase"
            >
              back
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FriendDetailModal;
