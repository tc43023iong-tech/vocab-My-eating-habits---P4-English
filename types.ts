
export interface Word {
  en: string;
  cn: string;
  emoji: string;
  pronunciation: string;
  category: 'meat' | 'fruit' | 'staple' | 'vegetable' | 'quantity' | 'nutrients';
  sentence: string;
  riddle?: string;
  details?: {
    syllables: string;
    breakdown: string;
    etymology: string;
    funFact: string;
    realityScanner: string;
  };
}

export enum GameType {
  DASHBOARD = 'DASHBOARD',
  WORD_LIST = 'WORD_LIST',
  EMOJI_DETECTIVE = 'EMOJI_DETECTIVE',
  MATCHING = 'MATCHING',
  SPELLING_BEE = 'SPELLING_BEE',
  FILL_BLANKS = 'FILL_BLANKS',
  BUBBLE_POP = 'BUBBLE_POP',
  WORD_SEARCH = 'WORD_SEARCH',
  RIDDLE_GAME = 'RIDDLE_GAME',
  MEMORY_GAME = 'MEMORY_GAME',
  TREEHOUSE = 'TREEHOUSE'
}

export interface Furniture {
  id: string;
  name: string;
  emoji: string;
}
