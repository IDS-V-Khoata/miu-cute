import React from "react";

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
            <div className={`${modalSizeClasses} bg-darkcharcoal p-6 rounded-lg shadow-lg`} onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-lightyellow">{title}</h2>
                {children ? children : <p className="mt-2">This is a simple modal example.</p>}
                <div className="mt-4 flex gap-4 items-center justify-end">
                    {/* <ButtonCustom primary="darkyellow" text={"Save"} handleClick={onCloseModal} /> */}
                    <button
                        className="h-9 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
                        onClick={onCloseModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
