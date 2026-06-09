import { NextResponse } from "next/server";
import { getChats } from "@/lib/telegram/store";
import { getSession } from "@/lib/telegram/session";

export async function GET() {
    const session = getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ chats: getChats() });
}

