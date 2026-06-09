import { EventEmitter } from "events";

export interface TelegramUser {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    is_bot?: boolean;
}

export interface TelegramChat {
    id: number;
    title?: string;
    type?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
}

export interface TelegramMessage {
    id: string;
    chatId: number;
    from?: TelegramUser;
    text?: string;
    date?: number;
    direction: "in" | "out";
}

type StoreShape = {
    chats: Map<number, TelegramChat>;
    messages: Map<number, TelegramMessage[]>;
    emitter: EventEmitter;
};

const globalStore = globalThis as typeof globalThis & {
    __TELEGRAM_STORE__?: StoreShape;
};

if (!globalStore.__TELEGRAM_STORE__) {
    globalStore.__TELEGRAM_STORE__ = {
        chats: new Map(),
        messages: new Map(),
        emitter: new EventEmitter(),
    };
}

const store = globalStore.__TELEGRAM_STORE__;

export function upsertChat(chat: TelegramChat) {
    const existing = store.chats.get(chat.id) || {};
    store.chats.set(chat.id, { ...existing, ...chat });
}

export function addMessage(message: TelegramMessage) {
    const messages = store.messages.get(message.chatId) || [];
    messages.push(message);
    store.messages.set(message.chatId, messages.slice(-200)); // cap memory
    store.emitter.emit("message", message);
}

export function getChats(): TelegramChat[] {
    return Array.from(store.chats.values());
}

export function getMessages(chatId: number): TelegramMessage[] {
    return store.messages.get(chatId) || [];
}

export function onMessage(
    listener: (message: TelegramMessage) => void
): () => void {
    store.emitter.on("message", listener);
    return () => store.emitter.off("message", listener);
}

// Đoạn này dùng để lưu và quản lý các dữ liệu liên quan đến chat và message Telegram ở phía server-side (hoặc môi trường Node.js).
// Nó sử dụng một biến global để đảm bảo store được dùng chung nhiều nơi, tránh bị khởi tạo lại khi hot reload (trong Next.js hoặc dev).
// Có các hàm thao tác:
// - upsertChat: Thêm hoặc cập nhật thông tin chat vào store.
// - addMessage: Thêm message vào danh sách, chỉ giữ tối đa 200 message gần nhất cho mỗi chat.
// - getChats: Lấy danh sách tất cả các chat đã lưu.
// - getMessages: Lấy danh sách message của một chat theo id.
// - onMessage: Lắng nghe sự kiện khi có message mới được thêm vào.
//
// Store này đóng vai trò như một bộ nhớ tạm để phục vụ các thao tác realtime/chat với Telegram trên backend.
