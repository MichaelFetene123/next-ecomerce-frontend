import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,                   // Fresh network fetch on every mount
      refetchOnWindowFocus: false,     // Disabled automatic refetching on tab/window focus
      retry: 1,
    },
  },
});
