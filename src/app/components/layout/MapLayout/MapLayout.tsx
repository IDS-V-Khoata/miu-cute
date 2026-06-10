"use client";

import { useState } from "react";
import Header from "../AppLayout/Header"
import Footer from "../AppLayout/Footer"
import Sidebar from "../AppLayout/Sidebar"
// import RightBar from "./RightBar";
import Modal from "@/components/Modals";
import ScrollToTop from "@/components/ScrollToTop";

interface MapLayoutProps {
    titlePage?: string;
    children: React.ReactNode;
}

export default function MapLayout({ titlePage = "Maps", children }: MapLayoutProps) {
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
            <div className={`${isShowSidebar ? "ml-[60px]" : "ml-[256px]"} wrapper h-screen flex flex-col flex-1 transition-all duration-500 ease-linear"`}>
                <Header isShowSidebar={isShowSidebar} toggleSidebar={handleShowSidebar} showNotifications={handleShowNotifications} />
                <div className="pt-20 px-4 flex-1">
                    {titlePage && <h1 className="text-3xl font-semibold mb-4">{titlePage}</h1>}
                    <main className="flex flex-col gap-8">
                        {children}
                    </main>
                </div>
                {/* <RightBar isShowRightBar={isShowSidebar} /> */}
                <Footer />
            </div>
            <ScrollToTop />
            <Modal isOpen={isShowNotifications} onCloseModal={() => setIsShowNotifications(false)} title={"ShoppingLayout"} />
        </div>
    )
}