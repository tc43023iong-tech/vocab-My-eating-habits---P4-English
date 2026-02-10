
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { POKEMON_IDS, getPokemonImg } from '../constants';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const MatchingGame: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [batchIndex, setBatchIndex] = useState(0);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedCn, setSelectedCn] = useState<string | null>(null);
  const [matches, setMatches] = useState<string[]>([]);
  const [currentWords, setCurrentWords] = useState<Word[]>([]);
  const [shuffledEn, setShuffledEn] = useState<Word[]>([]);
  const [shuffledCn, setShuffledCn] = useState<Word[]>([]);

  useEffect(() => {
    const batch = words.slice(batchIndex * 5, (batchIndex + 1) * 5);
    setCurrentWords(batch);
    setShuffledEn([...batch].sort(() => Math.random() - 0.5));
    setShuffledCn([...batch].sort(() => Math.random() - 0.5));
    setMatches([]);
    setSelectedEn(null);
    setSelectedCn(null);
  }, [batchIndex, words]);

  const handleSelect = (type: 'en' | 'cn', val: string) => {
    if (type === 'en') setSelectedEn(val);
    else setSelectedCn(val);
  };

  useEffect(() => {
    if (selectedEn && selectedCn) {
      const match = currentWords.find(w => w.en === selectedEn && w.cn === selectedCn);
      if (match) {
        setMatches(prev => [...prev, selectedEn]);
        setSelectedEn(null);
        setSelectedCn(null);
      } else {
        setTimeout(() => {
          setSelectedEn(null);
          setSelectedCn(null);
        }, 500);
      }
    }
  }, [selectedEn, selectedCn, currentWords]);

  useEffect(() => {
    if (matches.length === currentWords.length && currentWords.length > 0) {
      setTimeout(() => {
        if ((batchIndex + 1) * 5 < words.length) {
          setBatchIndex(b => b + 1);
        } else {
          onComplete();
        }
      }, 1000);
    }
  }, [matches, currentWords, batchIndex, words, onComplete]);

  return (
    <div className="flex flex-col items-center h-full gap-6">
      <div className="flex items-center gap-4 w-full">
        <img src={getPokemonImg(POKEMON_IDS.matching)} alt="Eevee" className="w-24 h-24" />
        <h2 className="text-4xl font-bold text-pink-500">Matching Adventure 🎴</h2>
      </div>

      <div className="flex w-full justify-between gap-12 mt-8">
        <div className="flex flex-col gap-4 flex-1">
          {shuffledEn.map((w, idx) => (
            <button
              key={idx}
              disabled={matches.includes(w.en)}
              onClick={() => handleSelect('en', w.en)}
              className={`p-4 rounded-xl crayon-border text-2xl font-bold transition-all ${
                matches.includes(w.en) ? 'bg-gray-200 text-gray-400 border-gray-100' :
                selectedEn === w.en ? 'bg-blue-400 text-white scale-105' : 'bg-blue-100 text-blue-800'
              }`}
            >
              {w.en}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 flex-1">
          {shuffledCn.map((w, idx) => (
            <button
              key={idx}
              disabled={matches.includes(w.en)}
              onClick={() => handleSelect('cn', w.cn)}
              className={`p-4 rounded-xl crayon-border text-2xl font-bold transition-all ${
                matches.includes(w.en) ? 'bg-gray-200 text-gray-400 border-gray-100' :
                selectedCn === w.cn ? 'bg-pink-400 text-white scale-105' : 'bg-pink-100 text-pink-800'
              }`}
            >
              {w.cn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingGame;
