
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Friend } from './types';
import { INITIAL_FRIENDS, ALL_TAGS } from './constants';
import { sortAndFilterFriends } from './utils/searchUtils';
import FriendCard from './components/FriendCard';
import Sidebar from './components/Sidebar';
import FriendDetailModal from './components/FriendDetailModal';

const App: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>(INITIAL_FRIENDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const displayFriends = useMemo(() => {
    return sortAndFilterFriends(friends, searchQuery, selectedTags);
  }, [friends, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen flex flex-col xl:flex-row relative">
      {/* Sidebar - Jacaranda & Navy Theme */}
      <Sidebar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        resetTags={() => setSelectedTags([])}
        allTags={ALL_TAGS}
      />

      {/* Main Content - Washi Paper Tone */}
      <main className="flex-1 xl:ml-[320px] p-8 md:p-16 xl:p-20 xl:pt-20 overflow-y-auto min-h-screen relative z-10">
        
        {/* Header Section */}
        <header className="mb-12 md:mb-16 border-b border-[#E6DEC9]/40 pb-10 max-w-none">
          <div className="flex flex-col gap-6">
            <p className="text-[24px] md:text-[28px] lg:text-[34px] text-[#2C2A29] tracking-tight font-light leading-none serif italic whitespace-nowrap">
              A collection of souls met under the <span className="text-[#928BB2]">southern sun</span>.
            </p>
          </div>
        </header>

        {/* Friends Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-12 gap-y-20">
          <AnimatePresence mode="popLayout">
            {displayFriends.map((friend) => (
              <FriendCard 
                key={friend.id} 
                friend={friend} 
                onOpenDetails={setSelectedFriend} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {displayFriends.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-64 text-center"
          >
            <p className="serif italic text-4xl text-[#2C2A29]/20 tracking-widest font-light">The wind carries no echoes here.</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedTags([]); }}
              className="mt-12 text-[10px] tracking-[0.6em] text-[#928BB2] hover:text-[#2C2A29] transition-all border-b border-[#928BB2]/30 pb-3 uppercase font-bold"
            >
              Reset Archive
            </button>
          </motion.div>
        )}
      </main>

      {/* Friend Profile Modal */}
      <AnimatePresence>
        {selectedFriend && (
          <FriendDetailModal 
            friend={selectedFriend}
            onClose={() => setSelectedFriend(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
