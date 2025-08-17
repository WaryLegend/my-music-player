/* eslint-disable react/prop-types */
import { useSongState } from "../../Hooks/useSongState";
import { useSongActions } from "../../Hooks/useSongActions";
import { FaRepeat } from "react-icons/fa6";
import IconButton from "../Button/IconButton";

function RepeatBtn({ styles }) {
  const { isRepeated } = useSongState();
  const { setIsRepeated } = useSongActions();

  return (
    <IconButton
      className={`${styles.iconBtn} ${isRepeated ? styles.active : ""}`}
      icon={<FaRepeat />}
      onClick={() => setIsRepeated()}
      title={`${isRepeated ? "Disable repeat" : "Enable repeat"}`}
    />
  );
}

export default RepeatBtn;
