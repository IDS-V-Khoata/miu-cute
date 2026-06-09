import { NextRequest, NextResponse } from "next/server";
import { getMessages, onMessage, TelegramMessage } from "@/lib/telegram/store";
import { getSession } from "@/lib/telegram/session";

const encoder = new TextEncoder();

function formatEvent(event: unknown) {
    return encoder.encode(`data: ${JSON.stringify(event)}\n\n`);
}

export async function GET(req: NextRequest) {
    const session = getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const chatId = Number(url.searchParams.get("chatId"));
    const hasChatId = !Number.isNaN(chatId);

    const stream = new ReadableStream({
        start(controller) {
            const send = (event: unknown) => controller.enqueue(formatEvent(event));

            const unsubscribe = onMessage((message: TelegramMessage) => {
                if (hasChatId && message.chatId !== chatId) return;
                send({ type: "message", payload: message });
            });

            // send initial snapshot for current chat
            if (hasChatId) {
                send({ type: "history", payload: getMessages(chatId) });
            }

            // heartbeat to keep connection alive on proxies
            const heartbeat = setInterval(() => {
                controller.enqueue(encoder.encode(": ping\n\n"));
            }, 25000);

            const abort = () => {
                clearInterval(heartbeat);
                unsubscribe();
                controller.close();
            };

            req.signal.addEventListener("abort", abort);
        },
        cancel() {
            // no-op: handled via abort above
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
        },
    });
}

