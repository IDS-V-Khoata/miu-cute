import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    console.log("PATH:", request.nextUrl.pathname);

    const token = request.cookies.get("auth-token");

    console.log("TOKEN:", token?.value);
    if (!token) {
        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // "/miu-cute",
        // "/miu-cute/:path*",
        // "/upload-image",
        // "/upload-image/:path*",
    ],
};