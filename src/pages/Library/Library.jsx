import styles from "./Library.module.css";
import { AiFillPlayCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Spinner from "../../components/spinner/Spinner";
import { usePlayList } from "../../Hooks/usePlayLists";

function Library() {
  const { playlists, isLoading, error } = usePlayList();

  if (error) {
    return (
      <div className="screen-container error">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="screen-container">
      {isLoading && <Spinner />}
      {!isLoading && !error && (
        <div className={styles["library-body"]}>
          {playlists?.map((playlist) => (
            <div
              className={styles["playlist-card"]}
              key={playlist.id}
              onClick={() => {}}
            >
              <img
                src={playlist.images[0].url}
                className={styles["playlist-image"]}
                alt="Playlist-Art"
              />
              <p className={styles["playlist-title"]}>{playlist.name}</p>
              <p className={styles["playlist-subtitle"]}>
                {playlist.tracks.total} Songs
              </p>
              <div className={styles["playlist-fade"]}>
                <IconContext.Provider value={{ size: "40px", color: "white" }}>
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
