import { useAuth } from "../../Hooks/useAuth";
import Spinner from "../spinner/Spinner";
import styles from "./SideBar.module.css";

function User() {
  const { user, isLoading } = useAuth();

  return (
    <div className={styles.profile}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <img
            src={user?.images?.[0]?.url}
            className={styles["profile-img"]}
            alt="profile"
          />
          <p>{user?.display_name}</p>
        </>
      )}
    </div>
  );
}

export default User;
