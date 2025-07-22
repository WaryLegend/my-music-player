import { loginWithSpotify } from "./spotify";
import styles from "./Login.module.css";
import { useAuth } from "../../Hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles["login-page"]}>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="logo-spotify"
        className={styles["logo"]}
      />
      <button className={styles["login-btn"]} onClick={loginWithSpotify}>
        <div>LOG IN</div>
      </button>
    </div>
  );
}
