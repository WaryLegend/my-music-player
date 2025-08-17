/* eslint-disable react/prop-types */
import { FaStepForward } from "react-icons/fa";
import { useSongActions } from "../../Hooks/useSongActions";
import IconButton from "../Button/IconButton";

function NextBtn({ styles }) {
  const { nextCurSong } = useSongActions();

  return (
    <IconButton
      className={styles.iconBtn}
      icon={<FaStepForward />}
      onClick={nextCurSong}
      title={"Next"}
    />
  );
}

export default NextBtn;
