/* eslint-disable react/prop-types */
import { usePlayback } from "../../Hooks/usePlayback";
import styles from "./SoundWave.module.css";

const Waves = ({ length = 40, color = "#1db954" }) => (
  <>
    {Array.from({ length: length }).map((_, i) => (
      <span
        key={i}
        className={styles["wave-bar"]}
        style={{
          animationDelay: `${(i % 10) * 0.1}s`,
          animationDuration: `${0.8 + Math.random() * 0.4}s`,
          backgroundColor: color,
        }}
      />
    ))}
  </>
);

function SoundWave({ children }) {
  const { isPlayed } = usePlayback();

  return <>{isPlayed && children}</>;
}

function Card() {
  return (
    <div
      className={styles["wave-animation"]}
      style={{
        position: "absolute",
        bottom: "1px",
        left: "8%",
        right: "8%",
      }}
    >
      {<Waves />}
    </div>
  );
}

function Custom({ style = {}, length, color = "" }) {
  return (
    <div className={styles["wave-animation"]} style={style}>
      {<Waves length={length} color={color} />}
    </div>
  );
}

SoundWave.Card = Card;
SoundWave.Custom = Custom;

export default SoundWave;
