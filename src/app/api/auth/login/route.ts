// app/api/login/route.ts
// import axios from "axios";
// export const runtime = "nodejs"; // Quan trọng để axios hoạt động đúng
import { NextResponse } from "next/server";

// ---- Types ---- //
// interface LoginRequestBody {
//     email: string;
//     password: string;
// }

// interface ReqResLoginResponse {
//     token: string;
// }

// ---- Handler ---- //
const EMAIL = "admin@gmail.com";
const PASSWORD = "123456";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (email !== EMAIL || password !== PASSWORD) {
            return NextResponse.json(
                { success: false, message: "Sai tài khoản hoặc mật khẩu" },
                { status: 401 }
            );
        }

        const response = NextResponse.json({
            success: true,
        });

        response.cookies.set("auth-token", "logged-in", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60,
        });

        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Lỗi khi gọi OpenAI API" }, { status: 500 });
    }

    // const apiKey = process.env.LOGIN_API_KEY;
    // try {
    //     const response = await fetch("https://reqres.in/api/users", {
    //         method: "POST",
    //         headers: {
    // 'Content-Type': 'application/json',
    // 'x-api-key': `${apiKey}`
    // },
    // body: JSON.stringify({
    //     name: 'John Doe',
    //     job: 'Developer'
    // })
    // });
    // const data = await response.json();
    // console.log("https://reqres.in/api/users ===>", data)
    // return NextResponse.json(data);
    // const body = (await req.json()) as LoginRequestBody;

    // const response = await axios.post<ReqResLoginResponse>(
    //     "https://reqres.in/api/login",
    //     {
    //         email: body.email,
    //         password: body.password,
    //     }
    // );

    // return Response.json(
    //     {
    //         success: true,
    //         token: response.data.token,
    //     },
    //     { status: 200 }
    // );
    // } catch (error) {
    //     console.log(error);
    //     return NextResponse.json({ error: "Lỗi khi gọi OpenAI API" }, { status: 500 });
    // }
}