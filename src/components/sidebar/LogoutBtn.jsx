import { FaSignOutAlt } from "react-icons/fa";
import SideButton from "./SideButton";
import { useAuth } from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <SideButton
      titles="Sign out"
      size="20px"
      icon={<FaSignOutAlt />}
      onClick={() => {
        logout();
        navigate("/login", { replace: true });
      }}
    />
  );
}

export default LogoutBtn;
