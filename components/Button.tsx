import Link from "next/link";
import type { ReactNode } from "react";

export default function Button({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-block rounded-[5px] bg-maroon px-2.5 py-1.5 font-mono text-13 text-cream italic transition-all duration-300 ease-out hover:scale-[1.04] hover:bg-maroon/85 hover:shadow-lg active:scale-[0.98] sm:px-3.5 sm:py-2 sm:text-base ${className}`}
    >
      {children}
    </Link>
  );
}
