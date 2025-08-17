import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { IconContext } from "react-icons";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className={`main-body ${styles.center}`}>
      <div className={styles.notfound}>
        <h1>Page not found 😢</h1>
        <button className={styles["btn-back"]} onClick={() => navigate(-1)}>
          <IconContext.Provider value={{ size: "24px" }}>
            {<IoArrowBackOutline />}
          </IconContext.Provider>
          Go back
        </button>
      </div>
    </div>
  );
}
