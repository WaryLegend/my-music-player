import styles from "./Cards.module.css";
import LibraryItem from "./LibraryItem";
import Spinner from "../../components/spinner/Spinner";
import { useLibrary } from "./useLibrary";

function Library() {
  const { playlists, isLoading } = useLibrary();

  if (isLoading) return <Spinner />;

  return (
    <ul className={styles["library-body"]}>
      {playlists?.map((playlist) => (
        <LibraryItem playlist={playlist} key={playlist.id} />
      ))}
    </ul>
  );
}

export default Library;
