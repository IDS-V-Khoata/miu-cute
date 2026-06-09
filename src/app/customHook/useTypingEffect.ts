import { useState, useEffect } from "react";

export function useTypingEffect(text: string, speed = 150) {
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        setDisplayedText(""); // Reset khi text thay đổi
        let i = 0;
        let temp = '';
        const interval = setInterval(() => {
            temp += text[i]; // Cập nhật chuỗi tạm
            setDisplayedText(temp); // Cập nhật state sau khi chuỗi đã thay đổi
            i++;
            if (i >= text.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    // Hiệu ứng con trỏ nhấp nháy
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 300);
        return () => clearInterval(cursorInterval);
    }, []);

    return { displayedText, showCursor };
}
