
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { POKEMON_IDS, getPokemonImg } from '../constants';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const BubblePop: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<Word[]>([]);
  const [capturedPokemon, setCapturedPokemon] = useState<number[]>([]);

  useEffect(() => {
    generateBubbles();
  }, [currentIndex]);

  const generateBubbles = () => {
    const correct = words[currentIndex];
    const others = words.filter(w => w.en !== correct.en).sort(() => Math.random() - 0.5).slice(0, 5);
    setOptions([...others, correct].sort(() => Math.random() - 0.5));
  };

  const handlePop = (word: Word) => {
    if (word.en === words[currentIndex].en) {
      // Pick a random pokemon to show on shell
      const nextPokeId = [1,4,7,25,133,151,39,175,152,155,158][Math.floor(Math.random() * 11)];
      setCapturedPokemon(prev => [...prev, nextPokeId]);
      setTimeout(() => {
        if (currentIndex < words.length - 1) setCurrentIndex(c => c + 1);
        else onComplete();
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center h-full w-full relative overflow-hidden bg-gradient-to-b from-[#e0f7ff] to-[#fff] rounded-[40px] p-6">
      {/* Sea Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <span className="absolute top-10 left-10 text-7xl animate-bounce">🐳</span>
        <span className="absolute bottom-20 right-10 text-6xl animate-pulse">🐬</span>
        <span className="absolute top-1/2 left-5 text-4xl">🐚</span>
      </div>

      <div className="flex items-center gap-6 w-full z-10 bg-white/60 p-4 rounded-full border-2 border-white mb-6">
        <img src={getPokemonImg(POKEMON_IDS.bubble)} alt="Squirtle" className="w-20 h-20 animate-wiggle" />
        <div>
            <h2 className="text-3xl font-bold text-[#6a8cff]">Bubble Pop 🫧</h2>
            <p className="text-xl text-[#ff8fb2] font-bold">Find: <span className="text-3xl underline">{words[currentIndex].cn}</span></p>
        </div>
        <div className="ml-auto text-2xl font-bold text-blue-300">
            {currentIndex + 1} / {words.length}
        </div>
      </div>

      {/* Fixed Grid 2x3 */}
      <div className="grid grid-cols-3 grid-rows-2 gap-10 my-10 z-10 w-full max-w-2xl justify-items-center flex-1 items-center">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handlePop(opt)}
            className="w-36 h-36 rounded-full border-8 border-white bg-blue-100/40 shadow-xl flex items-center justify-center text-2xl font-bold text-blue-700 hover:scale-110 active:scale-95 transition-all transform relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {opt.en}
            <div className="absolute top-2 left-2 text-xs opacity-40">✨</div>
          </button>
        ))}
      </div>

      {/* Shell Reward Area */}
      <div className="mt-auto w-full bg-[#ffdae9]/50 p-6 rounded-[35px] border-4 border-white flex flex-col items-center gap-4 z-10 shadow-inner">
        <div className="text-[#ff8fb2] font-bold text-2xl flex items-center gap-2">
            🐚 My Pokémon Collection 🐚
        </div>
        <div className="flex flex-wrap justify-center gap-4 min-h-[60px]">
            {capturedPokemon.length === 0 && <span className="text-gray-400 italic">Answer correctly to collect!</span>}
            {capturedPokemon.map((id, idx) => (
              <div key={idx} className="bg-white p-2 rounded-2xl shadow-sm border-2 border-pink-100 animate-bounce">
                <img src={getPokemonImg(id)} alt="pokemon" className="w-14 h-14" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BubblePop;
