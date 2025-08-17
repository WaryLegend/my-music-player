/* eslint-disable react/prop-types */
import { IconContext } from "react-icons";
import styles from "./SideButton.module.css";
function SideButton({
  titles = "",
  icon = null,
  size = "",
  color = "",
  type = "button",
  onClick,
}) {
  return (
    <button
      className={styles[`btn-body`]}
      style={{ border: "none", background: "none" }}
      type={type}
      onClick={onClick}
    >
      <IconContext.Provider value={{ size: `${size}`, color: `${color}` }}>
        {icon}
        {titles && <p className={styles["btn-title"]}>{titles}</p>}
      </IconContext.Provider>
    </button>
  );
}

export default SideButton;
