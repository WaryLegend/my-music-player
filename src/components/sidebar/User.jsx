/* eslint-disable react/prop-types */
import { useAuth } from "../../Hooks/useAuth";
import Spinner from "../spinner/Spinner";
import DefaultAvatar from "./DefaultAvatar";
import styles from "./SideBar.module.css";

function User() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;

  const imgUrl = user?.images?.[0]?.url;

  const name = user?.display_name;

  return (
    <div className={styles.profile}>
      {imgUrl ? (
        <img
          className={styles["profile-avatar"]}
          src={imgUrl}
          alt={`${name}'s avatar`}
        />
      ) : (
        <DefaultAvatar name={name} />
      )}
      <p>{name}</p>
    </div>
  );
}

export default User;
