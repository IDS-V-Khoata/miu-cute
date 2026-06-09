"use client";

import Modal from "@/components/Modals";
// import { useState } from "react";
import Header from "./Header";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import { useState } from "react";

interface BlogLayoutProps {
    children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
    const [isShowNotifications, setIsShowNotifications] = useState(false);

    const handleShowNotifications = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsShowNotifications(true);
    }

    return (
        <div className="wrapp-layout">
            <Header showNotifications={handleShowNotifications} />
            <div className="min-h-[calc(100vh-75px)] pt-[67px] bg-slate-50">
                <main className="">
                    <LeftBar />
                    <div className="wrapper-content text-center">
                        {children}
                    </div>
                    <RightBar />
                </main>
            </div>
            <Modal isOpen={isShowNotifications} onCloseModal={() => setIsShowNotifications(false)} />
        </div>
    )
}