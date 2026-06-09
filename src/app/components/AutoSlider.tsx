import { useEffect, useState, useRef } from "react";

const images = [
    "/assets/images/1.jpg",
    "/assets/images/2.jpg",
    "/assets/images/3.jpg",
    "/assets/images/4.jpg",
    "/assets/images/5.jpg",
    "/assets/images/6.jpg",
    "/assets/images/7.jpg",
    "/assets/images/8.jpg",
    "/assets/images/9.jpg",
    "/assets/images/10.jpg",
];

export default function AutoSlider() {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const isDragging = useRef(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startAutoSlide();
        return () => stopAutoSlide();
    }, []);

    const startAutoSlide = () => {
        stopAutoSlide();
        intervalRef.current = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
    };

    const stopAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const handleStart = (clientX: number) => {
        stopAutoSlide();
        touchStartX.current = clientX;
        touchEndX.current = clientX;
        isDragging.current = true;

        // Lắng nghe sự kiện di chuyển chuột ngoài document
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMove = (clientX: number) => {
        if (!isDragging.current) return;
        touchEndX.current = clientX;
    };

    const handleEnd = () => {
        if (!isDragging.current) return;
        const deltaX = touchEndX.current - touchStartX.current;

        if (deltaX > 50) {
            // Vuốt hoặc kéo sang phải -> Lùi ảnh
            setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        } else if (deltaX < -50) {
            // Vuốt hoặc kéo sang trái -> Tiến ảnh
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }

        isDragging.current = false;
        startAutoSlide();
    };

    // Xử lý kéo chuột
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault(); // Ngăn kéo ảnh mặc định
        handleStart(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX);
    };

    const handleMouseUp = () => {
        handleEnd();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    return (
        <div
            className="wrapper-slider max-w-3xl m-auto h-[230px] overflow-hidden relative pt-6"
            // Xử lý touch trên mobile
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
            // Xử lý mouse drag trên desktop
            onMouseDown={handleMouseDown}
        >
            <div
                className="flex transition-transform duration-500 ease-out gap-8"
                style={{ transform: `translateX(-${index * 200}px)` }}
            >
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="w-[200px] h-[200px] bg-cover bg-center flex-shrink-0 rounded-2xl transition-opacity duration-700 ease-out opacity-100 border border-solid"
                        style={{ backgroundImage: `url(${img})` }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
