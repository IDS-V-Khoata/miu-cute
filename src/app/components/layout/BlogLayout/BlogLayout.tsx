import BlogLayoutShell from "./BlogLayoutShell";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <BlogLayoutShell>{children}</BlogLayoutShell>;
}
