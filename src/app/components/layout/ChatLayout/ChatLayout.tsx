"use client";

import { useState } from "react";
import Header from "../AppLayout/Header"
import Footer from "../AppLayout/Footer"
import Sidebar from "../AppLayout/Sidebar"
import RightBar from "./RightBar";
import Modal from "@/components/Modals";
import { type ListUserProps } from "./RightBar";

interface ChatLayoutProps {
    titlePage?: string;
    chatSelected: (itemSelected: ListUserProps) => void;
    children: React.ReactNode;
}

export default function ChatLayout({ titlePage = "Chưa có title", children, chatSelected }: ChatLayoutProps) {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    const [isShowNotifications, setIsShowNotifications] = useState(false);

    const handleShowSidebar = () => {
        setIsShowSidebar(!isShowSidebar);
    }

    const handleShowNotifications = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsShowNotifications(true);
    }

    const handleChatSelectedBox = (itemSelected: ListUserProps) => {
        chatSelected(itemSelected);
    }

    return (
        <div className="wrapp-layout flex" onClick={() => setIsShowNotifications(false)}>
            <Sidebar isShowSidebar={isShowSidebar} />
            <div className={`${isShowSidebar ? "ml-[60px]" : "ml-[256px]"} wrapper flex-1 transition-all duration-500 ease-linear"`}>
                <Header toggleSidebar={handleShowSidebar} showNotifications={handleShowNotifications} />
                <div className="min-h-[calc(100vh-131px)] flex">
                    <div className="pt-4 px-4 flex-1">
                        {titlePage && <h1 className="text-3xl font-semibold mb-8">{titlePage}</h1>}
                        <main className="flex flex-col gap-8 h-full">
                            {children}
                        </main>
                    </div>
                    <RightBar isShowRightBar={isShowSidebar} chatSelectedBox={handleChatSelectedBox} />
                </div>
                <Footer />
            </div>
            <Modal isOpen={isShowNotifications} onCloseModal={() => setIsShowNotifications(false)} title={"ChatLayout"} />
        </div>
    )
}