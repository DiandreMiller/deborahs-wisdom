const Footer = () => {
    return (
      <footer className="relative w-full bg-[#be8f48] px-4 pt-16 pb-8 text-center text-[#5a3f0f]">
  
        {/* 🔥 Fade overlay */}
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
          <a
            href="https://diandremillerdev.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[#fff7dc]"
          >
            My Website
          </a>
  
          <span className="opacity-40">•</span>
  
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="transition hover:text-[#fff7dc]"
          >
            Back to Top
          </button>
  
          <span className="opacity-40">•</span>
  
          <a
            href="https://github.com/DiandreMiller"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[#fff7dc]"
          >
            GitHub
          </a>
        </div>
  
        <p className="mt-6 text-xs text-[#7c5a1a]">
          © {new Date().getFullYear()} Deborah&apos;s Wisdom. Built with love.
        </p>
      </footer>
    );
  };
  
  export default Footer;