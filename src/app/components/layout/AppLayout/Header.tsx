import { Box } from "@/components/Form";
import { faBarsStaggered, faBell, faCircleQuestion, faCircleUser, faClockRotateLeft, faEject, faGear, faList, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


interface HeaderProps {
    toggleSidebar: () => void;
    showNotifications: (event: React.MouseEvent) => void;
}

export default function Header({ toggleSidebar, showNotifications }: HeaderProps) {
    const [isSetting, setIsSetting] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleSetting = () => {
        setIsSetting(!isSetting);
    }

    return (
        <div className='wrapp-header flex items-center justify-between p-4 border-b border-solid'>
            <div className="logo flex w-full items-center gap-2 px-3 transition-all duration-500 ease-linear justify-between">
                <FontAwesomeIcon icon={faBarsStaggered} className='w-[18px] cursor-pointer' onClick={toggleSidebar} />
                <div className="border border-solid rounded px-3 py-2 cursor-pointer md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FontAwesomeIcon icon={faBarsStaggered} className='w-[18px]' />
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

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute top-16 left-0 w-full bg-white shadow-md`}>
                <ul className='flex flex-col items-center gap-4 py-4'>
                    <li><FontAwesomeIcon icon={faClockRotateLeft} className='w-[18px]' /> History</li>
                    <li><FontAwesomeIcon icon={faEject} className='w-[18px]' /> About</li>
                    <li onClick={showNotifications}> <FontAwesomeIcon icon={faBell} className='w-[18px]' /> Notifications</li>
                    <li><FontAwesomeIcon icon={faCircleQuestion} className='w-[20px]' /> Helps</li>
                    <li onClick={handleToggleSetting}><FontAwesomeIcon icon={faCircleUser} className='w-[20px]' /> Settings</li>
                </ul>
            </div>
        </div>
    )
}