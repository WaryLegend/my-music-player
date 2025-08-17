import { useSongAudio } from "../../Hooks/useSongAudio";
import { useVolume } from "./useVolume";
import styles from "./AudioController.module.css";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

function VolumeController() {
  const { audioRef } = useSongAudio();
  const { volume, isMuted, setVolume, toggleMute } = useVolume(audioRef);

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value) / 100; // Convert 0-100 to 0-1
    setVolume(newVolume);
  };

  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) return <FaVolumeMute onClick={toggleMute} />;
    if (volume < 0.5) return <FaVolumeDown onClick={toggleMute} />;
    return <FaVolumeUp onClick={toggleMute} />;
  };

  function handleWheel(e) {
    const step = 0.05; // 5% per scroll step
    let newVolume = volume;

    if (e.deltaY < 0) {
      // Scroll up → increase volume
      newVolume = Math.min(1, volume + step);
    } else {
      // Scroll down → decrease volume
      newVolume = Math.max(0, volume - step);
    }
    setVolume(newVolume);
  }

  return (
    <div className={styles.volumeSection}>
      <div className={styles.volumeWrapper} onWheel={handleWheel}>
        {renderVolumeIcon()}
        <input
          type="range"
          min={0}
          max={100} // UI uses 0-100
          value={isMuted ? 0 : volume * 100} // Convert 0-1 to 0-100
          className={styles.volumeSlider}
          orient="vertical"
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
}

export default VolumeController;
