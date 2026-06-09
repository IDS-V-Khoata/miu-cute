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
export async function POST() {
    const apiKey = process.env.LOGIN_API_KEY;
    try {
        const response = await fetch("https://reqres.in/api/users", {
            method: "POST",
            headers: {
                // 'Content-Type': 'application/json',
                'x-api-key': `${apiKey}`
            },
            // body: JSON.stringify({
            //     name: 'John Doe',
            //     job: 'Developer'
            // })
        });
        const data = await response.json();
        console.log("https://reqres.in/api/users ===>", data)
        return NextResponse.json(data);
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
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Lỗi khi gọi OpenAI API" }, { status: 500 });
    }
}