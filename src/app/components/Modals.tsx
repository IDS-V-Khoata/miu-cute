import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

type size = "small" | "medium" | "large";

interface ModalProps {
    title: string;
    isOpen: boolean;
    onCloseModal: () => void;
    children?: React.ReactNode;
    size?: size;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, children, size, onCloseModal }) => {
    if (!isOpen) return null;
    const modalSizeClasses = size === "small" ? "w-72" : size === "large" ? "w-3xl" : "w-96";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0c0c0cb5] z-90" onClick={onCloseModal}>
            <div className={`${modalSizeClasses} bg-darkcharcoal p-6 rounded-lg shadow-lg relative`} onClick={(e) => e.stopPropagation()}>
                <div className="absolute top-2 right-2 text-white cursor-pointer" onClick={onCloseModal}>
                    <RiCloseCircleLine size={24} />
                </div>
                <h2 className="text-xl font-bold text-lightyellow">{title}</h2>
                {children ? children : <p className="mt-2">This is a simple modal example.</p>}
            </div>
        </div>
    );
};

export default Modal;
