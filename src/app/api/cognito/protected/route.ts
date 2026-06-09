import { NextRequest, NextResponse } from "next/server";
import { cognitoConfig } from "@/lib/cognito/config";

// Simple JWT verification (trong production nên dùng AWS SDK hoặc jose library)
function decodeJWT(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      return null;
    }
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    return payload;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const payload = decodeJWT(token);

    if (!payload) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    // Verify token issuer (trong production cần verify signature)
    const expectedIssuer = `https://cognito-idp.${cognitoConfig.region}.amazonaws.com/${cognitoConfig.userPoolId}`;
    if (payload.iss !== expectedIssuer) {
      return NextResponse.json(
        { error: "Token issuer mismatch" },
        { status: 401 }
      );
    }

    // Check token expiration
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return NextResponse.json(
        { error: "Token expired" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "This is a protected API route with Cognito",
      user: {
        id: payload.sub,
        email: payload.email,
        username: payload["cognito:username"] || payload.preferred_username,
      },
      tokenInfo: {
        issuer: payload.iss,
        audience: payload.aud,
        expiresAt: payload.exp ? new Date(payload.exp * 1000).toISOString() : null,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cognito protected API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
