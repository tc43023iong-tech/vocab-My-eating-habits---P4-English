
import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { POKEMON_IDS, getPokemonImg } from '../constants';

interface Props {
  words: Word[];
  onComplete: () => void;
  onNextGame: () => void;
}

const PokemonBattle: React.FC<Props> = ({ words, onComplete, onNextGame }) => {
  const [enemyHp, setEnemyHp] = useState(100);
  const [playerHp, setPlayerHp] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<Word[]>([]);
  const [message, setMessage] = useState('A wild Snorlax appears!');

  useEffect(() => {
    generateTurn();
  }, [currentIndex]);

  const generateTurn = () => {
    const correct = words[currentIndex % words.length];
    const others = words.filter(w => w.en !== correct.en).sort(() => Math.random() - 0.5).slice(0, 3);
    setOptions([...others, correct].sort(() => Math.random() - 0.5));
  };

  const handleAttack = (word: Word) => {
    const correct = words[currentIndex % words.length];
    if (word.en === correct.en) {
      setEnemyHp(prev => Math.max(0, prev - 20));
      setMessage(`It's super effective! You used ${word.en}!`);
      setTimeout(() => {
        if (enemyHp <= 20) {
            onComplete();
        } else {
            setCurrentIndex(c => c + 1);
            setMessage('Your turn to attack again!');
        }
      }, 1000);
    } else {
      setPlayerHp(prev => Math.max(0, prev - 10));
      setMessage('Oh no! Snorlax countered your attack!');
      if (playerHp <= 10) {
          setPlayerHp(100);
          setMessage('You fainted! Refreshing HP...');
      }
    }
  };

  return (
    <div className="flex flex-col items-center h-full gap-4 bg-gray-50 rounded-3xl p-6">
      <div className="flex justify-between w-full">
        <h2 className="text-3xl font-bold text-red-500">Battle Arena ⚔️</h2>
        <div className="flex items-center gap-2">
            <span className="font-bold text-xl">Score: {currentIndex}</span>
        </div>
      </div>

      <div className="flex w-full h-64 relative items-end justify-between px-12 mt-4">
        {/* Player side */}
        <div className="flex flex-col items-center">
            <div className="w-48 bg-white p-2 rounded-lg crayon-border mb-2">
                <p className="font-bold text-sm">Pikachu</p>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all" style={{width: `${playerHp}%`}} />
                </div>
            </div>
            <img src={getPokemonImg(POKEMON_IDS.detective)} alt="me" className="w-40 h-40" />
        </div>

        {/* Enemy side */}
        <div className="flex flex-col items-center">
            <div className="w-48 bg-white p-2 rounded-lg crayon-border mb-2">
                <p className="font-bold text-sm">Snorlax</p>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all" style={{width: `${enemyHp}%`}} />
                </div>
            </div>
            <img src={getPokemonImg(143)} alt="enemy" className="w-44 h-44" />
        </div>
      </div>

      <div className="bg-white w-full p-4 rounded-xl border-4 border-gray-400 min-h-[60px] flex items-center justify-center text-xl font-bold italic">
        {message}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAttack(opt)}
            className="bg-gray-100 hover:bg-red-50 py-4 rounded-xl crayon-border text-xl font-bold text-gray-800 transition-all"
          >
            {opt.en}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PokemonBattle;
