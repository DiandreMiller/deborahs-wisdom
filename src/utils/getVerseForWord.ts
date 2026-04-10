import { WORD_THEMES } from '../data/wordThemes';
import { THEME_VERSES, type Verse } from '../data/themeVerses';

const FALLBACK_VERSES: Verse[] = [
  { text: 'The Lord is my shepherd; I shall not want.', reference: 'Psalm 23:1' },
  { text: 'Be still, and know that I am God.', reference: 'Psalm 46:10' },
];

export const getVerseForWord = (word: string): Verse => {
  const normalized = word.toLowerCase().trim();
  const theme = WORD_THEMES[normalized];
  const versePool = theme ? THEME_VERSES[theme] : FALLBACK_VERSES;
  return versePool[Math.floor(Math.random() * versePool.length)];
};