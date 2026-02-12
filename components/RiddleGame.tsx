
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { POKEMON_IDS, getPokemonImg } from '../constants';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const RiddleGame: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<Word[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);

  useEffect(() => {
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
  }, [words]);

  useEffect(() => {
    if (shuffledWords.length > 0) {
      generateQuestion();
    }
  }, [currentIndex, shuffledWords]);

  const generateQuestion = () => {
    const correct = shuffledWords[currentIndex];
    const others = words
      .filter(w => w.en !== correct.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setOptions([...others, correct].sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  const handleChoice = (word: Word) => {
    if (word.en === shuffledWords[currentIndex].en) {
      setFeedback('You got it! 🌟 BRAVO!');
      setTimeout(() => {
        if (currentIndex < shuffledWords.length - 1) {
          setCurrentIndex(c => c + 1);
        } else {
          onComplete();
        }
      }, 1200);
    } else {
      setFeedback('Not that one... Try again! 🧐');
    }
  };

  if (shuffledWords.length === 0) return null;

  return (
    <div className="flex flex-col items-center h-full w-full gap-8">
      {/* Header */}
      <div className="flex items-center justify-between w-full bg-white/60 p-6 rounded-full border-4 border-white shadow-sm">
        <div className="flex items-center gap-4">
          <img src={getPokemonImg(POKEMON_IDS.riddle)} alt="Charizard" className="w-20 h-20 animate-wiggle" />
          <div>
            <h2 className="text-4xl font-bold text-[#ff8fb2]">Riddle Master 💡</h2>
            <p className="text-xl text-gray-400 font-bold italic">Can you guess what I am?</p>
          </div>
        </div>
        <div className="text-2xl font-bold text-[#6a8cff] bg-white px-6 py-2 rounded-full border-2 border-[#6a8cff]">
          {currentIndex + 1} / {shuffledWords.length}
        </div>
      </div>

      {/* Riddle Display Card */}
      <div className="bg-[#fff9db] p-12 rounded-[50px] hand-drawn-card w-full max-w-2xl relative shadow-md flex flex-col items-center">
        <div className="absolute -top-6 -left-6 text-6xl transform -rotate-12 opacity-80">💭</div>
        <div className="absolute -bottom-6 -right-6 text-6xl transform rotate-12 opacity-80">✨</div>
        
        <p className="text-3xl md:text-4xl font-bold text-[#4a5568] text-center leading-relaxed font-hand">
          "{shuffledWords[currentIndex].riddle || 'I am a mystery...'}"
        </p>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(opt)}
            className="bg-white p-6 rounded-3xl hand-drawn-card flex items-center justify-center gap-4 group hover:bg-[#eff6ff] active:scale-95 transition-all"
          >
            <span className="text-5xl group-hover:scale-125 transition-transform">{opt.emoji}</span>
            <span className="text-2xl font-bold text-[#6a8cff]">{opt.en}</span>
          </button>
        ))}
      </div>

      {/* Feedback message */}
      <div className="min-h-[60px] flex items-center justify-center">
        {feedback && (
          <div className={`text-4xl font-bold animate-bounce ${feedback.includes('You') ? 'text-green-500' : 'text-red-400'}`}>
            {feedback}
          </div>
        )}
      </div>
      
      <p className="text-gray-400 italic font-bold">Read the clue carefully! 🧐🖍️</p>
    </div>
  );
};

export default RiddleGame;
