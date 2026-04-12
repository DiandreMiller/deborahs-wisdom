import { useEffect, useState } from 'react';

const DAILY_STREAK_KEY = 'deborahs-wisdom-daily-streak-v1';
const LAST_LOGIN_KEY = 'deborahs-wisdom-last-login-date-v1';
const LAST_MODAL_SHOWN_KEY = 'deborahs-wisdom-last-modal-shown-v1';

const getEasternDateString = () => {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
};

const getMilestoneType = (streak: number) => {
  const oneYear = 365;
  const fixedMilestones = new Set([5, 30, 50, 100, 200, 300]);

  if (fixedMilestones.has(streak)) return 'fire';
  if (streak % oneYear === 0) return 'year';
  if (streak > oneYear && streak % 50 === 0) return 'fire';

  return null;
};

const getMilestoneEmoji = (streak: number) => {
  const milestoneType = getMilestoneType(streak);

  if (milestoneType === 'year') return '👑';
  if (milestoneType === 'fire') return '🔥';

  return null;
};

const getMilestoneMessage = (streak: number) => {
  const milestoneType = getMilestoneType(streak);

  if (milestoneType === 'year') {
    const years = streak / 365;

    return years === 1
      ? 'One full year of showing up. That is beautiful consistency.'
      : `${years} full years of showing up. That is truly amazing.`;
  }

  if (milestoneType === 'fire') {
    return 'You hit a special streak milestone. Keep the fire going.';
  }

  return 'Come back tomorrow and keep your streak alive.';
};

const DailyLoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const today = getEasternDateString();
    const lastLogin = localStorage.getItem(LAST_LOGIN_KEY);
    const savedStreak = Number(localStorage.getItem(DAILY_STREAK_KEY) || '0');
    const lastModalShown = localStorage.getItem(LAST_MODAL_SHOWN_KEY);

    let nextStreak = 1;

    if (!lastLogin) {
      nextStreak = 1;
    } else if (lastLogin === today) {
      nextStreak = savedStreak || 1;
    } else {
      const lastDate = new Date(`${lastLogin}T00:00:00`);
      const todayDate = new Date(`${today}T00:00:00`);

      const diffInDays = Math.round(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffInDays === 1) {
        nextStreak = savedStreak + 1;
      } else {
        nextStreak = 1;
      }
    }

    localStorage.setItem(LAST_LOGIN_KEY, today);
    localStorage.setItem(DAILY_STREAK_KEY, String(nextStreak));
    setStreak(nextStreak);

    if (lastModalShown !== today) {
      setIsOpen(true);
      localStorage.setItem(LAST_MODAL_SHOWN_KEY, today);
    }
  }, []);

  if (!isOpen) return null;

  const milestoneEmoji = getMilestoneEmoji(streak);
  const milestoneMessage = getMilestoneMessage(streak);
  const milestoneType = getMilestoneType(streak);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#9f7a2c]/20 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-[2rem] border border-white/80 bg-white/70 p-6 text-center shadow-[0_24px_80px_rgba(190,143,72,0.35)] backdrop-blur-2xl sm:p-8">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#e9d197] bg-white/80 text-xl font-bold text-[#8a651d] transition hover:scale-105 hover:bg-[#fff7dc]"
          aria-label="Close daily login modal"
        >
          ×
        </button>

        <p
          className="text-3xl font-black text-[#4a2f05]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Daily Blessing
        </p>

        <p className="mt-4 text-base leading-7 text-[#7b632a]">
          You showed up today.
        </p>

        <div
          className={`mt-6 rounded-[1.5rem] border p-5 shadow-[0_10px_24px_rgba(190,143,72,0.12)] ${
            milestoneType === 'year'
              ? 'border-[#f1d37a] bg-[radial-gradient(circle_at_top,_#fff9e8_0%,_#f7e4a5_100%)]'
              : 'border-white/80 bg-[#fff9e8]/85'
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58521]">
            Daily Login Streak
          </p>
          <p className="mt-3 text-4xl font-black text-[#7c5914]">
            {streak} {milestoneEmoji && <span>{milestoneEmoji}</span>}
          </p>
        </div>

        <p className="mt-5 text-sm leading-6 text-[#75602d]">
          {milestoneMessage}
        </p>
      </div>
    </div>
  );
};

export default DailyLoginModal;