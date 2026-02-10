
import React, { useState } from 'react';
import { GameType, Word, Furniture } from './types';
import { WORD_LIST, FURNITURE_POOL, POKEMON_IDS, getPokemonImg } from './constants';
import WordListReview from './components/WordListReview';
import EmojiDetective from './components/EmojiDetective';
import MatchingGame from './components/MatchingGame';
import SpellingBee from './components/SpellingBee';
import FillBlanks from './components/FillBlanks';
import BubblePop from './components/BubblePop';
import WordSearch from './components/WordSearch';
import PokemonBattle from './components/PokemonBattle';
import MemoryGame from './components/MemoryGame';
import Treehouse from './components/Treehouse';

const App: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<GameType>(GameType.DASHBOARD);
  const [completedGames, setCompletedGames] = useState<GameType[]>([]);
  const [collectedFurniture, setCollectedFurniture] = useState<Furniture[]>([]);

  const handleGameComplete = (gameType: GameType) => {
    if (!completedGames.includes(gameType)) {
      setCompletedGames(prev => [...prev, gameType]);
      const uncollected = FURNITURE_POOL.filter(f => !collectedFurniture.find(cf => cf.id === f.id));
      const newItems = uncollected.slice(0, 2);
      setCollectedFurniture(prev => [...prev, ...newItems]);
    }
    setCurrentGame(GameType.TREEHOUSE);
  };

  const renderDashboard = () => {
    const dashboardItems = [
      { type: GameType.EMOJI_DETECTIVE, label: 'Emoji Detective', color: '#fff1f2', icon: '🔍', pokemonId: 25 },
      { type: GameType.MATCHING, label: 'Match Pairs', color: '#f0f9ff', icon: '🔗', pokemonId: 133 },
      { type: GameType.SPELLING_BEE, label: 'Spelling Bee', color: '#fefce8', icon: '🐝', pokemonId: 15 },
      { type: GameType.FILL_BLANKS, label: 'Fill Blanks', color: '#f0fdf4', icon: '✏️', pokemonId: 54 },
      { type: GameType.BUBBLE_POP, label: 'Bubble Pop', color: '#f0f9ff', icon: '🫧', pokemonId: 7 },
      { type: GameType.WORD_SEARCH, label: 'Word Search', color: '#fff1f2', icon: '🧩', pokemonId: 1 },
      { type: GameType.MEMORY_GAME, label: 'Memory Game', color: '#f0fdf4', icon: '🧠', pokemonId: 151 },
    ];

    return (
      <div className="flex flex-col items-center w-full">
        {/* Dashboard Header */}
        <div className="text-center mb-16 relative">
          {/* Floating heads like the reference */}
          <div className="absolute -top-12 -left-20 text-6xl opacity-70 animate-wiggle">🐱</div>
          <div className="absolute -top-10 -right-20 text-6xl opacity-70">🐨</div>
          <div className="absolute top-20 -left-16 text-4xl opacity-50">🦊</div>
          <div className="absolute top-24 -right-16 text-5xl opacity-60">🐰</div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-[#5c8aff] mb-2 tracking-tight">
            p4-ch-3-vocab-My eating habits 🖍️⚡
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 font-bold">Fun Learning Adventure 🖍️🎒</p>
        </div>

        {/* Dashboard Grid - 2 rows, centered */}
        <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
          {dashboardItems.map((item) => (
            <button
              key={item.type}
              onClick={() => setCurrentGame(item.type)}
              className="hand-drawn-card group flex flex-col items-center p-8 w-[240px] relative transition-all"
              style={{ backgroundColor: item.color }}
            >
              {/* Pokemon head floating above the circle */}
              <div className="mb-2">
                <img 
                  src={getPokemonImg(item.pokemonId)} 
                  alt="poke" 
                  className="w-16 h-16 group-hover:scale-125 transition-transform" 
                />
              </div>
              
              {/* Icon Circle */}
              <div className="icon-circle w-24 h-24 mb-6">
                <span className="text-5xl">{item.icon}</span>
              </div>
              
              {/* Label */}
              <span className="text-2xl font-bold text-[#4a5568] text-center leading-tight">
                {item.label}
              </span>
              
              {/* Completion Star */}
              {completedGames.includes(item.type) && (
                <div className="absolute bottom-2 right-4 text-2xl">⭐</div>
              )}
            </button>
          ))}
          
          {/* Battle Arena as a special bigger card or separate? Let's just add it to the flow */}
          <button
              onClick={() => setCurrentGame(GameType.POKEMON_BATTLE)}
              className="hand-drawn-card group flex flex-col items-center p-8 w-[240px] relative bg-[#fff7ed]"
            >
              <div className="mb-2">
                <img src={getPokemonImg(6)} alt="poke" className="w-16 h-16 group-hover:scale-125 transition-transform" />
              </div>
              <div className="icon-circle w-24 h-24 mb-6">
                <span className="text-5xl">⚔️</span>
              </div>
              <span className="text-2xl font-bold text-[#4a5568] text-center leading-tight">Battle Arena</span>
              {completedGames.includes(GameType.POKEMON_BATTLE) && (
                <div className="absolute bottom-2 right-4 text-2xl">⭐</div>
              )}
            </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center py-16 px-6 overflow-x-hidden">
      {/* Universal Nav Header */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-16 z-20">
        <button 
          onClick={() => setCurrentGame(GameType.DASHBOARD)}
          className="text-3xl font-bold text-[#5c8aff] hover:scale-110 transition-transform flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-[#5c8aff]"
        >
          🏠 Home
        </button>
        <div className="flex gap-6">
          <button 
            onClick={() => setCurrentGame(GameType.WORD_LIST)}
            className="bg-white px-10 py-3 rounded-full border-4 border-[#ffdae9] text-2xl font-bold text-[#ff8fb2] shadow-sm hover:rotate-1 transition-all"
          >
            📖 Word List
          </button>
          <button 
            onClick={() => setCurrentGame(GameType.TREEHOUSE)}
            className="bg-white px-10 py-3 rounded-full border-4 border-[#8ba6ff] text-2xl font-bold text-[#8ba6ff] shadow-sm hover:-rotate-1 transition-all"
          >
            🌳 Treehouse ({collectedFurniture.length})
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl z-10">
        {currentGame === GameType.DASHBOARD ? (
          renderDashboard()
        ) : (
          <div className="soft-card p-12 min-h-[700px] flex flex-col relative overflow-hidden">
            {/* Soft decorative background dots inside component */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none -z-10" 
                 style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
            
            {currentGame === GameType.WORD_LIST && <WordListReview words={WORD_LIST} onStart={() => setCurrentGame(GameType.DASHBOARD)} />}
            {currentGame === GameType.EMOJI_DETECTIVE && <EmojiDetective words={WORD_LIST} onComplete={() => handleGameComplete(GameType.EMOJI_DETECTIVE)} onNextGame={() => setCurrentGame(GameType.DASHBOARD)} />}
            {currentGame === GameType.MATCHING && <MatchingGame words={WORD_LIST} onComplete={() => handleGameComplete(GameType.MATCHING)} onNextGame={() => setCurrentGame(GameType.DASHBOARD)} />}
            {currentGame === GameType.SPELLING_BEE && <SpellingBee words={WORD_LIST} onComplete={() => handleGameComplete(GameType.SPELLING_BEE)} onNextGame={() => setCurrentGame(GameType.DASHBOARD)} />}
            {currentGame === GameType.FILL_BLANKS && <FillBlanks words={WORD_LIST} onComplete={() => handleGameComplete(GameType.FILL_BLANKS)} onNextGame={() => setCurrentGame(GameType.DASHBOARD)} />}
            {currentGame === GameType.BUBBLE_POP && <BubblePop words={WORD_LIST} onComplete={() => handleGameComplete(GameType.BUBBLE_POP)} onNextGame={() => setCurrentGame(GameType.DASHBOARD)} />}
            {currentGame === GameType.WORD_SEARCH && <WordSearch words={WORD_LIST} onComplete={() => handleGameComplete(GameType.WORD_SEARCH)} onNextGame={() => setCurrentGame(GameType.DASHBOARD)} />}
            {currentGame === GameType.POKEMON_BATTLE && <PokemonBattle words={WORD_LIST} onComplete={() => handleGameComplete(GameType.POKEMON_BATTLE)} onNextGame={() => setCurrentGame(GameType.DASHBOARD)} />}
            {currentGame === GameType.MEMORY_GAME && <MemoryGame words={WORD_LIST} onComplete={() => handleGameComplete(GameType.MEMORY_GAME)} onNextGame={() => setCurrentGame(GameType.DASHBOARD)} />}
            {currentGame === GameType.TREEHOUSE && <Treehouse items={collectedFurniture} onPlay={() => setCurrentGame(GameType.DASHBOARD)} />}
          </div>
        )}
      </div>
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-5 -z-10">
        <div className="absolute top-20 left-10 text-9xl">🍡</div>
        <div className="absolute bottom-20 right-10 text-9xl">🧁</div>
      </div>
    </div>
  );
};

export default App;
