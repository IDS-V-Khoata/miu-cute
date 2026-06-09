import { NextRequest, NextResponse } from "next/server";
import { addMessage, upsertChat } from "@/lib/telegram/store";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: "Missing TELEGRAM_BOT_TOKEN" }, { status: 500 });
  }

  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Invalid webhook secret" }, { status: 401 });
  }

  const update = await req.json();
  const message = update.message ?? update.edited_message ?? update.channel_post;

  if (!message) {
    return NextResponse.json({ ok: true });
  }

  const chat = message.chat;
  upsertChat({
    id: chat.id,
    title: chat.title,
    type: chat.type,
    username: chat.username,
    first_name: chat.first_name,
    last_name: chat.last_name,
  });

  addMessage({
    id: String(message.message_id ?? message.update_id ?? Date.now()),
    chatId: chat.id,
    from: message.from
      ? {
          id: message.from.id,
          first_name: message.from.first_name,
          last_name: message.from.last_name,
          username: message.from.username,
          is_bot: message.from.is_bot,
        }
      : undefined,
    text: message.text ?? message.caption ?? "",
    date: message.date ? message.date * 1000 : Date.now(),
    direction: "in",
  });

  return NextResponse.json({ ok: true });
}

