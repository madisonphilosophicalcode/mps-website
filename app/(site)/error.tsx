"use client";

import ErrorContent from "@/components/ErrorContent";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return <ErrorContent error={error} retry={retry} />;
}
