"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export interface ListUserProps {
  name: string;
  link: string;
  avatar: string;
  status: boolean;
  isActive?: boolean;
}

interface ChatContextValue {
  selectedUser: ListUserProps | null;
  isChatOpen: boolean;
  selectChat: (user: ListUserProps) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedUser, setSelectedUser] = useState<ListUserProps | null>(null);

  const selectChat = useCallback((user: ListUserProps) => {
    setSelectedUser(user);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        selectedUser,
        isChatOpen: Boolean(selectedUser?.isActive),
        selectChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
