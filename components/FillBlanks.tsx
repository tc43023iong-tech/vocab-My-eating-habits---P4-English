
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { POKEMON_IDS, getPokemonImg } from '../constants';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const FillBlanks: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<Word[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    generateQuestion();
  }, [currentIndex]);

  const generateQuestion = () => {
    const correct = words[currentIndex];
    const distractors = words
      .filter(w => w.en !== correct.en && w.category === correct.category)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    // If not enough same category distractors, pick random
    if (distractors.length < 3) {
      const more = words
        .filter(w => w.en !== correct.en && !distractors.find(d => d.en === w.en))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3 - distractors.length);
      setOptions([...distractors, ...more, correct].sort(() => Math.random() - 0.5));
    } else {
      setOptions([...distractors, correct].sort(() => Math.random() - 0.5));
    }
    setFeedback(null);
  };

  const handleChoice = (word: Word) => {
    if (word.en === words[currentIndex].en) {
      setFeedback('Correct! Well done! 🌟');
      setTimeout(() => {
        if (currentIndex < words.length - 1) setCurrentIndex(c => c + 1);
        else onComplete();
      }, 1000);
    } else {
      setFeedback('Not quite. Try another one! 🧐');
    }
  };

  const sentenceParts = words[currentIndex].sentence.split('____');

  return (
    <div className="flex flex-col items-center h-full gap-8">
      <div className="flex items-center gap-4 w-full">
        <img src={getPokemonImg(POKEMON_IDS.fill)} alt="Psyduck" className="w-24 h-24" />
        <h2 className="text-4xl font-bold text-blue-400">Word Detective 🧐</h2>
      </div>

      <div className="bg-white p-8 rounded-3xl crayon-border w-full shadow-inner text-center">
        <p className="text-3xl leading-relaxed text-gray-700">
          {sentenceParts[0]}
          <span className="inline-block w-32 border-b-4 border-dashed border-blue-400 mx-2 font-bold text-blue-600">
             {feedback?.includes('Correct') ? words[currentIndex].en : ''}
          </span>
          {sentenceParts[1]}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleChoice(opt)}
            className="bg-white py-6 rounded-2xl crayon-border text-2xl font-bold text-emerald-700 shadow-md hover:bg-blue-50 transition-all"
          >
            {opt.en}
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`text-4xl font-bold ${feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'}`}>
          {feedback}
        </div>
      )}
    </div>
  );
};

export default FillBlanks;
