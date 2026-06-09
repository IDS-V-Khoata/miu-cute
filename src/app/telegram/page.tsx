"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "@/components/layout/AppLayout/AppLayout";

type Direction = "in" | "out";

type TelegramMessage = {
    id: string;
    chatId: number;
    from?: {
        id: number;
        first_name?: string;
        last_name?: string;
        username?: string;
        is_bot?: boolean;
    };
    text?: string;
    date?: number;
    direction: Direction;
};

type TelegramChat = {
    id: number;
    title?: string;
    type?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
};

export default function TelegramChatPage() {
    const [authenticated, setAuthenticated] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [error, setError] = useState<string>("");
    const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null);
    const [chatIdInput, setChatIdInput] = useState("");
    const [activeChatId, setActiveChatId] = useState<number | null>(null);
    const [messages, setMessages] = useState<TelegramMessage[]>([]);
    const [chats, setChats] = useState<TelegramChat[]>([]);
    const [text, setText] = useState("");
    const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle");
    const [sending, setSending] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/telegram/me", {
                    credentials: "include", // Đảm bảo gửi cookie
                });
                if (res.ok) {
                    setAuthenticated(true);
                    setError("");
                    // Load chats sau khi authenticated
                    try {
                        const chatsRes = await fetch("/api/telegram/chats", {
                            credentials: "include",
                        });
                        const data = await chatsRes.json();
                        if (chatsRes.ok) {
                            setChats(data.chats ?? []);
                        } else {
                            console.warn("Failed to load chats:", data.error);
                        }
                    } catch (err) {
                        console.warn("Error loading chats:", err);
                    }
                } else {
                    const errorData = await res.json().catch(() => ({}));
                    setAuthenticated(false);
                    if (res.status === 401) {
                        setError("Chưa đăng nhập. Vui lòng đăng nhập tại trang Login.");
                    } else {
                        setError(errorData.error ?? "Lỗi kiểm tra đăng nhập");
                    }
                }
            } catch (err) {
                console.error("Auth check error:", err);
                setAuthenticated(false);
                setError("Không thể kết nối đến server");
            } finally {
                setAuthChecked(true);
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    useEffect(() => {
        if (!activeChatId) return;
        if (!authenticated) return;

        const loadHistory = async () => {
            try {
                const res = await fetch(`/api/telegram/history?chatId=${activeChatId}`, {
                    credentials: "include",
                });
                const data = await res.json();
                if (res.ok) {
                    setMessages(data.messages ?? []);
                    setError("");
                } else {
                    if (res.status === 401) {
                        setAuthenticated(false);
                        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    } else {
                        setError(data.error ?? "Không tải được lịch sử");
                    }
                }
            } catch (err) {
                console.error("Load history error:", err);
                setError("Không tải được lịch sử");
            }
        };

        setStatus("connecting");
        loadHistory();

        // EventSource không hỗ trợ credentials trực tiếp, nhưng cookie sẽ được gửi tự động
        const es = new EventSource(`/api/telegram/stream?chatId=${activeChatId}`);
        eventSourceRef.current = es;

        es.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === "history" && Array.isArray(data.payload)) {
                    setMessages(data.payload);
                }
                if (data.type === "message" && data.payload) {
                    setMessages((prev) => [...prev, data.payload as TelegramMessage].slice(-200));
                }
                setStatus("connected");
            } catch {
                // ignore malformed event payloads
            }
        };

        es.onerror = () => {
            setStatus("error");
            setError("Kết nối realtime bị ngắt");
        };

        return () => {
            es.close();
            eventSourceRef.current = null;
            setStatus("idle");
        };
    }, [activeChatId, authenticated]);

    const sendMessage = async () => {
        if (!activeChatId || !text.trim()) return;
        setSending(true);
        setError("");
        try {
            const res = await fetch("/api/telegram/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ chatId: activeChatId, text }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                if (res.status === 401) {
                    setAuthenticated(false);
                    setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                } else {
                    setError(data.error ?? "Không thể gửi tin nhắn");
                }
            } else {
                setText("");
            }
        } catch (err) {
            console.error("Send message error:", err);
            setError("Không thể gửi tin nhắn");
        } finally {
            setSending(false);
        }
    };

    const statusLabel = useMemo(() => {
        if (status === "connected") return "Connected";
        if (status === "connecting") return "Connecting…";
        if (status === "error") return "Disconnected";
        return "Idle";
    }, [status]);

    const handleChooseChat = (id: number) => {
        setChatIdInput(String(id));
        setActiveChatId(id);
    };

    const handleConnect = () => {
        const parsed = Number(chatIdInput);
        if (!Number.isNaN(parsed)) {
            setActiveChatId(parsed);
        }
    };

    const handleDebug = async () => {
        try {
            const res = await fetch("/api/telegram/debug", { credentials: "include" });
            const data = await res.json();
            setDebugInfo(data);
            console.log("Debug info:", data);
        } catch (err) {
            console.error("Debug error:", err);
        }
    };

    return (
        <AppLayout titlePage="Telegram chat">
            <div className="mx-auto flex max-w-4xl flex-col gap-4 p-4">
                {!authChecked ? (
                    <div className="rounded border border-gray-200 bg-white p-4 shadow">
                        Đang kiểm tra đăng nhập...
                    </div>
                ) : !authenticated ? (
                    <div className="rounded border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 shadow">
                        <div className="mb-2 font-semibold">Bạn cần đăng nhập Telegram trước.</div>
                        {error && <div className="mb-2 text-red-600">Chi tiết: {error}</div>}
                        <div className="mb-2">
                            Chuyển tới trang{" "}
                            <a href="/auth/login" className="font-semibold underline hover:text-amber-900">
                                Login
                            </a>{" "}
                            để xác thực.
                        </div>
                        <button
                            onClick={handleDebug}
                            className="mt-2 rounded bg-gray-600 px-3 py-1 text-xs text-white hover:bg-gray-700"
                        >
                            Debug Info
                        </button>
                        {debugInfo && (
                            <pre className="mt-2 max-h-60 overflow-auto rounded bg-gray-100 p-2 text-xs">
                                {JSON.stringify(debugInfo, null, 2)}
                            </pre>
                        )}
                    </div>
                ) : null}

                {authenticated && (
                    <>
                        <div className="flex flex-col gap-2 rounded border border-gray-200 p-4 shadow">
                            <div className="flex flex-wrap items-end gap-2">
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-500">Chat ID</label>
                                    <input
                                        value={chatIdInput}
                                        onChange={(e) => setChatIdInput(e.target.value)}
                                        className="w-48 rounded border border-gray-300 px-2 py-1 text-sm"
                                        placeholder="123456"
                                    />
                                </div>
                                <button
                                    onClick={handleConnect}
                                    className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Connect
                                </button>
                                <span className="text-sm text-gray-600">Status: {statusLabel}</span>
                            </div>
                            {chats.length > 0 && (
                                <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                                    <span className="font-semibold text-gray-600">Recent chats:</span>
                                    {chats.map((chat) => (
                                        <button
                                            key={chat.id}
                                            onClick={() => handleChooseChat(chat.id)}
                                            className="rounded border border-gray-200 bg-gray-50 px-2 py-1 hover:bg-gray-100"
                                            title={chat.title ?? chat.username ?? String(chat.id)}
                                        >
                                            {chat.title ?? chat.username ?? chat.id}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 rounded border border-gray-200 p-4 shadow">
                            <div className="flex gap-2">
                                <input
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Type a message"
                                    className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
                                    disabled={!activeChatId || sending}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!activeChatId || sending || !text.trim()}
                                    className="rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                                >
                                    Send
                                </button>
                            </div>
                            <div className="h-[420px] overflow-y-auto rounded border border-gray-100 bg-white p-3">
                                {messages.length === 0 && (
                                    <div className="text-center text-sm text-gray-500">No messages yet</div>
                                )}
                                {error && <div className="text-sm text-red-600">{error}</div>}
                                <div className="flex flex-col gap-2">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.direction === "out" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[75%] rounded px-3 py-2 text-sm shadow ${msg.direction === "out" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                <div className="text-[10px] opacity-75">
                                                    {msg.from?.username ?? msg.from?.first_name ?? msg.direction.toUpperCase()}
                                                </div>
                                                <div>{msg.text}</div>
                                                {msg.date && (
                                                    <div className="text-[10px] opacity-75">
                                                        {new Date(msg.date).toLocaleTimeString()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={bottomRef} />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}

