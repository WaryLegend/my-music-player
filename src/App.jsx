import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PlayListProvider } from "./contexts/PlayListContext";
import { useAuth } from "./Hooks/useAuth";
import ProtectedRoute from "./pages/ProtectedRoute";

import Login from "./pages/Auth/Login";
import AppLayout from "./pages/AppLayout";
import Library from "./pages/Library/Library";
import Player from "./pages/Player/Player";
import Trending from "./pages/Trending/Trending";
import Feed from "./pages/Feed/Feed";
import Favorites from "./pages/Favorites/Favorites";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SpinnerFullPage from "./components/spinner/SpinnerFullPage";

export default function App() {
  const { isLoading } = useAuth();

  if (isLoading) return <SpinnerFullPage />;

  return (
    <PlayListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route index element={<Navigate replace to={"/app"} />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="library" />} />
            <Route path="library" element={<Library />} />
            <Route path="player" element={<Player />} />
            <Route path="trending" element={<Trending />} />
            <Route path="feed" element={<Feed />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </PlayListProvider>
  );
}
