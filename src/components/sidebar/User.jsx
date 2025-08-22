/* eslint-disable react/prop-types */
import { FaExternalLinkAlt, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../Hooks/useAuth";
import Menus from "../Menus/Menus";
import Spinner from "../spinner/Spinner";
import DefaultAvatar from "./DefaultAvatar";
import styles from "./SideBar.module.css";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

function User() {
  const { user, isLoading } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className={styles.profile}>
        <Spinner />
      </div>
    );

  const imgUrl = user?.images?.[0]?.url;

  const name = user?.display_name;

  return (
    <div className={styles.profile}>
      <Menus>
        <Menus.Menu>
          <Menus.Toggle id={user?.id} type="div">
            <div>
              {imgUrl ? (
                <img
                  className={styles["profile-avatar"]}
                  src={imgUrl}
                  alt={`${name}'s avatar`}
                />
              ) : (
                <DefaultAvatar name={name} />
              )}
            </div>
          </Menus.Toggle>

          <Menus.List id={user?.id}>
            <Menus.Button
              icon={<FaExternalLinkAlt />}
              category="link"
              onClick={() => {
                window.open(
                  "https://www.spotify.com/account/overview/",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              Account
            </Menus.Button>

            <Menus.Button onClick={() => {}}>Profile</Menus.Button>

            <Menus.Button
              icon={<FaExternalLinkAlt />}
              category="link"
              onClick={() => {
                window.open(
                  "https://support.spotify.com/",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              Support
            </Menus.Button>
            <Menus.Button
              icon={<FaSignOutAlt />}
              category="log-out"
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
            >
              Log out
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </Menus>

      <p>{name}</p>
    </div>
  );
}

export default memo(User);
