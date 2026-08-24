"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.replace("/login");
            return;
        }

        if (user?.role !== "ADMIN") {
            router.replace("/");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <p className="text-gray-500">
                    Loading...
                </p>
            </main>
        );
    }

    if (!user || user?.role !== "ADMIN") {
        return null;
    }

    return <>{children}</>;
}