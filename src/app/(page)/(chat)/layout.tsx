import ChatLayout from "@/components/layout/ChatLayout/ChatLayout";

export default function ChatRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatLayout>{children}</ChatLayout>;
}
