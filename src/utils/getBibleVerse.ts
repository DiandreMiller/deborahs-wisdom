import { WORD_THEMES } from '../data/wordThemes';
import { THEME_VERSES } from '../data/themeVerses';

export type Verse = {
  text: string;
  reference: string;
};

const FALLBACK_VERSES: Verse[] = [
  { text: 'I can do all things through Christ who strengthens me.', reference: 'Philippians 4:13' },
  { text: 'The Lord is my shepherd; I shall not want.', reference: 'Psalm 23:1' },
  { text: 'Trust in the Lord with all your heart.', reference: 'Proverbs 3:5' },
  { text: 'Be still, and know that I am God.', reference: 'Psalm 46:10' },
  { text: 'The joy of the Lord is your strength.', reference: 'Nehemiah 8:10' },
  { text: 'God is within her, she will not fall.', reference: 'Psalm 46:5' },
  { text: 'Walk by faith, not by sight.', reference: '2 Corinthians 5:7' },
  { text: 'Pray without ceasing.', reference: '1 Thessalonians 5:17' },
  { text: 'Give thanks in all circumstances.', reference: '1 Thessalonians 5:18' },
  { text: 'Love never fails.', reference: '1 Corinthians 13:8' },
  { text: 'With God all things are possible.', reference: 'Matthew 19:26' },
  { text: 'The Lord will fight for you.', reference: 'Exodus 14:14' },
  { text: 'Cast all your anxiety on Him.', reference: '1 Peter 5:7' },
  { text: 'Blessed are the peacemakers.', reference: 'Matthew 5:9' },
  { text: 'Ask and it will be given to you.', reference: 'Matthew 7:7' },
  { text: 'Seek and you will find.', reference: 'Matthew 7:7' },
  { text: 'Knock and the door will be opened.', reference: 'Matthew 7:7' },
  { text: 'The Lord is my light and my salvation.', reference: 'Psalm 27:1' },
  { text: 'Wait for the Lord; be strong.', reference: 'Psalm 27:14' },
  { text: 'The Lord is good to all.', reference: 'Psalm 145:9' },
  { text: 'Create in me a clean heart, O God.', reference: 'Psalm 51:10' },
  { text: 'Your word is a lamp to my feet.', reference: 'Psalm 119:105' },
  { text: 'The Lord is near to the brokenhearted.', reference: 'Psalm 34:18' },
  { text: 'Taste and see that the Lord is good.', reference: 'Psalm 34:8' },
  { text: 'He heals the brokenhearted.', reference: 'Psalm 147:3' },
  { text: 'Let everything that has breath praise the Lord.', reference: 'Psalm 150:6' },
  { text: 'The Lord is my strength and my shield.', reference: 'Psalm 28:7' },
  { text: 'In the beginning God created the heavens and the earth.', reference: 'Genesis 1:1' },
  { text: 'Let there be light.', reference: 'Genesis 1:3' },
  { text: 'You are fearfully and wonderfully made.', reference: 'Psalm 139:14' },
  { text: 'Be strong and courageous.', reference: 'Joshua 1:9' },
  { text: 'Do not be afraid; I am with you.', reference: 'Isaiah 41:10' },
  { text: 'I have called you by name; you are mine.', reference: 'Isaiah 43:1' },
  { text: 'Those who hope in the Lord will renew their strength.', reference: 'Isaiah 40:31' },
  { text: 'The grass withers, the flower fades.', reference: 'Isaiah 40:8' },
  { text: 'For I know the plans I have for you.', reference: 'Jeremiah 29:11' },
  { text: 'Call to me and I will answer you.', reference: 'Jeremiah 33:3' },
  { text: 'The steadfast love of the Lord never ceases.', reference: 'Lamentations 3:22' },
  { text: 'Great is your faithfulness.', reference: 'Lamentations 3:23' },
  { text: 'The Lord is my portion.', reference: 'Lamentations 3:24' },
  { text: 'Seek first the kingdom of God.', reference: 'Matthew 6:33' },
  { text: 'You are the light of the world.', reference: 'Matthew 5:14' },
  { text: 'You are the salt of the earth.', reference: 'Matthew 5:13' },
  { text: 'Blessed are the pure in heart.', reference: 'Matthew 5:8' },
  { text: 'Blessed are the meek.', reference: 'Matthew 5:5' },
  { text: 'Love your neighbor as yourself.', reference: 'Mark 12:31' },
  { text: 'With God nothing will be impossible.', reference: 'Luke 1:37' },
  { text: 'Peace I leave with you.', reference: 'John 14:27' },
  { text: 'I am the way, the truth, and the life.', reference: 'John 14:6' },
  { text: 'God is love.', reference: '1 John 4:8' },
  { text: 'Perfect love casts out fear.', reference: '1 John 4:18' },
  { text: 'Be faithful unto death.', reference: 'Revelation 2:10' },
  { text: 'He makes all things new.', reference: 'Revelation 21:5' },
];

const getRandomItem = <T,>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

export const getVerseForWord = (word: string): Verse => {
  const normalized = word.toLowerCase().trim();
  const theme = WORD_THEMES[normalized];

  if (theme && THEME_VERSES[theme]?.length) {
    return getRandomItem(THEME_VERSES[theme]);
  }

  return getRandomItem(FALLBACK_VERSES);
};