

import useClickOutside from "@/hooks/useClickOutside";
import { LayoutDashboard, HomeIcon, ShoppingCart, UserIcon, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import useLogout from "../hooks/logout";

export default function MobileMenu({ user, open, setOpen }: { user: any; open: boolean; setOpen: () => void }) {
    const { loading, logout } = useLogout();
    const searchRef = useRef<HTMLDivElement>(null);

    useClickOutside(searchRef, () => {
        setOpen();
    });


    return (
        <div ref={searchRef} className={`absolute border rounded-lg top-12 bg-white text-black/80 right-0 overflow-hidden transition-all z-50 duration-100 
        ${open
                ? 'max-h-[450px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
            <div className="space-y-1 border-t px-3 py-4 md:hidden w-70 rounded-lg">
                <Link
                    href="/"
                    className="block rounded-lg p-3 hover:bg-green-400 flex items-center gap-1"
                >
                    <HomeIcon size={18} />Home
                </Link>

                <Link
                    href="/meals"
                    className="block rounded-lg p-3 hover:bg-green-400 flex items-center gap-1"
                >
                    <UtensilsCrossed size={18} /> Meals
                </Link>

                <Link
                    href="/providers"
                    className="block rounded-lg p-3 hover:bg-green-400 flex items-center gap-1"
                >
                    <UserIcon size={18} /> Providers
                </Link>

                {user && (
                    <Link
                        href="/cart"
                        className="block rounded-lg p-3 hover:bg-green-400 flex items-center gap-1"
                    >
                        <ShoppingCart size={18} />  Cart
                    </Link>
                )}

                <Link
                    href={
                        user?.role === "ADMIN"
                            ? "/admin"
                            : user?.role === "PROVIDER"
                                ? "/provider"
                                : "/MyOrders"
                    }
                    className="block rounded-lg p-3 hover:bg-green-400 flex items-center gap-1"
                >
                    <LayoutDashboard size={18} />
                    {user?.role === "CUSTOMER" ? "My orders" : "Dashboard"}
                </Link>


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
                            <p className="text-sm text-gray-500">{user?.role}</p>
                        </div>

                        <button onClick={logout} className="mt-3 w-full rounded-lg bg-red-500 py-3 text-white">
                            {loading ? "logout..." : "logout"}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
