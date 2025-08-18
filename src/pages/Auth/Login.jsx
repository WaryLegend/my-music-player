import { loginWithSpotify } from "../../services/spotify";
import { useAuth } from "../../Hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import SpinnerV2 from "../../components/spinner/Spinner-v2";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles["login-page"]}>
      <img
        src="/Spotify_Logo_RGB_White.png"
        alt="logo-spotify"
        className={styles["logo"]}
      />
      {isLoading ? (
        <SpinnerV2 />
      ) : (
        <button className={styles["login-btn"]} onClick={loginWithSpotify}>
          <div>LOG IN</div>
        </button>
      )}
    </div>
  );
}
