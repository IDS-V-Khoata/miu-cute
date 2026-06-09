// import { NextRequest, NextResponse } from "next/server";
// import { translateText } from "@/api/lib/translate";

// export async function POST(req: NextRequest) {
//     try {
//         const { text, targetLang } = await req.json();
//         if (!text || !targetLang) {
//             return NextResponse.json(
//                 { error: "Vui lòng cung cấp văn bản và ngôn ngữ đích" },
//                 { status: 400 }
//             );
//         }

//         const translated = await translateText(text, targetLang);
//         return NextResponse.json({ translated });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Dịch thất bại" }, { status: 500 });
//     }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { translateText } from "@/api/lib/translate";

// export async function POST(req: NextRequest) {
//     try {
//         const { text, targetLang } = await req.json();
//         console.log("Dữ liệu nhận được:", { text, targetLang }); // Log để kiểm tra

//         if (!text || typeof text !== "string") {
//             return NextResponse.json({ error: "Văn bản không hợp lệ" }, { status: 400 });
//         }
//         if (!targetLang || typeof targetLang !== "string") {
//             return NextResponse.json({ error: "Ngôn ngữ đích không hợp lệ" }, { status: 400 });
//         }

//         const translated = await translateText(text, targetLang);
//         return NextResponse.json({ translated }, { status: 200 });
//     } catch (error) {
//         console.error("Lỗi trong API Route:", error);
//         return NextResponse.json(
//             { error: "Lỗi dịch văn bản", details: (error as Error).message },
//             { status: 500 }
//         );
//     }
// }

const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;

export async function POST(req: Request) {
    try {
        const { text, targetLang } = await req.json();

        if (!text || !targetLang) {
            return new Response(
                JSON.stringify({ error: "Missing parameters" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        if (!GOOGLE_TRANSLATE_API_KEY) {
            return new Response(
                JSON.stringify({ error: "Missing API Key" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        // 🌍 Gọi Google Cloud Translate API
        const response = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    q: text, // Văn bản cần dịch
                    target: targetLang, // Ngôn ngữ đích
                }),
            }
        );

        const data = await response.json();
        if (!response.ok) {
            console.error("Google Translate API Error:", data);
            return new Response(
                JSON.stringify({ error: "Translation failed" }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        const translatedText = data.data.translations[0].translatedText; // Lấy nội dung đã dịch

        return new Response(
            JSON.stringify({ translatedText }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Translation API error:", error);
        return new Response(
            JSON.stringify({ error: "Translation failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}





