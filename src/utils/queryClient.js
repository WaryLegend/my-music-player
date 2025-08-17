import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime --> the data become "old"/"need to refresh(auto)" after a certain time
      // this "refresh" triggers when we switching to another browser tab or sleep
      staleTime: 60 * 1000 * 2, // refresh every 2 min
    },
  },
});
