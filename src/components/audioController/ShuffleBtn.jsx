/* eslint-disable react/prop-types */
import { useSongActions } from "../../Hooks/useSongActions";
import { useSongState } from "../../Hooks/useSongState";
import { FaRandom } from "react-icons/fa";
import IconButton from "../Button/IconButton";

function ShuffleBtn({ styles }) {
  const { isShuffled } = useSongState();
  const { setIsShuffled } = useSongActions();

  return (
    <IconButton
      className={`${styles.iconBtn} ${isShuffled ? styles.active : ""}`}
      icon={<FaRandom />}
      onClick={() => setIsShuffled()}
      title={`${isShuffled ? "Disable Shuffle" : "Enable Shuffle"}`}
    />
  );
}

export default ShuffleBtn;
