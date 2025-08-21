import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className={`main-body ${styles.center}`}>
      <div className={styles.notfound}>
        <h1 className={styles.oops}>Oops!</h1>
        <p className={styles.message}>404 - Page not found</p>
        <button
          className={styles["btn-back"]}
          onClick={() => navigate("/", { replace: true })}
        >
          <IconContext.Provider value={{ size: "20px" }}>
            <IoArrowBackOutline />
          </IconContext.Provider>
          Go to home
        </button>
      </div>
    </div>
  );
}
