import { useEffect, useRef, useState } from 'react';

// Music
import song1 from '../assets/audio/JazzHopMusic.mp3';
import song2 from '../assets/audio/PurposebyJonnyEaston.mp3';
import song3 from '../assets/audio/lightsByAlexProductions.mp3';
import song4 from '../assets/audio/wayHome.mp3';
import song5 from '../assets/audio/FilamentsByScottBuckley.mp3';
import song6 from '../assets/audio/SnowfallByScottBuckley.mp3';
import song7 from '../assets/audio/JazzInParis.mp3';
import song8 from '../assets/audio/GetOutsideJasonFarnham.mp3';
import song9 from '../assets/audio/MorningStrollJoshKirsch.mp3';
import song10 from '../assets/audio/MorningMoodGrieg.mp3';
import song11 from '../assets/audio/SneakySnitchKevinMacLeod.mp3';

const PLAYLIST = [song1,song2,song3,song4,song5,song6,song7,song8,song9,song10,song11];

const MUSIC_ENABLED_STORAGE_KEY = 'deborahs-wisdom-music-enabled-v1';
const MUSIC_TRACK_INDEX_STORAGE_KEY = 'deborahs-wisdom-music-track-index-v1';
const MUSIC_VOLUME_STORAGE_KEY = 'deborahs-wisdom-music-volume-v1';

const MusicPlayer = () => {
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [volume, setVolume] = useState<number>(0.03);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedMusicEnabled = localStorage.getItem(MUSIC_ENABLED_STORAGE_KEY);
    const savedTrackIndex = localStorage.getItem(MUSIC_TRACK_INDEX_STORAGE_KEY);
    const savedVolume = localStorage.getItem(MUSIC_VOLUME_STORAGE_KEY);

    if (savedMusicEnabled !== null) {
      setMusicEnabled(savedMusicEnabled === 'true');
    }

    if (savedTrackIndex !== null) {
      const parsedIndex = Number(savedTrackIndex);

      if (
        !Number.isNaN(parsedIndex) &&
        parsedIndex >= 0 &&
        parsedIndex < PLAYLIST.length
      ) {
        setCurrentTrackIndex(parsedIndex);
      }
    }

    if (savedVolume !== null) {
      const parsedVolume = Number(savedVolume);

      if (!Number.isNaN(parsedVolume) && parsedVolume >= 0 && parsedVolume <= 1) {
        setVolume(parsedVolume);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(MUSIC_ENABLED_STORAGE_KEY, String(musicEnabled));
  }, [musicEnabled]);

  useEffect(() => {
    localStorage.setItem(
      MUSIC_TRACK_INDEX_STORAGE_KEY,
      String(currentTrackIndex)
    );
  }, [currentTrackIndex]);

  useEffect(() => {
    localStorage.setItem(MUSIC_VOLUME_STORAGE_KEY, String(volume));
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
  
    audio.pause();
    audio.src = PLAYLIST[currentTrackIndex];
    audio.currentTime = 0;
  
    if (musicEnabled) {
      audio.play().catch(() => {});
    }
  }, [currentTrackIndex, musicEnabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <640);
    }
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  },[])

  const handleSongEnd = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
  };

  const handleToggleMusic = () => {
    const nextValue = !musicEnabled;
    setMusicEnabled(nextValue);

    const audio = audioRef.current;
    if (!audio) return;

    if (!nextValue) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
  };

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? PLAYLIST.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <audio ref={audioRef} onEnded={handleSongEnd} />

      <button
        onClick={handlePreviousTrack}
        className="rounded-full border border-white/80 bg-white/70 px-3 py-2 text-sm font-black text-[#8a651d] shadow transition hover:scale-105 hover:bg-white"
        aria-label="Previous track"
        title="Previous track"
      >
        ◀
      </button>

      <button
        onClick={handleToggleMusic}
        className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-black text-[#8a651d] shadow transition hover:scale-105 hover:bg-white"
        aria-label={musicEnabled ? 'Turn music off' : 'Turn music on'}
        title={musicEnabled ? 'Turn music off' : 'Turn music on'}
      >
        {musicEnabled ? 'Music On' : 'Music Off'}
      </button>

      <button
        onClick={handleNextTrack}
        className="rounded-full border border-white/80 bg-white/70 px-3 py-2 text-sm font-black text-[#8a651d] shadow transition hover:scale-105 hover:bg-white"
        aria-label="Next track"
        title="Next track"
      >
        ▶
      </button>
      {!isMobile && (
        <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 shadow">
          <span className="text-sm font-black text-[#8a651d]">Vol</span>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-28 accent-[#b58521]"
            aria-label="Music volume"
          />

          <span className="w-10 text-right text-sm font-black text-[#8a651d]">
            {Math.round(volume * 100)}
          </span>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;