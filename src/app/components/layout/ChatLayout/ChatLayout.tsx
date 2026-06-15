import { ChatProvider } from "./ChatContext";
import ChatLayoutShell from "./ChatLayoutShell";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <ChatProvider>
      <ChatLayoutShell>{children}</ChatLayoutShell>
    </ChatProvider>
  );
}
