import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBookmark, faClockRotateLeft, faStore, faUsers, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ListItemMenuProps {
    title: string;
    link: string;
    icon: IconProp;
    color: string;
}


const listItemsMenu: ListItemMenuProps[] = [
    {
        title: "Maketplace",
        icon: faStore,
        link: "./blogs",
        color: "#f1c40f",
    },
    {
        title: "Nhóm",
        icon: faUsers,
        link: "./blogs",
        color: "#2ecc71"
    },
    {
        title: "Đã Lưu",
        icon: faBookmark,
        link: "./blogs",
        color: "#3498db"
    },
    {
        title: "Kỹ Niệm",
        icon: faClockRotateLeft,
        link: "./blogs",
        color: "#9b59b6"
    },
    {
        title: "Video",
        icon: faVideo,
        link: "./blogs",
        color: "#e74c3c"
    },
];

export default function LeftBar() {
    return (
        <div className="min-w-80 bg-gray-100 h-[calc(100vh-67px)] fixed top-[67px] left-0 z-20 shadow-lg">
            <ul className="mt-4">
                {listItemsMenu.map((item, index) => (
                    <li
                        key={index}
                        className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-200 transition-all duration-300"
                    >
                        <FontAwesomeIcon
                            style={{ color: item.color }} // Sử dụng trực tiếp mã màu HEX
                            className="w-[18px]"
                            icon={item.icon}
                        />
                        <a href={item.link} className="text-gray-700 font-medium">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
