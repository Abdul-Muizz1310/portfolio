"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { useThemeStore } from "@/stores/theme-store";

function formatTime(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function StatusBar() {
  const pathname = usePathname();
  const { theme } = useThemeStore();
  const [time, setTime] = useState(formatTime);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(formatTime());
    const interval = setInterval(() => {
      setTime(formatTime());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const currentNav = NAV_LINKS.find((link) => link.href === pathname);
  const currentPath = currentNav?.path ?? "~";

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      mounted &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const themeIndicator = isDark ? "☾ dark" : "☀ light";

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex h-7 items-center justify-between border-t border-border bg-surface px-4 font-mono text-[0.75rem] text-foreground-muted">
      {/* Left side */}
      <div className="flex items-center gap-1 truncate">
        <span className="text-accent-cyan">◉</span>
        <span className="hidden sm:inline">abdul-muizz.dev · </span>
        <span>{currentPath}</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        <span className="hidden sm:inline">UTF-8 · </span>
        <span>{themeIndicator}</span>
        <span className="hidden sm:inline"> · {mounted ? time : ""}</span>
        <span className="animate-pulse"> ▊</span>
      </div>
    </footer>
  );
}
