'use client';

import BoxChat from "@/components/BoxChat";
import Divider from "@/components/Divider";
import { Box, ButtonCustom, InputForm } from "@/components/Form";
import Modal from "@/components/Modals";
import { faFolder, faFolderPlus, faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import { useState } from "react";

interface RightBarProps {
    isShowRightBar: boolean;
    chatSelectedBox: (user: ListUserProps) => void;
}

const tabs = [
    { id: "directory", label: "Directory" },
    { id: "information", label: "Information" },
];

export interface ListUserProps {
    name: string;
    link: string;
    avatar: string;
    status: boolean;
    isActive?: boolean;
}

const listUsers: ListUserProps[] = [
    { name: "Hoàng Minh Tuấn", avatar: "/assets/images/1.jpg", link: "./profile/user1", status: true },
    { name: "Lê Thị Lan", avatar: "/assets/images/2.jpg", link: "./profile/user2", status: false },
    { name: "Phạm Quốc Bảo", avatar: "/assets/images/3.jpg", link: "./profile/user3", status: true },
    { name: "Nguyễn Hoàng Nam", avatar: "/assets/images/4.jpg", link: "./profile/user4", status: true },
    { name: "Trần Thị Hồng", avatar: "/assets/images/5.jpg", link: "./profile/user5", status: false },
    { name: "Đặng Văn Tùng", avatar: "/assets/images/6.jpg", link: "./profile/user6", status: false },
    { name: "Vũ Thị Mai", avatar: "/assets/images/7.jpg", link: "./profile/user7", status: true },
    { name: "Bùi Quang Dũng", avatar: "/assets/images/8.jpg", link: "./profile/user8", status: false },
    { name: "Lý Minh Khôi", avatar: "/assets/images/9.jpg", link: "./profile/user9", status: true },
    { name: "Cao Thanh Hương", avatar: "/assets/images/10.jpg", link: "./profile/user10", status: true },
    { name: "Đỗ Văn Kiên", avatar: "/assets/images/1.png", link: "./profile/user11", status: false },
    { name: "Ngô Thị Hà", avatar: "/assets/images/2.png", link: "./profile/user12", status: true },
    { name: "Dương Gia Bảo", avatar: "/assets/images/3.png", link: "./profile/user13", status: true },
    { name: "Trịnh Thị Oanh", avatar: "/assets/images/4.png", link: "./profile/user14", status: true },
    { name: "Phan Văn Hậu", avatar: "/assets/images/5.png", link: "./profile/user15", status: false },
    { name: "Lâm Thị Như", avatar: "/assets/images/6.png", link: "./profile/user16", status: false },
    { name: "Tống Minh Thành", avatar: "/assets/images/7.png", link: "./profile/user17", status: true },
    { name: "Quách Thị Yến", avatar: "/assets/images/8.png", link: "./profile/user18", status: true },
    { name: "Tạ Quốc Khánh", avatar: "/assets/images/9.png", link: "./profile/user19", status: false },
    { name: "Hà Thị Linh", avatar: "/assets/images/10.png", link: "./profile/user20", status: true },
];

interface User {
    name?: string | null;
    avatar?: string;
}

export default function RightBar({ isShowRightBar, chatSelectedBox }: RightBarProps) {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [userActive, setUserActive] = useState<User | null>();
    const [isShowModalAddFolder, setIsShowModalAddFolder] = useState(false);

    const handleOpenChat = (user: User) => {
        setUserActive(user);
    }

    return (
        <div className={`${isShowRightBar ? "w-[60px]" : "w-3xs"} "wrapp-rightbar pt-20 bg-darkcharcoal text-lightyellow transition-all duration-500 ease-linear"`}>
            <div className="w-full max-w-lg">
                {/* Tabs header */}
                <div className="flex border-b border-lightyellow">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 px-4 py-2 -mb-px transition ${isActive ? "border-b-3 border-lightyellow text-lightyellow font-medium"
                                    : "text-gray-500 hover:text-lightyellow cursor-pointer"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tabs content */}
                <div className="px-2">
                    {activeTab === "directory" && <div>
                        <ul className='overflow-y-auto h-[calc(100vh-220px)] no-scrollbar'>
                            {listUsers.map((user, index) => (
                                <li
                                    key={index}
                                    className="group flex items-center gap-3 pl-3 py-2 cursor-pointer hover:bg-black/80 rounded-lg transition-all"
                                    onClick={() => chatSelectedBox({
                                        name: user.name,
                                        avatar: user.avatar,
                                        isActive: true,
                                        link: user.link,
                                        status: user.status
                                    })}
                                >
                                    <div className='relative'>
                                        <Image src={user.avatar} alt={user.name} width={40} height={40} className="w-10 h-10 rounded-full" />
                                        {user.status &&
                                            <span className="absolute flex size-2 bottom-0 right-0">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                                            </span>
                                        }
                                    </div>
                                    <span className="text-lightyellow font-medium">
                                        {user.name}
                                    </span>
                                </li>
                            ))}
                            {userActive && <BoxChat user={userActive} closeBoxChat={() => setUserActive(null)} />}
                        </ul>
                    </div>}
                    {activeTab === "information" && <div className="pt-4 flex flex-col h-[calc(100vh-204px)]">
                        <ul className="overflow-y-auto flex-1  no-scrollbar flex flex-col">
                            <li className="flex items-center gap-4 cursor-pointer p-2 hover:bg-black/90">
                                <FontAwesomeIcon icon={faFolder} />
                                <span>Upload File</span>
                            </li>
                            <Divider />
                            <li className="flex items-center gap-4 cursor-pointer p-2 hover:bg-black/90">
                                <FontAwesomeIcon icon={faImages} />
                                <span>Images</span>
                            </li>
                        </ul>
                        <ButtonCustom size="small" primary="darkyellow" block text="Add Folder" handleClick={() => setIsShowModalAddFolder(true)} icon={faFolderPlus} />
                    </div>}
                </div>
            </div>
            <Modal isOpen={isShowModalAddFolder} onCloseModal={() => setIsShowModalAddFolder(false)} title="Add New Folder">
                <Box className="mt-2">
                    <InputForm name={""} autoComplete={""} type={""} placeholder={"Enter Name Folder ..."} value={""} changeValue={() => { }} />
                </Box>
            </Modal>
        </div>
    )
}