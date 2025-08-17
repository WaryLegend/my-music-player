/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import styles from "./SideBarNav.module.css";

function SideBarNav({ titles, to, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles["nav-body"]} ${styles.active}` : styles["nav-body"]
      }
    >
      <span className={styles["nav-icon"]}>{icon}</span>
      <p className={styles["nav-title"]}>{titles}</p>
    </NavLink>
  );
}

export default SideBarNav;
