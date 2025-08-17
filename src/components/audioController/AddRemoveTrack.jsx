import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import IconButton from "../Button/IconButton";
import stylesBtn from "./AudioButtons.module.css";
import { useAddToLikedTracks } from "./useAddToLikedTracks";
import { useRemoveTrack } from "./useRemoveTrack";
import { useCheckIsLiked } from "./useCheckIsLiked";
import SpinnerMini from "../spinner/SpinnerMini";

// eslint-disable-next-line react/prop-types
function AddRemoveTrack({ trackid }) {
  const { isLiked, isLoading } = useCheckIsLiked(trackid);
  const { isAdding, addTrack } = useAddToLikedTracks();
  const { isRemoving, removeTrack } = useRemoveTrack();

  if (isLoading) return <SpinnerMini />;

  return (
    <IconButton
      className={`${stylesBtn.iconBtn} ${isLiked ? stylesBtn.isLiked : ""}`}
      icon={
        isLiked ? (
          <FaCheckCircle onClick={() => removeTrack(trackid)} />
        ) : (
          <FaPlusCircle onClick={() => addTrack(trackid)} />
        )
      }
      title={isLiked ? "remove from library" : "add to library"}
      disabled={isLoading || isAdding || isRemoving}
    />
  );
}

export default AddRemoveTrack;
