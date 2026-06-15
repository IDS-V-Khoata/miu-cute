"use client";

import Link from 'next/link';
import url from '@/assets/images/blog-icon-logo.png';
import { Box } from "@/components/Form";
import { faBell, faCircleUser, faGear, faList, faRightFromBracket, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import { useState } from "react";

interface HeaderProps {
    showNotifications: (event: React.MouseEvent) => void;
}

export default function Header({ showNotifications }: HeaderProps) {
    const [isSetting, setIsSetting] = useState(false);
    const handleToggleSetting = () => {
        setIsSetting(!isSetting);
    }
    return (
        <div className='wrapp-header flex items-center justify-between px-4 py-2 border-b border-solid fixed top-0 left-0 right-0 bg-[#fff] z-50'>
            <Image src={url} alt="File icon" width={50} height={50} className='min-w-[50px]' />
            <nav className='flex-1'>
                <ul className='flex items-center gap-8 justify-end'>
                    <li className='flex items-center gap-2 cursor-pointer hover:text-[#3498db]'><Link href={'./dashboard'}><FontAwesomeIcon className='w-[18px]' icon={faTags} /> Home</Link></li>
                    <li className='flex items-center gap-2 cursor-pointer relative hover:text-[#3498db]' onClick={showNotifications}> <FontAwesomeIcon icon={faBell} className='w-[18px]' />Notifications
                        <span className="absolute flex size-3 top-0 right-[-15px]">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                        </span>
                    </li>
                    <li onClick={handleToggleSetting} className="relative">
                        <FontAwesomeIcon icon={faCircleUser} className="border border-[#2c3e50] cursor-pointer hover:text-[#3498db] hover:border-[#3498db] p-2 rounded-full " />
                        <Box className={`${isSetting ? 'block' : 'hidden'} bg-[#fff] z-50 shadow-2xl border border-solid absolute top-[34px] right-0`}>
                            <div className="menu-content">
                                <div className="list-item-content flex flex-col p-4">
                                    <span className="item-content">Ken Trương</span>
                                    <span className="item-content">khoata@vn.ids.jp</span>
                                </div>
                                <div className="border border-solid"></div>
                                <div className="p-4 flex flex-col gap-2">
                                    <a href="#"><FontAwesomeIcon icon={faList} /> Profile</a>
                                    <a href="#"><FontAwesomeIcon icon={faGear} /> Settings</a>
                                    <a href="#"><FontAwesomeIcon icon={faRightFromBracket} /> Logout</a>
                                </div>
                            </div>
                        </Box>
                    </li>
                </ul>
            </nav>
        </div >
    )
}