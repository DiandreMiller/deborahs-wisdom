import type { Verse } from '../utils/getBibleVerse';

type DailyVerseModalProps = {
  isOpen: boolean;
  verse: Verse | null;
  onClose: () => void;
};

const DailyVerseModal = ({
  isOpen,
  verse,
  onClose,
}: DailyVerseModalProps) => {
  if (!isOpen || !verse) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#9f7a2c]/20 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/80 bg-white/70 p-6 shadow-[0_24px_80px_rgba(190,143,72,0.35)] backdrop-blur-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#e9d197] bg-white/80 text-xl font-bold text-[#8a651d] transition hover:scale-105 hover:bg-[#fff7dc]"
          aria-label="Close daily verse modal"
        >
          ×
        </button>

        <p
          className="text-3xl font-black text-[#4a2f05]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Daily Blessing
        </p>

        <p className="mt-4 text-base leading-7 text-[#755f2f]">
          A verse to begin the day in faith and peace.
        </p>

        <div className="mt-6 rounded-[1.5rem] border border-white/80 bg-[#fff9e8]/85 p-5 text-center shadow-[0_10px_24px_rgba(190,143,72,0.12)]">
          <p className="text-lg italic leading-8 text-[#6a4d0f]">
            “{verse.text}”
          </p>
          <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-[#b58521]">
            {verse.reference}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyVerseModal;