
import React, { useState, useEffect, useCallback } from 'react';
import { Word } from '../types';
import { getPokemonImg } from '../constants';
import { playSound } from '../utils/audio';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const TugOfWar: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [options, setOptions] = useState<Word[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [freeze, setFreeze] = useState(false);

  // Use a subset of 5 questions per game
  useEffect(() => {
    const subset = [...words].sort(() => Math.random() - 0.5).slice(0, 5);
    setCurrentWords(subset);
  }, [words]);

  useEffect(() => {
    if (currentWords.length > 0 && questionIndex < 5) {
      const correct = currentWords[questionIndex];
      const others = words
        .filter(w => w.en !== correct.en)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setOptions([...others, correct].sort(() => Math.random() - 0.5));
      setFreeze(false);
    }
  }, [questionIndex, currentWords, words]);

  const handleAnswer = useCallback((player: 'p1' | 'p2', selected: Word) => {
    if (freeze || winner) return;

    const correctWord = currentWords[questionIndex];
    if (selected.en === correctWord.en) {
      playSound('correct');
      setFreeze(true);
      setScores(prev => ({ ...prev, [player]: prev[player] + 1 }));
      
      setTimeout(() => {
        if (questionIndex < 4) {
          setQuestionIndex(prev => prev + 1);
        } else {
          // Determine final winner
          const p1Final = player === 'p1' ? scores.p1 + 1 : scores.p1;
          const p2Final = player === 'p2' ? scores.p2 + 1 : scores.p2;
          if (p1Final > p2Final) setWinner('Player 1 Wins! 🏆');
          else if (p2Final > p1Final) setWinner('Player 2 Wins! 🏆');
          else setWinner("It's a Tie! 🤝");
          
          setTimeout(onComplete, 3000);
        }
      }, 1000);
    } else {
      playSound('wrong');
    }
  }, [currentWords, questionIndex, freeze, winner, scores, onComplete]);

  if (currentWords.length === 0) return null;

  const ropePosition = 50 + (scores.p1 - scores.p2) * 10; // Simple tug calculation

  return (
    <div className="flex flex-col h-full w-full select-none overflow-hidden">
      {/* Central Visual: Tug of War Rope */}
      <div className="relative h-40 w-full mb-8 flex items-center justify-center">
        <div className="absolute w-full h-4 bg-[#8b4513] border-y-2 border-black/10"></div>
        <div 
          className="absolute h-10 w-4 bg-red-500 border-2 border-white shadow-md transition-all duration-500 z-10" 
          style={{ left: `${ropePosition}%` }}
        ></div>
        
        {/* P1 Puller */}
        <div className="absolute left-10 flex flex-col items-center transition-all duration-500" style={{ transform: `translateX(${(scores.p1 - scores.p2) * 10}px)` }}>
          <img src={getPokemonImg(25)} alt="P1" className="w-24 h-24 animate-wiggle" />
          <span className="bg-white px-4 rounded-full font-bold border-2 border-blue-400 text-blue-500">P1: {scores.p1}</span>
        </div>

        {/* P2 Puller */}
        <div className="absolute right-10 flex flex-col items-center transition-all duration-500" style={{ transform: `translateX(${(scores.p1 - scores.p2) * 10}px)` }}>
          <img src={getPokemonImg(133)} alt="P2" className="w-24 h-24 animate-wiggle" />
          <span className="bg-white px-4 rounded-full font-bold border-2 border-red-400 text-red-500">P2: {scores.p2}</span>
        </div>
      </div>

      {winner ? (
        <div className="flex flex-col items-center justify-center flex-1 animate-bounce">
          <h2 className="text-8xl font-bold text-orange-500 drop-shadow-lg">{winner}</h2>
        </div>
      ) : (
        <div className="flex flex-1 gap-4">
          {/* Player 1 Area */}
          <div className="flex-1 bg-blue-50/50 rounded-3xl p-6 border-4 border-dashed border-blue-200 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-blue-500 mb-4">Player 1 🧗</h3>
            <div className="bg-white p-4 rounded-2xl border-4 border-blue-100 shadow-sm w-full text-center mb-6">
               <p className="text-4xl font-bold text-gray-700">{currentWords[questionIndex].cn}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {options.map((opt, i) => (
                <button
                  key={i}
                  disabled={freeze}
                  onClick={() => handleAnswer('p1', opt)}
                  className="bg-white p-4 rounded-xl border-4 border-blue-100 text-2xl font-bold text-blue-600 hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  {opt.en}
                </button>
              ))}
            </div>
          </div>

          <div className="w-1 bg-gray-200 h-full"></div>

          {/* Player 2 Area */}
          <div className="flex-1 bg-red-50/50 rounded-3xl p-6 border-4 border-dashed border-red-200 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-red-500 mb-4">Player 2 🧗</h3>
            <div className="bg-white p-4 rounded-2xl border-4 border-red-100 shadow-sm w-full text-center mb-6">
               <p className="text-4xl font-bold text-gray-700">{currentWords[questionIndex].cn}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              {options.map((opt, i) => (
                <button
                  key={i}
                  disabled={freeze}
                  onClick={() => handleAnswer('p2', opt)}
                  className="bg-white p-4 rounded-xl border-4 border-red-100 text-2xl font-bold text-red-600 hover:scale-105 active:scale-95 transition-all shadow-sm"
                >
                  {opt.en}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-gray-400 font-bold italic">Round {questionIndex + 1} of 5 - Quickest to answer wins the point! ⚡</p>
      </div>
    </div>
  );
};

export default TugOfWar;
