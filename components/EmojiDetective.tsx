
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { POKEMON_IDS, getPokemonImg } from '../constants';
import { playSound } from '../utils/audio';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const EmojiDetective: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    generateQuestion();
  }, [currentIndex]);

  const generateQuestion = () => {
    const correctWord = words[currentIndex];
    const others = words.filter(w => w.en !== correctWord.en).sort(() => Math.random() - 0.5).slice(0, 3);
    setOptions([...others, correctWord].sort(() => Math.random() - 0.5));
    setFeedback(null);
  };

  const handleChoice = (word: Word) => {
    if (word.en === words[currentIndex].en) {
      playSound('correct');
      setFeedback('CORRECT! 🌟');
      setScore(s => s + 1);
      setTimeout(() => {
        if (currentIndex < words.length - 1) {
          setCurrentIndex(c => c + 1);
        } else {
          onComplete();
        }
      }, 800);
    } else {
      playSound('wrong');
      setFeedback('Oops! Try again! 🧐');
    }
  };

  return (
    <div className="flex flex-col items-center h-full gap-6">
      <div className="flex items-center gap-4 w-full">
        <img src={getPokemonImg(POKEMON_IDS.detective)} alt="Pikachu" className="w-24 h-24 animate-bounce" />
        <h2 className="text-4xl font-bold text-blue-600">Emoji Detective 🔍</h2>
        <div className="ml-auto text-xl font-bold text-orange-500">Progress: {currentIndex + 1} / {words.length}</div>
      </div>

      <div className="bg-yellow-50 p-12 rounded-3xl crayon-border flex flex-col items-center gap-4 w-full max-w-lg">
        <span className="text-8xl mb-4">{words[currentIndex].emoji}</span>
        <span className="text-3xl font-bold text-gray-700">{words[currentIndex].cn}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(opt)}
            className="bg-white p-6 rounded-2xl crayon-border text-2xl font-bold text-emerald-700 hover:bg-emerald-50 active:scale-95 transition-all"
          >
            {opt.en}
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`text-4xl font-bold mt-4 ${feedback.includes('CORRECT') ? 'text-green-500' : 'text-red-500'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default EmojiDetective;
