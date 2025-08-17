import { useState, useEffect } from "react";
import { useSongAudio } from "../../Hooks/useSongAudio";

export function useProgress() {
  const audioRef = useSongAudio();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleLoadedMetadata = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef]);

  // Reset progress when song changes (detected via audio.src)
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setCurrentTime(0);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("loadeddata", handleLoadedData);
    return () => audio.removeEventListener("loadeddata", handleLoadedData);
  }, [audioRef]);

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return {
    currentTime,
    duration,
    seekTo,
  };
}
