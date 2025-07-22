import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <div className={`main-body ${styles.center}`}>
      <div className={styles.notfound}>
        <h1>Page not found 😢</h1>
      </div>
    </div>
  );
}
