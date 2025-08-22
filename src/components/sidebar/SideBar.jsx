import { MdFavorite } from "react-icons/md";
import { FaGripfire } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";
import { useSidebar } from "../../Hooks/useSidebar";
import styles from "./SideBar.module.css";
import SideBarNav from "./SideBarNav";
import User from "./User";
import GitHubBtn from "./GitHubBtn";

const TrendingIcon = <FaGripfire />;
const FavoritesIcon = <MdFavorite />;
const LibraryIcon = <BsMusicNoteList />;

export default function SideBar() {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`${styles["sidebar-container"]} ${
        isOpen ? "" : styles.closed
      }`}
    >
      <User />
      <div>
        <SideBarNav titles="Trending" to="trending" icon={TrendingIcon} />
        <SideBarNav
          titles="Favorites"
          to="favorites/tracks"
          icon={FavoritesIcon}
        />
        <SideBarNav titles="Library" to="library" icon={LibraryIcon} />
      </div>
      <GitHubBtn />
    </div>
  );
}
