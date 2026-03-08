"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/constants";
import { useThemeStore } from "@/stores/theme-store";

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    if (theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Syncing DOM class with React state
      setIsDark(prefersDark);
      html.classList.toggle("dark", prefersDark);

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
        html.classList.toggle("dark", e.matches);
      };
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      const dark = theme === "dark";
       
      setIsDark(dark);
      html.classList.toggle("dark", dark);
    }
  }, [theme]);

  function toggleTheme() {
    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass" aria-label="Main navigation">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="gradient-text font-heading text-xl font-bold"
        >
          AM
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="gradient-bg absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side: Theme toggle + Mobile hamburger */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          {/* Mobile hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="glass overflow-hidden md:hidden"
          >
            <div className="flex flex-col px-4 py-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
