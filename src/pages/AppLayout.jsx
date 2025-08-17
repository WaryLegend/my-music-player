import { Outlet } from "react-router-dom";
import { SongProvider } from "../contexts/SongContext";
import SideBar from "../components/sidebar/SideBar";
import Header from "../components/Header/Header";
import AudioController from "../components/audioController/AudioController";

function AppLayout() {
  return (
    <div className="main-body">
      <SideBar />
      <main className="screen-container">
        <SongProvider>
          <Header />
          <Outlet />
          <AudioController />
        </SongProvider>
      </main>
    </div>
  );
}

export default AppLayout;
