import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = await fetch(`https://ghibliapi.vercel.app/films`);

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Translation API error:", error);
        return new Response(
            JSON.stringify({ error: "Translation failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}





