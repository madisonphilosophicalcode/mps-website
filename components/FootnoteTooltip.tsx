"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

export default function FootnoteTooltip({
  tooltip,
  children,
}: {
  tooltip?: string;
  children?: ReactNode;
}) {
  const [hovered, setHovered] = useState(false);

  if (!tooltip) return <>{children}</>;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {children}
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 block max-w-[280px] min-w-[180px] -translate-x-1/2 rounded-[6px] bg-panel px-3 py-2 text-left leading-normal font-mono text-xs text-cream italic shadow-lg"
          >
            {tooltip}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
