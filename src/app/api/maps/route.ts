import { NextResponse } from "next/server";
const BASE_URL = "https://restcountries.com/v3.1";

export async function GET() {
    try {
        const response = await fetch(`${BASE_URL}/all?fields=name,flags,region`);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Countries API error:", error);
        return new Response(
            JSON.stringify({ error: "Countries failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function POST(request: Request) {
    const { name } = await request.json();
    try {
        const response = await fetch(`${BASE_URL}/name/${name}`);
        const data = await response.json();
        return NextResponse.json(data[0]);
    } catch (error) {
        console.error("Countries API error:", error);
        return new Response(
            JSON.stringify({ error: "Countries failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}



