"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { useCheckDevice } from "@/app/customHook/useCheckDevice";
import Header from "./Header";
import Sidebar from "./Sidebar";
import PageTitle from "./PageTitle";
import {
  SIDEBAR_WIDTH_COLLAPSED,
  SIDEBAR_WIDTH_EXPANDED,
} from "./constants";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
  ssr: false,
});

const Modal = dynamic(() => import("@/components/Modals"), {
  ssr: false,
});

interface AppLayoutShellProps {
  titlePage?: string;
  footer: ReactNode;
  children: ReactNode;
}

export default function AppLayoutShell({
  titlePage,
  footer,
  children,
}: AppLayoutShellProps) {
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  const [isShowNotifications, setIsShowNotifications] = useState(false);
  const { isMobile } = useCheckDevice();

  useEffect(() => {
    if (isMobile) {
      setIsShowSidebar(true);
    }
  }, [isMobile]);

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

  const handleDismissNotifications = useCallback(() => {
    setIsShowNotifications(false);
  }, []);

  return (
    <div
      className="wrapp-layout flex"
      onClick={handleDismissNotifications}
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
        <div className="pt-20 px-4 flex-1">
          <PageTitle title={titlePage} />
          <main>{children}</main>
        </div>
        {footer}
      </div>
      <ScrollToTop />
      <Modal
        isOpen={isShowNotifications}
        onCloseModal={handleCloseNotifications}
        title=""
      />
    </div>
  );
}
