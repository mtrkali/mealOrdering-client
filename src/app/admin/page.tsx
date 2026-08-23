"use client";
import { adminService } from "@/services/admin.service";
import { useEffect, useState } from "react";

type DashboardStats = {
    totalUsers: number;
    totalOrders: number;
    totalMeals: number;
    totalProviders: number;
    totalRevenue: number;
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalOrders: 0,
        totalMeals: 0,
        totalProviders: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashBoardData = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await adminService.getDashBoardStats();
                console.log("Admin deshboard stats: ", result);
                setStats(result.data);
            } catch (error: any) {
                console.log("Failed to load dashboard data.")

                setError(
                    error?.response?.data?.message ||
                    "Failed to load dashboard data."
                )
            } finally {
                setLoading(false);
            }
        }
        fetchDashBoardData();
    }, [])


    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading dashboard...
                </p>
            </main>
        )
    }
    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="mt-6 text-red-500">
                    {error}
                </p>
            </main>
        )
    }
    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">
                Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
                Welcome to the Admin Dashboard.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total Users
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalUsers}
                    </h2>
                </div>

                <div className="border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total Orders
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalOrders}
                    </h2>
                </div>

                <div className="border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total Revenue
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalRevenue.toFixed(2)}
                    </h2>
                </div>

                <div className="border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total providers
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalProviders}
                    </h2>
                </div>

                <div className="border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total Meals
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalMeals}
                    </h2>
                </div>
            </div>
        </main>
    );
}