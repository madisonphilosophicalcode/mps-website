import { NextResponse } from "next/server";

// Sanity Studio is only meant to be used locally, against the same remote
// dataset the deployed site reads from — it isn't meant to be reachable on
// the public production domain at all, not even as a login screen.
export function proxy() {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not Found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};
