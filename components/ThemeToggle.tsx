"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_KEY = "evident-theme";

const getPreferredTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  return stored ?? (prefersDark ? "dark" : "light");
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getPreferredTheme);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      if (typeof window !== "undefined") {
        localStorage.setItem(THEME_KEY, next);
        document.documentElement.classList.toggle("dark", next === "dark");
      }
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-mist bg-white px-3 py-2 text-sm font-medium text-ink transition-colors hover:border-ink dark:border-[#2a2a2a] dark:bg-[#0f0f0f] dark:text-mist dark:hover:border-white"
      aria-label="Toggle theme"
    >
      <span
        className="h-2.5 w-2.5 rounded-full bg-ink shadow-[0_0_0_4px_rgba(0,0,0,0.05)] transition-colors dark:bg-white dark:shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"
        aria-hidden
      />
      <span
        aria-hidden
        suppressHydrationWarning
        className="text-base text-ink dark:text-mist"
      >
        {theme === "dark" ? "☀" : "☾"}
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
