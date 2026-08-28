"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { navLinks } from "@/data/nav";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <nav
      className={`sticky top-0 z-50 flex w-full items-center justify-between bg-bg px-6 pt-6 pb-3 text-ink transition-[border-color] duration-200 sm:static sm:border-b-0 sm:px-25 ${open ? "border-b border-ink/10" : "border-b border-transparent"}`}
    >
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="font-serif text-22 font-medium tracking-[2px] italic transition-opacity duration-300 hover:opacity-70 sm:text-32 sm:tracking-[4.8px]"
      >
        MPS
      </Link>

      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hidden font-mono text-xl transition-colors duration-300 hover:text-maroon sm:block"
        >
          {link.label}
        </Link>
      ))}
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-3 sm:hidden">
        <ThemeToggle />
        <motion.button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          onClick={() => setOpen((o) => !o)}
          whileTap={{ scale: 0.88 }}
          className="flex size-[32px] cursor-pointer flex-col items-center justify-center gap-[5px]"
        >
          <motion.span
            animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-[22px] bg-ink"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1, x: open ? 8 : 0 }}
            transition={{ duration: 0.2 }}
            className="h-[2px] w-[22px] bg-ink"
          />
          <motion.span
            animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="h-[2px] w-[22px] bg-ink"
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 flex w-full flex-col items-center gap-5 bg-bg py-6 sm:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-lg text-ink transition-colors duration-300 hover:text-maroon"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
