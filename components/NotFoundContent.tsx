import Button from "@/components/Button";

export default function NotFoundContent() {
  return (
    <div className="flex w-full flex-col items-center gap-6 px-6 py-16 text-center sm:py-24">
      <p
        className="font-serif leading-none text-ink italic"
        style={{ fontSize: "clamp(64px, 20vw, 100px)" }}
      >
        404
      </p>
      <p className="font-mono text-base text-ink/70 italic">
        I think this page exists, therefore it does.
      </p>
      <Button href="/" className="mt-2">
        Back Home
      </Button>
    </div>
  );
}
