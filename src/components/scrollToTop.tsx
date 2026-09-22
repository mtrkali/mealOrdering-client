"use client"
import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollTop() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const height =
                document.documentElement.scrollHeight - window.innerHeight;
            const parcent = (scrollTop / height) * 100;
            setProgress(parcent);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const radius = 24
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center"
        >
            <svg
                className="absolute h-14 w-14 -rotate-90"
                viewBox="0 0 60 60">

                {/*Background Ring */}
                <circle
                    cx="30"
                    cy="30"
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth="4"
                    fill="none" />

                {/* progress Ring */}
                <circle
                    cx="30"
                    cy="30"
                    r={radius}
                    stroke="#16A34A"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset} />
            </svg>



            <div className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                <FiArrowUp className="text-green-600" size={22} />
            </div>
        </button>
    )
}