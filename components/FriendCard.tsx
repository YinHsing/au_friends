
import React from 'react';
import { motion } from 'framer-motion';
import { Friend } from '../types';

interface FriendCardProps {
  friend: Friend;
  onOpenDetails: (friend: Friend) => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, onOpenDetails }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpenDetails(friend)}
      className="flex flex-col group w-full cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-white shadow-[0_10px_30px_rgba(146,139,178,0.08)] group-hover:shadow-[0_20px_50px_rgba(146,139,178,0.15)] transition-all duration-1000 ease-out border border-[#F0EDEA]">
        <img 
          src={friend.imageUrl} 
          alt={friend.name} 
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-[2.5s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#928BB2]/5 group-hover:bg-transparent transition-colors duration-1000" />
        
        {/* Soft Purple Glow on Hover */}
        <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-1000 bg-gradient-to-t from-[#928BB2]/20 via-transparent to-transparent backdrop-blur-[1px]" />
      </div>

      <div className="mt-10 space-y-4 px-1">
        <div className="space-y-2">
          <h3 className="text-2xl leading-tight text-[#2C2A29] serif italic font-light tracking-wide group-hover:text-[#928BB2] transition-colors duration-700 truncate">
            {friend.name}
          </h3>
          <p className="text-[9px] text-[#A69B92] tracking-[0.3em] uppercase font-bold group-hover:text-[#928BB2] transition-colors duration-700">
            {friend.location}
          </p>
        </div>
        
        <div className="pt-6 border-t border-[#F0EDEA]">
          <p className="text-[13px] leading-[1.7] text-[#544238]/80 font-light italic h-[4.5rem] line-clamp-3 overflow-hidden group-hover:text-[#2C2A29] transition-colors duration-1000">
            “{friend.description}”
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default FriendCard;
