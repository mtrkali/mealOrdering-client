
import Link from "next/link";

export default function RightSide({ user }: { user: any }) {
    return (
        <div className="hidden md:flex items-center gap-4">
            {!user ? (
                <Link
                    href="/login"
                    className="rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700"
                >
                    Login
                </Link>
            ) : (
                <div className="relative group">
                    <button className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="text-left">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                    </button>

                    {/* Dropdown */}
                    <div className="absolute bg-black right-0 hidden w-48 rounded-xl border shadow-lg group-hover:block">
                        <button className="w-full px-4 py-3 text-left hover:bg-green-500 rounded">
                            Profile
                        </button>

                        <button className="w-full px-4 py-3 text-left text-red-600 hover:bg-green-500">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
