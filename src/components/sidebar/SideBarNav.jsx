import { NavLink } from "react-router-dom";
import styles from "./SideBarNav.module.css";
import { IconContext } from "react-icons";

function SideBarNav({ titles, to, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles["nav-body"]} ${styles.active}` : styles["nav-body"]
      }
    >
      <IconContext.Provider value={{ size: "24px", className: "nav-icon" }}>
        {icon}
        <p className={styles["nav-title"]}>{titles}</p>
      </IconContext.Provider>
    </NavLink>
  );
}

export default SideBarNav;
