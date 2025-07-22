import { useAuth } from "../../Hooks/useAuth";
import Spinner from "../spinner/Spinner";
import styles from "./SideBar.module.css";

function User() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.profile}>
      <img
        src={user?.images?.[0]?.url}
        className={styles["profile-img"]}
        alt="profile"
      />
      <span>{user?.display_name}</span>
    </div>
  );
}

export default User;
