import styles from "./Header.module.css";
import NavBtn from "./NavBtn";
import SortByOperation from "./SortByOperation";
import ToggleSideBar from "./ToggleSideBar";

function Header() {
  return (
    <div className={styles.body}>
      <div className={styles.ct}>
        <ToggleSideBar styles={styles} />
        <NavBtn styles={styles} />
      </div>
      <SortByOperation styles={styles} />
    </div>
  );
}

export default Header;
