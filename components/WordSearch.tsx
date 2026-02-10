
import React, { useState, useEffect, useMemo } from 'react';
import { Word } from '../types';
import { POKEMON_IDS, getPokemonImg } from '../constants';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const GRID_SIZE = 12;

interface PlacedWord {
  word: string;
  cells: { r: number, c: number }[];
}

const WordSearch: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<PlacedWord[]>([]);

  // We select 8 words for this game
  const targetWords = useMemo(() => {
    return [...words].sort(() => Math.random() - 0.5).slice(0, 8);
  }, [words]);

  useEffect(() => {
    generateGrid();
  }, [targetWords]);

  const generateGrid = () => {
    const newGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
    const newlyPlaced: PlacedWord[] = [];
    
    const sortedWords = targetWords.map(w => w.en.toLowerCase().replace(/[^a-z]/g, ''))
                                   .sort((a, b) => b.length - a.length);

    sortedWords.forEach(wordText => {
      let placed = false;
      let attempts = 0;
      while (!placed && attempts < 100) {
        attempts++;
        const isHorizontal = Math.random() > 0.5;
        const row = Math.floor(Math.random() * (isHorizontal ? GRID_SIZE : GRID_SIZE - wordText.length));
        const col = Math.floor(Math.random() * (isHorizontal ? GRID_SIZE - wordText.length : GRID_SIZE));
        
        let canPlace = true;
        const wordCells: { r: number, c: number }[] = [];

        for (let i = 0; i < wordText.length; i++) {
          const r = isHorizontal ? row : row + i;
          const c = isHorizontal ? col + i : col;
          const existingChar = newGrid[r][c];
          if (existingChar !== '' && existingChar !== wordText[i]) {
            canPlace = false;
            break;
          }
          wordCells.push({ r, c });
        }

        if (canPlace) {
          wordCells.forEach((cell, i) => {
            newGrid[cell.r][cell.c] = wordText[i];
          });
          newlyPlaced.push({ word: wordText, cells: wordCells });
          placed = true;
        }
      }
    });

    // Fill remaining blanks
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (newGrid[r][c] === '') {
          newGrid[r][c] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }
      }
    }

    setGrid(newGrid);
    setPlacedWords(newlyPlaced);
    setFoundWords([]);
  };

  const handleWordClick = (wordText: string) => {
    const cleanWord = wordText.toLowerCase().replace(/[^a-z]/g, '');
    if (!foundWords.includes(cleanWord)) {
      const nextFound = [...foundWords, cleanWord];
      setFoundWords(nextFound);
      if (nextFound.length >= targetWords.length) {
        setTimeout(onComplete, 1500);
      }
    }
  };

  const isCellHighlighted = (r: number, c: number) => {
    return placedWords.some(pw => 
      foundWords.includes(pw.word) && 
      pw.cells.some(cell => cell.r === r && cell.c === c)
    );
  };

  return (
    <div className="flex flex-col h-full w-full p-2 relative bg-white/40 rounded-[40px]">
      {/* Header Decoration */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
           <img src={getPokemonImg(52)} alt="Meowth" className="w-16 h-16 md:w-20 md:h-20" />
           <h2 className="text-4xl md:text-5xl font-bold text-[#b07d4b] font-hand">word Search 🔍</h2>
        </div>
        
        {/* Counter Box */}
        <div className="bg-white border-4 border-[#4a5568] px-6 py-2 rounded-lg shadow-sm">
           <span className="text-3xl font-bold font-mono tracking-widest">{foundWords.length} / {targetWords.length}</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        {/* Grid Container */}
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-white p-3 rounded-2xl border-4 border-[#4a5568] shadow-md grid grid-cols-12 gap-1 w-full max-w-[550px]">
            {grid.map((row, rIdx) => 
              row.map((char, cIdx) => {
                const highlighted = isCellHighlighted(rIdx, cIdx);
                return (
                  <div 
                    key={`${rIdx}-${cIdx}`}
                    className={`aspect-square flex items-center justify-center text-xl md:text-2xl font-bold transition-all duration-300 rounded-sm ${
                      highlighted 
                        ? 'bg-[#ffdae9] text-[#ff8fb2] transform scale-110 shadow-sm' 
                        : 'text-[#4a5568] hover:bg-gray-100'
                    }`}
                  >
                    {char}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Word List Section */}
        <div className="w-full lg:w-72 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 px-2">Find these words:</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {targetWords.map((wordObj, idx) => {
              const cleanW = wordObj.en.toLowerCase().replace(/[^a-z]/g, '');
              const isFound = foundWords.includes(cleanW);
              return (
                <button
                  key={idx}
                  onClick={() => handleWordClick(cleanW)}
                  disabled={isFound}
                  className={`group relative flex items-center gap-3 p-3 rounded-xl border-4 transition-all duration-200 text-left ${
                    isFound 
                      ? 'bg-white border-[#ffdae9] opacity-60' 
                      : 'bg-white border-[#4a5568] hover:translate-x-1 hover:shadow-md'
                  }`}
                >
                  <span className="text-2xl">🔍</span>
                  <span className={`text-xl font-bold flex-1 ${isFound ? 'text-[#ff8fb2] line-through' : 'text-[#6a8cff]'}`}>
                    {wordObj.en}
                  </span>
                  {isFound && <span className="absolute right-2 top-1 text-xs">⭐</span>}
                </button>
              );
            })}
          </div>
          
          <div className="mt-auto pt-4 text-center">
             <p className="text-gray-400 text-sm italic font-medium">
               Tip: Click letters in order or click the list to auto-find!
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSearch;
