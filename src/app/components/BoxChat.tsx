"use client";

import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Divider from './Divider';

interface User {
    name?: string | null;
    avatar?: string;
}

interface BoxChatProps {
    user: User;
    closeBoxChat: () => void;
}

export default function BoxChat({ user, closeBoxChat }: BoxChatProps) {
    const [time, setTime] = useState<string>("");
    const [content, setContent] = useState("");

    const [input, setInput] = useState("");

    useEffect(() => {
        const now = new Date();
        setTime(now.toLocaleTimeString());
    }, []);

    const handleEnterContentChat = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    }

    const handleCloseBoxChat = (): void => {
        closeBoxChat();
    }

    const sendChat = async (e: React.FormEvent) => {
        setContent("");
        e.preventDefault();

        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: input }),
        });

        const data = await res.json();
        setContent(data.choices?.[0]?.message?.content || "Không có phản hồi.");
        setInput("");
    }

    // const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    //     e.preventDefault();
    //     await sendChat(e);
    // }

    return (
        <div className="wrapp-box-chat fixed bottom-0 right-0 z-20 rounded-tl-3xl flex gap-4 pr-4">
            <form onSubmit={sendChat} className="max-w-md mx-auto space-y-4">
                {/* <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4"> */}
                <div className="box-chat border border-solid border-gray-300 bg-gray-100 p-3 rounded-t-3xl w-80 h-80 flex flex-col gap-2">
                    <div className="info flex items-center justify-between">
                        <div className="info flex items-center gap-2">
                            <Image src={user?.avatar
                                ? user?.avatar
                                : "/assets/images/1.jpg"} alt="icon 1" width={30} height={30} className='min-w-[30px] w-[30px] h-[30px] rounded-full' />
                            <div className='flex flex-col items-start'>
                                <p className="font-semibold">{user?.name ? user?.name : "Anonymous"}</p>
                                <p className="text-xs">{time}</p>
                            </div>
                        </div>
                        <div className='border border-solid rounded-full p-1 w-8 h-8 flex items-center justify-center cursor-pointer' onClick={handleCloseBoxChat}>
                            <FontAwesomeIcon icon={faXmark} />
                        </div>
                    </div>
                    <Divider />
                    <textarea className="w-full border-0 outline-0 resize-none flex-1" value={content} readOnly></textarea>
                    <Divider />
                    <div className='flex items-center gap-2'>
                        <input className="w-full outline-0 border border-solid border-gray-300 py-2 px-3 rounded-full" value={input} onChange={handleEnterContentChat} placeholder='Enter your chat ...' />
                        <FontAwesomeIcon icon={faPaperPlane} className='cursor-pointer hover:text-green-400' onClick={sendChat} />
                    </div>
                </div>
            </form>
        </div >
    );
}
