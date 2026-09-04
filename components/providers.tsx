"use client";

import React, { useState, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query-client";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        {mounted && (
          <>
            <Toaster richColors position="top-right" />
            <ReactQueryDevtools initialIsOpen={false} />
          </>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
