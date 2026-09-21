

import Link from "next/link";
import { useRouter } from "next/navigation";
import useLogout from "../../../../hooks/logout";


export default function RightSide({ user }: { user: any }) {
    const router = useRouter();
    const { loading, logout } = useLogout();
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
                        {user?.image
                            ? <div className="flex h-10 w-10 items-center justify-center rounded-full">
                                <img src={user?.image} className="h-10 w-10 rounded-full" alt="hero-image" />
                            </div>
                            :
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                        }



                        <div className="text-left">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user?.role}</p>
                        </div>
                    </button>

                    {/* Dropdown */}
                    <div className="absolute bg-white text-black right-0 hidden w-48 rounded-xl shadow-lg group-hover:block">
                        <button onClick={() => router.push("/profile")} className="w-full px-4 py-3 text-left hover:bg-blue-100 rounded rounded">
                            Profile
                        </button>

                        <button
                            disabled={loading}
                            onClick={logout}
                            className="w-full px-4 py-3 text-left text-red-600 hover:bg-blue-100 rounded"
                        >
                            {loading ? "logout..." : "logout"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
