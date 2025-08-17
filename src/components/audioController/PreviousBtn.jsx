/* eslint-disable react/prop-types */
import { FaStepBackward } from "react-icons/fa";
import { useSongActions } from "../../Hooks/useSongActions";
import IconButton from "../Button/IconButton";

function PreviousBtn({ styles }) {
  const { prevCurSong } = useSongActions();

  return (
    <IconButton
      className={styles.iconBtn}
      icon={<FaStepBackward />}
      onClick={prevCurSong}
      title={"Previous"}
    />
  );
}

export default PreviousBtn;
