"use client";
import { adminService } from "@/services/admin.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

type DashboardStats = {
    totalUsers: number;
    totalOrders: number;
    totalMeals: number;
    totalProviders: number;
    totalRevenue: number;
    totalApplicantProvider: number;
    totalCategory: number;
}

export default function AdminDashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        totalOrders: 0,
        totalMeals: 0,
        totalProviders: 0,
        totalApplicantProvider: 0,
        totalRevenue: 0,
        totalCategory: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashBoardData = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await adminService.getDashBoardStats();

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
        <main data-aos="zoom-in" className="bg-white/80 text-black mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-3xl font-bold">
                Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
                Welcome to the Admin Dashboard.
            </p>
            {/* Revenue */}
            <div data-aos="zoom-out" data-aos-delay="1400" className="bg-white text-black/90 rounded-lg p-6 shadow-sm mt-4">
                <p className="text-gray-500">
                    Total Revenue
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                    {stats.totalRevenue.toFixed(2)}
                </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* users */}
                <div data-aos="zoom-out" data-aos-delay="100" className="bg-white text-black/90 rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total Users
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalUsers}
                    </h2>

                    <button
                        data-aos="fade-right"
                        data-aos-delay="2000"
                        type="button"
                        onClick={() => router.push("/admin/users")}
                        className="mt-4 hover:scale-105 transition flex gap-1 items-center border px-4 py-2 bg-gray-600 text-black/80 rounded hover:bg-gray-700"
                    >
                        go to users <FaArrowRight size={18} />
                    </button>
                </div>

                {/* orders */}
                <div data-aos="zoom-out" data-aos-delay="300" className="bg-white text-black/90 rounded-lg p-6 shadow-sm">
                    <p className="text-gray-500">
                        Total Orders
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalOrders}
                    </h2>

                    <button
                        type="button"
                        data-aos="fade-right"
                        data-aos-delay="2500"
                        onClick={() => router.push("/admin/orders")}
                        className="mt-4 hover:scale-105 transition flex gap-1 items-center border px-4 py-2 bg-gray-600 text-black/80 rounded hover:bg-gray-700"
                    >
                        go to orders <FaArrowRight size={18} />
                    </button>
                </div>


                {/* Providers */}
                <div data-aos="zoom-out" data-aos-delay="600" className="bg-white text-black/90 rounded-lg p-6 shadow-sm ">
                    <p className="text-gray-500">
                        Total providers
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalProviders}
                    </h2>

                    <button
                        type="button"
                        data-aos="fade-right"
                        data-aos-delay="3000"
                        onClick={() => router.push("/admin/providers")}
                        className="mt-4 hover:scale-105 transition flex gap-1 items-center border px-4 py-2 bg-gray-600 text-black/80 rounded hover:bg-gray-700"
                    >
                        go to providers <FaArrowRight size={18} />
                    </button>
                </div>


                {/* meals */}
                <div data-aos="zoom-out" data-aos-delay="1000" className="bg-white text-black/90 rounded-lg p-6 shadow-sm ">
                    <p className="text-gray-500">
                        Total Meals
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalMeals}
                    </h2>

                    <button
                        type="button"
                        data-aos="fade-right"
                        data-aos-delay="3500"
                        onClick={() => router.push("/admin/meals")}
                        className="mt-4 hover:scale-105 transition flex gap-1 items-center border px-4 py-2 bg-gray-600 text-black/80 rounded hover:bg-gray-700"
                    >
                        go to meals <FaArrowRight size={18} />
                    </button>
                </div>




                {/* provider application */}
                <div data-aos="zoom-out" data-aos-delay="1800" className="bg-white text-black/90 rounded-lg p-6 shadow-sm ">
                    <p className="text-gray-500">
                        Total provider application
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalApplicantProvider}
                    </h2>

                    <button
                        type="button"
                        onClick={() => router.push("/admin/provider-applications")}
                        className="mt-4 hover:scale-105 transition flex gap-1 items-center border px-4 py-2 bg-gray-600 text-black/80 rounded hover:bg-gray-700"
                    >
                        go to applications <FaArrowRight size={18} />
                    </button>
                </div>

                {/* category mangement */}
                <div data-aos="zoom-out" data-aos-delay="2200" className="bg-white text-black/90 rounded-lg p-6 shadow-sm ">
                    <p className="text-gray-500">
                        Categroy management
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalCategory}
                    </h2>

                    <button
                        type="button"
                        onClick={() => router.push("/admin/category")}
                        className="mt-4 hover:scale-105 transition flex gap-1 items-center border px-4 py-2 bg-gray-600 text-black/80 rounded hover:bg-gray-700"
                    >
                        go to category <FaArrowRight size={18} />
                    </button>
                </div>
            </div>
        </main>
    );
}