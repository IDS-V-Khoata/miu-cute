import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const apiKey = process.env.OPENAI_API_KEY;
    try {
        const { prompt } = await req.json();

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Lỗi khi gọi OpenAI API" }, { status: 500 });
    }
}
