"use client";

import { useCallback, useEffect, useState } from "react";

const MD_BREAKPOINT = 768;

export function useCheckDevice() {
    const [isMobile, setIsMobile] = useState(false);

    const checkDevice = useCallback(() => {
        setIsMobile(window.innerWidth < MD_BREAKPOINT);
    }, []);

    useEffect(() => {
        checkDevice();
        window.addEventListener("resize", checkDevice);

        return () => window.removeEventListener("resize", checkDevice);
    }, [checkDevice]);

    return { isMobile, isDesktop: !isMobile, checkDevice };
}
