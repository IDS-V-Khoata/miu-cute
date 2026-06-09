import Image from 'next/image';
import BoxChat from "@/components/BoxChat";
import { useState } from 'react';

interface ListUserProps {
    name: string;
    link: string;
    avatar: string;
    status: boolean;
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

export default function RightBar() {
    const [userActive, setUserActive] = useState<User | null>();

    const handleOpenChat = (user: User) => {
        setUserActive(user);
    }

    return (
        <div className="min-w-80 h-[calc(100vh-67px)] bg-gray-100 fixed top-[67px] right-0 z-20 shadow-lg p-4">
            <ul className='overflow-y-auto h-[calc(100vh-120px)] no-scrollbar'>
                {listUsers.map((user, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-all"
                        onClick={() => handleOpenChat({
                            name: user.name,
                            avatar: user.avatar
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
                        <span className="text-gray-800 font-medium">
                            {user.name}
                        </span>
                    </li>
                ))}
                {userActive && <BoxChat user={userActive} closeBoxChat={() => setUserActive(null)} />}
            </ul>
        </div>
    );
}
