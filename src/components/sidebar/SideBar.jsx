import { MdFavorite, MdSpaceDashboard } from "react-icons/md";
import { FaGripfire, FaPlay, FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { useAuth } from "../../Hooks/useAuth";
import styles from "./SideBar.module.css";
import SideBarNav from "./SideBarNav";
import User from "./User";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={styles["sidebar-container"]}>
      <User />
      <div>
        <SideBarNav titles="Feed" to="feed" icon={<MdSpaceDashboard />} />
        <SideBarNav titles="Trending" to="trending" icon={<FaGripfire />} />
        <SideBarNav titles="Player" to="player" icon={<FaPlay />} />
        <SideBarNav titles="Favorites" to="favorites" icon={<MdFavorite />} />
        <SideBarNav titles="Library" to="library" icon={<IoLibrary />} />
      </div>
      <Button
        titles="Sign out"
        icon={<FaSignOutAlt />}
        border="none"
        background="none"
        onClick={() => {
          logout();
          localStorage.removeItem("access_token");
          navigate("/login", { replace: true });
        }}
      />
    </div>
  );
}
