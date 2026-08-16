"use client";

import { useEffect } from "react";
import AOS from "aos";

export default function AOSProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true, // animation only once
            offset: 100,
        });
    }, []);

    return <>{children}</>;
}