import { MdFavorite } from "react-icons/md";
import { FaGripfire } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";
import styles from "./SideBar.module.css";
import SideBarNav from "./SideBarNav";
import User from "./User";
import LogoutBtn from "./LogoutBtn";

export default function SideBar() {
  return (
    <div className={styles["sidebar-container"]}>
      <User />
      <div>
        {/* <SideBarNav titles="Feed" to="feed" icon={<MdSpaceDashboard />} /> */}
        <SideBarNav titles="Trending" to="trending" icon={<FaGripfire />} />
        {/* <SideBarNav titles="Player" to="player" icon={<FaPlay />} /> */}
        <SideBarNav
          titles="Favorites"
          to="favorites/tracks"
          icon={<MdFavorite />}
        />
        <SideBarNav titles="Library" to="library" icon={<BsMusicNoteList />} />
      </div>
      <LogoutBtn />
    </div>
  );
}
