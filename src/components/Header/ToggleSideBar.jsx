import { TbLayoutSidebar, TbLayoutSidebarFilled } from "react-icons/tb";
import IconButton from "../Button/IconButton";
import { useSidebar } from "../../Hooks/useSidebar";

/* eslint-disable react/prop-types */
function ToggleSideBar({ styles }) {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div className={styles.box}>
      <IconButton
        className={styles.iconBtn}
        icon={isOpen ? <TbLayoutSidebarFilled /> : <TbLayoutSidebar />}
        onClick={toggleSidebar}
        title="Back"
      />
    </div>
  );
}

export default ToggleSideBar;
