import styles from "./Cards.module.css";
import Spinner from "../../components/spinner/Spinner";
import PlaylistItem from "./PlaylistItem";
import { useTracks } from "./useTracks";
import { useSortedTracks } from "../../Hooks/useSortedTracks";
import { usePlayList } from "../../Hooks/usePlayList";
import { useEffect } from "react";

function PlayList() {
  const { tracksData, isLoading } = useTracks();
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
      <ul className={styles["playlist-body"]}>
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

export default PlayList;
