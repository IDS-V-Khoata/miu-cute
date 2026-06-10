import { Box } from "@/components/Form";
import { faBarsStaggered, faEllipsisVertical, faBell, faCircleQuestion, faCircleUser, faClockRotateLeft, faEject, faGear, faList, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
interface HeaderProps {
    isShowSidebar: boolean;
    toggleSidebar: () => void;
    showNotifications: (event: React.MouseEvent) => void;
}

export default function Header({ isShowSidebar, toggleSidebar, showNotifications }: HeaderProps) {
    const [isSetting, setIsSetting] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleSetting = () => {
        setIsSetting(!isSetting);
    }

    async function logout() {
        await fetch("/api/auth/logout", {
            method: "POST",
        });

        window.location.href = "/auth/login";
    }

    return (
        <div className={`${isShowSidebar ? "pl-[60px]" : "pl-[256px]"} wrapp-header flex items-center justify-between p-4 border-b border-solid fixed top-0 left-0 right-0 bg-[#fff] z-70 transition-all duration-500 ease-linear`}>
            <div className="pl-4 flex w-full items-center gap-2 justify-between">
                <div className="border border-solid rounded px-3 py-2 cursor-pointer" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBarsStaggered} className='w-[18px] cursor-pointer' />
                </div>
                <div className="border border-solid rounded-full px-3 py-2 cursor-pointer md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} className='w-[18px]' />
                </div>
            </div>

            {/* Desktop Menu */}
            <nav className='hidden md:flex flex-1 items-center'>
                <ul className='flex items-center gap-8 justify-center'>
                    <li className='flex items-center gap-2 cursor-pointer'><FontAwesomeIcon icon={faClockRotateLeft} className='w-[18px]' /> History</li>
                    <li className='flex items-center gap-2 cursor-pointer'><FontAwesomeIcon icon={faEject} className='w-[18px]' /> About</li>
                    <li className='flex items-center gap-2 cursor-pointer relative' onClick={showNotifications}>
                        <FontAwesomeIcon icon={faBell} className='w-[18px]' /> Notifications
                        <span className="absolute flex size-3 top-0 right-[-15px]">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                        </span>
                    </li>
                    <li className='flex items-center gap-2 cursor-pointer'><FontAwesomeIcon icon={faCircleQuestion} className='w-[20px]' /> Helps</li>
                    <li onClick={handleToggleSetting} className="flex items-center cursor-pointer relative">
                        <FontAwesomeIcon icon={faCircleUser} className="border border-[#2c3e50] cursor-pointer hover:text-[#3498db] hover:border-[#3498db] p-2 rounded-full" />
                        <Box className={`${isSetting ? 'block' : 'hidden'} bg-[#fff] z - 50 shadow - 2xl border border-solid absolute top-[34px] right-0`}>
                            <div className="menu-content">
                                <div className="list-item-content flex flex-col p-4">
                                    <span className="item-content">Ken Trương</span>
                                    <span className="item-content">khoata@vn.ids.jp</span>
                                </div>
                                <div className="border border-solid"></div>
                                <div className="p-4 flex flex-col gap-2">
                                    <a href="#"><FontAwesomeIcon icon={faList} /> Profile</a>
                                    <a href="#"><FontAwesomeIcon icon={faGear} /> Settings</a>
                                    <a href="#" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</a>
                                </div>
                            </div>
                        </Box>
                    </li>
                </ul>
            </nav>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-[74px] left-0 w-full border border-solid bg-white shadow-md`}>
                <ul className='flex flex-col items-start p-4'>
                    <li className="border-b border-solid w-full py-2"><FontAwesomeIcon icon={faClockRotateLeft} className='w-[18px]' /> History</li>
                    <li className="border-b border-solid w-full py-2"><FontAwesomeIcon icon={faEject} className='w-[18px]' /> About</li>
                    <li className="border-b border-solid w-full py-2" onClick={showNotifications}> <FontAwesomeIcon icon={faBell} className='w-[18px]' /> Notifications</li>
                    <li className="border-b border-solid w-full py-2"><FontAwesomeIcon icon={faCircleQuestion} className='w-[20px]' /> Helps</li>
                    <li className="border-b border-solid w-full py-2" onClick={handleToggleSetting}><FontAwesomeIcon icon={faCircleUser} className='w-[20px]' /> Settings</li>
                    <li className="pt-2 cursor-pointer" onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} className='w-[20px]' /> Logout</li>
                </ul>
            </div>
        </div>
    )
}