"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    setStatus("submitting");

    const res = await fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, company }),
    });
    const data: { ok: boolean; message?: string; error?: string } =
      await res.json();

    if (data.ok) {
      setStatus("success");
      setMessage(data.message ?? "You've been unsubscribed.");
    } else {
      setStatus("error");
      setMessage(data.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-center font-mono text-base text-cream italic">
        {message}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[420px] flex-col gap-4"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="spinoza@ethics.com"
        className="w-full rounded-full border border-gold/40 bg-white/5 px-8 py-4 text-center font-mono text-base text-cream italic outline-none placeholder:text-cream/40 focus:border-gold"
      />
      <input
        type="text"
        name="company"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full cursor-pointer rounded-full border border-gold/40 bg-white/5 px-8 py-4 text-center font-mono text-base text-cream italic transition hover:bg-[#490e0e] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Removing..." : "Unsubscribe"}
      </button>
      {status === "error" && (
        <p className="text-center font-mono text-sm text-gold italic">
          {message}
        </p>
      )}
    </form>
  );
}
