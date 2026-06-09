import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "This is a protected API route",
      user: {
        id: session.user.sub,
        email: session.user.email,
        name: session.user.name,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Protected API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
