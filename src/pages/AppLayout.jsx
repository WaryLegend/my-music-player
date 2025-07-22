import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";

function AppLayout() {
  return (
    <div className="main-body">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
