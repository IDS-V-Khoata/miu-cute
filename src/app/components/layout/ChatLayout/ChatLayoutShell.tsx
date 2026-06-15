"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, type ReactNode } from "react";
import Header from "../AppLayout/Header";
import Footer from "../AppLayout/Footer";
import Sidebar from "../AppLayout/Sidebar";
import RightBar from "./RightBar";
import {
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
} from "../AppLayout/constants";

const Modal = dynamic(() => import("@/components/Modals"), {
  ssr: false,
});

interface ChatLayoutShellProps {
  children: ReactNode;
}

export default function ChatLayoutShell({ children }: ChatLayoutShellProps) {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [isShowNotifications, setIsShowNotifications] = useState(false);

  const handleShowSidebar = useCallback(() => {
    setIsShowSidebar((prev) => !prev);
  }, []);

  const handleShowNotifications = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsShowNotifications(true);
  }, []);

  const handleCloseNotifications = useCallback(() => {
    setIsShowNotifications(false);
  }, []);

  return (
    <div
      className="wrapp-layout flex"
      onClick={handleCloseNotifications}
    >
      <Sidebar isShowSidebar={isShowSidebar} />
      <div
        className={`${isShowSidebar ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED} wrapper h-screen flex flex-col flex-1 transition-all duration-500 ease-linear`}
      >
        <Header
          isShowSidebar={isShowSidebar}
          toggleSidebar={handleShowSidebar}
          showNotifications={handleShowNotifications}
        />
        <div className="flex flex-1">
          <div className="pt-20 px-4 flex-1">
            <main className="flex flex-col gap-8 h-full">{children}</main>
          </div>
          <RightBar isShowRightBar={isShowSidebar} />
        </div>
        <Footer />
      </div>
      <Modal
        isOpen={isShowNotifications}
        onCloseModal={handleCloseNotifications}
        title="ChatLayout"
      />
    </div>
  );
}
