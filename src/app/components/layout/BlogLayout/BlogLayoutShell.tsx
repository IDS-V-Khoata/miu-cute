"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, type ReactNode } from "react";
import Header from "./Header";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

const Modal = dynamic(() => import("@/components/Modals"), {
  ssr: false,
});

interface BlogLayoutShellProps {
  children: ReactNode;
}

export default function BlogLayoutShell({ children }: BlogLayoutShellProps) {
  const [isShowNotifications, setIsShowNotifications] = useState(false);

  const handleShowNotifications = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsShowNotifications(true);
  }, []);

  const handleCloseNotifications = useCallback(() => {
    setIsShowNotifications(false);
  }, []);

  return (
    <div className="wrapp-layout" onClick={handleCloseNotifications}>
      <Header showNotifications={handleShowNotifications} />
      <div className="min-h-[calc(100vh-75px)] pt-[67px] bg-slate-50">
        <main>
          <LeftBar />
          <div className="wrapper-content text-center">{children}</div>
          <RightBar />
        </main>
      </div>
      <Modal
        isOpen={isShowNotifications}
        onCloseModal={handleCloseNotifications}
        title=""
      />
    </div>
  );
}
