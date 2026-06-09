import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/telegram/session";

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const allCookies = cookieHeader ? cookieHeader.split(";").map(c => c.trim()) : [];
    const sessionCookie = allCookies.find(c => c.startsWith("tg_session="));

    console.log("GET /api/telegram/me - Cookie header:", cookieHeader ? "present" : "missing");
    console.log("All cookies:", allCookies);
    console.log("Session cookie found:", !!sessionCookie);

    const session = getSession();
    if (!session) {
      console.log("Session check failed. Session cookie:", sessionCookie ? "exists but invalid" : "not found");
      return NextResponse.json(
        {
          authenticated: false,
          error: "No valid session",
          debug: {
            hasCookieHeader: !!cookieHeader,
            cookieCount: allCookies.length,
            hasSessionCookie: !!sessionCookie,
          }
        },
        { status: 401 }
      );
    }

    console.log("Session valid for user:", session.id);
    return NextResponse.json({ authenticated: true, user: session });
  } catch (err) {
    console.error("Error in /api/telegram/me:", err);
    return NextResponse.json({ authenticated: false, error: "Server error" }, { status: 500 });
  }
}


