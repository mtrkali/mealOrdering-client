"use client";

import { providerService } from "@/services/provider.service";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminProviderDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const providerId = params?.providerId as string;

    const [provider, setProvider] = useState<any>(null);
    const [meals, setMeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchProviderDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const [providerResult, mealsResult] =
                    await Promise.all([
                        providerService.getSingleProvider(
                            providerId
                        ),
                        providerService.getProviderMeals(
                            providerId
                        ),
                    ]);

                console.log(
                    "Admin provider:",
                    providerResult
                );

                console.log(
                    "Provider meals:",
                    mealsResult
                );

                setProvider(providerResult.data);
                setMeals(mealsResult.data || []);
            } catch (error: any) {
                console.log(
                    "Failed to fetch provider details:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    "Failed to load provider details."
                );
            } finally {
                setLoading(false);
            }
        };

        if (providerId) {
            fetchProviderDetails();
        }
    }, [providerId]);

    const handleUpdateStatus = async (newStatus: string) => {
        try {
            setUpdating(true);
            setError("");

            const result = await providerService.updateProviderStatus(providerId, newStatus);
            console.log("update orders :", result);

            setProvider((prevProvider: any) => ({
                ...prevProvider,
                status: newStatus,
            }))
        } catch (error: any) {
            console.log("Failed to update provider status ", error)

            setError(
                error?.response?.data?.message ||
                "Failed to update provider status"
            )
        } finally {
            setUpdating(false);
        }
    }

    if (loading) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Provider Details
                </h1>

                <p className="mt-6 text-gray-500">
                    Loading provider...
                </p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold">
                    Provider Details
                </h1>

                <p className="mt-6 text-red-500">
                    {error}
                </p>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Go Back
                </button>
            </main>
        );
    }

    if (!provider) {
        return null;
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            <button
                type="button"
                onClick={() => router.back()}
                className="mb-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
                ← Back to Providers
            </button>

            <h1 className="text-3xl font-bold">
                Provider Details
            </h1>

            <div className="mt-6 border rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-gray-500">
                            Business Name
                        </p>

                        <p className="mt-1 font-medium">
                            {provider.businessName}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Owner
                        </p>

                        <p className="mt-1 font-medium">
                            {provider.user?.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Email
                        </p>

                        <p className="mt-1 font-medium">
                            {provider.user?.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Phone
                        </p>

                        <p className="mt-1 font-medium">
                            {provider.phone || "N/A"}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Address
                        </p>

                        <p className="mt-1 font-medium">
                            {provider.address}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">
                            Status
                        </p>

                        <select
                            value={provider.status}
                            onChange={(e) => handleUpdateStatus(e.target.value)}
                            disabled={updating}
                            className={`px-4 py-2 mt-1 border rounded ${updating
                                ? "cursor-not-allowed"
                                : ""
                                }`}
                        >
                            <option value="ACTIVE" className="text-black">Active</option>
                            <option value="INACTIVE" className="text-black">DeActive</option>
                        </select>
                        {updating && (
                            <p className="mt-1 text-sm text-gray-500">
                                Updating...
                            </p>
                        )}

                    </div>
                </div>
            </div>

            <div className="mt-6 border rounded-lg p-6">
                <h2 className="text-xl font-bold">
                    Provider Meals
                </h2>

                {meals.length === 0 ? (
                    <p className="mt-4 text-gray-500">
                        This provider has no meals.
                    </p>
                ) : (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="border p-3 text-left">
                                        Meal
                                    </th>

                                    <th className="border p-3 text-left">
                                        Price
                                    </th>

                                    <th className="border p-3 text-left">
                                        Cuisine
                                    </th>

                                    <th className="border p-3 text-left">
                                        Created
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {meals.map((meal) => (
                                    <tr key={meal.id}>
                                        <td className="border p-3">
                                            {meal.title}
                                        </td>

                                        <td className="border p-3">
                                            ৳{meal.price?.toFixed(2)}
                                        </td>

                                        <td className="border p-3">
                                            {meal.cuisine}
                                        </td>

                                        <td className="border p-3">
                                            {new Date(
                                                meal.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}