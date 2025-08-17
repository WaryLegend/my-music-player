import { useProgress } from "./useProgress";
import { formatTime } from "../../utils/helper";
import styles from "./AudioController.module.css";

function ProgressController() {
  const { currentTime, duration, seekTo } = useProgress();

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    seekTo(newTime);
  };

  return (
    <div className={styles.progressSection}>
      <span>{formatTime(currentTime)}</span>
      <input
        type="range"
        min={0}
        max={duration || 100} // Fallback if duration is 0
        value={currentTime}
        className={styles.progressSlider}
        onChange={handleSeek}
        disabled={duration === 0}
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
}

export default ProgressController;
