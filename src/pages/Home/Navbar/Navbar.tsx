"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Navbar() {
    const { user, loading } = useAuth() || {}
    if (loading) <div className="user loading..."></div>;
    return (
        <nav className="w-full border-b shadow-sm bg-green-400 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
                {/* Logo */}
                <h1 className="text-xl font-bold text-gray-800">FoodHub</h1>

                {/* Links */}
                <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
                    <Link href="/" className="hover:text-black transition">
                        Home
                    </Link>

                    <Link href="/meals" className="hover:text-black transition">
                        Meals
                    </Link>

                    <Link href="/providers" className="hover:text-black transition">
                        providers
                    </Link>

                    {user && (
                        <Link href="/cart" className="hover:text-black transition">
                            Cart
                        </Link>
                    )}

                    {user?.role === "CUSTOMER" && (
                        <Link href="/MyOrders" className="hover:text-black transition">
                            MyOrders
                        </Link>
                    )}

                    {user?.role === "PROVIDER" && (
                        <Link
                            href="/provider/dashboard"
                            className="hover:text-black transition"
                        >
                            Dashboard
                        </Link>
                    )}

                    {user?.role === "ADMIN" && (
                        <Link href="/admin" className="hover:text-black transition">
                            Admin
                        </Link>
                    )}

                    {!user ? (
                        <Link
                            href="/login"
                            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                        >
                            Login
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 group`}>
                                {user?.name?.charAt(0)}
                                <button className="px-3 py-1 bg-green-500 rounded absolute -bottom-5 hidden group-hover:flex transition-transform">Log Out</button>
                            </div>
                            <p className="text-gray-800 group relative">{user?.name}<span className="hidden group-hover:flex absolute">{user.role}</span></p>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
