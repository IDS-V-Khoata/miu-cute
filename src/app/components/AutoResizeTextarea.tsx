import { useRef, useEffect } from "react";

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    content: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = (props) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const adjustHeight = () => {
            textarea.style.height = "auto"; // Reset height trước khi tính toán lại
            textarea.style.height = `${textarea.scrollHeight}px`; // Đặt height theo nội dung
        };

        textarea.addEventListener("input", adjustHeight);
        adjustHeight(); // Gọi lần đầu để cập nhật chiều cao ban đầu

        return () => textarea.removeEventListener("input", adjustHeight);
    }, []);

    return (
        <textarea
            ref={textareaRef}
            {...props} // Truyền thêm props như className, placeholder, v.v.
            className={`w-full p-2 border rounded ${props.className || ""}`}
            defaultValue={props.content}
        />
    );
};

export default AutoResizeTextarea;
