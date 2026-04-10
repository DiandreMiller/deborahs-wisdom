export type Verse = {
    text: string;
    reference: string;
  };
  
  export const THEME_VERSES: Record<string, Verse[]> = {
    faith: [
      { text: 'Walk by faith, not by sight.', reference: '2 Corinthians 5:7' },
      { text: 'Now faith is the substance of things hoped for.', reference: 'Hebrews 11:1' },
      { text: 'Without faith it is impossible to please God.', reference: 'Hebrews 11:6' },
    ],
  
    grace: [
      { text: 'My grace is sufficient for you.', reference: '2 Corinthians 12:9' },
      { text: 'For by grace you have been saved through faith.', reference: 'Ephesians 2:8' },
      { text: 'The Lord is gracious and compassionate.', reference: 'Psalm 145:8' },
    ],
  
    courage: [
      { text: 'Be strong and courageous.', reference: 'Joshua 1:9' },
      { text: 'The Lord will fight for you.', reference: 'Exodus 14:14' },
      { text: 'Do not fear, for I am with you.', reference: 'Isaiah 41:10' },
    ],
  
    love: [
      { text: 'God is love.', reference: '1 John 4:8' },
      { text: 'Love never fails.', reference: '1 Corinthians 13:8' },
      { text: 'Love your neighbor as yourself.', reference: 'Mark 12:31' },
    ],
  
    peace: [
      { text: 'Peace I leave with you.', reference: 'John 14:27' },
      { text: 'The peace of God will guard your hearts.', reference: 'Philippians 4:7' },
      { text: 'Blessed are the peacemakers.', reference: 'Matthew 5:9' },
    ],
  
    strength: [
      { text: 'I can do all things through Christ who strengthens me.', reference: 'Philippians 4:13' },
      { text: 'The Lord is my strength and my shield.', reference: 'Psalm 28:7' },
      { text: 'Those who hope in the Lord will renew their strength.', reference: 'Isaiah 40:31' },
    ],
  
    wisdom: [
      { text: 'The fear of the Lord is the beginning of wisdom.', reference: 'Proverbs 9:10' },
      { text: 'If any of you lacks wisdom, let him ask of God.', reference: 'James 1:5' },
      { text: 'Blessed are those who find wisdom.', reference: 'Proverbs 3:13' },
    ],
  
    hope: [
      { text: 'For I know the plans I have for you.', reference: 'Jeremiah 29:11' },
      { text: 'May the God of hope fill you with joy.', reference: 'Romans 15:13' },
      { text: 'Be strong and take heart, all who hope in the Lord.', reference: 'Psalm 31:24' },
    ],
  
    joy: [
      { text: 'The joy of the Lord is your strength.', reference: 'Nehemiah 8:10' },
      { text: 'Rejoice in the Lord always.', reference: 'Philippians 4:4' },
      { text: 'Weeping may endure for a night, but joy comes in the morning.', reference: 'Psalm 30:5' },
    ],
  
    guidance: [
      { text: 'Your word is a lamp to my feet.', reference: 'Psalm 119:105' },
      { text: 'Trust in the Lord with all your heart.', reference: 'Proverbs 3:5' },
      { text: 'In all your ways acknowledge Him, and He shall direct your paths.', reference: 'Proverbs 3:6' },
    ],
  
    prayer: [
      { text: 'Pray without ceasing.', reference: '1 Thessalonians 5:17' },
      { text: 'Call to me and I will answer you.', reference: 'Jeremiah 33:3' },
      { text: 'Ask and it will be given to you.', reference: 'Matthew 7:7' },
    ],
  
    comfort: [
      { text: 'The Lord is my shepherd; I shall not want.', reference: 'Psalm 23:1' },
      { text: 'He heals the brokenhearted.', reference: 'Psalm 147:3' },
      { text: 'Cast your cares on the Lord.', reference: 'Psalm 55:22' },
    ],
  
    truth: [
      { text: 'I am the way, the truth, and the life.', reference: 'John 14:6' },
      { text: 'You shall know the truth, and the truth shall make you free.', reference: 'John 8:32' },
    ],
  
    praise: [
      { text: 'Let everything that has breath praise the Lord.', reference: 'Psalm 150:6' },
      { text: 'I will bless the Lord at all times.', reference: 'Psalm 34:1' },
    ],
  };