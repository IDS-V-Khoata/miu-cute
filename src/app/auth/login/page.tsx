'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box } from "../../components/Form";
import { useTypingEffect } from "../../customHook/useTypingEffect";

declare global {
  interface Window {
    Telegram?: {
      Login?: {
        auth: (
          options: { bot_id: number; request_access?: "write" | "read" },
          callback: (user: any) => void
        ) => void;
      };
    };
  }
}

type TelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
};

export default function Login() {
  const router = useRouter();
  const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID;
  const { displayedText, showCursor } = useTypingEffect("Login with Telegram", 120);

  const [status, setStatus] = useState<"idle" | "loading" | "error" | "ready" | "authenticated">("idle");
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/telegram/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setStatus("authenticated");
        }
      } catch {
        // ignore
      }
    };
    checkSession();
  }, []);

  useEffect(() => {
    if (!botId) {
      setStatus("error");
      setError("Thiếu NEXT_PUBLIC_TELEGRAM_BOT_ID");
      return;
    }

    // load Telegram widget script
    const existing = document.querySelector('script[src="https://telegram.org/js/telegram-widget.js?22"]');
    if (existing) {
      setStatus("ready");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.onload = () => setStatus("ready");
    script.onerror = () => {
      setStatus("error");
      setError("Không tải được Telegram widget");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [botId]);

  const handleTelegramLogin = () => {
    if (!botId || !window.Telegram?.Login?.auth) {
      setError("Widget chưa sẵn sàng");
      setStatus("error");
      return;
    }
    setError("");
    setStatus("loading");

    window.Telegram.Login.auth(
      { bot_id: Number(botId), request_access: "write" },
      async (data: TelegramUser) => {
        try {
          const res = await fetch("/api/telegram/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Quan trọng: đảm bảo cookie được gửi và nhận
            body: JSON.stringify(data),
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            const errorMsg = errorData.error ?? "Đăng nhập thất bại";
            console.error("Login failed:", res.status, errorMsg);
            setError(errorMsg);
            setStatus("error");
            return;
          }

          const result = await res.json();
          console.log("Login successful:", result);

          // Kiểm tra cookie đã được set chưa
          const cookiesAfterLogin = document.cookie;
          console.log("Cookies after login:", cookiesAfterLogin);

          setUser(data);
          setStatus("authenticated");

          // Đợi một chút để đảm bảo cookie được set
          setTimeout(() => {
            router.push("/telegram");
          }, 100);
        } catch (err) {
          console.error("Login error:", err);
          setError("Đăng nhập thất bại: " + (err instanceof Error ? err.message : "Unknown error"));
          setStatus("error");
        }
      }
    );
  };

  const statusLabel = useMemo(() => {
    if (status === "authenticated") return "Đã đăng nhập";
    if (status === "loading") return "Đang xác thực…";
    if (status === "ready") return "Sẵn sàng";
    if (status === "error") return "Lỗi";
    return "Chờ";
  }, [status]);

  return (
    <div className="bg-[#e5eaf3] flex min-h-screen w-screen items-center justify-center">
      <main className="mx-auto flex flex-col gap-8">
        <Box className="bg-[#e5eaf3] w-md flex flex-col gap-6 rounded-lg border border-solid p-8 shadow-2xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image aria-hidden src="/assets/images/icon-logo.png" alt="Logo" width={60} height={60} />
            <h1 className="text-4xl font-bold">Telegram Login</h1>
            <p className="text-center text-gray-600">Xác thực qua Telegram Login Widget</p>
          </div>
          <p className="text-xl font-semibold">
            <span>{displayedText}</span>
            <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleTelegramLogin}
              disabled={status === "loading" || status === "authenticated"}
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {status === "loading" ? "Đang đăng nhập..." : "Đăng nhập với Telegram"}
            </button>
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Trạng thái:</span> {statusLabel}
            </div>
            {user && (
              <div className="rounded border border-gray-200 bg-white p-3 text-sm shadow">
                <div className="font-semibold">Thông tin:</div>
                <div>ID: {user.id}</div>
                <div>Username: {user.username ?? "-"}</div>
                <div>Tên: {[user.first_name, user.last_name].filter(Boolean).join(" ") || "-"}</div>
              </div>
            )}
            {error && <div className="text-sm text-red-600">Lỗi: {error}</div>}
          </div>
        </Box>
      </main>
    </div>
  );
}
