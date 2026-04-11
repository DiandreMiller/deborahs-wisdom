const getEasternDateString = () => {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(new Date());
  
    const year = parts.find((part) => part.type === 'year')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;
  
    return `${year}-${month}-${day}`;
  };

import { useNavigate } from 'react-router-dom';
import Jesus from '../assets/images/JesusCrown.png';
import { useEffect, useState } from 'react';
import DailyVerseModal from '../components/DailyVerseModal';
import { getVerseForWord, type Verse } from '../utils/getBibleVerse';


const DeborahHomePage = () => {

  const [showDailyVerseModal, setShowDailyVerseModal] = useState(false);
  const [dailyVerse, setDailyVerse] = useState<Verse | null>(null);

  const DAILY_VERSE_STORAGE_KEY = 'deborahs-wisdom-daily-verse-date-v1';
  const navigate = useNavigate();

  useEffect(() => {
    const todayEastern = getEasternDateString();
    const lastShownDate = localStorage.getItem(DAILY_VERSE_STORAGE_KEY);
  
    if (lastShownDate !== todayEastern) {
      setDailyVerse(getVerseForWord('hope'));
      setShowDailyVerseModal(true);
      localStorage.setItem(DAILY_VERSE_STORAGE_KEY, todayEastern);
    }
  }, []);

  const handleCloseDailyVerseModal = () => {
    setShowDailyVerseModal(false);
  };

  return (
    
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#fffef8_0%,_#fff7dc_18%,_#f7ebc7_38%,_#ebd5a0_62%,_#d5b06b_82%,_#be8f48_100%)] px-4 py-8 text-[#6f5317] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />
        <div className="absolute left-[8%] top-[18%] h-44 w-44 rounded-full bg-white/25 blur-3xl" />
        <div className="absolute right-[10%] top-[22%] h-52 w-52 rounded-full bg-yellow-100/30 blur-3xl" />
        <div className="absolute bottom-[8%] left-[18%] h-64 w-64 rounded-full bg-amber-100/25 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col">
        <div className="flex items-center justify-between">
          <div className="rounded-full border border-white/80 bg-white/55 px-4 py-2 text-sm font-black uppercase tracking-[0.28em] text-[#8a651d] shadow-[0_10px_30px_rgba(190,143,72,0.15)] backdrop-blur-xl">
            Deborah’s Wisdom
          </div>

          <DailyVerseModal
            isOpen={showDailyVerseModal}
            verse={dailyVerse}
            onClose={handleCloseDailyVerseModal}
          />

          <button
            onClick={() => navigate('/play')}
            className="rounded-full border border-white/80 bg-white/70 px-5 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#8a651d] shadow-[0_10px_24px_rgba(190,143,72,0.18)] transition hover:scale-105 hover:bg-white"
          >
            Play Now
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center py-10 lg:py-16">
          <div className="w-full rounded-[2.5rem] border border-white/80 bg-white/45 p-6 shadow-[0_24px_80px_rgba(190,143,72,0.28)] backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="inline-flex items-center rounded-full border border-white/80 bg-[#fff9e8]/85 px-4 py-2 text-xs font-black uppercase tracking-[0.32em] text-[#b58521] shadow-[0_10px_20px_rgba(190,143,72,0.12)]">
              Bible Word Adventure
            </div>

            <div className="mt-8 text-center">
              <div className="relative inline-block">
                <img
                  src={Jesus}
                  alt="Crown"
                  className="absolute left-1/2 -top-8 w-20 -translate-x-1/2 sm:-top-10 sm:w-24"
                />

                <h1
                  className="text-5xl tracking-tight sm:text-6xl lg:text-7xl"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    color: '#4a2f05',
                    fontWeight: 900,
                  }}
                >
                  Deborah’s Wisdom
                </h1>
              </div>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#755f2f] sm:text-xl">
                A beautiful Bible word game filled with faith, grace, and joy.
                Guess the hidden word, build your streak, and uncover a verse
                every time you win.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => navigate('/play')}
                className="h-14 rounded-[1.25rem] border border-[#f3df9a] bg-gradient-to-b from-[#fff2c4] to-[#eac86f] px-8 text-lg font-black text-[#6e4e11] shadow-[0_14px_28px_rgba(190,143,72,0.24)] transition hover:scale-[1.02] hover:from-[#fff6d6] hover:to-[#edcf81] active:scale-[0.98]"
              >
                Start Playing
              </button>

              <button
                onClick={() => navigate('/play')}
                className="h-14 rounded-[1.25rem] border border-white/90 bg-white/80 px-8 text-lg font-black text-[#8a651d] shadow-[0_10px_24px_rgba(190,143,72,0.14)] transition hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
              >
                Daily Blessing
              </button>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <div className="min-h-[220px] rounded-[1.75rem] border border-white/80 bg-white/60 p-6 text-center shadow-[0_10px_24px_rgba(190,143,72,0.1)]">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b58521]">
                  Guess
                </p>
                <p className="mt-4 text-lg leading-8 text-[#755f2f]">
                  Solve Bible-inspired words in six tries.
                </p>
              </div>

              <div className="min-h-[220px] rounded-[1.75rem] border border-white/80 bg-white/60 p-6 text-center shadow-[0_10px_24px_rgba(190,143,72,0.1)]">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b58521]">
                  Win
                </p>
                <p className="mt-4 text-lg leading-8 text-[#755f2f]">
                  Build streaks and reveal a meaningful verse.
                </p>
              </div>

              <div className="min-h-[220px] rounded-[1.75rem] border border-white/80 bg-white/60 p-6 text-center shadow-[0_10px_24px_rgba(190,143,72,0.1)]">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#b58521]">
                  Grow
                </p>
                <p className="mt-4 text-lg leading-8 text-[#755f2f]">
                  Play for joy, peace, wisdom, and encouragement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeborahHomePage;