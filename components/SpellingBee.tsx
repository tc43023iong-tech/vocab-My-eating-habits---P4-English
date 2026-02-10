
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { POKEMON_IDS, getPokemonImg } from '../constants';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const SpellingBee: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState<string[]>([]);
  const [scrambled, setScrambled] = useState<{char: string, used: boolean}[]>([]);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  useEffect(() => {
    generateWord();
  }, [currentIndex]);

  const generateWord = () => {
    const target = words[currentIndex].en.toLowerCase();
    const chars = target.split('').map(c => ({ char: c, used: false }));
    setScrambled(chars.sort(() => Math.random() - 0.5));
    setCurrentInput([]);
    setUsedIndices([]);
  };

  const handleClickLetter = (char: string, index: number) => {
    if (usedIndices.includes(index)) return;
    setCurrentInput(prev => [...prev, char]);
    setUsedIndices(prev => [...prev, index]);
  };

  const handleUndo = (idx: number) => {
    // To allow undoing, if they click a letter in the display area, remove the LAST one of that character?
    // User request: "点错了单词再点一次字母就可以取消"
    // Let's implement click on input letter to undo.
    const charToUndo = currentInput[idx];
    // Find the index in scrambled that corresponds to the last used index of this char
    const newUsedIndices = [...usedIndices];
    const removedUsedIndex = newUsedIndices.splice(idx, 1)[0];
    
    setUsedIndices(newUsedIndices);
    setCurrentInput(prev => prev.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    const target = words[currentIndex].en.toLowerCase().replace(/ /g, '');
    const currentStr = currentInput.join('').replace(/ /g, '');
    if (currentStr === target) {
      setTimeout(() => {
        if (currentIndex < words.length - 1) setCurrentIndex(c => c + 1);
        else onComplete();
      }, 800);
    }
  }, [currentInput]);

  const targetWord = words[currentIndex].en.toLowerCase();

  return (
    <div className="flex flex-col items-center h-full gap-8">
      <div className="flex items-center gap-4 w-full">
        <img src={getPokemonImg(POKEMON_IDS.spelling)} alt="Beedrill" className="w-24 h-24" />
        <h2 className="text-4xl font-bold text-yellow-600">Spelling Bee 🐝</h2>
      </div>

      <div className="bg-yellow-50 p-6 rounded-3xl crayon-border text-center w-full max-w-lg">
        <p className="text-4xl font-bold text-orange-600">{words[currentIndex].cn}</p>
        <p className="text-xl text-gray-500 mt-2">{words[currentIndex].pronunciation}</p>
      </div>

      {/* Input Display */}
      <div className="flex flex-wrap justify-center gap-2 min-h-[60px]">
        {targetWord.split('').map((char, i) => {
            if (char === ' ') return <div key={i} className="w-8" />;
            const currentIdxInInput = currentInput.length > i ? i : -1;
            return (
                <div 
                    key={i} 
                    onClick={() => currentInput[i] && handleUndo(i)}
                    className="w-12 h-14 border-b-4 border-gray-400 flex items-center justify-center text-3xl font-bold text-emerald-600 cursor-pointer hover:bg-emerald-50"
                >
                    {currentInput[i] || ''}
                </div>
            );
        })}
      </div>

      {/* Letter Bank */}
      <div className="flex flex-wrap justify-center gap-3">
        {scrambled.map((item, idx) => (
          <button
            key={idx}
            disabled={usedIndices.includes(idx) || item.char === ' '}
            onClick={() => handleClickLetter(item.char, idx)}
            className={`w-14 h-14 rounded-xl crayon-border text-2xl font-bold transition-all ${
              usedIndices.includes(idx) || item.char === ' '
                ? 'bg-gray-200 text-gray-100 border-gray-200'
                : 'bg-white hover:bg-yellow-100 text-gray-700 active:scale-90'
            }`}
          >
            {item.char}
          </button>
        ))}
      </div>
      
      <p className="text-gray-400 text-sm">Tip: Click a letter in the boxes above to undo!</p>
    </div>
  );
};

export default SpellingBee;
