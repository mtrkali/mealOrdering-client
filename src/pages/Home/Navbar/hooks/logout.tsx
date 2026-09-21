import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useLogout() {
    const router = useRouter();
    const { setUser } = useAuth() || {};
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            setLoading(true);

            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        setUser?.(null);
                        router.push("/login");
                    },
                },
            });
        } catch (error) {
            console.log("logout failed!!", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        logout,
        loading,
    };
}