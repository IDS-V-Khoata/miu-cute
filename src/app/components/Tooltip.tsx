import React, { ReactNode, useState } from "react";

type TooltipProps = {
    children: ReactNode;
    content: string;
    position?: "top" | "bottom" | "left" | "right";
};

const Tooltip: React.FC<TooltipProps> = ({ children, content, position = "top" }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative flex items-center" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            {visible && (
                <div
                    className={`absolute whitespace-nowrap px-2 py-1 text-white bg-gray-800 rounded text-sm shadow-lg z-10 ${position === "top" ? "bottom-full mb-2 left-1/2 transform -translate-x-1/2" :
                        position === "bottom" ? "top-full mt-2 left-1/2 transform -translate-x-1/2" :
                            position === "left" ? "right-full mr-2 top-1/2 transform -translate-y-1/2" :
                                "left-full ml-2 top-1/2 transform -translate-y-1/2"
                        }`}
                >
                    {content}
                </div>
            )}
            {children}
        </div>
    );
};

export default Tooltip;