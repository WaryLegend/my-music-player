import { usePlayback } from "../../Hooks/usePlayback";
import styles from "./AudioController.module.css";
import AddRemoveTrack from "./AddRemoveTrack";

function CurrentSong() {
  const { curSong } = usePlayback();

  if (!curSong) return;

  return (
    <div className={styles["cursong-body"]} tabIndex="0">
      <img
        src={
          curSong
            ? curSong.album?.images[0]?.url
            : "https://misc.scdn.co/liked-songs/liked-songs-640.png"
        }
        alt="current-song"
      />
      <div className={styles["song-info"]}>
        <p className={styles["song-title"]}>
          {curSong ? curSong.name : "Song name"}
        </p>
        <p className={styles["song-subtitle"]}>
          {curSong
            ? curSong.artists?.map((artist) => artist.name).join(", ")
            : "_____"}
        </p>
      </div>
      <div className={styles["add-btn-ct"]}>
        <AddRemoveTrack trackid={curSong.id} />
      </div>
    </div>
  );
}

export default CurrentSong;
