import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/telegram/session";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie");
    const allCookies = cookies().getAll();
    const sessionCookie = cookies().get("tg_session");
    const session = getSession();

    return NextResponse.json({
      debug: {
        cookieHeader: cookieHeader || "No cookie header",
        allCookies: allCookies.map((c) => ({ name: c.name, hasValue: !!c.value })),
        sessionCookie: sessionCookie ? { name: sessionCookie.name, hasValue: !!sessionCookie.value } : "Not found",
        session: session ? { id: session.id, username: session.username } : null,
        env: {
          hasBotToken: !!process.env.TELEGRAM_BOT_TOKEN,
          hasSessionSecret: !!process.env.AUTH_SESSION_SECRET,
          botId: process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID,
        },
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Unknown error",
        stack: err instanceof Error ? err.stack : undefined,
      },
      { status: 500 }
    );
  }
}
