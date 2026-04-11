import { useNavigate } from 'react-router-dom';
import Jesus from '../assets/images/JesusCrown.png';

const FOUROFOUR = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#fffef8_0%,_#fff7dc_18%,_#f7ebc7_38%,_#ebd5a0_62%,_#d5b06b_82%,_#be8f48_100%)] px-4 text-[#6f5317]">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] h-56 w-56 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute right-[10%] top-[20%] h-48 w-48 rounded-full bg-yellow-100/30 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-xl rounded-[2.5rem] border border-white/80 bg-white/55 p-8 text-center shadow-[0_24px_80px_rgba(190,143,72,0.28)] backdrop-blur-2xl sm:p-10">
        
        {/* Crown + Title */}
        <div className="relative inline-block">
          <img
            src={Jesus}
            alt="Crown"
            className="absolute left-1/2 -top-10 w-20 -translate-x-1/2 sm:w-24"
          />

          <h1
            className="text-5xl font-black tracking-tight sm:text-6xl"
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#4a2f05',
            }}
          >
            404
          </h1>
        </div>

        {/* Message */}
        <p
          className="mt-6 text-3xl font-black text-[#7c5914]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Page Not Found
        </p>

        <p className="mt-4 text-base leading-7 text-[#755f2f]">
          You’ve wandered off the path… but don’t worry.
          Even in the wilderness, God still guides.
        </p>

        {/* Verse */}
        <div className="mt-6 rounded-[1.5rem] border border-white/80 bg-[#fff9e8]/80 p-5">
          <p className="text-sm italic text-[#6a4d0f]">
            “Your word is a lamp to my feet and a light to my path.”
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#b58521]">
            Psalm 119:105
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate('/')}
            className="h-14 rounded-[1.25rem] border border-white/90 bg-white/80 px-8 text-lg font-black text-[#8a651d] shadow-[0_10px_24px_rgba(190,143,72,0.14)] transition hover:scale-[1.02] hover:bg-white"
          >
            Go Home
          </button>

          <button
            onClick={() => navigate('/play')}
            className="h-14 rounded-[1.25rem] border border-[#f3df9a] bg-gradient-to-b from-[#fff2c4] to-[#eac86f] px-8 text-lg font-black text-[#6e4e11] shadow-[0_14px_28px_rgba(190,143,72,0.24)] transition hover:scale-[1.02] hover:from-[#fff6d6] hover:to-[#edcf81]"
          >
            Play Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default FOUROFOUR;