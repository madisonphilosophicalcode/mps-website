"use client";

import { useEffect } from "react";
import Button from "@/components/Button";

export default function ErrorContent({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex w-full flex-col items-center gap-6 px-6 py-16 text-center sm:py-24">
      <p className="font-serif text-5xl text-ink italic sm:text-6xl">
        Something Went Wrong
      </p>
      <p className="font-mono text-base text-ink/70 italic">
        An unexpected error occurred. Even Socrates didn&rsquo;t know
        everything.
      </p>
      <div className="mt-2 flex items-center gap-4">
        <button
          type="button"
          onClick={retry}
          className="cursor-pointer rounded-[5px] border border-ink/20 px-2.5 py-1.5 font-mono text-13 text-ink italic transition-all duration-300 ease-out hover:scale-[1.04] hover:border-maroon hover:text-maroon sm:px-3.5 sm:py-2 sm:text-base"
        >
          Try Again
        </button>
        <Button href="/">Back Home</Button>
      </div>
    </div>
  );
}
