
import React, { useState } from 'react';
import { Word } from '../types';

interface Props {
  words: Word[];
  onStart: () => void;
}

const WordListReview: React.FC<Props> = ({ words, onStart }) => {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);

  return (
    <div className="flex flex-col h-full relative">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold text-[#ff8fb2] mb-3">My Eating Habits 🥘</h2>
        <p className="text-2xl text-gray-400 italic font-bold">Click any card to explore the secret knowledge! ✨</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto max-h-[500px] p-6 custom-scrollbar bg-white/40 rounded-[40px] border-2 border-dashed border-[#ffdae9]">
        {words.map((w, idx) => (
          <button 
            key={idx} 
            onClick={() => setSelectedWord(w)}
            className="bg-[#fff9db] p-6 rounded-[35px] border-4 border-white shadow-sm flex items-center gap-6 hover:scale-105 transition-all group relative overflow-hidden text-left"
          >
            <div className="absolute top-[-15px] right-[-15px] opacity-10 text-6xl group-hover:rotate-12 transition-transform">✨</div>
            <span className="text-6xl group-hover:scale-110 transition-transform drop-shadow-sm">{w.emoji}</span>
            <div>
              <p className="text-2xl font-bold text-[#6a8cff] leading-none mb-2">{w.en}</p>
              <p className="text-xl text-[#ff8fb2] font-bold">{w.cn}</p>
              <p className="text-sm text-gray-400 font-medium tracking-wide">{w.pronunciation}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button 
          onClick={onStart}
          className="kawaii-btn text-[#4a5568] text-4xl font-bold py-6 px-20 shadow-lg transform active:scale-95"
        >
          Let's Go Back! 🚀
        </button>
      </div>

      {/* Detail Modal Overlay */}
      {selectedWord && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
          <div 
            className="bg-white max-w-3xl w-full hand-drawn-card p-10 flex flex-col gap-8 relative animate-in zoom-in duration-300"
            style={{ backgroundColor: '#fffdf5' }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedWord(null)}
              className="absolute -top-6 -right-6 bg-white w-14 h-14 rounded-full border-4 border-[#ff8fb2] flex items-center justify-center text-3xl shadow-lg hover:scale-110 transition-all z-[101]"
            >
              ❌
            </button>

            {/* Header Area */}
            <div className="flex items-center gap-8 border-b-4 border-dashed border-[#ffdae9] pb-6">
              <div className="w-28 h-28 bg-white rounded-3xl border-4 border-[#6a8cff] flex items-center justify-center shadow-sm">
                <span className="text-8xl">{selectedWord.emoji}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-6xl font-bold text-[#6a8cff] mb-2">{selectedWord.en}</h3>
                <p className="text-4xl font-bold text-[#ff8fb2]">{selectedWord.cn} <span className="text-2xl text-gray-300 font-medium">{selectedWord.pronunciation}</span></p>
              </div>
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto max-h-[450px] pr-4 custom-scrollbar">
              
              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-700 flex items-center gap-3">🗣️ SYLLABLES</p>
                <div className="bg-[#eff6ff] p-4 rounded-3xl border-2 border-white shadow-sm font-bold text-blue-600 text-2xl text-center">
                  {selectedWord.details?.syllables}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-bold text-gray-700 flex items-center gap-3">🧩 BREAKDOWN</p>
                <div className="bg-[#f0fdf4] p-4 rounded-3xl border-2 border-white shadow-sm font-bold text-emerald-600 text-2xl text-center italic">
                  {selectedWord.details?.breakdown}
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <p className="text-2xl font-bold text-gray-700 flex items-center gap-3">🏛️ ETYMOLOGY</p>
                <div className="bg-[#fff1f2] p-6 rounded-3xl border-2 border-white shadow-sm text-gray-600 text-xl leading-relaxed">
                  {selectedWord.details?.etymology}
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <p className="text-2xl font-bold text-gray-700 flex items-center gap-3">🍭 FUN FACT</p>
                <div className="bg-[#fefce8] p-6 rounded-3xl border-2 border-white shadow-sm text-gray-600 text-xl leading-relaxed italic border-l-[12px] border-l-yellow-400">
                  {selectedWord.details?.funFact}
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <p className="text-2xl font-bold text-emerald-700 flex items-center gap-3">✨ REALITY SCANNER 百科補充</p>
                <div className="bg-[#eff6ff] p-6 rounded-3xl border-2 border-white shadow-sm text-gray-600 text-xl leading-relaxed">
                  {selectedWord.details?.realityScanner}
                </div>
              </div>

            </div>

            <div className="mt-2 text-center border-t-2 border-gray-100 pt-4">
              <p className="text-gray-400 text-lg italic font-bold">Keep exploring to be a Word Master! 🎒🖍️</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordListReview;
