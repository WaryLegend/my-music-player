/* eslint-disable react/prop-types */
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useParams } from "react-router-dom";
import { useSongState } from "../../Hooks/useSongState";
import { useSongActions } from "../../Hooks/useSongActions";
import { usePlayList } from "../../Hooks/usePlayList";
import styles from "./Cards.module.css";
import SoundWave from "../../components/soundwave/SoundWave";
import toast from "react-hot-toast";

function PlaylistItem({ song, sortedData }) {
  const { curSong, isPlayed } = useSongState();
  const { setCurSong, playCurSong } = useSongActions();
  const { curPlayList, setPlayList } = usePlayList();

  const { playlistId } = useParams();

  function handlePlaySong(song, boolen) {
    if (curSong !== song) setCurSong(song);

    if (sortedData?.id && curPlayList?.id !== sortedData.id) {
      setPlayList({
        id: sortedData.id,
        tracks: sortedData.tracks.items.map((item) => item.track),
      });
    }

    if (song.preview_url) {
      playCurSong(boolen);
    } else {
      playCurSong(false);
      toast.error("This track is currently unavailable!");
    }
  }

  function handleKeyDown(e) {
    if (e.key === " " || e.key === "Spacebar") {
      // Prevent default scrolling behavior
      e.preventDefault();
      handlePlaySong(song, curSong?.id === song.id && isPlayed ? false : true);
    }
  }

  return (
    <li
      tabIndex={0}
      className={`${styles["song-card"]} ${
        curSong?.id === song.id && curPlayList?.id === playlistId
          ? styles["active"]
          : ""
      }`}
      onKeyDown={handleKeyDown}
    >
      <img
        src={song.album?.images[0]?.url}
        className={styles["song-image"]}
        alt={`Album art for ${song.name}`}
      />
      <p className={styles["song-title"]}>{song.name}</p>
      <p className={styles["song-subtitle"]}>
        By: {song.artists.map((artist) => artist.name).join(", ")}
      </p>

      <div className={styles["song-fade"]}>
        <IconContext.Provider value={{ size: "40px", color: "white" }}>
          <div className={styles["icon-btn"]}>
            {curSong?.id === song.id && isPlayed ? (
              <AiFillPauseCircle onClick={() => handlePlaySong(song, false)} />
            ) : (
              <AiFillPlayCircle onClick={() => handlePlaySong(song, true)} />
            )}
          </div>
        </IconContext.Provider>
      </div>
      {curSong?.id === song.id && curPlayList?.id === playlistId && (
        <SoundWave>
          <SoundWave.Card />
        </SoundWave>
      )}
    </li>
  );
}

export default PlaylistItem;
