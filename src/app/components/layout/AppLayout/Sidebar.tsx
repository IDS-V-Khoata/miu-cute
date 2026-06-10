'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
// import { PiChartLineUpBold } from "react-icons/pi";
// import { LiaBlogSolid } from "react-icons/lia";
// import { MdGTranslate } from "react-icons/md";
import { LuImageUp } from "react-icons/lu";
// import { MdOutlineDraw } from "react-icons/md";
// import { BsChatRightText } from "react-icons/bs";
// import { BiLogoTelegram } from "react-icons/bi";
// import { TbBrandOauth } from "react-icons/tb";
// import { MdOutlinePets } from "react-icons/md";
// import { TbBrandCinema4D } from "react-icons/tb";
// import { PiShoppingCartLight } from "react-icons/pi";
// import { LuMapPinned } from "react-icons/lu";
import { GiCutDiamond } from "react-icons/gi";

interface SidebarProps {
    isShowSidebar: boolean;
}

interface MenuItem {
    name: string;
    path: string;
    icon?: IconType;
    iconSize?: number;
    url: string;
    width?: number;
    height?: number;
}

const menuItems: MenuItem[] = [
    // { name: 'Dashboard', path: '/dashboard', icon: PiChartLineUpBold, iconSize: 24, url: "/assets/images/chart.png", width: 30, height: 30 },
    { name: 'Miu Kute', path: '/miu-cute', icon: GiCutDiamond, iconSize: 26, url: "/assets/images/blog.png", width: 30, height: 30 },
    { name: 'Upload Image', path: '/upload-image', icon: LuImageUp, iconSize: 24, url: "/assets/images/image.png", width: 30, height: 30 },
    // { name: 'Blogs', path: '/blogs', icon: LiaBlogSolid, iconSize: 26, url: "/assets/images/blog.png", width: 30, height: 30 },
    // { name: 'Translate', path: '/translate', icon: MdGTranslate, iconSize: 21, url: "/assets/images/translate.png", width: 30, height: 30 },
    // { name: 'Drawing', path: '/drawing', icon: MdOutlineDraw, iconSize: 24, url: "/assets/images/canvas.png", width: 30, height: 30 },
    // { name: 'Chats', path: '/chats', icon: BsChatRightText, iconSize: 21, url: "/assets/images/chat.png", width: 30, height: 30 },
    // { name: 'Telegram', path: '/telegram', icon: BiLogoTelegram, iconSize: 24, url: "/assets/images/chat.png", width: 30, height: 30 },
    // { name: 'Auth Demo', path: '/auth', icon: TbBrandOauth, iconSize: 24, url: "/assets/images/chat.png", width: 30, height: 30 },
    // { name: 'Find Pets', path: '/find-pets', icon: MdOutlinePets, iconSize: 24, url: "/assets/images/paw.png", width: 30, height: 30 },
    // { name: 'Cinema', path: '/cinema', icon: TbBrandCinema4D, iconSize: 24, url: "/assets/images/cinema.png", width: 30, height: 30 },
    // { name: 'Shopping', path: '/shopping', icon: PiShoppingCartLight, iconSize: 24, url: "/assets/images/shopping.png", width: 30, height: 30 },
    // { name: 'Map', path: '/maps', icon: LuMapPinned, iconSize: 24, url: "/assets/images/map.png", width: 30, height: 30 },
];

const ItemMenu = ({ item, isShowSidebar }: { item: typeof menuItems[0]; isShowSidebar: boolean }) => {
    const pathname = usePathname();
    const Icon = item.icon;

    return (
        <Link
            href={item.path}
            className={clsx(
                'flex items-center px-3 py-4 gap-2 cursor-pointer text-lightyellow hover:text-lightyellow hover:bg-black/50',
                pathname === item.path ? 'text-lightyellow bg-black/50' : '',
                isShowSidebar ? 'justify-center' : 'justify-start'
            )}
        >
            {Icon && <Icon size={item.iconSize} />}
            {/* <Image src={item.url} alt="Random dog" className="shadow-2xl max-w-[480px]" width={item.width} height={item.height} /> */}
            <span className={`${isShowSidebar ? "w-0 opacity-0 hidden" : "block flex-1"} self-center text-nowrap transition-width transition-opacity duration-500 ease-linear overflow-hidden font-bold'`}>{item.name}</span>
        </Link>
    )
}

export default function Sidebar({ isShowSidebar }: SidebarProps) {

    return (
        <div className={`${isShowSidebar ? "w-[60px]" : "w-3xs"} wrapp-sidebar py-3 bg-darkcharcoal text-white fixed h-screen transition-all duration-500 ease-linear z-80`}>
            <div className={`flex gap-2 mb-4 px-3 transition-all duration-500 ease-linear`}>
                <Image src="/assets/images/icon-logo.png" alt="File icon" width={40} height={40} className={`${isShowSidebar ? "items-start" : "items-center"} min-w-[40px] w-[40px] h-[40px]`} />
                <h1 className={`${isShowSidebar ? "hidden opacity-0 w-0 visible" : "w-auto block opacity-100 visible"} text-nowrap self-center text-3xl font-semibold transition-all duration-500 ease-linear overflow-hidden bg-gradient-to-r
                  from-cyan-400 via-blue-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_#22d3ee]'`}>Ken Studio</h1>
            </div>
            <nav>
                <ul className='flex flex-col h-[90vh] overflow-y-auto'>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <ItemMenu item={item} isShowSidebar={isShowSidebar} />
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}