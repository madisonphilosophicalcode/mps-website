"use client";

import ErrorContent from "@/components/ErrorContent";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-bg">
      <ErrorContent error={error} retry={retry} />
    </div>
  );
}
