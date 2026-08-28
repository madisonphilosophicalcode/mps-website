"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import type { GalleryImage } from "@/data/gallery";
import GalleryPlaceholder from "@/components/gallery/GalleryPlaceholder";

interface SlotStyle {
  left: string;
  top: string;
  width: string;
  height: string;
  opacity: number;
  scale: number;
  [key: string]: string | number;
}

const CENTER: SlotStyle = {
  left: "29.11%",
  top: "4.58%",
  width: "44.10%",
  height: "95.42%",
  opacity: 1,
  scale: 1,
};

const RIGHT: SlotStyle = {
  left: "62.51%",
  top: "0%",
  width: "37.49%",
  height: "81.11%",
  opacity: 0.3,
  scale: 1,
};

const LEFT: SlotStyle = {
  left: "0%",
  top: "0%",
  width: "37.49%",
  height: "81.11%",
  opacity: 0.3,
  scale: 1,
};

const HIDDEN_RIGHT: SlotStyle = {
  ...RIGHT,
  left: "100%",
  opacity: 0,
  scale: 0.85,
};

const HIDDEN_LEFT: SlotStyle = {
  ...LEFT,
  left: "-37.49%",
  opacity: 0,
  scale: 0.85,
};

function slotFor(role: number, count: number): SlotStyle {
  if (role === 0) return CENTER;
  if (role === 1) return RIGHT;
  if (role === count - 1) return LEFT;
  if (role <= count / 2) return HIDDEN_RIGHT;
  return HIDDEN_LEFT;
}

function zIndexFor(role: number, count: number): number {
  if (role === 0) return 3;
  if (role === 1 || role === count - 1) return 2;
  return 1;
}

export default function Carousel({ images }: { images: GalleryImage[] }) {
  const [centerIndex, setCenterIndex] = useState(0);
  const count = images.length;

  return (
    <div className="relative mx-auto aspect-[907/524] w-full max-w-[907px] overflow-hidden">
      {images.map((image, i) => {
        const role = (i - centerIndex + count) % count;
        const slot = slotFor(role, count);
        const isSide = role === 1 || role === count - 1;

        return (
          <motion.div
            key={image.label + i}
            animate={slot}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", zIndex: zIndexFor(role, count) }}
            className={isSide ? "cursor-pointer" : ""}
            onClick={isSide ? () => setCenterIndex(i) : undefined}
          >
            <div className="size-full overflow-hidden rounded-[8px]">
              <GalleryPlaceholder label={image.label} src={image.src} />
            </div>
          </motion.div>
        );
      })}
      <motion.button
        type="button"
        aria-label="Previous photo"
        onClick={() => setCenterIndex((centerIndex - 1 + count) % count)}
        whileHover={{ scale: 1.25, x: -3 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-[53.44%] left-[24.37%] z-10 h-[9.35%] w-[2.2%] cursor-pointer"
      >
        <Image src="/images/arrow-left.svg" alt="" fill sizes="24px" />
      </motion.button>
      <motion.button
        type="button"
        aria-label="Next photo"
        onClick={() => setCenterIndex((centerIndex + 1) % count)}
        whileHover={{ scale: 1.25, x: 3 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-[53.44%] left-[77.95%] z-10 h-[9.35%] w-[2.2%] cursor-pointer"
      >
        <Image
          src="/images/arrow-left.svg"
          alt=""
          fill
          sizes="24px"
          className="rotate-180"
        />
      </motion.button>
    </div>
  );
}
