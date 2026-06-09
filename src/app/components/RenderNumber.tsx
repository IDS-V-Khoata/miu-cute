import { useEffect, useState } from "react";

interface CounterProps {
    start?: number;
    end: number;
    duration?: number;
}

export function RenderNumber({ start = 0, end = 1985, duration = 1000 }: CounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;

        const updateCounter = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            setCount(Number(value));

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }, [start, end, duration]);

    return (
        <span>{count}</span>
    );
}