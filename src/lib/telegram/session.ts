import crypto from "crypto";
import { cookies } from "next/headers";

export type TelegramSession = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
};

const SESSION_COOKIE = "tg_session";
const MAX_AGE_SECONDS = 60 * 60 * 24; // 1 day

function getSecret() {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (!secret) {
    console.error("Missing AUTH_SESSION_SECRET environment variable");
    throw new Error("Missing AUTH_SESSION_SECRET");
  }
  return secret;
}

function sign(payload: TelegramSession) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function verify(token?: string): TelegramSession | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as TelegramSession;
    // optional: basic freshness check
    if (Date.now() - Number(payload.auth_date) * 1000 > MAX_AGE_SECONDS * 1000) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function setSession(payload: TelegramSession) {
  try {
    const token = sign(payload);
    const cookieStore = cookies();

    // Xác định secure flag dựa trên môi trường
    // Nếu đang chạy trên HTTPS hoặc production thì secure = true
    const isSecure = process.env.NODE_ENV === "production" || process.env.FORCE_SECURE_COOKIE === "true";

    cookieStore.set({
      name: SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax", // Cho phép cookie được gửi trong same-site requests
      secure: isSecure,
      maxAge: MAX_AGE_SECONDS,
      path: "/",
      // Không set domain để cookie hoạt động với mọi subdomain và port
    });

    console.log("Session set successfully for user:", payload.id, {
      secure: isSecure,
      sameSite: "lax",
      maxAge: MAX_AGE_SECONDS,
    });
  } catch (err) {
    console.error("Error setting session:", err);
    throw err;
  }
}

export function clearSession() {
  cookies().set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export function getSession(): TelegramSession | null {
  try {
    const token = cookies().get(SESSION_COOKIE)?.value;
    if (!token) {
      return null;
    }
    return verify(token);
  } catch (err) {
    console.error("Error getting session:", err);
    return null;
  }
}


