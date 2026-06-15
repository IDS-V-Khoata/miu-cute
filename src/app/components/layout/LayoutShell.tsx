// components/layout/LayoutShell.tsx

"use client";
import Header from "@/components/layout/AppLayout/Header"
import Sidebar from "@/components/layout/AppLayout/Sidebar"
import Modal from "@/components/Modals";

import { useState } from "react";

export default function LayoutShell() {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isShowNotifications, setIsShowNotifications] = useState(false);

    const handleShowSidebar = () => {
        setIsShowSidebar(!isShowSidebar);
    }

    const handleShowNotifications = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsShowNotifications(true);
    }

    return (
        <>
            <Sidebar isShowSidebar={isShowSidebar} />

            <div
                className={`${isShowSidebar ? "ml-[60px]" : "ml-[256px]"} wrapper h-screen flex flex-col flex-1 w-full transition-all duration-500 ease-linear`}
            >
                <Header isShowSidebar={isShowSidebar} toggleSidebar={handleShowSidebar} showNotifications={handleShowNotifications} />
            </div>
            <Modal isOpen={isShowNotifications} onCloseModal={() => setIsShowNotifications(false)} title={""} />
        </>
    );
}