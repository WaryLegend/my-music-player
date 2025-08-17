import styles from "./AudioController.module.css";
import SoundWave from "../soundwave/SoundWave";
import AudioButtons from "./AudioButtons";
import VolumeController from "./VolumeController";
import ProgressController from "./ProgressController";
import CurrentSong from "./CurrentSong";
import { useSongAudio } from "../../Hooks/useSongAudio";

function AudioController() {
  const audioRef = useSongAudio();

  return (
    <div className={styles.body}>
      <CurrentSong />

      <div className={styles["controller-body"]}>
        <AudioButtons />
        <div className={styles.slider}>
          <ProgressController />
          <VolumeController />
        </div>
      </div>

      <audio ref={audioRef} hidden />

      <SoundWave>
        <SoundWave.Custom
          style={{
            position: "absolute",
            bottom: "0",
            left: "8%",
            right: "8%",
          }}
          length={100}
          color="var(--color-blue-500)"
        />
      </SoundWave>
    </div>
  );
}

export default AudioController;
