import Link from "next/link";
import { ShoppingCart, LayoutDashboard, HomeIcon, UserIcon, UtensilsCrossed } from "lucide-react";

export default function DeskTopMenu({ user }: { user: any }) {
    return (
        <div className="hidden items-center gap-8 md:flex ">
            <Link href="/" className="hover:text-green-600 transition flex items-center gap-1">
                <HomeIcon size={18} /> Home
            </Link>

            <Link href="/meals" className="hover:text-green-600 transition flex items-center gap-1">
                <UtensilsCrossed size={18} /> Meals
            </Link>

            <Link href="/providers" className="hover:text-green-600 transition flex items-center gap-1">
                <UserIcon size={18} /> Providers
            </Link>

            {user && (
                <Link
                    href="/private/cart"
                    className="flex items-center gap-1 hover:text-green-600"
                >
                    <ShoppingCart size={18} />
                    Cart
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
                className="flex items-center gap-1 hover:text-green-600"
            >
                <LayoutDashboard size={18} />
                Dashboard
            </Link>

        </div>
    )
}
