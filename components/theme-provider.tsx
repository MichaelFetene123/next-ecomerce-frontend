"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

// Suppress false-positive React 19 development warnings caused by third-party scripts or extensions
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const origError = console.error;
  const isIgnorable = (...args: unknown[]): boolean => {
    for (const arg of args) {
      if (typeof arg === "string") {
        if (
          arg.includes("Encountered a script tag while rendering React component") ||
          arg.includes("bis_skin_checked") ||
          arg.includes("kiilhncajadbgbmdbdcopdpnmdhlbdle")
        ) {
          return true;
        }
      } else if (arg instanceof Error) {
        if (
          arg.message.includes("bis_skin_checked") ||
          (arg.stack && (arg.stack.includes("bis_skin_checked") || arg.stack.includes("kiilhncajadbgbmdbdcopdpnmdhlbdle")))
        ) {
          return true;
        }
      } else if (typeof arg === "object" && arg !== null) {
        try {
          const str = JSON.stringify(arg);
          if (str.includes("bis_skin_checked") || str.includes("kiilhncajadbgbmdbdcopdpnmdhlbdle")) {
            return true;
          }
        } catch {
          // ignore circular JSON errors
        }
      }
    }

    const stack = new Error().stack;
    if (stack && (stack.includes("kiilhncajadbgbmdbdcopdpnmdhlbdle") || stack.includes("bis_skin_checked"))) {
      return true;
    }

    return false;
  };

  console.error = (...args: unknown[]) => {
    if (isIgnorable(...args)) {
      return;
    }
    origError.apply(console, args);
  };
}

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (!event.key || event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider }
