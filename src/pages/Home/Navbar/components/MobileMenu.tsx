

import Link from "next/link";

export default function MobileMenu({ user, open }: { user: any, open: boolean }) {
    return (
        <div>
            {open && (
                <div className="space-y-1 border-t px-5 py-4 md:hidden w-70 border rounded-lg">
                    <Link
                        href="/"
                        className="block rounded-lg p-3 hover:bg-green-400"
                    >
                        Home
                    </Link>

                    <Link
                        href="/meals"
                        className="block rounded-lg p-3 hover:bg-green-400"
                    >
                        Meals
                    </Link>

                    <Link
                        href="/providers"
                        className="block rounded-lg p-3 hover:bg-green-400"
                    >
                        Providers
                    </Link>

                    {user && (
                        <Link
                            href="/cart"
                            className="block rounded-lg p-3 hover:bg-green-400"
                        >
                            Cart
                        </Link>
                    )}

                    {user?.role === "CUSTOMER" && (
                        <Link
                            href="/MyOrders"
                            className="block rounded-lg p-3 hover:bg-green-400"
                        >
                            My Orders
                        </Link>
                    )}

                    {user?.role === "PROVIDER" && (
                        <Link
                            href="/provider/dashboard"
                            className="block rounded-lg p-3 hover:bg-green-400"
                        >
                            Dashboard
                        </Link>
                    )}

                    {user?.role === "ADMIN" && (
                        <Link
                            href="/admin"
                            className="block rounded-lg p-3 hover:bg-green-400"
                        >
                            Admin
                        </Link>
                    )}

                    {!user ? (
                        <Link
                            href="/login"
                            className="mt-3 block rounded-lg bg-green-600 p-3 text-center text-white"
                        >
                            Login
                        </Link>
                    ) : (
                        <>
                            <div className="border-t pt-3">
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.role}</p>
                            </div>

                            <button className="mt-3 w-full rounded-lg bg-red-500 py-3 text-white">
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
