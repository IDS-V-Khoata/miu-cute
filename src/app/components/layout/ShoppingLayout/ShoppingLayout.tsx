"use client";

import { useState } from "react";
import Header from "../AppLayout/Header"
import Footer from "../AppLayout/Footer"
import Sidebar from "../AppLayout/Sidebar"
// import RightBar from "./RightBar";
import Modal from "@/components/Modals";
import ScrollToTop from "../../ScrollToTop";

interface ChatLayoutProps {
    titlePage?: string;
    children: React.ReactNode;
}

export default function ShoppingLayout({ titlePage = "Shopping", children }: ChatLayoutProps) {
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
        <div className="wrapp-layout flex" onClick={() => setIsShowNotifications(false)}>
            <Sidebar isShowSidebar={isShowSidebar} />
            <div className={`${isShowSidebar ? "ml-[60px]" : "ml-[256px]"} wrapper flex-1 transition-all duration-500 ease-linear"`}>
                <Header isShowSidebar={isShowSidebar} toggleSidebar={handleShowSidebar} showNotifications={handleShowNotifications} />
                <div className="min-h-[calc(100vh-131px)] flex">
                    <div className="pt-4 px-4 flex-1">
                        {titlePage && <h1 className="text-3xl font-semibold mb-8">{titlePage}</h1>}
                        <main className="flex flex-col gap-8">
                            {children}
                        </main>
                    </div>
                    {/* <RightBar isShowRightBar={isShowSidebar} /> */}
                </div>
                <Footer />
            </div>
            <ScrollToTop />
            <Modal isOpen={isShowNotifications} onCloseModal={() => setIsShowNotifications(false)} title={"ShoppingLayout"} />
        </div>
    )
}