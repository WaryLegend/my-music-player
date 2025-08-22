import { Outlet } from "react-router-dom";
import { SongProvider } from "../contexts/SongContext";
import SideBar from "../components/sidebar/SideBar";
import Header from "../components/Header/Header";
import AudioController from "../components/audioController/AudioController";
import { SidebarProvider } from "../contexts/SideBarContext";

function AppLayout() {
  return (
    <div className="main-body">
      <SidebarProvider>
        <SideBar />
        <main className="outlet-container">
          <SongProvider>
            <Header />
            <Outlet />
            <AudioController />
          </SongProvider>
        </main>
      </SidebarProvider>
    </div>
  );
}

export default AppLayout;
