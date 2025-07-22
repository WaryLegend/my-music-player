import { IconContext } from "react-icons";
import styles from "./Button.module.css";
function Button({
  titles = "",
  icon = null,
  type = "button",
  border = "",
  background = "",
  onClick,
}) {
  return (
    <button
      className={styles["btn-body"]}
      style={{ border: border, background: background }}
      type={type}
      onClick={onClick}
    >
      <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
        {icon}
        <p className={styles["btn-title"]}>{titles}</p>
      </IconContext.Provider>
    </button>
  );
}

export default Button;
