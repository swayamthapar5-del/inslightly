"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-10 w-20 rounded-full border border-slate-200 bg-white p-1 shadow-soft dark:border-slate-700 dark:bg-slate-900"
      aria-label="Toggle theme"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs text-white dark:bg-slate-100 dark:text-ink"
        style={{ x: isDark ? 32 : 0 }}
      >
        {isDark ? "M" : "L"}
      </motion.span>
    </button>
  );
}
