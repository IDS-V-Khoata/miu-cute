import BlogLayout from "@/components/layout/BlogLayout/BlogLayout";

export default function BlogRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogLayout>{children}</BlogLayout>;
}
