import { NextRequest, NextResponse } from "next/server";
import { addMessage, upsertChat } from "@/lib/telegram/store";
import { getSession } from "@/lib/telegram/session";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function POST(req: NextRequest) {
  const session = getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!BOT_TOKEN) {
    return NextResponse.json({ error: "Missing TELEGRAM_BOT_TOKEN" }, { status: 500 });
  }

  const { chatId, text } = await req.json();

  if (!chatId || !text) {
    return NextResponse.json({ error: "chatId and text are required" }, { status: 400 });
  }

  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to send message", details: data }, { status: 500 });
  }

  const message = data.result;
  const chat = message?.chat;

  if (chat) {
    upsertChat({
      id: chat.id,
      title: chat.title,
      type: chat.type,
      username: chat.username,
      first_name: chat.first_name,
      last_name: chat.last_name,
    });
  }

  addMessage({
    id: String(message?.message_id ?? Date.now()),
    chatId,
    text,
    date: message?.date ? message.date * 1000 : Date.now(),
    direction: "out",
    from: message?.from
      ? {
          id: message.from.id,
          first_name: message.from.first_name,
          last_name: message.from.last_name,
          username: message.from.username,
          is_bot: message.from.is_bot,
        }
      : undefined,
  });

  return NextResponse.json({ ok: true, data });
}

