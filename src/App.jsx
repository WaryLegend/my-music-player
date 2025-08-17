import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./utils/queryClient";

import Library from "./pages/Library/Library";
import Favorites from "./pages/Favorites/Favorites";
import PlayList from "./pages/Library/PlayList";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Login from "./pages/Auth/Login";
import AppLayout from "./pages/AppLayout";
import Trend from "./pages/Trend/Trend";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/app" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="library" replace />,
      },
      {
        path: "trending",
        element: <Trend />,
      },
      {
        path: "favorites",
        children: [
          {
            path: "tracks",
            element: <Favorites />,
          },
        ],
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "library/:playlistId",
        children: [
          {
            path: "tracks",
            element: <PlayList />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      {/* new technology of alert "react-hot-toast" */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            fontWeight: "500",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: " rgb(240, 240, 240)",
            color: " rgb(0, 33, 69)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
