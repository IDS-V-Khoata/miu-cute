"use client";

import { usePathname } from "next/navigation";
import { PAGE_TITLES } from "./pageTitles";

interface PageTitleProps {
  title?: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  const pathname = usePathname();
  const resolvedTitle = title ?? PAGE_TITLES[pathname] ?? "Chưa có title";

  return <h1 className="text-3xl font-semibold mb-4">{resolvedTitle}</h1>;
}
