import styles from "./AudioButtons.module.css";
import ShuffleBtn from "./ShuffleBtn";
import PreviousBtn from "./PreviousBtn";
import NextBtn from "./NextBtn";
import RepeatBtn from "./RepeatBtn";
import PlayBtn from "./PlayBtn";

function AudioButtons() {
  return (
    <div className={styles.buttonsRow}>
      <ShuffleBtn styles={styles} />

      <PreviousBtn styles={styles} />

      <PlayBtn styles={styles} />

      <NextBtn styles={styles} />

      <RepeatBtn styles={styles} />
    </div>
  );
}

export default AudioButtons;
