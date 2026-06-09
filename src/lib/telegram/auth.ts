import crypto from "crypto";

export interface TelegramAuthPayload {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: string | number;
  hash: string;
}

export function verifyTelegramAuth(data: TelegramAuthPayload, botToken?: string) {
  if (!botToken) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN");
  }

  const { hash, ...rest } = data;
  const checkString = Object.keys(rest)
    .sort()
    .map((key) => `${key}=${(rest as Record<string, string | number>)[key]}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();
  const hmac = crypto.createHmac("sha256", secretKey).update(checkString).digest("hex");

  return hmac === hash;
}

