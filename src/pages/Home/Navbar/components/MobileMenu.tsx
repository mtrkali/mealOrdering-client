

import Link from "next/link";

export default function MobileMenu({ user, open }: { user: any, open: boolean }) {
    return (
        <div className={`absolute rounded-lg top-12 bg-black/80 right-0 overflow-hidden transition-all z-50 duration-100 
        ${open
                ? 'max-h-[450px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="space-y-1 border-t px-3 py-4 md:hidden w-70 rounded-lg">
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
                        className="block rounded-lg p-2 hover:bg-green-400"
                    >
                        Admin
                    </Link>
                )}

                {!user ? (
                    <Link
                        href="/login"
                        className="mt-3 block rounded-lg bg-green-600 p-2 text-center text-white"
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
        </div>
    )
}
