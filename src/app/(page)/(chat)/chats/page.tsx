"use client";

import { useChat } from "@/components/layout/ChatLayout/ChatContext";
import { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Chats() {
    const { selectedUser, isChatOpen } = useChat();
    const [contentMessage, setContentMessage] = useState("");

    const handleSendChat = () => {
        setContentMessage("");
    }

    return (
        <>
            {
                isChatOpen ? (
                    <div className="w-full h-full flex flex-col gap-4">
                        <div className="flex-1">
                            <div>
                                {/* Chat messages would go here */}
                            </div>
                        </div>
                        <div className="w-xl mx-auto flex items-center border border-gray-300 py-2 px-4 mb-4 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] rounded">
                            <input type="text" value={contentMessage} onChange={(e) => setContentMessage(e.target.value)} placeholder={`Nhập tin nhắn với ${selectedUser?.name} ...`} className="border-0 flex-1 outline-0" />
                            <FontAwesomeIcon icon={faPaperPlane} onClick={handleSendChat} className="text-darkcharcoal text-xl cursor-pointer" />
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
                        Please select a chat to start messaging.
                    </div>
                )
            }
        </>
    );
}
