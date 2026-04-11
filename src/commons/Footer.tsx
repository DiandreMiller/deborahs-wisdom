import crownedLegacy from '../assets/crownedLegacy.png';
import {  ArrowUp } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative w-full bg-[#be8f48] px-4 pt-16 pb-8 text-center text-[#5a3f0f]">

      {/* Fade */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-transparent to-[#be8f48]" />

      <p
        className="text-2xl font-black sm:text-3xl"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        Deborah&apos;s Wisdom
      </p>

      <p className="mt-2 text-sm sm:text-base text-[#6f5317]">
        Guess the word. Discover the verse. Grow your wisdom.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm font-bold sm:text-base">

        {/* Crowned Legacy */}
        <a
          href="https://www.shopcrownedlegacy.com/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 transition hover:opacity-80"
        >
          <img
            src={crownedLegacy}
            alt="Crowned Legacy"
            className="h-6 sm:h-8 object-contain"
          />
          Crowned Legacy
        </a>

        <span className="opacity-40">•</span>

        {/* GitHub */}
        <a
          href="https://github.com/DiandreMiller"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 transition hover:text-[#fff7dc]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 sm:h-5 sm:w-5"
            aria-hidden="true"
          >
            <path d="M12 .5C5.65.5.75 5.4.75 11.75c0 5.08 3.29 9.39 7.86 10.92.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.08-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.7.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.18-3.12-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.19a10.9 10.9 0 0 1 5.74 0c2.19-1.5 3.15-1.19 3.15-1.19.62 1.57.23 2.73.11 3.02.73.82 1.18 1.86 1.18 3.12 0 4.43-2.68 5.4-5.24 5.68.41.36.77 1.08.77 2.18 0 1.57-.01 2.83-.01 3.21 0 .3.2.65.79.54A11.26 11.26 0 0 0 23.25 11.75C23.25 5.4 18.35.5 12 .5z" />
          </svg>
          GitHub
        </a>
        {/* Back to Top */}
        <span className="opacity-40">•</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1 transition hover:text-[#fff7dc]"
        >
          <ArrowUp size={16} />
          Back To Top
        </button>
      </div>

      <p className="mt-6 text-xs text-[#7c5a1a]">
        © {new Date().getFullYear()} Deborah&apos;s Wisdom. Built with love.
      </p>
    </footer>
  );
};

export default Footer;