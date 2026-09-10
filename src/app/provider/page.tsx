"use client";

import { providerService } from "@/services/provider.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type DashboardStats = {
    totalMeals: number;
    totalOrders: number;
    totalRevenue: number;
};

export default function ProviderDashboardPage() {
    const router = useRouter()
    const [stats, setStats] = useState<DashboardStats>({
        totalMeals: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                setLoading(true);
                setError("");

                const result =
                    await providerService.getProviderDashboardStats();

                console.log("Provider dashboard stats:", result);

                setStats(result.data);
            } catch (error: any) {
                console.log(
                    "Failed to load provider dashboard:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to load provider dashboard."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Provider Dashboard
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading dashboard...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Provider Dashboard
                </h1>

                <p className="mt-6 text-red-500">
                    {error}
                </p>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">
                Provider Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
                Welcome to your Provider Dashboard.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Total Meals */}
                <div className="border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total Meals
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalMeals}
                    </h2>

                    <button
                        type="button"
                        onClick={() => router.push(`/provider/meals`)}
                        className="mt-4 hover:scale-105 transition flex gap-1 items-center border px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        go to meals <FaArrowRight size={18} />
                    </button>
                </div>

                {/* Total Orders */}
                <div className="border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total Orders
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalOrders}
                    </h2>

                    <button
                        type="button"
                        onClick={() => router.push(`/provider/orders`)}
                        className="mt-4 hover:scale-105 transition flex gap-1 items-center border px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        go to orders <FaArrowRight size={18} />
                    </button>
                </div>

                {/* Total Revenue */}
                <div className="border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total Revenue
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        ৳{stats.totalRevenue.toFixed(2)}
                    </h2>
                </div>

            </div>
        </main>
    );
}