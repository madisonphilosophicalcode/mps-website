"use client";

import { useTheme } from "next-themes";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative flex size-[28px] shrink-0 cursor-pointer items-center justify-center rounded-full text-ink transition-colors duration-300 hover:text-maroon"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute size-[20px] rotate-0 scale-100 opacity-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0 dark:opacity-0"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute size-[20px] rotate-90 scale-0 opacity-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100 dark:opacity-100"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    </motion.button>
  );
}
