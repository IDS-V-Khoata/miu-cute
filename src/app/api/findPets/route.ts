import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { finder, limit } = await request.json();
        const numberLimit = limit ? 10 : 1;
        if (finder === "all") {
            const urls = [
                `https://api.thecatapi.com/v1/images/search?limit=${numberLimit}`,
                `https://api.thedogapi.com/v1/images/search?limit=${numberLimit}`,
            ];

            const responses = await Promise.all(
                urls.map((url) =>
                    fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }).then((res) => res.json())
                )
            );

            const result = responses.flat();

            return NextResponse.json(result);
        }
        const url =
            finder === "cat"
                ? `https://api.thecatapi.com/v1/images/search?limit${numberLimit}`
                : `https://api.thedogapi.com/v1/images/search?limit${numberLimit}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Lỗi khi gọi OpenAI API" }, { status: 500 });
    }
}