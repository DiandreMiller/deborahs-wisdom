import { useEffect, useRef, useState } from 'react';
import { PLAYABLE_BIBLE_WORDS } from '../data/playableBibleWords';
import { getVerseForWord, type Verse } from '../utils/getBibleVerse';
import MusicPlayer from '../components/MusicPlayer';
import Jesus from '../assets/images/JesusCrown.png';
import Logo from '../assets/images/Logo.png';
import DailyLoginStreak from '../components/DailyLoginStreak';

const MAX_GUESSES = 6;
const HOW_TO_PLAY_STORAGE_KEY = 'deborahs-wisdom-hide-how-to-play-v1';
const GAME_STATS_STORAGE_KEY = 'deborahs-wisdom-stats-v1';

type GameStats = {
  streak: number;
  wins: number;
  losses: number;
  longestStreak: number;
};

type LetterStatus = 'correct' | 'present' | 'absent';

const defaultStats: GameStats = {
  streak: 0,
  wins: 0,
  losses: 0,
  longestStreak: 0,
};

const DeborahGamePage = () => {
  const [word, setWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [lockedLetters, setLockedLetters] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<'loading' | 'playing' | 'win' | 'loss'>('loading');
  const [statuses, setStatuses] = useState<LetterStatus[][]>([]);
  const [showHowToPlayModal, setShowHowToPlayModal] = useState<boolean>(false);
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [verse, setVerse] = useState<Verse | null>(null);

  const boardRef = useRef<HTMLDivElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);

  const generateNewWord = () => {
    const validWords = PLAYABLE_BIBLE_WORDS.filter(
      (playableWord) => playableWord.length >= 4 && playableWord.length <= 8
    );

    return validWords[Math.floor(Math.random() * validWords.length)];
  };

  const saveStats = (updatedStats: GameStats) => {
    setStats(updatedStats);
    localStorage.setItem(GAME_STATS_STORAGE_KEY, JSON.stringify(updatedStats));
  };

  useEffect(() => {
    const generatedWord = generateNewWord();
    setWord(generatedWord);
    setStatus('playing');
    setLockedLetters({});
    setCurrentRow(0);
    setCurrentGuess(Array(generatedWord.length).fill(''));
    setStatuses([]);

    const hasDismissedModal = localStorage.getItem(HOW_TO_PLAY_STORAGE_KEY);
    if (!hasDismissedModal) {
      setShowHowToPlayModal(true);
    }

    const savedStats = localStorage.getItem(GAME_STATS_STORAGE_KEY);
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch {
        setStats(defaultStats);
      }
    }
  }, []);

  console.log('word:', word);

  const focusGameInput = () => {
    boardRef.current?.focus();
    mobileInputRef.current?.focus();
  };


  useEffect(() => {
    if (status === 'playing' && !showHowToPlayModal) {
        focusGameInput();
    }
  }, [status, showHowToPlayModal, currentRow]);

  const handleCloseHowToPlayModal = () => {
    setShowHowToPlayModal(false);
    localStorage.setItem(HOW_TO_PLAY_STORAGE_KEY, 'true');
    setTimeout(() => focusGameInput(), 0);
  };

  const handleOpenHowToPlayModal = () => {
    setShowHowToPlayModal(true);
  };

  const evaluateGuess = (guess: string): LetterStatus[] => {
    const result: LetterStatus[] = Array(guess.length).fill('absent');
    const wordArr = word.split('');
    const used = Array(word.length).fill(false);
  
    // pass 1: exact matches
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === wordArr[i]) {
        result[i] = 'correct';
        used[i] = true;
      }
    }
  
    // pass 2: present elsewhere
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === 'correct') continue;
  
      for (let j = 0; j < wordArr.length; j++) {
        if (!used[j] && guess[i] === wordArr[j]) {
          result[i] = 'present';
          used[j] = true;
          break;
        }
      }
    }
  
    return result;
  };

  const handleSubmit = () => {
    if (status !== 'playing') return;

    const guess = currentGuess.join('');

    if (guess.length !== word.length) return;

    for (const [index, lockedLetter] of Object.entries(lockedLetters)) {
      if (guess[Number(index)] !== lockedLetter) {
        return;
      }
    }

    const newGuesses = [...guesses, guess];
    const result = evaluateGuess(guess);

    setGuesses(newGuesses);
    setStatuses((prev) => [...prev, result]);

    const newLockedLetters = { ...lockedLetters };

    result.forEach((status, i) => {
    if (status === 'correct') {
        newLockedLetters[i] = guess[i];
    }
    });

    setLockedLetters(newLockedLetters);

    if (guess === word) {
      const updatedStats: GameStats = {
        ...stats,
        streak: stats.streak + 1,
        wins: stats.wins + 1,
        longestStreak: Math.max(stats.longestStreak, stats.streak + 1),
      };

      saveStats(updatedStats);
      setVerse(getVerseForWord(word));
      setStatus('win');
      setCurrentGuess(Array(word.length).fill(''));
      return;
    }

    if (newGuesses.length === MAX_GUESSES) {
      const updatedStats: GameStats = {
        ...stats,
        streak: 0,
        losses: stats.losses + 1,
        longestStreak: stats.longestStreak,
      };

      saveStats(updatedStats);
      setVerse(null);
      setStatus('loss');
      setCurrentGuess(Array(word.length).fill(''));
      return;
    }

    const nextGuessArray = Array(word.length).fill('');

    Object.entries(newLockedLetters).forEach(([index, letter]) => {
      nextGuessArray[Number(index)] = letter;
    });

    setCurrentGuess(nextGuessArray);
    setCurrentRow(newGuesses.length);
  };

  const handleNewGame = () => {
    const newWord = generateNewWord();
    setWord(newWord);
    setGuesses([]);
    setCurrentGuess(Array(newWord.length).fill(''));
    setVerse(null);
    setLockedLetters({});
    setCurrentRow(0);
    setStatus('playing');
    setTimeout(() => focusGameInput(), 0);
    setStatuses([]);
  };

  const handleBoardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (status !== 'playing') return;

    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();

      const chars = [...currentGuess];

      for (let i = word.length - 1; i >= 0; i--) {
        if (!(i in lockedLetters) && chars[i]) {
          chars[i] = '';
          setCurrentGuess(chars);
          return;
        }
      }

      return;
    }

    if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();

      const chars = [...currentGuess];
      while (chars.length < word.length) {
        chars.push('');
      }

      for (let i = 0; i < word.length; i++) {
        if (!(i in lockedLetters) && !chars[i]) {
          chars[i] = e.key.toLowerCase();
          setCurrentGuess(chars);
          return;
        }
      }
    }
  };

  const getColor = (index: number, rowIndex: number) => {
    const letterStatus = statuses[rowIndex]?.[index];
  
    if (letterStatus === 'correct') {
      return 'bg-emerald-500/85 border-emerald-300 text-white shadow-[0_0_18px_rgba(16,185,129,0.4)]';
    }
  
    if (letterStatus === 'present') {
      return 'bg-amber-300 border-amber-100 text-[#5c4300] shadow-[0_0_18px_rgba(251,191,36,0.35)]';
    }
  
    if (letterStatus === 'absent') {
      return 'bg-rose-300/85 border-rose-100 text-[#6b1d1d] shadow-[0_0_18px_rgba(244,114,182,0.25)]';
    }
  
    return 'bg-white/65 border-white/90 text-[#8a651d] shadow-[0_10px_20px_rgba(190,143,72,0.12)]';
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#fffdf3_0%,_#f6ebc8_35%,_#e8d19a_70%,_#caa35a_100%)] px-4">
        <div className="rounded-[2rem] border border-white/70 bg-white/45 px-8 py-6 shadow-[0_20px_60px_rgba(214,175,78,0.28)] backdrop-blur-xl">
          <p
            className="text-2xl font-bold tracking-wide text-[#6b4d12]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Loading Deborah’s Wisdom...
          </p>
        </div>
      </div>
    );
  }

  const getTileSizeClasses = () => {
    if (word.length >= 8) {
      return 'h-10 w-10 text-base sm:h-12 sm:w-12 sm:text-lg lg:h-14 lg:w-14 lg:text-xl';
    }
  
    if (word.length === 7) {
      return 'h-11 w-11 text-lg sm:h-13 sm:w-13 sm:text-lg lg:h-15 lg:w-15 lg:text-xl';
    }
  
    return 'h-12 w-12 text-lg sm:h-14 sm:w-14 sm:text-xl lg:h-16 lg:w-16 lg:text-2xl';
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fffef8_0%,_#fff7dc_18%,_#f7ebc7_38%,_#ebd5a0_62%,_#d5b06b_82%,_#be8f48_100%)] px-4 py-8 text-[#6f5317] sm:py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-white/55 blur-3xl" />
        <div className="absolute left-[10%] top-[18%] h-40 w-40 rounded-full bg-white/25 blur-3xl" />
        <div className="absolute right-[8%] top-[24%] h-48 w-48 rounded-full bg-yellow-100/30 blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] h-56 w-56 rounded-full bg-amber-100/25 blur-3xl" />
      </div>

      {showHowToPlayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#9f7a2c]/20 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white/60 p-6 shadow-[0_24px_80px_rgba(190,143,72,0.35)] backdrop-blur-2xl sm:p-8">
            <button
              onClick={handleCloseHowToPlayModal}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#e9d197] bg-white/80 text-xl font-bold text-[#8a651d] transition hover:scale-105 hover:bg-[#fff7dc]"
              aria-label="Close how to play modal"
            >
              ×
            </button>

            <p
              className="text-3xl font-black text-[#4a2f05]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              How to play
            </p>

            <p className="mt-3 text-base leading-7 text-[#7b632a]">
              Guess the hidden Bible word in six tries. Type directly into the board.
              Green letters stay locked in place for the next guess.
            </p>

            <div className="mt-6 space-y-4 text-[#6f5b2b]">
              <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/70 bg-white/55 p-4">
                <div className="mt-1 h-5 w-5 rounded-full border border-emerald-200 bg-emerald-400" />
                <p>
                  <span className="font-bold text-[#6a4d0f]">Green</span> means the
                  letter is correct and in the right place.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/70 bg-white/55 p-4">
                <div className="mt-1 h-5 w-5 rounded-full border border-amber-100 bg-amber-300" />
                <p>
                  <span className="font-bold text-[#6a4d0f]">Yellow</span> means the
                  letter is in the word, but in the wrong place.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/70 bg-white/55 p-4">
                <div className="mt-1 h-5 w-5 rounded-full border border-rose-100 bg-rose-300" />
                <p>
                  <span className="font-bold text-[#6a4d0f]">Red</span> means the
                  letter is not in the word.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[1.5rem] border border-white/80 bg-[#fff9e8]/80 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58521]">
                Tip
              </p>
              <p className="mt-2 leading-7 text-[#75602d]">
                Click the board, type your guess, and press Enter to submit.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="relative inline-block">
            <img
              src={Jesus}
              alt="Crown"
              className="absolute left-1/2 -top-8 w-20 -translate-x-1/2 sm:-top-4 sm:w-24"
            />

            <h1
              className="text-center text-4xl tracking-tight sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#4a2f05',
                fontWeight: 900,
              }}
            >
              Deborah’s Wisdom
            </h1>
          </div>
          <button
            onClick={handleOpenHowToPlayModal}
            className="mt-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/70 text-lg font-black text-[#8a651d]"
            aria-label="Open how to play modal"
            title="How to play"
          >
            ?
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4">
          <DailyLoginStreak />
        </div>
        <div className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="rounded-[2rem] border border-white/80 bg-white/45 p-4 shadow-[0_24px_80px_rgba(190,143,72,0.3)] backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-8">
            <div className="mb-5 flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b58521] sm:text-sm">
                Bible Word Game
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <p className="max-w-xl text-base leading-7 text-[#755f2f] sm:text-lg">
                    Guess the hidden Bible word in six tries. Every round gives you a
                    new word between 4 and 8 letters.
                  </p>
                </div>

                <div className="self-start rounded-[1.5rem] border border-white/80 bg-[#fff9e8]/90 px-5 py-4 text-center shadow-[0_12px_28px_rgba(190,143,72,0.18)] sm:self-auto">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#b58521]">
                    Word Length
                  </p>
                  <p className="mt-1 text-3xl font-black text-[#7c5914]">
                    {word.length}
                  </p>
                </div>
              </div>

              <div className="border-b border-[#e8d39f]/80" />
            </div>

            <div
                ref={boardRef}
                tabIndex={0}
                onKeyDown={handleBoardKeyDown}
                onClick={focusGameInput}
                className="flex flex-col items-center outline-none"
                >
                <input
                    ref={mobileInputRef}
                    type="text"
                    inputMode="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    value=""
                    onChange={() => {}}
                    onKeyDown={(e) => {
                    handleBoardKeyDown(e as unknown as React.KeyboardEvent<HTMLDivElement>);
                    }}
                    className="absolute left-0 top-0 opacity-0 w-px h-px"
                    style={{ caretColor: 'transparent' }}
                />
              <div className="w-full overflow-x-hidden pt-2">
                <div className="space-y-2 sm:space-y-3">
                  {Array.from({ length: MAX_GUESSES }).map((_, rowIndex) => {
                    const guess =
                      rowIndex < guesses.length
                        ? guesses[rowIndex].split('')
                        : rowIndex === currentRow
                        ? currentGuess
                        : Array(word.length).fill('');

                    return (
                      <div key={rowIndex} className="flex justify-center gap-1.5 sm:gap-2 lg:gap-3">
                        {Array.from({ length: word.length }).map((_, colIndex) => {
                          const letter = guess[colIndex] || '';
                          const isSubmittedRow = rowIndex < guesses.length;
                          const isLockedLetter = rowIndex === currentRow && colIndex in lockedLetters;

                          const color = isSubmittedRow
                          ? getColor(colIndex, rowIndex)
                          : isLockedLetter
                          ? 'bg-emerald-500/85 border-emerald-300 text-white shadow-[0_0_18px_rgba(16,185,129,0.4)]'
                          : 'bg-white/65 border-white/90 text-[#8a651d] shadow-[0_10px_20px_rgba(190,143,72,0.12)]';
                          return (
                            <div
                              key={colIndex}
                              className={`flex items-center justify-center rounded-[0.9rem] border-2 font-black uppercase transition-all duration-200 ${getTileSizeClasses()} ${color}`}
                            >
                              {letter}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* break */}
              {status === 'playing' && (
                 <div className="mt-6 flex w-full max-w-md justify-center">
                        <button
                        onClick={handleSubmit}
                        disabled={currentGuess.length !== word.length}
                        className={`w-full rounded-[1.25rem] border px-6 py-4 text-lg font-black shadow transition
                            ${
                            currentGuess.length === word.length
                                ? 'border-[#f3df9a] bg-gradient-to-b from-[#fff2c4] to-[#eac86f] text-[#6e4e11] hover:scale-[1.02] hover:from-[#fff6d6] hover:to-[#edcf81] active:scale-[0.98]'
                                : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                            }`}
                        >
                        Enter
                        </button>
                 </div>
              )}

{/* break */}

              {status === 'win' && (
                <div className="mt-8 w-full max-w-xl rounded-[1.75rem] border border-emerald-200 bg-white/65 px-6 py-5 text-center shadow-[0_20px_40px_rgba(16,185,129,0.14)]">
                  <p className="text-3xl font-black text-emerald-700">You won!</p>
                  <p className="mt-2 text-base text-[#755f2f]">
                    Beautiful work. You guessed{' '}
                    <span className="font-black uppercase text-[#6a4d0f]">{word}</span>.
                  </p>

                  {verse && (
                    <div className="mt-5 rounded-[1.25rem] border border-white/80 bg-white/70 p-4 text-center shadow-[0_10px_24px_rgba(190,143,72,0.14)]">
                      <p className="text-base italic leading-7 text-[#6a4d0f]">
                        “{verse.text}”
                      </p>
                      <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-[#b58521]">
                        {verse.reference}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleNewGame}
                    className="mt-5 h-12 rounded-[1.25rem] border border-emerald-200 bg-emerald-500 px-6 text-lg font-black text-white shadow-[0_12px_24px_rgba(16,185,129,0.22)] transition hover:scale-105 hover:bg-emerald-600"
                  >
                    Play Again
                  </button>
                </div>
              )}

              {status === 'loss' && (
                <div className="mt-8 w-full max-w-xl rounded-[1.75rem] border border-rose-100 bg-white/65 px-6 py-5 text-center shadow-[0_20px_40px_rgba(244,114,182,0.12)]">
                  <p className="text-3xl font-black text-rose-700">You lost</p>
                  <p className="mt-2 text-base text-[#755f2f]">
                    The word was{' '}
                    <span className="font-black uppercase text-[#6a4d0f]">{word}</span>.
                  </p>

                  <button
                    onClick={handleNewGame}
                    className="mt-5 h-12 rounded-[1.25rem] border border-rose-100 bg-rose-300 px-6 text-lg font-black text-[#6b1d1d] shadow-[0_12px_24px_rgba(244,114,182,0.18)] transition hover:scale-105 hover:bg-rose-400"
                  >
                    Try Another Word
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="hidden overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/45 shadow-[0_24px_80px_rgba(190,143,72,0.28)] backdrop-blur-2xl lg:block">
              <div className="flex h-[520px] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95)_0%,_rgba(255,247,220,0.92)_35%,_rgba(242,224,171,0.78)_70%,_rgba(224,189,113,0.62)_100%)] p-8 text-center">
                <div>
                  <div className="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.98)_0%,_rgba(255,244,200,0.9)_35%,_rgba(234,200,111,0.45)_65%,_rgba(234,200,111,0)_100%)] blur-md" />
                    <div className="absolute inset-4 rounded-full bg-white/35 blur-2xl" />
                    <img
                      src={Logo}
                      alt="Deborah’s Wisdom logo"
                      className="relative z-10 max-h-28 max-w-28 object-contain drop-shadow-[0_10px_25px_rgba(140,101,29,0.35)] sm:max-h-36 sm:max-w-36"
                    />
                  </div>

                  <p
                    className="text-4xl font-black text-[#7c5914] sm:text-5xl"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Deborah’s Wisdom
                  </p>
                  <p className="mt-4 text-base leading-7 text-[#7b632a]">
                    A Bible word game made with love.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/80 bg-white/45 p-4 shadow-[0_16px_40px_rgba(190,143,72,0.22)] backdrop-blur-2xl sm:rounded-[2rem] sm:p-6">
              <h2
                className="text-xl font-black text-[#7c5914] sm:text-2xl"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Your Streaks
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4">
                <div className="rounded-[1rem] border border-white/80 bg-white/60 p-3 text-center sm:rounded-[1.25rem] sm:p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#b58521] sm:text-xs sm:tracking-[0.25em]">
                    Current Streak
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#7c5914] sm:mt-2 sm:text-3xl">
                    {stats.streak}
                  </p>
                </div>

                <div className="rounded-[1rem] border border-white/80 bg-white/60 p-3 text-center sm:rounded-[1.25rem] sm:p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#b58521] sm:text-xs sm:tracking-[0.25em]">
                    Longest Streak
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#7c5914] sm:mt-2 sm:text-3xl">
                    {stats.longestStreak}
                  </p>
                </div>

                <div className="rounded-[1rem] border border-white/80 bg-white/60 p-3 text-center sm:rounded-[1.25rem] sm:p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#b58521] sm:text-xs sm:tracking-[0.25em]">
                    Wins
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#7c5914] sm:mt-2 sm:text-3xl">
                    {stats.wins}
                  </p>
                </div>

                <div className="rounded-[1rem] border border-white/80 bg-white/60 p-3 text-center sm:rounded-[1.25rem] sm:p-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#b58521] sm:text-xs sm:tracking-[0.25em]">
                    Losses
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#7c5914] sm:mt-2 sm:text-3xl">
                    {stats.losses}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-[1.25rem] border border-white/80 bg-[#fff9e8]/80 p-4 sm:mt-6 sm:rounded-[1.5rem] sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58521]">
                  Keep Going
                </p>
                <p className="mt-2 text-sm leading-6 text-[#75602d] sm:text-base sm:leading-7">
                  Build your streak, beat your best run, and keep stacking wins.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default DeborahGamePage;