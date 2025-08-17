/* eslint-disable react/prop-types */
import styles from "./Cards.module.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { usePlayList } from "../../Hooks/usePlayList";

function LibraryItem({ playlist: { id, images, name, tracks } }) {
  const { curPlayList } = usePlayList();

  const navigate = useNavigate();

  function handlePlayListNavitgation(id) {
    if (id === "liked-songs") navigate("/app/favorites/tracks");
    else {
      navigate(`/app/library/${id}/tracks`);
    }
  }

  return (
    <li
      tabIndex={0}
      className={`${styles["tracks-card"]} ${
        curPlayList?.id === id ? styles.active : ""
      }`}
      onClick={() => handlePlayListNavitgation(id)}
    >
      <img
        src={images[0].url}
        className={styles["tracks-image"]}
        alt="Tracks-Art"
      />
      <p className={styles["tracks-title"]}>{name}</p>
      <p className={styles["tracks-subtitle"]}>{tracks.total} Songs</p>
      <div className={styles["tracks-fade"]}>
        <IconContext.Provider value={{ size: "40px", color: "white" }}>
          <AiFillPlayCircle />
        </IconContext.Provider>
      </div>
    </li>
  );
}

export default LibraryItem;
