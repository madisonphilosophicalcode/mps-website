import { NextResponse } from "next/server";
import { subscribeEmail } from "@/lib/googleSheets";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeRequestBody {
  email?: string;
  company?: string;
}

export async function POST(request: Request): Promise<Response> {
  const body: SubscribeRequestBody = await request.json();

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const email = body.email?.trim() ?? "";
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const result = await subscribeEmail(email);
    const message =
      result === "already_subscribed"
        ? "You're already on the list."
        : "You're subscribed. Welcome to MPS.";
    return NextResponse.json({ ok: true, message });
  } catch (error) {
    console.error("Failed to subscribe email", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
