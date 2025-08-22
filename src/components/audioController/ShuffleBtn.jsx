/* eslint-disable react/prop-types */
import { useSongActions } from "../../Hooks/useSongActions";
import { useModeState } from "../../Hooks/useModeState";
import { FaRandom } from "react-icons/fa";
import IconButton from "../Button/IconButton";

function ShuffleBtn({ styles }) {
  const { isShuffled } = useModeState();
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
