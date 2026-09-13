
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RightSide({ user }: { user: any }) {
    const router = useRouter();
    const { user: authUser, setUser } = useAuth() || {};
    const [loading, setLoading] = useState(false);
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
                    <div className="absolute bg-black right-0 hidden w-48 rounded-xl shadow-lg group-hover:block">
                        <button onClick={() => router.push("/profile")} className="w-full px-4 py-3 text-left hover:bg-green-700 rounded rounded">
                            Profile
                        </button>

                        <button
                            disabled={loading}
                            onClick={async () => {
                                try {
                                    setLoading(true);
                                    await authClient.signOut({
                                        fetchOptions: {
                                            onSuccess: () => {
                                                setUser(null);
                                                router.push("/login");
                                            }
                                        }
                                    })
                                } catch (error: any) {
                                    console.log("logout failed!!", error)
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            className="w-full px-4 py-3 text-left text-red-600 hover:bg-green-700 rounded"
                        >
                            {loading ? "logout..." : "logout"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
