import styles from "./Header.module.css";
import NavBtn from "./NavBtn";
import SortByOperation from "./SortByOperation";

function Header() {
  return (
    <div className={styles.body}>
      <NavBtn styles={styles} />
      <SortByOperation styles={styles} />
    </div>
  );
}

export default Header;
