import AppLayout from "@/components/layout/AppLayout/AppLayout";

export default function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
