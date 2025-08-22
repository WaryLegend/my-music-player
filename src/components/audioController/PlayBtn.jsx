/* eslint-disable react/prop-types */
import { usePlayback } from "../../Hooks/usePlayback";
import { FaPause, FaPlay } from "react-icons/fa";
import IconButton from "../Button/IconButton";
import toast from "react-hot-toast";
import { useSongActions } from "../../Hooks/useSongActions";

function PlayBtn({ styles }) {
  const { curSong, isPlayed } = usePlayback();
  const { playCurSong } = useSongActions();

  function handlePlaySong(boolen) {
    if (curSong.preview_url) {
      playCurSong(boolen);
    } else {
      playCurSong(false);
      toast.error("This track is currently unavailable!");
    }
  }

  return (
    <IconButton
      className={`${styles.playBtn} ${isPlayed ? styles.active : ""}`}
      icon={isPlayed ? <FaPause /> : <FaPlay />}
      onClick={() => handlePlaySong(!isPlayed)}
      title={`${isPlayed ? "Pause" : "Play"}`}
      disabled={!curSong}
    />
  );
}

export default PlayBtn;
