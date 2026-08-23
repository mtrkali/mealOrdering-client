"use client";

import { providerService } from "@/services/provider.service";
import { useEffect, useState } from "react";

export default function AdminProvidersPage() {
    const [providers, setProviders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setLoading(true);
                setError("");

                const result =
                    await providerService.getAllProviders();

                console.log("Admin providers:", result);

                setProviders(result.data || []);
            } catch (error: any) {
                console.log(
                    "Failed to fetch providers:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to load providers."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Manage Providers
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading providers...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Manage Providers
                </h1>

                <p className="mt-6 text-red-500">
                    {error}
                </p>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold">
                Manage Providers
            </h1>

            <p className="mt-2 text-gray-500">
                Total Providers: {providers.length}
            </p>

            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="border p-3 text-left">
                                Business Name
                            </th>

                            <th className="border p-3 text-left">
                                Owner
                            </th>

                            <th className="border p-3 text-left">
                                Email
                            </th>

                            <th className="border p-3 text-left">
                                Phone
                            </th>

                            <th className="border p-3 text-left">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {providers.map((provider) => (
                            <tr key={provider.id}>
                                <td className="border p-3">
                                    {provider.businessName}
                                </td>

                                <td className="border p-3">
                                    {provider.user?.name}
                                </td>

                                <td className="border p-3">
                                    {provider.user?.email}
                                </td>

                                <td className="border p-3">
                                    {provider.phone}
                                </td>

                                <td className="border p-3">
                                    {provider.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}