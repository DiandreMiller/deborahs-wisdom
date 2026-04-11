import { useEffect, useRef, useState } from 'react';

// Music
import song1 from '../assets/audio/JazzHopMusic.mp3';
import song2 from '../assets/audio/PurposebyJonnyEaston.mp3';
import song3 from '../assets/audio/lightsByAlexProductions.mp3';
import song4 from '../assets/audio/wayHome.mp3';

const PLAYLIST = [song1, song2, song3, song4];
const MUSIC_ENABLED_STORAGE_KEY = 'deborahs-wisdom-music-enabled-v1';
const MUSIC_TRACK_INDEX_STORAGE_KEY = 'deborahs-wisdom-music-track-index-v1';

const MusicPlayer = () => {
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedMusicEnabled = localStorage.getItem(MUSIC_ENABLED_STORAGE_KEY);
    const savedTrackIndex = localStorage.getItem(MUSIC_TRACK_INDEX_STORAGE_KEY);

    if (savedMusicEnabled !== null) {
      setMusicEnabled(savedMusicEnabled === 'true');
    }

    if (savedTrackIndex !== null) {
      const parsedIndex = Number(savedTrackIndex);

      if (!Number.isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < PLAYLIST.length) {
        setCurrentTrackIndex(parsedIndex);
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
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.src = PLAYLIST[currentTrackIndex];
    audio.currentTime = 0;
    audio.volume = 0.03;

    if (musicEnabled) {
      audio.play().catch(() => {
        // autoplay may be blocked until user interacts with the page
      });
    }
  }, [currentTrackIndex, musicEnabled]);

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
      audio.play().catch(() => {
        // autoplay may still be blocked
      });
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
    <div className="flex items-center gap-2">
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
    </div>
  );
};

export default MusicPlayer;