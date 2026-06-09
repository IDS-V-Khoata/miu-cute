import { NextRequest, NextResponse } from "next/server";
import { getMessages } from "@/lib/telegram/store";
import { getSession } from "@/lib/telegram/session";

export async function GET(req: NextRequest) {
    const session = getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const chatIdParam = url.searchParams.get("chatId");

    if (!chatIdParam) {
        return NextResponse.json({ error: "chatId is required" }, { status: 400 });
    }

    const chatId = Number(chatIdParam);

    if (Number.isNaN(chatId)) {
        return NextResponse.json({ error: "chatId must be a number" }, { status: 400 });
    }

    const messages = getMessages(chatId);

    return NextResponse.json({ messages });
}

