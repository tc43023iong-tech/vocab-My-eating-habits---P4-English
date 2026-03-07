
import React, { useState, useEffect, useCallback } from 'react';
import { Word } from '../types';
import { getPokemonImg } from '../constants';
import { playSound } from '../utils/audio';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const SpellingTugOfWar: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [p1Input, setP1Input] = useState<string[]>([]);
  const [p2Input, setP2Input] = useState<string[]>([]);
  const [p1Used, setP1Used] = useState<number[]>([]);
  const [p2Used, setP2Used] = useState<number[]>([]);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [freeze, setFreeze] = useState(false);

  // Use a subset of 3 questions per game
  useEffect(() => {
    const subset = [...words].sort(() => Math.random() - 0.5).slice(0, 3);
    setCurrentWords(subset);
  }, [words]);

  useEffect(() => {
    if (currentWords.length > 0 && questionIndex < 3) {
      const correct = currentWords[questionIndex].en.toLowerCase();
      const letters = correct.split('').sort(() => Math.random() - 0.5);
      setScrambled(letters);
      setP1Input([]);
      setP2Input([]);
      setP1Used([]);
      setP2Used([]);
      setFreeze(false);
    }
  }, [questionIndex, currentWords]);

  const handleLetterClick = useCallback((player: 'p1' | 'p2', letter: string, index: number) => {
    if (freeze || winner) return;

    const used = player === 'p1' ? p1Used : p2Used;
    if (used.includes(index)) return;

    const correctWord = currentWords[questionIndex].en.toLowerCase();
    const currentInput = player === 'p1' ? p1Input : p2Input;
    const setInput = player === 'p1' ? setP1Input : setP2Input;
    const setUsed = player === 'p1' ? setP1Used : setP2Used;

    const nextCharIndex = currentInput.length;
    if (letter === correctWord[nextCharIndex]) {
      const newInput = [...currentInput, letter];
      setInput(newInput);
      setUsed(prev => [...prev, index]);
      playSound('correct');

      if (newInput.join('') === correctWord) {
        setFreeze(true);
        setScores(prev => ({ ...prev, [player]: prev[player] + 1 }));
        
        setTimeout(() => {
          if (questionIndex < 2) {
            setQuestionIndex(prev => prev + 1);
          } else {
            const p1Final = player === 'p1' ? scores.p1 + 1 : scores.p1;
            const p2Final = player === 'p2' ? scores.p2 + 1 : scores.p2;
            if (p1Final > p2Final) setWinner('Player 1 Wins! 🏆');
            else if (p2Final > p1Final) setWinner('Player 2 Wins! 🏆');
            else setWinner("It's a Tie! 🤝");
            
            setTimeout(onComplete, 3000);
          }
        }, 1000);
      }
    } else {
      playSound('wrong');
      // Optional: visual feedback for wrong letter
    }
  }, [currentWords, questionIndex, freeze, winner, scores, p1Input, p2Input, onComplete]);

  if (currentWords.length === 0) return null;

  const ropePosition = 50 + (scores.p1 - scores.p2) * 15;

  return (
    <div className="flex flex-col h-full w-full select-none overflow-hidden">
      {/* Central Visual: Tug of War Rope */}
      <div className="relative h-40 w-full mb-8 flex items-center justify-center">
        <div className="absolute w-full h-4 bg-[#8b4513] border-y-2 border-black/10"></div>
        <div 
          className="absolute h-10 w-4 bg-yellow-500 border-2 border-white shadow-md transition-all duration-500 z-10" 
          style={{ left: `${ropePosition}%` }}
        ></div>
        
        {/* P1 Puller */}
        <div className="absolute left-10 flex flex-col items-center transition-all duration-500" style={{ transform: `translateX(${(scores.p1 - scores.p2) * 15}px)` }}>
          <img src={getPokemonImg(68)} alt="P1" className="w-24 h-24 animate-wiggle" />
          <span className="bg-white px-4 rounded-full font-bold border-2 border-indigo-400 text-indigo-500">P1: {scores.p1}</span>
        </div>

        {/* P2 Puller */}
        <div className="absolute right-10 flex flex-col items-center transition-all duration-500" style={{ transform: `translateX(${(scores.p1 - scores.p2) * 15}px)` }}>
          <img src={getPokemonImg(66)} alt="P2" className="w-24 h-24 animate-wiggle" />
          <span className="bg-white px-4 rounded-full font-bold border-2 border-purple-400 text-purple-500">P2: {scores.p2}</span>
        </div>
      </div>

      {winner ? (
        <div className="flex flex-col items-center justify-center flex-1 animate-bounce">
          <h2 className="text-8xl font-bold text-indigo-600 drop-shadow-lg">{winner}</h2>
        </div>
      ) : (
        <div className="flex flex-1 gap-4">
          {/* Player 1 Area */}
          <div className="flex-1 bg-indigo-50/50 rounded-3xl p-6 border-4 border-dashed border-indigo-200 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-indigo-500 mb-4">Player 1 ✍️</h3>
            <div className="bg-white p-4 rounded-2xl border-4 border-indigo-100 shadow-sm w-full text-center mb-6">
               <p className="text-4xl font-bold text-gray-700">{currentWords[questionIndex].cn}</p>
               <div className="flex justify-center gap-2 mt-4 h-12">
                  {currentWords[questionIndex].en.split('').map((_, i) => (
                    <div key={i} className="w-8 h-10 border-b-4 border-indigo-300 flex items-center justify-center text-2xl font-bold text-indigo-600">
                      {p1Input[i] || ''}
                    </div>
                  ))}
               </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 w-full">
              {scrambled.map((letter, i) => (
                <button
                  key={i}
                  disabled={freeze || p1Used.includes(i)}
                  onClick={() => handleLetterClick('p1', letter, i)}
                  className={`w-12 h-12 rounded-xl border-2 border-indigo-100 text-2xl font-bold text-indigo-600 transition-all shadow-sm ${
                    p1Used.includes(i) ? 'opacity-0 pointer-events-none' : 'bg-white hover:scale-110 active:scale-90'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <div className="w-1 bg-gray-200 h-full"></div>

          {/* Player 2 Area */}
          <div className="flex-1 bg-purple-50/50 rounded-3xl p-6 border-4 border-dashed border-purple-200 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-purple-500 mb-4">Player 2 ✍️</h3>
            <div className="bg-white p-4 rounded-2xl border-4 border-purple-100 shadow-sm w-full text-center mb-6">
               <p className="text-4xl font-bold text-gray-700">{currentWords[questionIndex].cn}</p>
               <div className="flex justify-center gap-2 mt-4 h-12">
                  {currentWords[questionIndex].en.split('').map((_, i) => (
                    <div key={i} className="w-8 h-10 border-b-4 border-purple-300 flex items-center justify-center text-2xl font-bold text-purple-600">
                      {p2Input[i] || ''}
                    </div>
                  ))}
               </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 w-full">
              {scrambled.map((letter, i) => (
                <button
                  key={i}
                  disabled={freeze || p2Used.includes(i)}
                  onClick={() => handleLetterClick('p2', letter, i)}
                  className={`w-12 h-12 rounded-xl border-2 border-purple-100 text-2xl font-bold text-purple-600 transition-all shadow-sm ${
                    p2Used.includes(i) ? 'opacity-0 pointer-events-none' : 'bg-white hover:scale-110 active:scale-90'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-gray-400 font-bold italic">Round {questionIndex + 1} of 3 - Spell the word correctly to win the point! ⚡</p>
      </div>
    </div>
  );
};

export default SpellingTugOfWar;
