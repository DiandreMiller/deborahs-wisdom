import { useEffect, useState } from 'react';

const DAILY_STREAK_KEY = 'deborahs-wisdom-daily-streak-v1';

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

const DailyLoginStreak = () => {
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const savedStreak = Number(localStorage.getItem(DAILY_STREAK_KEY) || '1');
    setStreak(savedStreak);
  }, []);

  const milestoneEmoji = getMilestoneEmoji(streak);

  return (
    <div className="p-3 text-center sm:p-4">
      <p className="text-[10px] uppercase tracking-[0.18em] text-[#b58521] sm:text-xs sm:tracking-[0.25em]">
        Daily Login
      </p>
      <p className="mt-1 text-2xl font-black text-[#7c5914] sm:mt-2 sm:text-3xl">
        {streak} {milestoneEmoji && <span>{milestoneEmoji}</span>}
      </p>
    </div>
  );
};

export default DailyLoginStreak;