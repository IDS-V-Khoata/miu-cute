import AppLayoutShell from "./AppLayoutShell";
import Footer from "./Footer";

interface AppLayoutProps {
  titlePage?: string;
  children: React.ReactNode;
}

export default function AppLayout({ titlePage, children }: AppLayoutProps) {
  return (
    <AppLayoutShell titlePage={titlePage} footer={<Footer />}>
      {children}
    </AppLayoutShell>
  );
}
