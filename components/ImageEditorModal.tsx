
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Fixed: Changed Book to Friend to match types.ts
import { Friend } from '../types';
import { editImage } from '../services/geminiService';

interface ImageEditorModalProps {
  // Fixed: Updated parameter type from Book to Friend
  friend: Friend;
  isOpen: boolean;
  onClose: () => void;
  // Fixed: Updated parameter name from newCover to newImageUrl for consistency
  onSave: (newImageUrl: string) => void;
}

// Fixed: Renamed book prop to friend
const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ friend, isOpen, onClose, onSave }) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Fixed: Changed book.coverImage to friend.imageUrl
  const [currentPreview, setCurrentPreview] = useState(friend.imageUrl);

  if (!isOpen) return null;

  const handleEdit = async () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    setError(null);
    try {
      const response = await fetch(currentPreview);
      const blob = await response.blob();
      const reader = new FileReader();
      
      const base64Data = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      const editedResult = await editImage(base64Data, prompt);
      if (editedResult) {
        setCurrentPreview(editedResult);
        setPrompt('');
      } else {
        setError("the roast failed to manifest this blend.");
      }
    } catch (err: any) {
      setError(err.message || "archival distillation faltered.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-8 md:p-20 bg-[#3C2A21]/98 backdrop-blur-2xl"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-40">
        {/* Preview Area */}
        <div className="relative aspect-[3/4.4] bg-[#211814] shadow-[0_45px_110px_rgba(0,0,0,0.6)] overflow-hidden">
          <img 
            src={currentPreview} 
            alt="Preview" 
            className="w-full h-full object-cover grayscale-[5%]"
          />
          <AnimatePresence>
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#3C2A21]/85 flex flex-col items-center justify-center"
              >
                <div className="w-20 h-[1px] bg-[#D4A373] animate-[pulse_1s_infinite]" />
                <p className="mt-12 text-[10px] tracking-[0.7em] uppercase text-[#D4A373] font-bold">distilling...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls Area */}
        <div className="flex flex-col justify-center space-y-24">
          <div className="space-y-10">
            <h2 className="text-6xl md:text-8xl serif italic text-[#F2EAD3] font-light leading-none lowercase">visual distillation</h2>
            <p className="text-[16px] text-[#8B7E74] leading-relaxed max-w-sm font-light lowercase tracking-wider">
              {/* Fixed: Changed book.title to friend.name */}
              adjust the chromatic intensity of <span className="text-[#D4A373] italic font-semibold">“{friend.name}”</span> through directed aroma.
            </p>
          </div>

          <div className="space-y-16">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="describe the desired roast... (e.g. 'faded sepia', 'warm amber lighting')"
              className="w-full bg-transparent border-b border-[#544238] focus:border-[#D4A373] py-8 text-[20px] text-[#F2EAD3] outline-none transition-all duration-1000 resize-none h-48 placeholder:text-[#544238] lowercase font-light"
              disabled={isProcessing}
            />
            
            <div className="flex flex-wrap gap-8">
              {['dark roast', 'creamy texture', 'grainy filter', 'sepia age'].map(preset => (
                <button
                  key={preset}
                  onClick={() => setPrompt(preset)}
                  className="text-[11px] tracking-[0.4em] text-[#8B7E74] hover:text-[#F2EAD3] border border-[#544238] hover:border-[#D4A373] px-8 py-4 transition-all duration-700 lowercase-ui bg-transparent"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-[12px] text-[#D4A373] tracking-[0.4em] font-medium italic lowercase">{error}</p>}

          <div className="flex items-center gap-20 pt-12">
            <button
              onClick={handleEdit}
              disabled={isProcessing || !prompt.trim()}
              className="text-[12px] tracking-[0.7em] bg-[#D4A373] text-[#3C2A21] px-20 py-8 hover:bg-[#F2EAD3] transition-all duration-1000 disabled:opacity-10 lowercase-ui font-bold shadow-2xl"
            >
              {isProcessing ? 'extracting' : 'execute'}
            </button>
            <div className="flex gap-20">
              <button 
                onClick={() => onSave(currentPreview)} 
                className="text-[12px] tracking-[0.5em] text-[#F2EAD3] hover:text-[#D4A373] transition-colors border-b border-[#544238] hover:border-[#D4A373] pb-4 lowercase-ui font-medium"
              >
                seal
              </button>
              <button 
                onClick={onClose} 
                className="text-[12px] tracking-[0.5em] text-[#8B7E74] hover:text-[#F2EAD3] transition-colors lowercase-ui"
              >
                pour away
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageEditorModal;
