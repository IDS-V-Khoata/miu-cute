import { NextRequest, NextResponse } from "next/server";
import { verifyTelegramAuth, TelegramAuthPayload } from "@/lib/telegram/auth";
import { setSession } from "@/lib/telegram/session";

export async function POST(req: NextRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return NextResponse.json({ error: "Missing TELEGRAM_BOT_TOKEN" }, { status: 500 });
  }

  let payload: TelegramAuthPayload;
  try {
    payload = (await req.json()) as TelegramAuthPayload;
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const isValid = verifyTelegramAuth(payload, botToken);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const authDateMs = Number(payload.auth_date) * 1000;
  const maxAgeMs = 24 * 60 * 60 * 1000;
  if (Number.isNaN(authDateMs) || Date.now() - authDateMs > maxAgeMs) {
    return NextResponse.json({ error: "Auth data expired" }, { status: 401 });
  }

  try {
    setSession({
      id: payload.id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      username: payload.username,
      photo_url: payload.photo_url,
      auth_date: Number(payload.auth_date),
    });

    const response = NextResponse.json({ ok: true, user: { id: payload.id, username: payload.username } });
    console.log("Login successful for user:", payload.id);
    return response;
  } catch (err) {
    console.error("Error setting session:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to create session";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


