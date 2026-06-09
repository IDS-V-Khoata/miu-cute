import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface LoadingProps {
    isOpen: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0c0c0cb5] z-50">
            <div className="p-6 rounded-lg shadow-lg w-96" onClick={(e) => e.stopPropagation()}>
                {/* <h2 className="text-xl font-bold">Loading Title</h2>
                <p className="mt-2">This is a simple Loading example.</p> */}
                <FontAwesomeIcon icon={faSpinner} spinPulse size="3x" style={{ color: "#fff" }} />
            </div>
        </div>
    );
};

export default Loading;