/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import IconButton from "../Button/IconButton";

function NavBtn({ styles }) {
  const navigate = useNavigate();

  return (
    <div className={styles.box}>
      <IconButton
        className={styles.iconBtn}
        icon={<IoIosArrowBack />}
        onClick={() => navigate(-1)}
        title="Back"
      />
      <IconButton
        className={styles.iconBtn}
        icon={<IoIosArrowForward />}
        onClick={() => navigate(1)}
        title="Forward"
      />
    </div>
  );
}

export default NavBtn;
