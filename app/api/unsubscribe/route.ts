import { NextResponse } from "next/server";
import { unsubscribeEmail } from "@/lib/googleSheets";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UnsubscribeRequestBody {
  email?: string;
  company?: string;
}

export async function POST(request: Request): Promise<Response> {
  const body: UnsubscribeRequestBody = await request.json();

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
    await unsubscribeEmail(email);
    return NextResponse.json({
      ok: true,
      message: "If that email was on our list, it's been removed.",
    });
  } catch (error) {
    console.error("Failed to unsubscribe email", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
