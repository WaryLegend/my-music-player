import Spinner from "../../components/spinner/Spinner";
import styles from "./Favorites.module.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { usePlayList } from "../../Hooks/usePlayLists";

function Favorites() {
  const { getPlaylist, isLoading } = usePlayList();

  const likedPlaylist = getPlaylist("liked-songs");
  const songs = likedPlaylist?.tracks?.items?.map((item) => item.track) || [];

  return (
    <div className="screen-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className={styles["favorite-body"]}>
            {songs?.map((song) => (
              <div className={styles["song-card"]} key={song.id}>
                <img
                  src={song.album.images[0].url}
                  className={styles["song-image"]}
                  alt="song-Art"
                />
                <p className={styles["song-title"]}>{song.name}</p>
                <p className={styles["song-subtitle"]}>
                  Artist: {song.artists.map((artist) => artist.name).join(", ")}
                </p>
                <div className={styles["song-fade"]}>
                  <IconContext.Provider
                    value={{ size: "40px", color: "white" }}
                  >
                    <AiFillPlayCircle />
                  </IconContext.Provider>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
