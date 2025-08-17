import { useEffect } from "react";
import Spinner from "../../components/spinner/Spinner";
import { usePlayList } from "../../Hooks/usePlayList";
import { useSortedTracks } from "../../Hooks/useSortedTracks";
import styles from "../Library/Cards.module.css";
import { useLikeTracks } from "./useLikeTracks";
import PlaylistItem from "../Library/PlaylistItem";

function Favorites() {
  const { tracksData, isLoading } = useLikeTracks();
  const { sortedTracks } = useSortedTracks(tracksData);

  const { curPlayList, setPlayList } = usePlayList();

  useEffect(() => {
    if (!sortedTracks) return;
    const { id, tracks, sortBy } = sortedTracks;

    if (curPlayList?.id === id && curPlayList?.sortBy !== sortBy) {
      setPlayList({
        id: id,
        tracks: tracks?.items?.map((item) => item.track),
      });
    } else return;
  }, [sortedTracks, curPlayList?.id, curPlayList?.sortBy, setPlayList]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <ul className={styles["favorite-body"]}>
        {sortedTracks?.tracks?.items?.map((song) => (
          <PlaylistItem
            song={song.track}
            sortedData={sortedTracks}
            key={song.track.id}
          />
        ))}
      </ul>
    </>
  );
}

export default Favorites;
