
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { POKEMON_IDS, getPokemonImg } from '../constants';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const MemoryGame: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [phase, setPhase] = useState<'memorize' | 'question'>('memorize');
  const [timer, setTimer] = useState(10);
  const [displayWords, setDisplayWords] = useState<Word[]>([]);
  const [missingWord, setMissingWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<Word[]>([]);

  useEffect(() => {
    startNewRound();
  }, []);

  const startNewRound = () => {
    const selected = [...words].sort(() => Math.random() - 0.5).slice(0, 8);
    setDisplayWords(selected);
    setPhase('memorize');
    setTimer(10);
  };

  useEffect(() => {
    if (phase === 'memorize' && timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else if (phase === 'memorize' && timer === 0) {
      const missing = displayWords[Math.floor(Math.random() * displayWords.length)];
      setMissingWord(missing);
      
      const others = words.filter(w => !displayWords.find(dw => dw.en === w.en)).sort(() => Math.random() - 0.5).slice(0, 7);
      setOptions([...others, missing].sort(() => Math.random() - 0.5));
      setPhase('question');
    }
  }, [timer, phase, displayWords, words]);

  const handleChoice = (word: Word) => {
    if (missingWord && word.en === missingWord.en) {
      onComplete();
    } else {
        alert("Try again! Let's memorize again.");
        startNewRound();
    }
  };

  return (
    <div className="flex flex-col items-center h-full gap-6">
      <div className="flex items-center gap-4 w-full">
        <img src={getPokemonImg(POKEMON_IDS.memory)} alt="Mew" className="w-20 h-20" />
        <h2 className="text-4xl font-bold text-purple-600">Mind Memory 🧠</h2>
        <div className="ml-auto text-2xl font-bold text-red-500">
            {phase === 'memorize' ? `Time: ${timer}s` : 'Which word is gone?'}
        </div>
      </div>

      {phase === 'memorize' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {displayWords.map((w, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl crayon-border flex flex-col items-center shadow-md animate-wiggle">
                    <span className="text-4xl">{w.emoji}</span>
                    <p className="text-xl font-bold mt-2">{w.en}</p>
                    <p className="text-sm text-gray-400 font-bold">{w.cn}</p>
                </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center w-full gap-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full opacity-50 grayscale">
                {displayWords.filter(dw => dw.en !== missingWord?.en).map((w, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl crayon-border flex flex-col items-center">
                        <span className="text-4xl">{w.emoji}</span>
                        <p className="text-xl font-bold mt-2 text-gray-400">{w.en}</p>
                    </div>
                ))}
                <div className="bg-gray-200 p-4 rounded-xl crayon-border border-dashed flex items-center justify-center text-5xl">
                    ❓
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleChoice(opt)}
                        className="bg-purple-100 hover:bg-purple-200 p-4 rounded-xl crayon-border flex flex-col items-center transition-all"
                    >
                        <span className="text-3xl">{opt.emoji}</span>
                        <p className="text-lg font-bold">{opt.en}</p>
                        <p className="text-sm font-bold text-gray-500">{opt.cn}</p>
                    </button>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
