import { useState, useEffect } from "react";
import { useSongAudio } from "../../Hooks/useSongAudio";

export function useVolume() {
  const audioRef = useSongAudio();
  const [volume, setVolumeState] = useState(
    parseFloat(localStorage.getItem("volume-setting")) || 1
  ); // 0 to 1 for audio
  const [isMuted, setIsMuted] = useState(false);

  // Sync volume with audioRef
  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
    localStorage.setItem("volume-setting", volume);
  }, [volume, isMuted, audioRef]);

  const setVolume = (newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume)); // Clamp 0-1
    setVolumeState(clampedVolume);
    setIsMuted(clampedVolume === 0);
  };

  const toggleMute = () => {
    if (volume === 0 && isMuted) setVolumeState(0.1);
    setIsMuted((prev) => !prev);
  };

  return {
    volume,
    isMuted,
    setVolume,
    toggleMute,
  };
}
