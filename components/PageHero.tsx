export default function PageHero({ title }: { title: string }) {
  return (
    <div className="flex w-full items-center justify-center px-6">
      <h1
        className="text-center font-serif text-ink italic"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 100px)",
          letterSpacing: "clamp(0.2rem, 1vw, 15px)",
        }}
      >
        {title}
      </h1>
    </div>
  );
}
