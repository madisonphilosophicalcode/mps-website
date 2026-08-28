"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { BioLink } from "@/data/links";

export default function LinkButton({ link }: { link: BioLink }) {
  return (
    <motion.a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.03, backgroundColor: "#490e0e" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex w-full items-center justify-center gap-3 rounded-full border border-gold/40 bg-white/5 px-8 py-4 text-center font-mono text-base text-cream italic"
    >
      {link.image && (
        <span className="relative size-[28px] shrink-0 overflow-hidden rounded-full">
          <Image
            src={link.image}
            alt=""
            fill
            sizes="28px"
            className="object-cover"
          />
        </span>
      )}
      {link.label}
    </motion.a>
  );
}
