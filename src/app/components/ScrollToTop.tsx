"use client";

import { useState, useEffect } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="h-10 w-10 flex items-center justify-center cursor-pointer rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors duration-300"
                >
                    <FaLongArrowAltUp />
                </button>
            )}
        </div>
    );
}