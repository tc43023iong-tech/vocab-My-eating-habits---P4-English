
import React from 'react';
import { Furniture } from '../types';

interface Props {
  items: Furniture[];
  onPlay: () => void;
}

const Treehouse: React.FC<Props> = ({ items, onPlay }) => {
  return (
    <div className="flex flex-col h-full bg-[url('https://www.transparenttextures.com/patterns/p6.png')]">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-emerald-700">My Secret Treehouse 🌳🏠</h2>
        <p className="text-xl text-gray-500 mt-2">You have collected {items.length} items!</p>
      </div>

      <div className="flex-1 bg-amber-50 rounded-3xl border-8 border-amber-200 p-8 shadow-inner relative overflow-hidden">
        {/* Base Room Graphics */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-amber-100/50"></div>
        
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
             <span className="text-8xl mb-4">🪹</span>
             <p className="text-2xl font-bold">Your treehouse is empty...</p>
             <p className="text-xl">Play games to win furniture!</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center animate-wiggle">
                <span className="text-7xl drop-shadow-lg">{item.emoji}</span>
                <span className="mt-2 text-sm bg-white/80 px-2 rounded-full font-bold text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={onPlay}
          className="bg-emerald-500 text-white text-3xl font-bold py-4 px-12 rounded-full shadow-lg hover:scale-110 transition-transform crayon-border"
        >
          Keep Learning! ⚡
        </button>
      </div>
    </div>
  );
};

export default Treehouse;
